import React from 'react';
import {Divider, Paper, Typography} from "@mui/material";
import StatsHeader from "./StatsHeader";
import {
    Area,
    AreaChart,
    Bar,
    BarChart,
    CartesianGrid,
    Legend,
    Line,
    LineChart,
    Pie,
    PieChart,
    ResponsiveContainer,
    Tooltip,
    XAxis,
    YAxis
} from "recharts";
import {data, data01, dataWeightGraph} from "../../../Secondary/InMemory/data";
import Grid from '@mui/material/Grid';

const StatsPage = () => {
    return (
        <>
            <Grid container direction="column">
                <Grid item container>
                    <StatsHeader/>
                </Grid>
                <Grid item container spacing={2} p={3}>
                    <Grid item md={6}>
                        <Paper sx={{height: "400px"}}>
                            <Typography variant="h4" sx={{paddingLeft: "10px"}}>Stat 1</Typography>
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
                    <Grid item md={6}>
                        <Paper sx={{height: "400px"}}>
                            <Typography variant="h4" sx={{paddingLeft: "10px"}}>Stat 2</Typography>
                            <Divider variant="middle"/>
                            <ResponsiveContainer width="95%" height="90%">
                                <AreaChart
                                    width={500}
                                    height={400}
                                    data={data}
                                    margin={{
                                        top: 10,
                                        right: 30,
                                        left: 0,
                                        bottom: 0,
                                    }}
                                >
                                    <CartesianGrid strokeDasharray="3 3"/>
                                    <XAxis dataKey="name"/>
                                    <YAxis/>
                                    <Tooltip/>
                                    <Area type="monotone" dataKey="uv" stroke="#8884d8" fill="#8884d8"/>
                                </AreaChart>
                            </ResponsiveContainer>
                        </Paper>
                    </Grid>
                    <Grid item md={6}>
                        <Paper sx={{height: "400px"}}>
                            <Typography variant="h4">Stat 3</Typography>
                            <Divider variant="middle"/>
                            <ResponsiveContainer width="95%" height="90%">
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
                    <Grid item md={6}>
                        <Paper sx={{height: "400px"}}>
                            <Typography variant="h4" sx={{paddingLeft: "10px"}}>Stat 4</Typography>
                            <Divider variant="middle"/>
                            <ResponsiveContainer width="95%" height="90%">
                                <BarChart
                                    width={750}
                                    height={300}
                                    data={data}
                                    margin={{
                                        top: 5,
                                        right: 30,
                                        left: 20,
                                        bottom: 5,
                                    }}
                                >
                                    <CartesianGrid strokeDasharray="3 3"/>
                                    <XAxis dataKey="name"/>
                                    <YAxis/>
                                    <Tooltip/>
                                    <Legend/>
                                    <Bar dataKey="pv" fill="#8884d8"/>
                                    <Bar dataKey="uv" fill="#82ca9d"/>
                                </BarChart>
                            </ResponsiveContainer>
                        </Paper>
                    </Grid>
                </Grid>
            </Grid>
        </>
    );
};

export default StatsPage;