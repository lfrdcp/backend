<?php

namespace App\Http\Controllers;

use App\Models\Character;
use Illuminate\Http\Request;
use Illuminate\Support\Facades\Http;
use Illuminate\Support\Facades\Validator;

/**
 * Character controller
 * 
 * Character controller, 
 * contains a CRUD, 
 * custom validations,
 * also an API is used to obtain information on characters
 * 
 * @author Alfredo Castañeda Porcayo 
 */
class CharacterController extends Controller
{
    /**
     * Show a list of all characters
     * @param int Page number to consult characters
     * @return \Illuminate\Http\Response Returns a list of characters or failed message object
     */
    public function indexAllCharacteres($page)
    {
        try {
            $response = Http::get('https://rickandmortyapi.com/api/character', [
                'page' => $page,
            ]);
            return response()->json($response->json());
        } catch (\Throwable $th) {
            return response()->json(['error' => $th], 500);
        }
    }

    /**
     * Show a list of all my characters
     * @return \Illuminate\Http\Response Returns a list of all my characters or failed message object
     */
    public function indexAllMyCharacteres()
    {
        try {
            return response()->json(Character::all());
        } catch (\Throwable $th) {
            return response()->json(['error' => $th], 500);
        }
    }

    /**
     * Store a new character
     * @param  \Illuminate\Http\Request Request containing object with the data of a character
     * @return \Illuminate\Http\Response Returns successful or failed message object
     */
    public function store(Request $request)
    {
        $validator = Validator::make(
            $request->all(),
            [
                'name' => 'required|unique:characters',
                'species' => 'required',
                'image' => 'required',
                'status' => 'required',
            ],
            [
                'name.required'    => 'Falta el nombre del personaje',
                'name.unique'      => 'Ya existe el personaje',
                'species.required'    => 'Falta la especio del personaje',
                'image.required'    => 'Falta la url del personaje',
                'status.required'    => 'Falta el estatus del personaje',
            ]
        );

        if ($validator->fails()) {
            return response()->json(['errors' => $validator->errors()->all()], 422);
        }

        try {
            $character = new Character();
            $character->name = $request->name;
            $character->species = $request->species;
            $character->image = $request->image;
            $character->status = $request->status;
            $character->save();
            return response()->json(['message' => 'Agregado correctamente']);
        } catch (\Throwable $th) {
            return response()->json(['error' => $th], 500);
        }
    }


    /**
     * Update a character
     * @param  \Illuminate\Http\Request  Request containing object with id, species and life status of the character
     * @return \Illuminate\Http\Response Returns successful or failed message object
     */
    public function update(Request $request)
    {
        try {
            $validator = Validator::make(
                $request->all(),
                [
                    'species' => 'required',
                    'status' => 'required',
                ],
                [
                    'species.required'    => 'Falta la especio del personaje',
                    'status.required'    => 'Falta el estatus del personaje',
                ]
            );

            if ($validator->fails()) {
                return response()->json(['errors' => $validator->errors()->all()], 422);
            }

            Character::whereId($request->id)->update($request->all());
            return response()->json(['message' => 'Actualizado correctamente']);
        } catch (\Throwable $th) {
            return response()->json(['error' => $th], 500);
        }
    }

    /**
     * Remove a character
     * @param  \Illuminate\Http\Request Request containing object with id
     * @return \Illuminate\Http\Response Returns successful or failed message object
     */
    public function destroy(Request $request)
    {
        try {
            Character::destroy($request->id);
            return response()->json(['message' => 'Eliminado correctamente']);
        } catch (\Throwable $th) {
            return response()->json(['error' => $th], 500);
        }
    }
}
