import React from 'react';
import {Grid, Paper, Typography} from '@mui/material';

interface MealPickerInterface {
    onMealPick: (mealId: number) => void
}

const MealPicker = (props: MealPickerInterface) => {
    const {onMealPick} = props

    const handleMealPicked = (mealId: number) => {
        switch (mealId) {
            case 1 : {
                onMealPick(1)
                break
            }
            case 2 : {
                onMealPick(2)
                break
            }
            case 3 : {
                onMealPick(3)
                break
            }
            case 4 : {
                onMealPick(4)
                break
            }
        }
    }

    return (
        <Paper>
            <Grid container height="80vh" alignItems="center">
                <Grid item sm={12} lg={6} p={2}>
                    <Grid container position="relative" border="2px solid" borderColor="#4dabf5"
                          onClick={() => handleMealPicked(1)}
                          sx={{cursor: "pointer"}}>
                        <img src="/petitDejeuner.jpg" alt="Petit déjeuner"
                             style={{
                                 width: "100%",
                                 height: "300px",
                                 backgroundSize: "cover",
                                 objectFit: "cover"
                             }}/>
                        <Typography variant="h3" component="button" bgcolor="black" color="white"
                                    sx={{
                                        width: "100%",
                                        cursor: "pointer",
                                        textAlign: "center",
                                        position: "absolute",
                                        top: "50%",
                                        left: "50%",
                                        transform: "translate(-50%, -50%)"
                                    }}>PETIT DEJEUNER</Typography>
                    </Grid>
                </Grid>
                <Grid item sm={12} lg={6} p={2}>
                    <Grid container position="relative" border="2px solid" borderColor="#4dabf5"
                          onClick={() => handleMealPicked(2)}
                          sx={{cursor: "pointer"}}>
                        <img src="/dejeuner.jpg" alt="Petit déjeuner"
                             style={{
                                 width: "100%",
                                 height: "300px",
                                 backgroundSize: "cover",
                                 objectFit: "cover"
                             }}/>
                        <Typography variant="h3" component="button" bgcolor="black" color="white"
                                    sx={{
                                        width: "100%",
                                        cursor: "pointer",
                                        textAlign: "center",
                                        position: "absolute",
                                        top: "50%",
                                        left: "50%",
                                        transform: "translate(-50%, -50%)"
                                    }}>DEJEUNER</Typography>
                    </Grid>
                </Grid>
                <Grid item sm={12} lg={6} p={2}>
                    <Grid container position="relative" border="2px solid" borderColor="#4dabf5"
                          onClick={() => handleMealPicked(3)}
                          sx={{cursor: "pointer"}}>
                        <img src="/diner.jpg" alt="Petit déjeuner"
                             style={{
                                 width: "100%",
                                 height: "300px",
                                 backgroundSize: "cover",
                                 objectFit: "cover"
                             }}/>
                        <Typography variant="h3" component="button" bgcolor="black" color="white"
                                    sx={{
                                        width: "100%",
                                        cursor: "pointer",
                                        textAlign: "center",
                                        position: "absolute",
                                        top: "50%",
                                        left: "50%",
                                        transform: "translate(-50%, -50%)"
                                    }}>DINER</Typography>
                    </Grid>
                </Grid>
                <Grid item sm={12} lg={6} p={2}>
                    <Grid container position="relative" border="2px solid" borderColor="#4dabf5"
                          onClick={() => handleMealPicked(4)}
                          sx={{cursor: "pointer"}}>
                        <img src="/snack.jpg" alt="Petit déjeuner"
                             style={{
                                 width: "100%",
                                 height: "300px",
                                 backgroundSize: "cover",
                                 objectFit: "cover"
                             }}/>
                        <Typography variant="h3" component="button" bgcolor="black" color="white"
                                    sx={{
                                        width: "100%",
                                        cursor: "pointer",
                                        textAlign: "center",
                                        position: "absolute",
                                        top: "50%",
                                        left: "50%",
                                        transform: "translate(-50%, -50%)"
                                    }}>SNACK</Typography>
                    </Grid>
                </Grid>
            </Grid>
        </Paper>
    );
};

export default MealPicker;