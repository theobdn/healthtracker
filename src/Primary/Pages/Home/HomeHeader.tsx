import React from 'react';
import {Grid, Paper} from "@mui/material";
import moment from "moment";
import TextValueField from "../../Utils/TextValueField";
import {Profile} from "../../../Corelogic/Models/Profile";

interface HomeHeaderInterface {
    userLogged?: Profile
}

const HomeHeader = (props: HomeHeaderInterface) => {
    const {userLogged} = props

    return (
        <Paper elevation={1}>
            <Grid container justifyContent="space-between" py={2} px={3}>
                <Grid item>
                    <Grid item>
                        <TextValueField label={"Bienvenue"}
                                        value={userLogged?.name + " " + userLogged?.surname}/>
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