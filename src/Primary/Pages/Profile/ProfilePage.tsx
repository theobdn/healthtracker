import React from 'react';
import ProfileHeader from "./ProfileHeader";
import GeneralInformationForm from "./GeneralInformationForm";
import PasswordForm from "./PasswordForm";
import {Grid, Paper} from "@mui/material";

const ProfilePage = () => {

    return (
        <Grid container direction="column" spacing={1}>
            <Grid item>
                <Paper>
                    <ProfileHeader/>
                </Paper>
            </Grid>
            <Grid item>
                <Paper>
                    <GeneralInformationForm/>
                </Paper>
            </Grid>
            <Grid item>
                <Paper>
                    <PasswordForm/>
                </Paper>
            </Grid>
        </Grid>
    );
};

export default ProfilePage;