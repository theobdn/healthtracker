import * as React from 'react';
import {useState} from 'react';
import Button from '@mui/material/Button';
import {Alert, CircularProgress, Divider, Grid, List, ListItem, ListItemText, Paper, Typography} from "@mui/material";
import {Aliment} from "../../../Corelogic/Models/Aliment";
import SearchBar from "../../Utils/SearchBar";
import {searchFood} from "../../../Secondary/Api/AxiosRequests/ApiCaloriesNinjaRequests";
import TextValueField from "../../Utils/TextValueField";
import IconButton from '@mui/material/IconButton';
import DeleteIcon from '@mui/icons-material/Delete';

interface MealAdderInterface {
    onConfirmClick: () => void
}

export default function MealAdder(props: MealAdderInterface) {
    const {onConfirmClick} = props
    const [searchQuery, setSearchQuery] = useState("banana")
    const [errorFindingFood, setErrorFindingFood] = useState(false)
    const [loading, setLoading] = useState(false)
    const [allAliments, setAllAliments] = useState<Aliment[]>([])
    const [alimentResult, setAlimentResult] = useState<Aliment>()
    const [totalCalorie, setTotalCalorie] = useState(0)
    const jwtToken = localStorage.getItem('HealthTrackerJWT')

    const handleChangeSearchBar = (value: string) => {
        setSearchQuery(value)
    }

    const handleConfirmSearchInput = () => {
        setLoading(true)
        searchFood(searchQuery, jwtToken)
            .then(function (response) {
                setErrorFindingFood(false)
                setAlimentResult(response.data)
                setLoading(false)
            })
            .catch(function (error) {
                setErrorFindingFood(true)
                setLoading(false)
            })
    }

    const calculateTotalCalories = (): number => {
        let tempTotalCalories = 0
        allAliments.forEach((item) => {
            tempTotalCalories += item.calories
        })
        setTotalCalorie(tempTotalCalories)
        return tempTotalCalories
    }

    const handleAddAliment = () => {
        if (alimentResult) {
            setAllAliments([...allAliments, alimentResult])
            setTotalCalorie(totalCalorie + alimentResult.calories)
        }
    }

    const handleConfirmClick = () => {
        onConfirmClick()
    }

    const handleDeleteAliment = (index: number) => {
        allAliments.splice(index, 1)
        calculateTotalCalories()
    }

    return (
        <>
            <Grid container spacing={2}>
                <Grid item lg={8} md={12}>
                    <Paper elevation={5}>
                        <Grid container direction="column" spacing={2} alignItems="center">
                            <Grid item>
                                <Typography>Add aliments</Typography>
                            </Grid>
                            <Grid item>
                                <Grid container spacing={2} p={1} alignItems="center" justifyContent="center">
                                    <Grid item lg={10}>
                                        <SearchBar placeholder="Search an aliment (ex: chicken, pork, rice...)"
                                                   onSearchQuery={handleChangeSearchBar}/>
                                    </Grid>
                                    <Grid item lg={2}>
                                        <Button variant="contained" onClick={handleConfirmSearchInput}>Search</Button>
                                    </Grid>
                                </Grid>
                            </Grid>
                            <Grid item>
                                <Paper elevation={5} sx={{mb: 2}}>
                                    {loading &&
                                        <Grid container spacing={1} p={3} justifyContent="center">
                                            <CircularProgress/>
                                        </Grid>
                                    }
                                    {alimentResult && !loading && !errorFindingFood &&
                                        <>
                                            <Grid container direction="column" spacing={1} p={3}>
                                                <Grid item>
                                                    <TextValueField label="Name" value={alimentResult.name || ""}/>
                                                </Grid>
                                                <Grid item>
                                                    <TextValueField label="Par portion de (en gramme)"
                                                                    value={alimentResult.serving_size_g || ""}/>
                                                </Grid>
                                                <Grid item>
                                                    <TextValueField label="Calories"
                                                                    value={alimentResult.calories || ""}/>
                                                </Grid>
                                                <Grid item>
                                                    <TextValueField label="Protéine (par gramme)"
                                                                    value={alimentResult.protein_g || ""}/>
                                                </Grid>
                                                <Grid item>
                                                    <TextValueField label="Fibre (par gramme)"
                                                                    value={alimentResult.fiber_g || ""}/>
                                                </Grid>
                                                <Grid item>
                                                    <TextValueField label="Sucre (par gramme)"
                                                                    value={alimentResult.sugar_g || ""}/>
                                                </Grid>
                                                <Grid item>
                                                    <TextValueField label="Graisse total (par gramme)"
                                                                    value={alimentResult.fat_total_g || ""}/>
                                                </Grid>
                                                <Grid item>
                                                    <TextValueField label="Carbohydrate total (en gramme)"
                                                                    value={alimentResult.carbohydrates_total_g || ""}/>
                                                </Grid>
                                                <Grid item>
                                                    <TextValueField label="Cholesterol (en mg)"
                                                                    value={alimentResult.cholesterol_mg || ""}/>
                                                </Grid>
                                                <Grid item>
                                                    <TextValueField label="Graisse saturée (par gramme)"
                                                                    value={alimentResult.fat_saturated_g || ""}/>
                                                </Grid>
                                                <Grid item>
                                                    <TextValueField label="Potassium (par mg)"
                                                                    value={alimentResult.potassium_mg || ""}/>
                                                </Grid>
                                                <Grid item>
                                                    <TextValueField label="Sodium (par mg)"
                                                                    value={alimentResult.sodium_mg || ""}/>
                                                </Grid>
                                                <Grid item>
                                                    <Button variant="contained"
                                                            onClick={handleAddAliment}>Ajouter</Button>
                                                </Grid>
                                            </Grid>
                                        </>
                                    }
                                    {errorFindingFood && !loading &&
                                        <Grid item p={3}>
                                            <Alert severity="warning">
                                                No food found for your research, please try again !
                                            </Alert>
                                        </Grid>
                                    }
                                </Paper>
                            </Grid>
                        </Grid>
                    </Paper>
                </Grid>
                <Grid item lg={4} md={12}>
                    <Paper elevation={5} sx={{minHeight: "100%", mb: 2}}>
                        <Grid container direction="column" alignItems="center" spacing={2}>
                            <Grid item>
                                <Typography>Added aliments</Typography>
                            </Grid>
                            <Grid item>
                                <Divider variant="middle"/>
                            </Grid>
                            <Grid item pb={1}>
                                <TextValueField label="Total calorie" value={totalCalorie}/>
                            </Grid>
                            <Grid item>
                                <List dense>
                                    {allAliments.map((aliment, index) => {
                                        return (
                                            <ListItem key={index} secondaryAction={
                                                <IconButton edge="end" aria-label="comments">
                                                    <DeleteIcon onClick={() => handleDeleteAliment(index)}
                                                                sx={{fill: "#f50057"}}/>
                                                </IconButton>
                                            }>
                                                <ListItemText
                                                    primary={aliment.name}
                                                    secondary={aliment.calories + " calories"}
                                                />
                                            </ListItem>
                                        )
                                    })}
                                </List>
                            </Grid>
                            <Grid item pb={1}>
                                <Button variant="contained" onClick={handleConfirmClick}>Confirmer</Button>
                            </Grid>
                        </Grid>
                    </Paper>
                </Grid>
            </Grid>
        </>

    )
}