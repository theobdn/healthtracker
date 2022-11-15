import React from 'react';
import {Box, Button} from "@mui/material";
import {useNavigate} from "react-router-dom";

const NotFound = () => {
    const navigation = useNavigate()

    const handleGoBackToHomePage = () => {
        navigation("/")
    }

    return (
        <Box sx={{display: "flex", flexDirection: "column", justifyContent: "center"}}>
            ERROR 404 PAGE NOT FOUND
            <Button variant="contained" onClick={handleGoBackToHomePage}>Go back to home page</Button>
        </Box>
    );
};

export default NotFound;