import * as React from 'react';
import {useEffect, useState} from 'react';
import Button from '@mui/material/Button';
import {Divider, Grid, List, ListItem, ListItemIcon, Paper, Typography} from "@mui/material";
import FolderIcon from '@mui/icons-material/Folder';
import AddCircleIcon from '@mui/icons-material/AddCircle';
import {Aliment} from "../../../Corelogic/Models/Aliment";
import TextValueField from "../../Utils/TextValueField";
import SearchBar from "../../Utils/SearchBar";

interface MealAdderInterface {
    onConfirmClick: () => void
}

export default function MealAdder(props: MealAdderInterface) {
    const {onConfirmClick} = props
    const [searchQuery, setSearchQuery] = useState("")
    const [allAliments, setAllAliments] = useState<Aliment[]>()

    useEffect(() => {
        fetch('http://localhost:3001/aliments')
            .then((res) => res.json())
            .then((result) => {
                // we received our list of allMeals
                console.log(result)
                setAllAliments(result)
            })
    }, [])

    const handleChangeSearchBar = (value: string) => {
        setSearchQuery(value)
        console.log(value)
    }

    const handleAddAliment = (aliment: Aliment) => {
        console.log(aliment)
    }

    const handleConfirmClick = () => {
        onConfirmClick()
    }

    return (
        <>
            <Grid container spacing={2} p={3}>
                <Grid item lg={8}>
                    <Paper elevation={5}>
                        <SearchBar onSearchQuery={handleChangeSearchBar}/>
                        <List sx={{width: '100%'}}>
                            {allAliments?.map((aliment, index) => {
                                return (
                                    <>
                                        <ListItem key={aliment.id} divider={index < allAliments.length - 1}>
                                            <ListItemIcon>
                                                <FolderIcon/>
                                            </ListItemIcon>
                                            <Grid container direction="column">
                                                <TextValueField label={"Title"}
                                                                value={aliment.label || ""}/>
                                                <TextValueField label={"Meal type"}
                                                                value={aliment.weight + " grammes" + " - " + aliment.caloriesPerWeight + " calories"}/>
                                            </Grid>
                                            <Button variant="contained">
                                                <AddCircleIcon sx={{marginRight: "10px"}}
                                                               onClick={() => handleAddAliment(aliment)}/>
                                                <Typography>Add</Typography>
                                            </Button>
                                        </ListItem>
                                    </>
                                )
                            })}
                        </List>
                    </Paper>
                </Grid>
                <Grid item lg={4}>
                    <Paper elevation={5} sx={{height: "100%"}}>
                        <Grid container direction="column" alignItems="center">
                            <Grid item>
                                <Typography>Résumé des aliments ajoutés</Typography>
                                <Divider variant="middle"/>
                            </Grid>
                            <Grid item>
                                <Divider variant="middle"/>
                            </Grid>
                            <Grid item>
                                <Button variant="contained" onClick={handleConfirmClick}>Confirmer</Button>
                            </Grid>
                        </Grid>
                    </Paper>
                </Grid>
            </Grid>
        </>

    )
}