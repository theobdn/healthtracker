import React from 'react';
import Box from "@mui/material/Box";
import {Grid, Typography} from '@mui/material';

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
        <>
            <Grid container height="100%" alignItems="center">
                <Grid item xs={12} lg={6}>
                    <Box onClick={() => handleMealPicked(1)}
                         sx={{
                             cursor: "pointer", position: "relative", margin: "10px", borderRadius: "10px",
                             border: "3px solid #4dabf5", height: "35vh"
                         }}>
                        <img src="/petitDejeuner.jpg" alt="Petit déjeuner"
                             style={{
                                 width: "100%",
                                 height: "100%",
                                 backgroundSize: "cover",
                                 objectFit: "cover",
                                 borderRadius: "10px"
                             }}/>
                        <Typography variant="h3" color="text.primary"
                                    sx={{
                                        width: "100%",
                                        textAlign: "center",
                                        position: "absolute",
                                        top: "50%",
                                        left: "50%",
                                        transform: "translate(-50%, -50%)",
                                        background: "black"
                                    }}>PETIT
                            DEJEUNER</Typography>
                    </Box>
                </Grid>
                <Grid item xs={12} lg={6}>
                    <Box onClick={() => handleMealPicked(2)}
                         sx={{
                             cursor: "pointer",
                             position: "relative",
                             margin: "10px",
                             border: "3px solid #4dabf5",
                             borderRadius: "10px",
                             height: "35vh"
                         }}>
                        <img src="/dejeuner.jpg" alt="Déjeuner"
                             style={{
                                 width: "100%",
                                 height: "100%",
                                 backgroundSize: "cover",
                                 objectFit: "cover",
                                 borderRadius: "10px",
                                 background: "black"
                             }}/>
                        <Typography variant="h3" color="text.primary" sx={{
                            width: "100%",
                            textAlign: "center",
                            position: "absolute",
                            top: "50%",
                            left: "50%",
                            transform: "translate(-50%, -50%)",
                            background: "black"
                        }}>
                            DEJEUNER</Typography>
                    </Box>
                </Grid>
                <Grid item xs={12} lg={6}>
                    <Box onClick={() => handleMealPicked(3)}
                         sx={{
                             cursor: "pointer",
                             position: "relative",
                             margin: "10px",
                             border: "3px solid #4dabf5",
                             borderRadius: "10px",
                             height: "35vh"
                         }}>
                        <img src="/diner.jpg" alt="Diner"
                             style={{
                                 width: "100%", height: "100%", backgroundSize: "cover", objectFit: "cover",
                                 borderRadius: "10px"
                             }}/>
                        <Typography variant="h3" color="text.primary" sx={{
                            width: "100%",
                            textAlign: "center",
                            position: "absolute",
                            top: "50%",
                            left: "50%",
                            transform: "translate(-50%, -50%)",
                            background: "black"
                        }}>
                            DINER</Typography>
                    </Box>
                </Grid>
                <Grid item xs={12} lg={6}>
                    <Box onClick={() => handleMealPicked(4)}
                         sx={{
                             cursor: "pointer",
                             position: "relative",
                             margin: "10px",
                             border: "3px solid #4dabf5",
                             borderRadius: "10px",
                             height: "35vh"
                         }}>
                        <img src="/snack.jpg" alt="Snack"
                             style={{
                                 width: "100%", height: "100%", backgroundSize: "cover", objectFit: "cover",
                                 borderRadius: "10px",
                             }}/>
                        <Typography variant="h3" color="text.primary" sx={{
                            width: "100%",
                            textAlign: "center",
                            position: "absolute",
                            top: "50%",
                            left: "50%",
                            transform: "translate(-50%, -50%)",
                            background: "black"
                        }}>
                            SNACK</Typography>
                    </Box>
                </Grid>
            </Grid>
        </>
    );
};

export default MealPicker;