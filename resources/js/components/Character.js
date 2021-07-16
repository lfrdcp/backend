import React from "react";

import { makeStyles } from "@material-ui/core/styles";
import Card from "@material-ui/core/Card";
import CardActions from "@material-ui/core/CardActions";
import CardContent from "@material-ui/core/CardContent";
import CardMedia from "@material-ui/core/CardMedia";
import Typography from "@material-ui/core/Typography";

import Button from "./Button";
import { Grid, LinearProgress } from "@material-ui/core";
import Alert from "@material-ui/lab/Alert";

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
    const [messageAdd, setMessageAdd] = React.useState({
        status: false,
        text: "",
        severity: "",
    });
    const store = () => {
        let myCharacter = {
            name: character.name,
            species: character.species,
            image: character.image,
            status: character.status,
        };

        setLoading(true);
        fetch(`api/store`, {
            method: "POST",
            headers: {
                "Content-Type": "application/json",
            },
            body: JSON.stringify(myCharacter),
        })
            .then((response) => {
                if (response.status === 422) {
                    response.json().then((data) => {
                        setMessageAdd({
                            status: true,
                            text: data.errors.map((error) => error),
                            severity: "warning",
                        });
                    });
                } else {
                    response.json().then((data) =>
                        setMessageAdd({
                            status: true,
                            text: data.message,
                            severity: "success",
                        })
                    );
                }
            })
            .catch((error) => console.log(error))
            .finally(() => setLoading(false));
    };

    return (
        <Grid item xs={12} sm={10} md={3} lg={3} xl={3}>
            <Card>
                {loading && <LinearProgress />}

                <CardContent>
                    {messageAdd.status && (
                        <Alert severity={messageAdd.severity} variant="filled">
                            {messageAdd.text}
                        </Alert>
                    )}
                    <CardMedia
                        className={classes.media}
                        image={character.image}
                    />
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

                <CardActions>
                    <Button
                        type="primary"
                        text="Agregar a mi lista"
                        fn={() => store()}
                    />
                </CardActions>
            </Card>
        </Grid>
    );
};

export default Character;
