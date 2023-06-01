import React from 'react';
import GeneralInformationForm from "./GeneralInformationForm";
import PasswordForm from "./PasswordForm";
import {Grid, Paper} from "@mui/material";
import {Profile} from "../../../Corelogic/Models/Profile";
import Container from "@mui/material/Container";

interface ProfilePageInterface {
    userLoggedProfile: Profile | null
}

const ProfilePage = (props: ProfilePageInterface) => {
    const {userLoggedProfile} = props

    return (
        <>
            <Container maxWidth="xl">
                <Grid container spacing={1} px={3} py={1}>
                    <Grid item lg={12}>
                        <Paper>
                            <GeneralInformationForm userLoggedProfile={userLoggedProfile}/>
                        </Paper>
                    </Grid>
                    <Grid item lg={12}>
                        <Paper>
                            <PasswordForm userLoggedProfile={userLoggedProfile}/>
                        </Paper>
                    </Grid>
                </Grid>
            </Container>
        </>
    );
};

export default ProfilePage;