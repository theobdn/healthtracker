import React from 'react';
import {Box, Typography} from "@mui/material";
import {profilesData, usersData} from "../../../Secondary/InMemory/data";

const ProfileHeader = () => {
    return (
        <Box sx={{display: "flex", alignItems: "center", paddingLeft: "15px", height: "6vh"}}>
            <Typography variant="h4">Profile : </Typography>
            <Typography variant="h4" color="secondary" marginLeft="5px">{profilesData[0].name}</Typography>
            <Typography variant="h4" color="secondary" marginLeft="5px">{profilesData[0].firstName}</Typography>
        </Box>
    )
}

export default ProfileHeader;