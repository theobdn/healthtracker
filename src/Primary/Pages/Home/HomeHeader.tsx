import React from 'react';
import {Box, Grid, Paper, Typography} from "@mui/material";
import {profilesData, usersData} from "../../../Secondary/InMemory/data";
import moment from "moment";
import TextValueField from "../../Utils/TextValueField";

const HomeHeader = () => {
    const profileSelected = profilesData[0]

    return (
        <Paper elevation={1}>
            <Grid container justifyContent="space-between" py={2} px={3}>
                <Grid item>
                    <Grid item>
                        <TextValueField label={"Bienvenue"}
                                        value={profileSelected.name + " " + profileSelected.firstName}/>
                    </Grid>
                </Grid>
                <Grid item>
                    <TextValueField label={"Date du jour"} value={moment().format("DD/MM/YYYY")}/>
                </Grid>
            </Grid>
        </Paper>
    );
};

export default HomeHeader;