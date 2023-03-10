import React, {useEffect, useState} from 'react';
import {Divider, Grid, List, ListItem, Paper, Typography} from "@mui/material";
import {data01, dataWeightGraph} from "../../../Secondary/InMemory/data";
import {CartesianGrid, Line, LineChart, Pie, PieChart, ResponsiveContainer, Tooltip, XAxis, YAxis} from 'recharts';
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

const Home = () => {
    const moment = require('moment')
    const [allMeals, setAllMeals] = useState<Meal[]>([])
    const [loggedProfile, setLoggedProfile] = useState<Profile>()

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


    return (
        <>
            {/*<HomeHeader/>*/}
            <Grid container spacing={1} p={2}>
                <Grid item sm={12} lg={6}>
                    <Paper elevation={5}>
                        <Typography variant="h4" component="h2">My profile</Typography>
                        <Divider variant="middle"/>
                        <Grid container direction="column" spacing={2} p={3}>
                            <Grid item container alignItems="center">
                                <PersonIcon sx={{marginRight: "7px"}}/>
                                <TextValueField label="Name"
                                                value={`${loggedProfile?.name} ${loggedProfile?.firstName}`}/>
                            </Grid>
                            <Grid item container alignItems="center">
                                <CakeIcon sx={{marginRight: "7px"}}/>
                                <TextValueField label="Birth date"
                                                value={moment(loggedProfile?.dateOfBirth).format("DD/MM/YYYY")}/>
                            </Grid>
                            <Grid item container alignItems="center">
                                <HeightIcon sx={{marginRight: "7px"}}/>
                                <TextValueField label="Height" value={loggedProfile?.height}/>
                            </Grid>
                            <Grid item container alignItems="center">
                                <MonitorWeightIcon sx={{marginRight: "7px"}}/>
                                <TextValueField label="Weight" value={loggedProfile?.weight}/>
                            </Grid>
                            <Grid item container alignItems="center">
                                <CalendarMonthIcon sx={{marginRight: "7px"}}/>
                                <TextValueField label="Creation date"
                                                value={moment(loggedProfile?.creationDate).format("DD/MM/YYYY")}/>
                            </Grid>
                            <Grid item container alignItems="center">
                                <PersonIcon sx={{marginRight: "7px"}}/>
                                <TextValueField label="Sexe"
                                                value={loggedProfile?.sexe.label}/>
                            </Grid>
                            <Grid item container alignItems="center">
                                <LocalDiningIcon sx={{marginRight: "7px"}}/>
                                <TextValueField label="Diet" value={loggedProfile?.foodPreference.label}/>
                            </Grid>
                            <Grid item container alignItems="center">
                                <FlagIcon sx={{marginRight: "7px"}}/>
                                <TextValueField label="Weight objective" value={loggedProfile?.weight}/>
                            </Grid>
                        </Grid>
                    </Paper>
                </Grid>
                <Grid item sm={12} lg={6}>
                    <Paper elevation={5}>
                        <Grid container justifyContent="space-between">
                            <Grid item>
                                <Typography variant="h4" component="h2">Last meals</Typography>
                            </Grid>
                            <Grid item>
                                <Grid container>
                                    <Typography color="text.primary" variant="h5" sx={{paddingRight: "10px"}}>
                                        Total :
                                    </Typography>
                                    <Typography color="secondary" variant="h5">
                                        3500 calories
                                    </Typography>
                                </Grid>
                            </Grid>
                        </Grid>
                        <Divider variant="middle"/>
                        <Grid container direction="column" spacing={2} p={3}>
                            <List sx={{width: '100%'}}>
                                {allMeals.map((meal, index) => {
                                    return (
                                        <>
                                            <ListItem key={meal.id} divider={index < allMeals.length - 1}>
                                                <Grid container direction="column">
                                                    <TextValueField label={"Title"}
                                                                    value={meal.label || ""}/>
                                                    <TextValueField label={"Meal type"}
                                                                    value={meal.mealType?.label || ""}/>
                                                </Grid>
                                                <TextValueField label={"Total"} value={300}/>
                                            </ListItem>
                                        </>
                                    )
                                })}
                            </List>
                        </Grid>
                    </Paper>
                </Grid>
                <Grid item sm={12} lg={6}>
                    <Paper elevation={5}>
                        <Typography variant="h4">Weight evolution</Typography>
                        <Divider variant="middle"/>
                        <Grid container height={400}>
                            <ResponsiveContainer width="95%" height="100%">
                                <LineChart data={dataWeightGraph}>
                                    <Line type="monotone" dataKey="kg" stroke="#8884d8"/>
                                    <CartesianGrid stroke="#ccc"/>
                                    <XAxis dataKey="name"/>
                                    <YAxis/>
                                    <Tooltip/>
                                </LineChart>
                            </ResponsiveContainer>
                        </Grid>
                    </Paper>
                </Grid>
                <Grid item sm={12} lg={6}>
                    <Paper elevation={5}>
                        <Typography variant="h4">Food type repartition</Typography>
                        <Divider variant="middle"/>
                        <Grid container height={400}>
                            <ResponsiveContainer width="100%" height="100%">
                                <PieChart>
                                    <Pie
                                        dataKey="value"
                                        isAnimationActive={false}
                                        data={data01}
                                        cx="50%"
                                        cy="50%"
                                        outerRadius={80}
                                        fill="#8884d8"
                                        label
                                    />
                                    <Tooltip/>
                                </PieChart>
                            </ResponsiveContainer>
                        </Grid>
                    </Paper>
                </Grid>
            </Grid>
        </>
    )
}

export default Home;