import React, {useState} from 'react';
import {Button, Grid, MenuItem, TextField, Typography} from "@mui/material";
import * as yup from "yup";
import {Controller, SubmitHandler, useForm} from "react-hook-form";
import {yupResolver} from "@hookform/resolvers/yup";
import InfoIcon from '@mui/icons-material/Info';
import {sexeData} from "../../../Secondary/InMemory/data";
import {DesktopDatePicker} from "@mui/x-date-pickers/DesktopDatePicker";
import {LocalizationProvider} from '@mui/x-date-pickers/LocalizationProvider';
import {AdapterMoment} from '@mui/x-date-pickers/AdapterMoment';
import moment from "moment";
import {Profile, Sexe} from "../../../Corelogic/Models/Profile";
import {updateProfile} from "../../../Secondary/Api/AxiosRequests/ProfilRequests";
import {setUser} from "../../../Secondary/Redux/Slices/profileSlice";
import {useDispatch} from "react-redux";

export type InputsProfilePage = {
    firstName: string
    lastName: string
    email: string
    height: number
    weight: number
    sex: Sexe
    birthDate: Date
    regimen: string
    objective: string
    weightObjective: number
}

//Définition du schéma de validation pour chaque champs avec YUP
const schemaValidation = yup.object({
    firstName: yup.string().required("Please enter your name"),
    lastName: yup.string().required("Please enter your name"),
    // email: yup.string().required("Please enter your email"),
    height: yup.number().required("Please enter your height").max(210).min(100),
    weight: yup.number().required("Please enter your weight").max(300).min(30),
    // sex: yup.boolean().required("Please confirm your sex"),
    // birthdate: yup.date().required("Please enter your birth date"),
    // regimen: yup.object().required("Please enter your regimen"),
    // objective: yup.object().required("Please enter your objective"),
    // weightObjective: yup.object().required("Please enter your weight objective")
}).required();

interface GeneralInformationFormInterface {
    userLoggedProfile: Profile | null
}

