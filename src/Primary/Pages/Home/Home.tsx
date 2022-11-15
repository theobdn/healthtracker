import React from 'react';
import {
    Accordion,
    AccordionDetails,
    AccordionSummary, Avatar,
    Box, Divider,
    Grid,
    ListItem, ListItemAvatar,
    ListItemButton, ListItemIcon, ListItemText,
    Paper,
    Typography
} from "@mui/material";
import HomeHeader from "./HomeHeader";
import {dataWeightGraph, profilesData} from "../../../Secondary/InMemory/data";
import { FixedSizeList, ListChildComponentProps } from 'react-window';
import {LineChart, Line, CartesianGrid, XAxis, YAxis, Tooltip} from 'recharts';
import MonitorWeightIcon from '@mui/icons-material/MonitorWeight';
import LocalDiningIcon from '@mui/icons-material/LocalDining';
import HeightIcon from '@mui/icons-material/Height';
import CakeIcon from '@mui/icons-material/Cake';
import CalendarMonthIcon from '@mui/icons-material/CalendarMonth';
import PersonIcon from '@mui/icons-material/Person';
import FlagIcon from '@mui/icons-material/Flag';
import moment from "moment";

const Home = () => {
    const moment = require('moment');
    const profile = profilesData[0]
    const [expanded, setExpanded] = React.useState<string | false>('panel1')
    const dataAccordeon = [
        {
            id: 1,
            panel: "panel1",
            mealType: "Yesterday Morning",
            calories: 300,
            content: "Lorem ipsum dolor sit amet, consectetur adipiscing elit. Suspendisse\n" +
                "malesuada lacus ex, sit amet blandit leo lobortis eget. Lorem ipsum dolor\n" +
                "sit amet, consectetur adipiscing elit. Suspendisse malesuada lacus ex,\n" +
                "sit amet blandit leo lobortis eget."
        },
        {
            id: 2,
            panel: "panel2",
            mealType: "Yesterday Afternoon",
            calories: 1500,
            content: "Lorem ipsum dolor sit amet, consectetur adipiscing elit. Suspendisse\n" +
                "malesuada lacus ex, sit amet blandit leo lobortis eget. Lorem ipsum dolor\n" +
                "sit amet, consectetur adipiscing elit. Suspendisse malesuada lacus ex,\n" +
                "sit amet blandit leo lobortis eget."
        },
        {
            id: 3,
            panel: "panel3",
            mealType: "Yesterday Night",
            calories: 1200,
            content: "Lorem ipsum dolor sit amet, consectetur adipiscing elit. Suspendisse\n" +
                "malesuada lacus ex, sit amet blandit leo lobortis eget. Lorem ipsum dolor\n" +
                "sit amet, consectetur adipiscing elit. Suspendisse malesuada lacus ex,\n" +
                "sit amet blandit leo lobortis eget."
        }
    ]

    const handleChange = (panel: string) => (event: React.SyntheticEvent, newExpanded: boolean) => {
            setExpanded(newExpanded ? panel : false)
    }

    const renderRow = (props: ListChildComponentProps) => {
        const { index, style } = props

        return (
            <ListItem style={style} key={index} component="div" disablePadding>
                <ListItemButton>
                    <ListItemAvatar>
                        <Avatar alt="Remy Sharp" src="logo192.png" />
                    </ListItemAvatar>
                    <ListItemText primary={`Item ${index + 1}`} secondary="lorem ipsum"/>
                </ListItemButton>
            </ListItem>
        )
    }


    return (
        <div>
            {/*<HomeHeader/>*/}
                <Box sx={{ flexGrow: 1, padding: "15px" }}>
                    <Grid container spacing={2}>
                        <Grid item xs={7}>
                            <Paper>
                                <Box sx={{display: "flex", justifyContent: "space-between", alignItems: "center"}}>
                                    <Typography variant="h4" sx={{paddingLeft: "10px"}}>My last day</Typography>
                                    <Typography color="secondary" variant="h5" sx={{paddingRight: "10px"}}>3500 calories</Typography>
                                </Box>
                                <Divider variant="middle"/>
                                {dataAccordeon.map((x) =>
                                    {
                                        return (
                                            <Accordion expanded={expanded === x.panel} onChange={handleChange(x.panel)} sx={{margin: "5px, 10px, 5px, 10px"}}>
                                                <AccordionSummary>
                                                        <Typography sx={{marginRight: "2.5px"}}>{x.mealType} :</Typography>
                                                        <Typography color="secondary" sx={{marginLeft: "2.5px"}}>{x.calories} calories</Typography>
                                                </AccordionSummary>
                                                <AccordionDetails>
                                                    <Typography color="text.secondary">
                                                        {x.content}
                                                    </Typography>
                                                </AccordionDetails>
                                            </Accordion>
                                        )
                                    }
                                )}
                            </Paper>
                        </Grid>
                        <Grid item xs={5}>
                            <Paper>
                                <Typography variant="h4" sx={{paddingLeft: "10px"}}>My weight</Typography>
                                <Divider variant="middle"/>
                                <LineChart width={600} height={285} data={dataWeightGraph}>
                                    <Line type="monotone" dataKey="kg" stroke="#8884d8" />
                                    <CartesianGrid stroke="#ccc" />
                                    <XAxis dataKey="name" />
                                    <YAxis />
                                    <Tooltip />
                                </LineChart>
                            </Paper>
                        </Grid>
                        <Grid item xs={4}>
                            <Paper>
                                <Typography variant="h4" sx={{paddingLeft: "10px"}}>My profile</Typography>
                                <Divider variant="middle"/>
                                <Box sx={{display: "flex", alignItems: "center", padding: "8px"}}>
                                    <PersonIcon sx={{marginRight: "7px"}}/>
                                    <Typography variant="h5" sx={{marginRight: "5px"}}>{profile.firstName}</Typography>
                                    <Typography variant="h5" sx={{marginLeft: "5px"}}>{profile.name}</Typography>
                                </Box>
                                <Divider variant="middle"/>
                                <Box sx={{display: "flex", alignItems: "center", padding: "6px"}}>
                                    <CakeIcon sx={{marginRight: "7px"}}/>
                                    <Typography sx={{marginRight: "2.5px"}}>
                                        Date de naissance :
                                    </Typography>
                                    <Typography color="secondary" sx={{marginLeft: "2.5px"}}>
                                        {profile.dateOfBirth.toDateString()} -
                                    </Typography>
                                    <Typography color="secondary" sx={{marginLeft: "2.5px"}}>
                                        - ({moment(profile.dateOfBirth).toNow(true)})
                                    </Typography>
                                </Box>
                                <Box sx={{display: "flex", alignItems: "center", padding: "6px"}}>
                                    <HeightIcon  sx={{marginRight: "7px"}}/>
                                    <Typography sx={{marginRight: "2.5px"}}>
                                        Taille :
                                    </Typography>
                                    <Typography color="secondary" sx={{marginLeft: "2.5px"}}>
                                        {profile.height} cm
                                    </Typography>
                                </Box>
                                <Box sx={{display: "flex", alignItems: "center", padding: "6px"}}>
                                    <MonitorWeightIcon  sx={{marginRight: "7px"}}/>
                                    <Typography sx={{marginRight: "2.5px"}}>
                                        Poids actuel :
                                    </Typography>
                                    <Typography color="secondary" sx={{marginLeft: "2.5px"}}>
                                        {profile.weight} kg
                                    </Typography>
                                </Box>
                                <Box sx={{display: "flex", alignItems: "center", padding: "6px"}}>
                                    <CalendarMonthIcon  sx={{marginRight: "7px"}}/>
                                    <Typography sx={{marginRight: "2.5px"}}>
                                        Date de création du profil :
                                    </Typography>
                                    <Typography color="secondary" sx={{marginLeft: "2.5px"}}>
                                        {profile.creationDate.toDateString()} -
                                    </Typography>
                                    <Typography color="secondary" sx={{marginLeft: "2.5px"}}>
                                        - ({moment(profile.creationDate).toNow(true)})
                                    </Typography>
                                </Box>
                                <Box sx={{display: "flex", alignItems: "center", padding: "6px"}}>
                                    <LocalDiningIcon  sx={{marginRight: "7px"}}/>
                                    <Typography sx={{marginRight: "2.5px"}}>
                                        Régime alimentaire :
                                    </Typography>
                                    <Typography color="secondary" sx={{marginLeft: "2.5px"}}>
                                        {profile.foodPreference.label}
                                    </Typography>
                                </Box>
                                <Box sx={{display: "flex", alignItems: "center", padding: "6px"}}>
                                    <FlagIcon  sx={{marginRight: "7px"}}/>
                                    <Typography sx={{marginRight: "2.5px"}}>
                                        Objectif de poids :
                                    </Typography>
                                    <Typography color="secondary" sx={{marginLeft: "2.5px"}}>
                                        {profile.weight} kg
                                    </Typography>
                                </Box>
                            </Paper>
                        </Grid>
                        <Grid item xs={8}>
                            <Paper>
                                <Typography variant="h4" sx={{paddingLeft: "10px"}}>My favorite meals</Typography>
                                <Divider variant="middle"/>
                                <Box
                                    sx={{ width: '100%', height: 270, maxWidth: 1000, bgcolor: 'background.paper' }}
                                >
                                    <FixedSizeList
                                        height={270}
                                        width={980}
                                        itemSize={60}
                                        itemCount={20}
                                        overscanCount={5}
                                    >
                                        {renderRow}
                                    </FixedSizeList>
                                </Box>
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