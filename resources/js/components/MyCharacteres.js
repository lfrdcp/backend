import { Card, CardHeader, Grid, CircularProgress } from "@material-ui/core";
import Alert from "@material-ui/lab/Alert";
import React from "react";
import MyCharacter from "./MyCharacter";

const MyCharacteres = () => {
    const [characteres, setCharacteres] = React.useState(null);
    const [loading, setLoading] = React.useState(false);
    const [messageRead, setMessageRead] = React.useState({
        status: false,
        text: "",
        severity: "",
    });

    const getAllCharacter = () => {
        setCharacteres([]);
        setLoading(true);
        fetch(`api/allMyCharacteres`, {
            method: "GET",
            headers: {
                "Content-Type": "application/json",
            },
        })
            .then((response) => {
                if (response.status === 500) {
                    response.json().then((data) => {
                        setMessageRead({
                            status: true,
                            text: "Ocurrio un error en el servidor",
                            severity: "error",
                        });
                    });
                } else {
                    response.json().then((data) => {
                        setCharacteres([...data]);
                        setLoading(false);
                    });
                }
            })

            .catch((error) => console.log("hubo un errorsazo", error));
    };

    React.useEffect(getAllCharacter, []);

    return (
        <React.Fragment>
            <Grid item xs={12} sm={12} md={12} lg={12} xl={12}>
                <Card>
                    <CardHeader title="Lista de personajes" />
                    {messageRead.status && (
                        <Alert severity={messageRead.severity} variant="filled">
                            {messageRead.text}
                        </Alert>
                    )}
                </Card>
            </Grid>

            {characteres === null ? (
                loading && (
                    <Grid
                        container
                        alignItems="center"
                        justifyContent="center"
                        spacing={0}
                        style={{ minHeight: "15vh" }}
                    >
                        <Grid item>
                            <CircularProgress size={120} />
                        </Grid>
                    </Grid>
                )
            ) : characteres.length > 0 ? (
                <React.Fragment>
                    {characteres.map((character, index) => (
                        <MyCharacter key={index} character={character} />
                    ))}
                </React.Fragment>
            ) : (
                <Grid item xs={12} sm={12} md={12} lg={12} xl={12}>
                    <Card>
                        <CardHeader title="No tienes personajes en tu lista" />
                    </Card>
                </Grid>
            )}
        </React.Fragment>
    );
};

export default MyCharacteres;
