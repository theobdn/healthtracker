import React from 'react';
import {Typography} from "@mui/material";
import {profilesData} from "../../../Secondary/InMemory/data";

const HomeHeader = () => {
    const profileSelected = profilesData[0]
    return (
        <Typography variant="h3" color="secondary.dark">
            Bienvenue {profileSelected.name} {profileSelected.firstName}
        </Typography>
    );
};

export default HomeHeader;