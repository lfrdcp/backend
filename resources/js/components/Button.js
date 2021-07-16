import { Button as ButtonMUI } from "@material-ui/core";
import React from "react";

const Button = ({ type, text, fn }) => {
    var typeButton = new Array();
    typeButton["primary"] = "#2196f3";
    typeButton["delete"] = "#FF4E62";
    typeButton["edit"] = "#ef6c00";

    return (
        <ButtonMUI
            fullWidth
            onClick={fn}
            size="small"
            style={{ color: "white", background: typeButton[type] }}
            variant="contained"
        >
            {text}
        </ButtonMUI>
    );
};

export default Button;
