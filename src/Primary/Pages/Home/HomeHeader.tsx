import React from 'react';
import {Box, Typography} from "@mui/material";
import {profilesData, usersData} from "../../../Secondary/InMemory/data";

const HomeHeader = () => {
    const profileSelected = profilesData[0]
    return (
        <Box>
            <Typography variant="h3" color="secondary.dark">Bienvenue {profileSelected.name} {profileSelected.firstName}</Typography>
        </Box>
    );
};

export default HomeHeader;