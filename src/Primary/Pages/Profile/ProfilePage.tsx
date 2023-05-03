import React, {useState} from 'react';
import ProfileHeader from "./ProfileHeader";
import GeneralInformationForm from "./GeneralInformationForm";
import PasswordForm from "./PasswordForm";
import {Box, Grid, Paper} from "@mui/material";

const ProfilePage = () => {

    return (
        <>
            <ProfileHeader/>
            <Grid container spacing={2} px={3}>
                <Grid item lg={8} md={12}>
                    <Paper>
                        <GeneralInformationForm/>
                    </Paper>
                </Grid>
                <Grid item lg={4} md={12}>
                    <Paper>
                        <PasswordForm/>
                    </Paper>
                </Grid>
            </Grid>
        </>
    );
};

export default ProfilePage;