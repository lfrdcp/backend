import React from "react";

import { makeStyles } from "@material-ui/core/styles";
import Card from "@material-ui/core/Card";
import CardActionArea from "@material-ui/core/CardActionArea";
import CardActions from "@material-ui/core/CardActions";
import CardContent from "@material-ui/core/CardContent";
import CardMedia from "@material-ui/core/CardMedia";
import Typography from "@material-ui/core/Typography";
import Alert from "@material-ui/lab/Alert";

import Button from "./Button";
import { Grid, LinearProgress } from "@material-ui/core";
import EditCharacter from "./EditCharacter";

const useStyles = makeStyles({
    root: {
        maxWidth: 345,
    },
    media: {
        height: 280,
    },
});

const Character = ({ character }) => {
    const classes = useStyles();
    const [loading, setLoading] = React.useState(false);
    const [open, setOpen] = React.useState(false);
    const [messageDelete, setMessageDelete] = React.useState({
        status: false,
        text: "",
    });

    const handleClickOpen = () => {
        setOpen(true);
    };

    const handleClose = () => {
        setOpen(false);
    };

    const deleteCharacter = () => {
        setLoading(true);
        fetch(`api/destroy`, {
            method: "DELETE",
            headers: {
                "Content-Type": "application/json",
            },
            body: JSON.stringify({ id: character.id }),
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

    return (
        <Grid item xs={12} sm={10} md={3} lg={3} xl={3}>
            <EditCharacter
                character={character}
                open={open}
                handleClose={handleClose}
            />
            <Card>
                {loading && <LinearProgress />}
                {messageDelete.status && (
                    <Alert severity="success" variant="filled">
                        {messageDelete.text}
                    </Alert>
                )}

                <CardActionArea>
                    <CardMedia
                        className={classes.media}
                        image={character.image}
                    />
                    <CardContent>
                        <Typography gutterBottom variant="h5" component="h2">
                            {character.name}
                        </Typography>
                        <Typography
                            variant="body2"
                            color="textSecondary"
                            component="p"
                        >
                            Especie: {character.species}
                        </Typography>
                        <Typography
                            variant="body2"
                            color="textSecondary"
                            component="p"
                        >
                            Estado de vida: {character.status}
                        </Typography>
                    </CardContent>
                </CardActionArea>
                <CardActions>
                    {!messageDelete.status && (
                        <React.Fragment>
                            <Button
                                type="edit"
                                text="Editar personaje"
                                fn={handleClickOpen}
                            />
                            <Button
                                type="delete"
                                text="Eliminar personaje"
                                fn={deleteCharacter}
                            />
                        </React.Fragment>
                    )}
                </CardActions>
            </Card>
        </Grid>
    );
};

export default Character;
