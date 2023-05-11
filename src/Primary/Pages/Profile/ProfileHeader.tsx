import React from 'react';
import {Grid, Typography} from "@mui/material";
import {profilesData} from "../../../Secondary/InMemory/data";

const ProfileHeader = () => {
    return (
        <Grid container alignItems="center" p={1}>
            <Grid item>
                <Typography variant="h4">Profile : </Typography>
            </Grid>
            <Grid item>
                <Typography variant="h4" color="secondary" marginLeft="5px">{profilesData[0].name}</Typography>
            </Grid>
            <Grid item>
                <Typography variant="h4" color="secondary" marginLeft="5px">{profilesData[0].surname}</Typography>
            </Grid>
        </Grid>
    )
}

export default ProfileHeader;