import React from "react";
import { useForm } from "react-hook-form";
import TextFieldX from "./TextFieldX";
import FingerprintIcon from "@material-ui/icons/Fingerprint";
import LocalHospitalIcon from "@material-ui/icons/LocalHospital";
import {
    Button,
    Card,
    CardMedia,
    Dialog,
    DialogActions,
    DialogContent,
    DialogTitle,
} from "@material-ui/core";
import Alert from "@material-ui/lab/Alert";

const EditCharacter = ({ character, open, handleClose }) => {
    const textRule = {
        required: {
            value: true,
            message: "No puede estar vacio",
        },
        pattern: {
            value: /^[a-zA-Z0-9._-\s\S]{3,}$/,
            message: "Debe tener más de 3 letras",
        },
    };

    const { register, errors, handleSubmit } = useForm();
    const [loading, setLoading] = React.useState(false);

    const [messageDelete, setMessageDelete] = React.useState({
        status: false,
        text: "",
    });

    const updateCharacter = (edit) => {
        setLoading(true);
        fetch(`api/update`, {
            method: "PUT",
            headers: {
                "Content-Type": "application/json",
            },
            body: JSON.stringify(edit),
        })
            .then((response) => {
                if (response.status === 200) {
                    response.json().then((data) => {
                        setMessageDelete({
                            status: true,
                            text: data.message,
                        });
                        setTimeout(() => location.reload(), 3000);
                    });
                } else {
                    response.json().then((data) => alert("hubo un error"));
                }
            })
            .catch((error) => console.log(error))
            .finally(() => setLoading(false));
    };

    const onSubmit = (data, e) => {
        e.preventDefault();
        let edit = {
            ...data,
            id: character.id,
        };
        updateCharacter(edit);
    };

    return (
        <Card>
            <Dialog
                open={open}
                onClose={handleClose}
                aria-labelledby="form-dialog-title"
            >
                <form onSubmit={handleSubmit(onSubmit)}>
                    {messageDelete.status && (
                        <Alert severity="success" variant="filled">
                            {messageDelete.text}
                        </Alert>
                    )}
                    <DialogTitle>Editar personaje favorito</DialogTitle>
                    <DialogContent>
                        <CardMedia
                            style={{ height: 280 }}
                            image={character.image}
                        />
                        <TextFieldX
                            error={errors?.species?.message}
                            name="species"
                            typeField="text"
                            label="Especie*"
                            componentIcon={FingerprintIcon}
                            validations={register("species", {
                                ...textRule,
                            })}
                            defValue={character.species}
                        />

                        <TextFieldX
                            error={errors?.status?.message}
                            name="status"
                            typeField="text"
                            label="Estado de vida*"
                            componentIcon={LocalHospitalIcon}
                            validations={register("status", {
                                ...textRule,
                            })}
                            defValue={character.status}
                        />
                    </DialogContent>
                    <DialogActions>
                        <Button
                            onClick={handleClose}
                            style={{
                                color: "white",
                                backgroundColor: "#FF4E62",
                            }}
                            variant="contained"
                        >
                            Cancelar
                        </Button>
                        <Button
                            type="submit"
                            color="primary"
                            variant="contained"
                        >
                            Listo, editar personaje
                        </Button>
                    </DialogActions>
                </form>
            </Dialog>
        </Card>
    );
};

export default EditCharacter;
