import React, {useEffect, useState} from 'react';
import {Box, Paper, Step, StepLabel, Stepper, Typography} from "@mui/material";
import MealAdder from "./MealAdder";
import MealPicker from "./MealPicker";
import JournalHeader from "./JournalHeader";

const JournalPage = () => {
    const steps = ['Choisir un type de repas', 'Choisir les aliments', 'Validation du repas']
    const [activeStep, setActiveStep] = useState(0)
    const [skipped, setSkipped] = useState(new Set<number>())
    const [disableHeaderButton, setDisableHeaderButton] = useState(false)
    const [mealId, setMealId] = useState<number | undefined>(undefined)

    useEffect(() => {
        if (activeStep === 0) {
            setDisableHeaderButton(true)
        } else {
            setDisableHeaderButton(false)
        }
    }, [activeStep])

    const isStepSkipped = (step: number) => {
        return skipped.has(step);
    }

    const handleNext = () => {
        let newSkipped = skipped;
        if (isStepSkipped(activeStep)) {
            newSkipped = new Set(newSkipped.values());
            newSkipped.delete(activeStep);
        }

        setActiveStep((prevActiveStep) => prevActiveStep + 1);
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
            <JournalHeader onButtonClick={handleBack} disableHeaderButton={disableHeaderButton}/>
            <Box sx={{width: '100%'}}>
                <Box sx={{margin: "10px"}}>
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
                </Box>
                {activeStep === 0 &&
                    <MealPicker onMealPick={handleGetMealPick}/>
                }
                {activeStep === 1 &&
                    <MealAdder onConfirmClick={handleConfirmAlimentsAddition}/>
                }
                {activeStep === 2 && (
                    <Box>
                        <Paper sx={{margin: "10px", padding: "10px"}}>
                            <Box sx={{display: "flex", alignItems: "center"}}>
                                <Typography>
                                    Your meal recap
                                </Typography>
                            </Box>
                        </Paper>
                    </Box>
                )}
            </Box>
        </>
    )
}

export default JournalPage;