const GeneralInformationForm = (props: GeneralInformationFormInterface) => {
    const dispatch = useDispatch()
    const {userLoggedProfile} = props
    const {handleSubmit, reset, formState: {errors}, control} = useForm<InputsProfilePage>(
        {
            resolver: yupResolver(schemaValidation),
            defaultValues: {
                lastName: userLoggedProfile?.name,
                firstName: userLoggedProfile?.surname,
                birthDate: userLoggedProfile?.birth as Date,
                sex: userLoggedProfile?.sexe,
                weight: userLoggedProfile?.weight,
                height: userLoggedProfile?.height
            }
        }
    )
    const [value, setValue] = useState(moment())

    const handleChange = (newValue: any) => {
        setValue(newValue)
    }

    //Fonction submit click
    const onSubmit: SubmitHandler<InputsProfilePage> = (data) => {
        const jwtToken = localStorage.getItem('HealthTrackerJWT')

        updateProfile(String(userLoggedProfile?.user_id), data, jwtToken)
            .then(function (response) {
                dispatch(setUser(response.data))
            })
            .catch(function (error) {
                console.log(error)
            })
    }

    //Fonction reset click
    const handleReset = () => {
        reset({
            firstName: "",
            lastName: "",
            email: "",
            height: 0,
            weight: 0,
            sex: undefined,
            regimen: undefined,
            birthDate: undefined
        })
    }

    return (
        <Grid container direction="column">
            <Grid item container p={3}>
                <InfoIcon/>
                <Typography marginLeft="5px">Change your general informations</Typography>
            </Grid>
            <Grid item>
                <form onSubmit={handleSubmit(onSubmit)}>
                    <Grid container spacing={4} px={2} py={1}>
                        <Grid item md={6}>
                            <Controller
                                name="firstName"
                                control={control}
                                render={({field}) =>
                                    <TextField
                                        {...field}
                                        fullWidth
                                        label="First name"
                                        variant="filled"
                                        placeholder="First name..."
                                        type="text"
                                        error={!!errors.firstName}
                                        helperText={errors.firstName?.message}
                                    />}
                            />
                        </Grid>
                        <Grid item md={6}>
                            <Controller
                                name="lastName"
                                control={control}
                                render={({field}) =>
                                    <TextField
                                        {...field}
                                        fullWidth
                                        label="Last name"
                                        variant="filled"
                                        placeholder="Last name..."
                                        type="text"
                                        error={!!errors.lastName}
                                        helperText={errors.lastName?.message}
                                    />}
                            />
                        </Grid>
                        <Grid item md={6}>
                            <Controller
                                name="email"
                                control={control}
                                render={({field}) =>
                                    <TextField
                                        {...field}
                                        fullWidth
                                        label="Email"
                                        variant="filled"
                                        placeholder="Email..."
                                        type="email"
                                        error={!!errors.email}
                                        helperText={errors.email?.message}
                                    />}
                            />
                        </Grid>
                        <Grid item md={6}>
                            <LocalizationProvider dateAdapter={AdapterMoment}>
                                <DesktopDatePicker
                                    label="Date desktop"
                                    inputFormat="MM/DD/YYYY"
                                    value={value}
                                    onChange={handleChange}
                                    renderInput={(params) => <TextField {...params} fullWidth/>}
                                />
                            </LocalizationProvider>
                        </Grid>
                        <Grid item md={4}>
                            <Controller
                                name="height"
                                control={control}
                                render={({field}) =>
                                    <TextField
                                        {...field}
                                        fullWidth
                                        label="Height (in cm)"
                                        variant="filled"
                                        placeholder="Height..."
                                        type="number"
                                        error={!!errors.height}
                                        helperText={errors.height?.message}
                                    />}
                            />
                        </Grid>
                        <Grid item md={4}>
                            <Controller
                                name="weight"
                                control={control}
                                render={({field}) =>
                                    <TextField
                                        {...field}
                                        fullWidth
                                        label="Weight (in kg)"
                                        variant="filled"
                                        placeholder="Weight..."
                                        type="number"
                                        error={!!errors.weight}
                                        helperText={errors.weight?.message}
                                    />}
                            />
                        </Grid>
                        <Grid item md={4}>
                            <Controller
                                name="sex"
                                control={control}
                                render={({field}) =>
                                    <TextField
                                        {...field}
                                        select
                                        fullWidth
                                        defaultValue=""
                                        label="Sex"
                                        error={!!errors.sex}
                                        helperText={errors.sex?.message}
                                    >
                                        {sexeData.map((sexe) => (
                                            <MenuItem key={sexe.id} value={sexe.id}>
                                                {sexe.label}
                                            </MenuItem>
                                        ))}
                                    </TextField>}
                            />
                        </Grid>
                        <Grid item md={6}>
                            <Controller
                                name="regimen"
                                control={control}
                                render={({field}) =>
                                    <TextField
                                        {...field}
                                        fullWidth
                                        variant="filled"
                                        placeholder="Regimen..."
                                        type="text"
                                        error={!!errors.regimen}
                                        helperText={errors.regimen?.message}
                                    />}
                            />
                        </Grid>
                        <Grid item md={6}>
                            <Controller
                                name="weightObjective"
                                control={control}
                                render={({field}) =>
                                    <TextField
                                        {...field}
                                        fullWidth
                                        variant="filled"
                                        placeholder="Weight objective..."
                                        type="number"
                                        error={!!errors.regimen}
                                        helperText={errors.regimen?.message}
                                    />}
                            />
                        </Grid>
                    </Grid>
                    <Grid item container justifyContent="flex-end" spacing={2} p={3}>
                        <Grid item>
                            <Button type="submit" variant="contained">Submit</Button>
                        </Grid>
                        <Grid item>
                            <Button type="reset" onClick={handleReset} color="error" variant="contained">Reset</Button>
                        </Grid>
                    </Grid>
                </form>
            </Grid>
        </Grid>
    );
};

export default GeneralInformationForm;