import * as React from 'react';
import {useEffect, useState} from 'react';
import Button from '@mui/material/Button';
import {Divider, Grid, Paper, Typography} from "@mui/material";
import {Aliment} from "../../../Corelogic/Models/Aliment";
import SearchBar from "../../Utils/SearchBar";
import {searchFood} from "../../../Secondary/Api/AxiosRequests/ApiCaloriesNinjaRequests";
import TextValueField from "../../Utils/TextValueField";

interface MealAdderInterface {
    onConfirmClick: () => void
}

export default function MealAdder(props: MealAdderInterface) {
    const {onConfirmClick} = props
    const [searchQuery, setSearchQuery] = useState("banana")
    const [allAliments, setAllAliments] = useState<Aliment[]>()
    const [alimentResult, setAlimentResult] = useState<Aliment>()
    const jwtToken = localStorage.getItem('HealthTrackerJWT')

    useEffect(() => {
        console.log(alimentResult)
    }, [alimentResult])

    const handleChangeSearchBar = (value: string) => {
        setSearchQuery(value)
        console.log(value)
    }

    const handleConfirmSearchInput = () => {
        searchFood(searchQuery, jwtToken)
            .then(function (response) {
                setAlimentResult(response.data)
                console.log(response.data)
            })
            .catch(function (error) {
                console.log(error)
            })
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
                    <Paper elevation={5} sx={{width: "100%"}}>
                        <Grid container direction="column" spacing={1} p={3}>
                            <Grid item>
                                <Grid container spacing={2} p={1} alignItems="center" justifyContent="center">
                                    <Grid item lg={10}>
                                        <SearchBar onSearchQuery={handleChangeSearchBar}/>
                                    </Grid>
                                    <Grid item lg={2}>
                                        <Button variant="contained" onClick={handleConfirmSearchInput}>Search</Button>
                                    </Grid>
                                </Grid>
                            </Grid>
                            <Grid item>
                                <Paper>
                                    {alimentResult &&
                                        <>
                                            <Grid container direction="column">
                                                <Grid item>
                                                    <TextValueField label="Name" value={alimentResult.name}/>
                                                </Grid>
                                                <Grid item>
                                                    <TextValueField label="Calories" value={alimentResult.calories}/>
                                                </Grid>
                                                <Grid item>
                                                    <TextValueField label="Protéine (par gramme)"
                                                                    value={alimentResult.protein_g}/>
                                                </Grid>
                                                <Grid item>
                                                    <TextValueField label="Fibre (par gramme)"
                                                                    value={alimentResult.fiber_g}/>
                                                </Grid>
                                                <Grid item>
                                                    <TextValueField label="Sucre (par gramme)"
                                                                    value={alimentResult.sugar_g}/>
                                                </Grid>
                                                <Grid item>
                                                    <TextValueField label="Graisse total (par gramme)"
                                                                    value={alimentResult.fat_total_g}/>
                                                </Grid>
                                                <Grid item>
                                                    <TextValueField label="Par portion de (en gramme)"
                                                                    value={alimentResult.serving_size_g}/>
                                                </Grid>
                                                <Grid item>
                                                    <TextValueField label="Carbohydrate total (en gramme)"
                                                                    value={alimentResult.carbohydrates_total_g}/>
                                                </Grid>
                                                <Grid item>
                                                    <TextValueField label="Cholesterol (en mg)"
                                                                    value={alimentResult.cholesterol_mg}/>
                                                </Grid>
                                                <Grid item>
                                                    <TextValueField label="Graisse saturée (par gramme)"
                                                                    value={alimentResult.fat_saturated_g}/>
                                                </Grid>
                                                <Grid item>
                                                    <TextValueField label="Potassium (par mg)"
                                                                    value={alimentResult.potassium_mg}/>
                                                </Grid>
                                                <Grid item>
                                                    <TextValueField label="Sodium (par mg)"
                                                                    value={alimentResult.sodium_mg}/>
                                                </Grid>
                                            </Grid>
                                        </>
                                    }
                                </Paper>
                            </Grid>
                        </Grid>
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