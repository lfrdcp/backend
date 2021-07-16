import React from "react";
import { makeStyles } from "@material-ui/core/styles";
import Card from "@material-ui/core/Card";
import CardActionArea from "@material-ui/core/CardActionArea";
import CardActions from "@material-ui/core/CardActions";
import CardContent from "@material-ui/core/CardContent";
import CardMedia from "@material-ui/core/CardMedia";
import Typography from "@material-ui/core/Typography";
import { Grid } from "@material-ui/core";

import Button from "./Button";

const useStyles = makeStyles({
    root: {
        maxWidth: 345,
    },
    media: {
        height: 500,
    },
});

export default function Welcome({ setWelcome }) {
    const classes = useStyles();

    return (
        <Grid item xs={12} sm={12} md={12} lg={12} xl={12}>
            <Card>
                <CardActionArea>
                    <CardMedia
                        className={classes.media}
                        image="https://i2.wp.com/collectible506.com/wp-content/uploads/2017/10/119091-rick-and-morty-rick-and-morty_qggr.jpg?fit=1920%2C1080&ssl=1"
                    />
                    <CardContent>
                        <Typography gutterBottom variant="h5" component="h2">
                            Bievenido
                        </Typography>
                        <Typography
                            variant="body2"
                            color="textSecondary"
                            component="p"
                        >
                            Puedes elegir a tus personas favoritos de la serie,
                            guardandolos en una lista de favoritos, y estando en
                            favoritos poder editarlos o quitarlos de tu lista.
                        </Typography>
                    </CardContent>
                </CardActionArea>
                <CardActions>
                    <Button
                        type="primary"
                        text="Ver mi lista de favoritos"
                        fn={() => setWelcome(true)}
                    />
                    <Button
                        type="primary"
                        text="Ver todos los personajes"
                        fn={() => setWelcome(false)}
                    />
                </CardActions>
            </Card>
        </Grid>
    );
}
