import React from 'react';
import {Alert, Container, Divider, Grid, Paper, Typography} from "@mui/material";
import MonitorWeightIcon from '@mui/icons-material/MonitorWeight';
import LocalDiningIcon from '@mui/icons-material/LocalDining';
import HeightIcon from '@mui/icons-material/Height';
import CakeIcon from '@mui/icons-material/Cake';
import CalendarMonthIcon from '@mui/icons-material/CalendarMonth';
import PersonIcon from '@mui/icons-material/Person';
import FlagIcon from '@mui/icons-material/Flag';
import TextValueField from "../../Utils/TextValueField";
import {Profile} from "../../../Corelogic/Models/Profile";
import HomeHeader from "./HomeHeader";
import QuickMenu from "../../Utils/QuickMenu";
import MenuOutlinedIcon from '@mui/icons-material/MenuOutlined';
import RamenDiningOutlinedIcon from '@mui/icons-material/RamenDiningOutlined';
import MenuBookOutlinedIcon from '@mui/icons-material/MenuBookOutlined';
import InfoOutlinedIcon from '@mui/icons-material/InfoOutlined';

interface HomeInterface {
    userLoggedProfile: Profile
}

const Home = (props: HomeInterface) => {
    const {userLoggedProfile} = props
    const moment = require('moment')
    const [userLogged, setUserLogged] = React.useState<Profile>(userLoggedProfile)

    return (
        <>
            <HomeHeader userLogged={userLogged}/>
            <Container maxWidth="xl">
                <Grid container spacing={1} p={1}>
                    <Grid item md={12} lg={6}>
                        <Paper elevation={5} sx={{height: "100%"}}>
                            <Grid container item alignItems="center" p={1}>
                                <InfoOutlinedIcon style={{fill: "rgba(33, 150, 243, 1)", marginRight: 10}}/>
                                <Typography variant="h6" component="h2" fontWeight="bolder">
                                    Informations générales
                                </Typography>
                            </Grid>
                            <Divider variant="middle"/>
                            <Grid container direction="column" justifyContent="space-around" p={2}
                                  spacing={1}>
                                <Grid item container>
                                    <CakeIcon sx={{marginRight: "7px"}}/>
                                    <TextValueField label="Birth date"
                                                    value={moment(userLogged.birth).format("DD/MM/YYYY")}/>
                                </Grid>
                                <Grid item container>
                                    <HeightIcon sx={{marginRight: "7px"}}/>
                                    <TextValueField label="Height" value={userLogged.height}/>
                                </Grid>
                                <Grid item container>
                                    <MonitorWeightIcon sx={{marginRight: "7px"}}/>
                                    <TextValueField label="Weight" value={userLogged.weight}/>
                                </Grid>
                                <Grid item container>
                                    <CalendarMonthIcon sx={{marginRight: "7px"}}/>
                                    <TextValueField label="Creation date"
                                                    value={moment(userLogged.created_at).format("DD/MM/YYYY")}/>
                                </Grid>
                                <Grid item container>
                                    <PersonIcon sx={{marginRight: "7px"}}/>
                                    <TextValueField label="Sexe"
                                                    value={String(userLogged.sexe)}/>
                                </Grid>
                                <Grid item container>
                                    <LocalDiningIcon sx={{marginRight: "7px"}}/>
                                    <TextValueField label="Diet" value={String(userLogged.food_preference)}/>
                                </Grid>
                                <Grid item container>
                                    <FlagIcon sx={{marginRight: "7px"}}/>
                                    <TextValueField label="Weight objective" value={userLogged.weight}/>
                                </Grid>
                            </Grid>
                        </Paper>
                    </Grid>
                    <Grid item md={12} lg={6}>
                        <Paper elevation={5} sx={{height: "100%"}}>
                            <Grid container item alignItems="center" p={1}>
                                <MenuOutlinedIcon style={{fill: "rgba(33, 150, 243, 1)", marginRight: 10}}/>
                                <Typography variant="h6" component="h2" fontWeight="bolder">
                                    Menu rapide
                                </Typography>
                            </Grid>
                            <Divider variant="middle"/>
                            <Grid container direction="column">
                                <QuickMenu/>
                            </Grid>
                        </Paper>
                    </Grid>
                    <Grid item md={12} lg={6} minHeight={350}>
                        <Paper elevation={5} sx={{height: "100%"}}>
                            <Grid container item alignItems="center" p={1}>
                                <RamenDiningOutlinedIcon style={{fill: "rgba(33, 150, 243, 1)", marginRight: 10}}/>
                                <Typography variant="h6" component="h2" fontWeight="bolder">
                                    Mes derniers repas
                                </Typography>
                            </Grid>
                            <Divider variant="middle"/>
                            <Grid container direction="column" p={2}>
                                <Alert severity="info">Vous n'avez pas encore de repas</Alert>
                            </Grid>
                        </Paper>
                    </Grid>
                    <Grid item md={12} lg={6} minHeight={350}>
                        <Paper elevation={5} sx={{height: "100%"}}>
                            <Grid container item alignItems="center" p={1}>
                                <MenuBookOutlinedIcon style={{fill: "rgba(33, 150, 243, 1)", marginRight: 10}}/>
                                <Typography variant="h6" component="h2" fontWeight="bolder">
                                    Mes dernieres recettes
                                </Typography>
                            </Grid>
                            <Divider variant="middle"/>
                            <Grid container direction="column" p={2}>
                                <Alert severity="info">Vous n'avez pas encore de recette</Alert>
                            </Grid>
                        </Paper>
                    </Grid>
                </Grid>
            </Container>
        </>
    )
}

export default Home;