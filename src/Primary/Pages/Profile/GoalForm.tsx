import Grid from "@mui/material/Grid";
import { Profile } from "../../../Corelogic/Models/Profile";
import EmojiEventsIcon from '@mui/icons-material/EmojiEvents';
import { Alert, Button, TextField, Typography } from "@mui/material";
import { Controller, SubmitHandler, useForm } from "react-hook-form";
import * as yup from "yup";
import { yupResolver } from "@hookform/resolvers/yup";
import { useEffect, useState } from "react";
import { getGoal, updateGoal } from "../../../Secondary/Api/AxiosRequests/GoalRequests";
import { useDispatch, useSelector } from "react-redux";
import { setGoal } from "../../../Secondary/Redux/Slices/goalSlice";
import { RootState } from "../../../Secondary/Redux/Store/store";

interface GoalFormInterface {
    userLoggedProfile: Profile | null
}

type InputsGoalFormPage = {
    actual_weight: number
    goal_weight: number
    start_weight: number
}

const schemaValidation = yup.object({
    actual_weight: yup.number().required("Please enter your weight").max(300).min(30),
    goal_weight: yup.number().required("Please enter your weight").max(300).min(30),
    start_weight: yup.number().required("Please enter your weight").max(300).min(30),
}).required();


const GoalForm = (props: GoalFormInterface) => {
    const dispatch = useDispatch()
    const goal = useSelector((state: RootState) => state.goal)
    const {userLoggedProfile} = props
    const [goalChangeSuccess, setGoalChangeSuccess] = useState(false)
    const [goalChangeError, setGoalChangeError] = useState(false)

    const onSubmit: SubmitHandler<InputsGoalFormPage> = (data) => {
        console.log(data)
        updateGoal(String(userLoggedProfile?.user_id), data)
            .then(function (response) {
                dispatch(setGoal(response.data))
                setGoalChangeSuccess(true)
                setGoalChangeError(false)
            })
            .catch(function (error){
                setGoalChangeSuccess(false)
                setGoalChangeError(true)
            })
    }

    const {handleSubmit, reset, formState: {errors}, control} = useForm<InputsGoalFormPage>(
        {
            resolver: yupResolver(schemaValidation),
            defaultValues: {
                actual_weight: goal.actual_weight,
                goal_weight: goal.goal_weight,
                start_weight: goal.start_weight,
            }
        }
    )

    useEffect(() => {
        if(userLoggedProfile){
            getGoal(String(userLoggedProfile?.user_id))
                .then(function (response) {
                    console.log(response)
                    dispatch(setGoal(response.data))
                })
                .catch(function (error) {
                    console.log(error);
                })
        } 
    }, [dispatch])


    return (
        <Grid container direction="column">
            <Grid item container p={3}>
                <EmojiEventsIcon />
                <Typography marginLeft={"5px"}>Change your weight goal</Typography>
            </Grid>
            {goalChangeSuccess &&
            <Grid item container justifyContent="center">
                <Alert severity="success">Goal changed</Alert>
            </Grid>}
            {goalChangeError &&
            <Grid item container justifyContent="center">
                <Alert severity="error">Can't change goal</Alert>
            </Grid>}
            <Grid item>
                <form onSubmit={handleSubmit(onSubmit)}>
                <Grid container spacing={4} px={2} py={1}>
                        <Grid item md={4}>
                            <Controller 
                                name="start_weight"
                                control={control}
                                render={({field}) => 
                                    <TextField
                                    {...field}
                                    fullWidth
                                    label="Start weight"
                                    variant="filled"
                                    placeholder="Your starting weight"
                                    error={!!errors.start_weight}
                                    helperText={errors.start_weight?.message}
                                    />}  
                                />     
                        </Grid>
                        <Grid item md={4}>
                            <Controller 
                                name="actual_weight"
                                control={control}
                                render={({field}) => 
                                    <TextField
                                    {...field}
                                    fullWidth
                                    label="Actual weight"
                                    variant="filled"
                                    placeholder="Your current weight"
                                    error={!!errors.actual_weight}
                                    helperText={errors.actual_weight?.message}
                                    />}  
                                />     
                        </Grid>
                        <Grid item md={4}>
                            <Controller 
                                name="goal_weight"
                                control={control}
                                render={({field}) => 
                                    <TextField
                                    {...field}
                                    fullWidth
                                    label="Goal weight"
                                    variant="filled"
                                    placeholder="Your goal weight"
                                    error={!!errors.goal_weight}
                                    helperText={errors.goal_weight?.message}
                                    />}  
                                />     
                        </Grid>
                    </Grid>
                    <Grid item container justifyContent="flex-end" p={3} spacing={2}>
                        <Grid item>
                            <Button type="submit" variant="contained">Submit</Button>
                        </Grid>
                    </Grid>
                </form>
            </Grid>
        </Grid>
    );
}

export default GoalForm;