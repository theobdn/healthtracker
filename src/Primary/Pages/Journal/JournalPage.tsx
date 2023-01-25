import React, {useState} from 'react';
import {
    Box,
    Button,
    Paper,
    Step,
    StepLabel,
    Stepper,
    Typography
} from "@mui/material";
import MaxWidthDialog from "../../Utils/FoodDialog";
import MealPicker from "./MealPicker";
import JournalHeader from "./JournalHeader";

const JournalPage = () => {
    const steps = ['Choisir un type de repas', 'Choisir les aliments', 'Validation du repas']
    const [activeStep, setActiveStep] = useState(0)
    const [skipped, setSkipped] = useState(new Set<number>())
    const [mealId, setMealId] = useState<number | undefined>(undefined)

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
            <JournalHeader/>
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
                    <Paper sx={{
                        marginLeft: "10px",
                        marginRight: "10px",
                        height: "78vh",
                        display: "flex",
                        alignItems: "center"
                    }}>
                        <MealPicker onMealPick={handleGetMealPick}/>
                    </Paper>
                }
                {activeStep === 1 &&
                    <Box>
                        <Paper sx={{margin: "10px"}}>
                            <Typography sx={{m: 2}}>Etape {activeStep + 1} : Choisir les aliments</Typography>
                            <Box sx={{display: "flex", justifyContent: "center", flexDirection: "column"}}>
                                <MaxWidthDialog onConfirmClick={handleConfirmAlimentsAddition}
                                                onPreviousStepClick={handleBack}/>
                            </Box>
                        </Paper>
                    </Box>
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
            </Box>
        </>
    )
}

export default JournalPage;