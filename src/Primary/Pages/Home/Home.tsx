import React, {useEffect, useState} from 'react';
import {
    Avatar,
    Box, Divider,
    Grid, List,
    ListItem,
    Paper,
    Typography
} from "@mui/material";
import {data01, dataWeightGraph, profilesData} from "../../../Secondary/InMemory/data";
import {LineChart, Line, CartesianGrid, XAxis, YAxis, Tooltip, Pie, PieChart, ResponsiveContainer} from 'recharts';
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
        <div>
            {/*<HomeHeader/>*/}
            <Box sx={{flexGrow: 1, margin: "15px 10px 10px 10px"}}>
                <Grid container spacing={1}>
                    <Grid item xs={6} md={6}>
                        <Paper sx={{height: "45vh", overflow: "auto"}}>
                            <Typography variant="h4" sx={{paddingLeft: "10px"}}>My profile</Typography>
                            <Divider variant="middle"/>
                            <Box sx={{display: "flex", alignItems: "center", padding: "8px"}}>
                                <PersonIcon sx={{marginRight: "7px"}}/>
                                <TextValueField label="Name"
                                                value={`${loggedProfile?.name} ${loggedProfile?.firstName}`}/>
                            </Box>
                            <Divider variant="middle"/>
                            <Box sx={{display: "flex", alignItems: "center", padding: "6px"}}>
                                <CakeIcon sx={{marginRight: "7px"}}/>
                                <TextValueField label="Birth date"
                                                value={moment(loggedProfile?.dateOfBirth).format("DD/MM/YYYY")}/>
                            </Box>
                            <Box sx={{display: "flex", alignItems: "center", padding: "6px"}}>
                                <HeightIcon sx={{marginRight: "7px"}}/>
                                <TextValueField label="Height" value={loggedProfile?.height}/>
                            </Box>
                            <Box sx={{display: "flex", alignItems: "center", padding: "6px"}}>
                                <MonitorWeightIcon sx={{marginRight: "7px"}}/>
                                <TextValueField label="Weight" value={loggedProfile?.weight}/>
                            </Box>
                            <Box sx={{display: "flex", alignItems: "center", padding: "6px"}}>
                                <CalendarMonthIcon sx={{marginRight: "7px"}}/>
                                <TextValueField label="Creation date"
                                                value={moment(loggedProfile?.creationDate).format("DD/MM/YYYY")}/>
                            </Box>
                            <Box sx={{display: "flex", alignItems: "center", padding: "8px"}}>
                                <PersonIcon sx={{marginRight: "7px"}}/>
                                <TextValueField label="Sexe"
                                                value={loggedProfile?.sexe.label}/>
                            </Box>
                            <Box sx={{display: "flex", alignItems: "center", padding: "6px"}}>
                                <LocalDiningIcon sx={{marginRight: "7px"}}/>
                                <TextValueField label="Diet" value={loggedProfile?.foodPreference.label}/>
                            </Box>
                            <Box sx={{display: "flex", alignItems: "center", padding: "6px"}}>
                                <FlagIcon sx={{marginRight: "7px"}}/>
                                <TextValueField label="Weight objective" value={loggedProfile?.weight}/>
                            </Box>
                        </Paper>
                    </Grid>
                    <Grid item xs={6} md={6}>
                        <Paper sx={{height: "45vh", overflow: "auto"}}>
                            <Box sx={{display: "flex", justifyContent: "space-between", alignItems: "center"}}>
                                <Typography variant="h4" sx={{paddingLeft: "10px"}}>Last meals</Typography>
                                <Box sx={{display: "flex", alignItems: "center"}}>
                                    <Typography color="text.primary" variant="h5" sx={{paddingRight: "10px"}}>Total
                                        :</Typography>
                                    <Typography color="secondary" variant="h5" sx={{paddingRight: "10px"}}>3500
                                        calories</Typography>
                                </Box>
                            </Box>
                            <Divider variant="middle"/>
                            <List sx={{width: '100%'}}>
                                {allMeals.map((meal: Meal) => {
                                    return (
                                        <>
                                            <ListItem key={meal.id} sx={{
                                                display: "flex",
                                                justifyContent: "space-between",
                                                alignItems: "center"
                                            }}>
                                                <Box sx={{
                                                    display: "flex",
                                                    flexDirection: "column",
                                                    alignItems: "flex-start"
                                                }}>
                                                    <TextValueField label={"Title"}
                                                                    value={meal.label || ""}/>
                                                    <TextValueField label={"Meal type"}
                                                                    value={meal.mealType?.label || ""}/>
                                                </Box>
                                                <TextValueField label={"Total"} value={300}/>
                                            </ListItem>
                                            <Divider/>
                                        </>
                                    )
                                })}
                            </List>
                        </Paper>
                    </Grid>
                    <Grid item xs={6} md={6}>
                        <Paper sx={{height: "45vh", width: "100%"}}>
                            <Typography variant="h4" sx={{paddingLeft: "10px"}}>Weight evolution</Typography>
                            <Divider variant="middle"/>
                            <ResponsiveContainer width="95%" height="87%">
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
                    <Grid item xs={6} md={6}>
                        <Paper sx={{height: "45vh", width: "100%"}}>
                            <Typography variant="h4" sx={{paddingLeft: "10px"}}>Food type repartition</Typography>
                            <Divider variant="middle"/>
                            <ResponsiveContainer width="100%" height="90%">
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
                        </Paper>
                    </Grid>
                </Grid>
            </Box>
            <Paper>
            </Paper>
        </div>
    )
}

export default Home;