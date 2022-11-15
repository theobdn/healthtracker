import React from 'react';
import {Box, Divider, Paper, Typography} from "@mui/material";
import StatsHeader from "./StatsHeader";
import {
    CartesianGrid,
    Line,
    LineChart,
    PolarAngleAxis,
    PolarGrid, PolarRadiusAxis, Radar,
    ResponsiveContainer,
    Tooltip,
    XAxis,
    YAxis,
    RadarChart, Pie, PieChart, Legend, Bar,
    BarChart
} from "recharts";
import {data, data01, data02, dataNutrimentsGraph, dataWeightGraph} from "../../../Secondary/InMemory/data";
import Grid from '@mui/material/Grid';

const StatsPage = () => {
    return (
        <Box>
            {/*<StatsHeader/>*/}
            <Paper sx={{margin: "10px"}}>
                <Typography variant="h4" sx={{paddingLeft: "10px"}}>My stat 1</Typography>
                <Divider variant="middle"/>
                <LineChart width={1500} height={270} data={dataWeightGraph}>
                    <Line type="monotone" dataKey="kg" stroke="#8884d8" />
                    <CartesianGrid stroke="#ccc" />
                    <XAxis dataKey="name" />
                    <YAxis />
                    <Tooltip />
                </LineChart>
            </Paper>
            <Box sx={{margin: "10px"}}>
                <Grid container spacing={2}>
                    <Grid item xs={6}>
                        <Paper>
                            <Typography variant="h4" sx={{paddingLeft: "10px"}}>My stat 2</Typography>
                            <Divider variant="middle"/>
                            <PieChart width={750} height={300}>
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
                                <Tooltip />
                            </PieChart>
                        </Paper>
                    </Grid>
                    <Grid item xs={6}>
                        <Paper>
                            <Typography variant="h4" sx={{paddingLeft: "10px"}}>My stat 3</Typography>
                            <Divider variant="middle"/>
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
                                <CartesianGrid strokeDasharray="3 3" />
                                <XAxis dataKey="name" />
                                <YAxis />
                                <Tooltip />
                                <Legend />
                                <Bar dataKey="pv" fill="#8884d8" />
                                <Bar dataKey="uv" fill="#82ca9d" />
                            </BarChart>
                        </Paper>
                    </Grid>
                </Grid>
            </Box>
        </Box>
    );
};

export default StatsPage;