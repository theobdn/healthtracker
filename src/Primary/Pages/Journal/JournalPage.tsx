import React, {useState} from 'react';
import {
    Box,
    Button, Grid,
    Paper,
    Step,
    StepLabel,
    Stepper, TextField,
    Typography
} from "@mui/material";
import MealPicker from "./MealPicker";
import AlimentAdder from "./AlimentAdder";

const JournalPage = () => {
    const steps = ['Choisir un type de repas', 'Choisir les aliments', 'Validation du repas']
    const [activeStep, setActiveStep] = useState(0)
    const [skipped, setSkipped] = useState(new Set<number>())
    const [mealId, setMealId] = useState<number | undefined>(undefined)

    const isStepSkipped = (step: number) => {
        return skipped.has(step)
    }

    const handleNext = () => {
        let newSkipped = skipped
        if (isStepSkipped(activeStep)) {
            newSkipped = new Set(newSkipped.values())
            newSkipped.delete(activeStep)
        }

        setActiveStep((prevActiveStep) => prevActiveStep + 1)
        setSkipped(newSkipped)
    }

    const handleBack = () => {
        setActiveStep((prevActiveStep) => prevActiveStep - 1)
    }

    const handleGetMealPick = (mealId: number) => {
        setMealId(mealId)

        if (mealId) {
            handleNext()
        }
    }

    const handleConfirmAlimentsAddition = () => {
        handleNext()
    }

    return (
        <>
            <Grid container alignItems="center" direction="column">
                <Grid item container>
                    <Paper sx={{marginTop: "10px", p: 3, width: "100%"}}>
                        <Stepper activeStep={activeStep}>
                            {steps.map((label, index) => {
                                const stepProps: { completed?: boolean } = {}
                                const labelProps: {
                                    optional?: React.ReactNode
                                } = {}
                                if (isStepSkipped(index)) {
                                    stepProps.completed = false
                                }
                                return (
                                    <Step key={label} {...stepProps}>
                                        <StepLabel {...labelProps}>{label}</StepLabel>
                                    </Step>
                                )
                            })}
                        </Stepper>
                    </Paper>
                </Grid>
                {activeStep === 0 &&
                    <Grid item container p={3}>
                        <Paper sx={{p: 3, width: "100%"}}>
                            <MealPicker onMealPick={handleGetMealPick}/>
                        </Paper>
                    </Grid>
                }
                {activeStep === 1 &&
                    <Grid item container p={3}>
                        <AlimentAdder/>
                    </Grid>
                }
                {activeStep === 2 && (
                    <Box>
                        <Paper sx={{margin: "10px", padding: "10px"}}>
                            <Box sx={{display: "flex", alignItems: "center"}}>
                                <Button variant="outlined" onClick={handleBack}>Previous step</Button>
                                <Typography>
                                    Your meal recap
                                </Typography>
                            </Box>
                        </Paper>
                    </Box>
                )}
            </Grid>
        </>
    )
}

export default JournalPage;