import React from 'react';
import {Grid, List, ListItem, ListItemText, Paper} from "@mui/material";
import Typography from "@mui/material/Typography";
import SearchBar from "../../Utils/SearchBar";
import {alimentsData} from "../../../Secondary/InMemory/data";

const AlimentAdder = () => {
    return (
        <Grid container spacing={2}>
            <Grid item lg={8}>
                <Paper sx={{p: 3}}>
                    <Typography variant="h5" textAlign="center">Search something to add aliments</Typography>
                    <Grid container direction="column" spacing={2} p={3}>
                        <Grid item>
                            <SearchBar/>
                        </Grid>
                    </Grid>
                </Paper>
            </Grid>
            <Grid item lg={4}>
                <Paper sx={{p: 3}}>
                    <Typography variant="h5" textAlign="center">Aliments list</Typography>
                    <Grid container>
                        <List>
                            {alimentsData.map(aliment => {
                                return (
                                    <ListItem key={aliment.id}>
                                        <ListItemText>{aliment.code}</ListItemText>
                                        <ListItemText>{aliment.label}</ListItemText>
                                        <ListItemText>{aliment.family?.label}</ListItemText>
                                        <ListItemText>{aliment.weight}</ListItemText>
                                        <ListItemText>{aliment.caloriesPerWeight}</ListItemText>
                                    </ListItem>
                                )
                            })}
                        </List>
                    </Grid>
                </Paper>
            </Grid>
        </Grid>
    );
};

export default AlimentAdder;