import React, {useState} from 'react';
import ProfileHeader from "./ProfileHeader";
import GeneralInformationForm from "./GeneralInformationForm";
import PasswordForm from "./PasswordForm";
import {Box} from "@mui/material";

const ProfilePage = () => {

    return (
        <Box>
            <ProfileHeader/>
            <GeneralInformationForm/>
            <PasswordForm/>
        </Box>
    );
};

export default ProfilePage;