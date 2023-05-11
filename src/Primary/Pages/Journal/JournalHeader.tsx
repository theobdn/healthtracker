import React from 'react';
import {Box, Typography} from "@mui/material";
import {profilesData} from "../../../Secondary/InMemory/data";
import Button from "@mui/material/Button";
import {useNavigate} from "react-router-dom";

const JournalHeader = () => {
    const navigation = useNavigate()

    const handleCreateMeal = () => {
        navigation("/mealCreation")
    }
    return (
        <Box sx={{
            display: "flex",
            justifyContent: "space-between",
            alignItems: "center",
            paddingLeft: "15px",
            paddingRight: "15px",
        }}>
            <Box sx={{display: "flex"}}>
                <Typography variant="h4">Votre journal : </Typography>
                <Typography variant="h4" color="secondary" marginLeft="5px">{profilesData[0].name}</Typography>
                <Typography variant="h4" color="secondary" marginLeft="5px">{profilesData[0].surname}</Typography>
            </Box>
            <Box>
                <Button variant="outlined" onClick={handleCreateMeal}>Créer un nouveau repas</Button>
            </Box>
        </Box>
    );
};

export default JournalHeader;