import React, { useState } from "react";
import ReactDOM from "react-dom";
import { ThemeProvider } from "@material-ui/core/styles";
import theme from "../theme";
import Welcome from "./Welcome";
import MyCharacteres from "./MyCharacteres";
import Characteres from "./Characteres";
import { Container, Grid } from "@material-ui/core";

const Main = () => {
    const [welcome, setWelcome] = useState(null);

    return (
        <ThemeProvider theme={theme}>
            <Container>
                <Grid container spacing={2}>
                    <Welcome setWelcome={setWelcome} />
                    {welcome === true ? (
                        <MyCharacteres setWelcome={setWelcome} />
                    ) : (
                        welcome === false && (
                            <Characteres setWelcome={setWelcome} />
                        )
                    )}
                </Grid>
            </Container>
        </ThemeProvider>
    );
};

export default Main;

if (document.getElementById("main")) {
    ReactDOM.render(<Main />, document.getElementById("main"));
}
