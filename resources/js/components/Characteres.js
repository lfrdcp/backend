import React from "react";
import Character from "./Character";
import Button from "./Button";
import { Card, Grid, CardHeader, CircularProgress } from "@material-ui/core";
import Alert from "@material-ui/lab/Alert";

const Characteres = () => {
    const [characteres, setCharacteres] = React.useState([]);
    const [loading, setLoading] = React.useState(false);
    const [page, setPage] = React.useState(1);
    const [messageRead, setMessageRead] = React.useState({
        status: false,
        text: "",
        severity: "",
    });

    const getAllCharacter = () => {
        setCharacteres([]);
        setLoading(true);
        fetch(`api/allCharacter/${page}`, {
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
                        setCharacteres([...data.results]);
                        setLoading(false);
                    });
                }
            })
            .catch((error) => console.log("hubo un errorsazo", error));
    };

    React.useEffect(getAllCharacter, [page]);

    const nextPage = () => {
        let pageCurrent = page + 1;
        setPage(pageCurrent);
        window.scrollTo(0, 0);
    };

    const lastPage = () => {
        let pageCurrent = page - 1;
        setPage(pageCurrent);
        window.scrollTo(0, 0);
    };

    return (
        <React.Fragment>
            <Grid item xs={12} sm={12} md={12} lg={12} xl={12}>
                <Card>
                    <CardHeader
                        title="Lista de personajes"
                        subheader={"Página: " + page}
                    />
                    {messageRead.status && (
                        <Alert severity={messageRead.severity} variant="filled">
                            {messageRead.text}
                        </Alert>
                    )}
                </Card>
            </Grid>

            {characteres.length > 0 ? (
                <React.Fragment>
                    {characteres.map((character, index) => (
                        <Character key={index} character={character} />
                    ))}
                </React.Fragment>
            ) : (
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
            )}

            <Grid container>
                {page > 1 && (
                    <Grid item xs={12} sm={10} md={6} lg={6} xl={6}>
                        <Button
                            type="primary"
                            text="Página anterior"
                            fn={lastPage}
                        />
                    </Grid>
                )}
                <Grid item xs={12} sm={12} md={6} lg={6} xl={6}>
                    <Button
                        type="primary"
                        text="Página siguiente"
                        fn={nextPage}
                    />
                </Grid>
            </Grid>
        </React.Fragment>
    );
};

export default Characteres;
