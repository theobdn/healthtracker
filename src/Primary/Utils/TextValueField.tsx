import React from 'react';
import Box from "@mui/material/Box";
import Typography from "@mui/material/Typography";

interface TextValueFieldProps {
    label?: string,
    value?: string | number,
    separator?: string
}

const TextValueField = (props: TextValueFieldProps) => {
    const {label, value, separator} = props
    return (
        <Box className="field-value">
            <Typography color="text.primary" sx={{marginRight: "5px"}}>{label}</Typography>
            {separator ? separator : ":"}
            <Typography color="secondary.main" sx={{marginLeft: "5px"}}>{value}</Typography>
        </Box>
    )
}

export default TextValueField;