import React, {useEffect, useState} from 'react';
import {
    Box,
    CircularProgress,
    CircularProgressProps,
    Divider,
    Grid,
    List,
    ListItem,
    Paper,
    Typography
} from "@mui/material";
import {dataWeightGraph} from "../../../Secondary/InMemory/data";
import {CartesianGrid, Line, LineChart, ResponsiveContainer, Tooltip, XAxis, YAxis} from 'recharts';
import MonitorWeightIcon from '@mui/icons-material/MonitorWeight';
import LocalDiningIcon from '@mui/icons-material/LocalDining';
import HeightIcon from '@mui/icons-material/Height';
import CakeIcon from '@mui/icons-material/Cake';
import CalendarMonthIcon from '@mui/icons-material/CalendarMonth';
import PersonIcon from '@mui/icons-material/Person';
import FlagIcon from '@mui/icons-material/Flag';
import {Meal} from "../../../Corelogic/Models/Aliment";
import TextValueField from "../../Utils/TextValueField";
import {Profile} from "../../../Corelogic/Models/Profile";
import HomeHeader from "./HomeHeader";
import {useNavigate} from "react-router-dom";

const Home = () => {
    const moment = require('moment')
    const [authenticated, setauthenticated] = useState(false)
    const [allMeals, setAllMeals] = useState<Meal[]>([])
    const [loggedProfile, setLoggedProfile] = useState<Profile>()
    const [progress, setProgress] = React.useState(30)
    const navigate = useNavigate()

    useEffect(() => {
        const jwt = localStorage.getItem("HealthTrackerJWT")

        jwt ? setauthenticated(true) : setauthenticated(false)
    }, [])

    useEffect(() => {
        fetch('http://localhost:3001/profile')
            .then((res) => res.json())
            .then((result) => {
                // we received our list of allMeals
                console.log(result)
                setLoggedProfile(result)
            })
    }, [])

    useEffect(() => {
        fetch('http://localhost:3001/meals')
            .then((res) => res.json())
            .then((result) => {
                // we received our list of allMeals
                console.log(result)
                setAllMeals(result)
            })
    }, [])

    function CircularProgressWithLabel(
        props: CircularProgressProps & { value: number },
    ) {
        return (
            <Box sx={{position: 'relative', display: 'inline-flex'}}>
                <CircularProgress variant="determinate" size={200} thickness={10} {...props} sx={{color: "grey"}}/>
                <Box
                    sx={{
                        top: 0,
                        left: 0,
                        bottom: 0,
                        right: 0,
                        position: 'absolute',
                        display: 'flex',
                        alignItems: 'center',
                        justifyContent: 'center',
                    }}
                >
                    <Typography
                        variant="h6"
                        component="div"
                        color="text.secondary"
                    >{`${Math.round(props.value)}%`}</Typography>
                </Box>
            </Box>
        )
    }

    return (
        <>
            <HomeHeader/>
            <Grid container spacing={1} px={5} py={1}>
                <Grid item md={12} lg={6} height="40vh">
                    <Paper elevation={5} sx={{height: "100%"}}>
                        <Grid container>
                            <Typography variant="h4">Mes infos</Typography>
                        </Grid>
                        <Grid container direction="column" p={3} spacing={2}>
                            <Grid item container>
                                <CakeIcon sx={{marginRight: "7px"}}/>
                                <TextValueField label="Birth date"
                                                value={moment(loggedProfile?.dateOfBirth).format("DD/MM/YYYY")}/>
                            </Grid>
                            <Grid item container>
                                <HeightIcon sx={{marginRight: "7px"}}/>
                                <TextValueField label="Height" value={loggedProfile?.height}/>
                            </Grid>
                            <Grid item container>
                                <MonitorWeightIcon sx={{marginRight: "7px"}}/>
                                <TextValueField label="Weight" value={loggedProfile?.weight}/>
                            </Grid>
                            <Grid item container>
                                <CalendarMonthIcon sx={{marginRight: "7px"}}/>
                                <TextValueField label="Creation date"
                                                value={moment(loggedProfile?.creationDate).format("DD/MM/YYYY")}/>
                            </Grid>
                            <Grid item container>
                                <PersonIcon sx={{marginRight: "7px"}}/>
                                <TextValueField label="Sexe"
                                                value={loggedProfile?.sexe.label}/>
                            </Grid>
                            <Grid item container>
                                <LocalDiningIcon sx={{marginRight: "7px"}}/>
                                <TextValueField label="Diet" value={loggedProfile?.foodPreference.label}/>
                            </Grid>
                            <Grid item container>
                                <FlagIcon sx={{marginRight: "7px"}}/>
                                <TextValueField label="Weight objective" value={loggedProfile?.weight}/>
                            </Grid>
                        </Grid>
                    </Paper>
                </Grid>
                <Grid item md={12} lg={6} height="40vh">
                    <Paper elevation={5} sx={{height: "100%"}}>
                        <Grid container justifyContent="space-between" alignItems="center">
                            <Grid item>
                                <Typography variant="h4">Last meals</Typography>
                            </Grid>
                            <Grid item>
                                <TextValueField label="Total" value="3500 calories"/>
                            </Grid>
                        </Grid>
                        <Divider variant="middle"/>
                        <List sx={{width: '100%', height: "100%", overflow: "auto"}}>
                            {allMeals.map((meal: Meal) => {
                                return (
                                    <>
                                        <ListItem key={meal.id} sx={{
                                            display: "flex",
                                            justifyContent: "space-between",
                                            alignItems: "center"
                                        }}>
                                            <Grid container direction="column">
                                                <TextValueField label={"Title"}
                                                                value={meal.label || ""}/>
                                                <TextValueField label={"Meal type"}
                                                                value={meal.mealType?.label || ""}/>
                                            </Grid>
                                            <TextValueField label={"Total"} value={300}/>
                                        </ListItem>
                                        <Divider/>
                                    </>
                                )
                            })}
                        </List>
                    </Paper>
                </Grid>
                <Grid item md={12} lg={6}>
                    <Paper elevation={5} sx={{height: "50vh", p: 1}}>
                        <Typography variant="h4">Evolution du poids</Typography>
                        <Divider variant="middle"/>
                        <ResponsiveContainer width="95%" height="90%">
                            <LineChart data={dataWeightGraph}>
                                <Line type="monotone" dataKey="kg" stroke="#8884d8"/>
                                <CartesianGrid stroke="#ccc"/>
                                <XAxis dataKey="name"/>
                                <YAxis/>
                                <Tooltip/>
                            </LineChart>
                        </ResponsiveContainer>
                    </Paper>
                </Grid>
                <Grid item md={12} lg={6}>
                    <Paper elevation={5} sx={{height: "50vh"}}>
                        <Grid container p={1} justifyContent="space-between" alignItems="center">
                            <Grid item>
                                <Typography variant="h4">Calories du jour</Typography>
                            </Grid>
                            <Grid item>
                                <TextValueField label="Calories consommées" value="3500/5000"/>
                            </Grid>
                        </Grid>
                        <Divider variant="middle"/>
                        <Grid container justifyContent="center" alignItems="center" height="100%">
                            <CircularProgressWithLabel value={progress}/>
                        </Grid>
                    </Paper>
                </Grid>
            </Grid>
        </>
    )
}

export default Home;