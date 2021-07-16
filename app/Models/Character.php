<?php

namespace App\Models;

use Illuminate\Database\Eloquent\Factories\HasFactory;
use Illuminate\Database\Eloquent\Model;

/**
 * Character class
 * 
 * Assign table name and disable create and update fields
 * 
 * @author Alfredo Castañeda Porcayo 
 */
class Character extends Model
{
    use HasFactory;

    //Name of the table to which it connects
    protected $table = 'characters';

    //Creation and update fields are disabled
    public $timestamps = false;

    /**
     * Attributes that the Character class has
     *
     * @var array
     */
    protected $fillable = [
        'id',
        'name',
        'species',
        'image',
        'status'
    ];
}
