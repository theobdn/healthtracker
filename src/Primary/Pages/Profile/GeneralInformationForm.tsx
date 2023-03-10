import React from 'react';
import {Button, Grid, MenuItem, TextField, Typography} from "@mui/material";
import * as yup from "yup";
import {Controller, SubmitHandler, useForm} from "react-hook-form";
import {yupResolver} from "@hookform/resolvers/yup";
import InfoIcon from '@mui/icons-material/Info';
import {sexeData} from "../../../Secondary/InMemory/data";
import {DatePicker, LocalizationProvider} from "@mui/x-date-pickers";
import {AdapterMoment} from "@mui/x-date-pickers/AdapterMoment";

type InputsProfilePage = {
    firstName: string
    lastName: string
    email: string
    birthDate: string
    height: number
    weight: number
    sex: boolean
    regimen: string
    objective: string
}

//Définition du schéma de validation pour chaque champs avec YUP
const schemaValidation = yup.object({
    firstName: yup.string().required("Please enter your name"),
    lastName: yup.string().required("Please enter your name"),
    email: yup.string().required("Please enter your email"),
    birthdate: yup.date().required("Please enter your birth date"),
    height: yup.number().required("Please enter your height").max(210).min(100),
    weight: yup.number().required("Please enter your weight").max(300).min(30),
    sex: yup.boolean().required("Please confirm your sex"),
    regimen: yup.object().required("Please enter your regimen"),
    objective: yup.object().required("Please enter your objective")
}).required()

const GeneralInformationForm = () => {

    const {handleSubmit, reset, formState: {errors}, control} = useForm<InputsProfilePage>(
        {
            resolver: yupResolver(schemaValidation),
        }
    )

    const onSubmit: SubmitHandler<InputsProfilePage> = (data) => {
        console.log(data)
    }

    const handleReset = () => {
        reset({
            firstName: "",
            lastName: "",
            email: "",
            birthDate: undefined,
            height: 170,
            weight: 30,
            sex: undefined,
            regimen: undefined,
            objective: undefined,
        })
    }

    return (
        <Grid container direction="column" p={2}>
            <Grid item container>
                <Grid item>
                    <InfoIcon/>
                </Grid>
                <Grid item>
                    <Typography marginLeft="5px">General informations</Typography>
                </Grid>
            </Grid>
            <Grid item container>
                <form onSubmit={handleSubmit(onSubmit)}>
                    <Grid container spacing={2}>
                        <Grid item xs={6} md={4}>
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
                        <Grid item xs={6} md={4}>
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
                        <Grid item xs={6} md={4}>
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
                                        type="text"
                                        error={!!errors.email}
                                        helperText={errors.email?.message}
                                    />}
                            />
                        </Grid>
                        <Grid item xs={6} md={3}>
                            <Controller
                                name="birthDate"
                                control={control}
                                render={({field}) =>
                                    <LocalizationProvider dateAdapter={AdapterMoment}>
                                        <DatePicker sx={{width: "100%"}} label="Birth date"/>
                                    </LocalizationProvider>
                                }
                            />
                        </Grid>
                        <Grid item xs={4} md={3}>
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
                        <Grid item xs={4} md={3}>
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
                        <Grid item xs={4} md={3}>
                            <Controller
                                name="sex"
                                control={control}
                                render={({field}) =>
                                    <TextField
                                        {...field}
                                        select
                                        fullWidth
                                        variant="filled"
                                        defaultValue=""
                                        label="Gender"
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
                        <Grid item xs={6} md={6}>
                            <Controller
                                name="regimen"
                                control={control}
                                render={({field}) =>
                                    <TextField
                                        {...field}
                                        fullWidth
                                        variant="filled"
                                        label="Regimen"
                                        placeholder="Regimen..."
                                        type="text"
                                        error={!!errors.regimen}
                                        helperText={errors.regimen?.message}
                                    />}
                            />
                        </Grid>
                        <Grid item xs={6} md={6}>
                            <Controller
                                name="objective"
                                control={control}
                                render={({field}) =>
                                    <TextField
                                        {...field}
                                        fullWidth
                                        variant="filled"
                                        label="Objective"
                                        placeholder="Objective..."
                                        type="text"
                                        error={!!errors.regimen}
                                        helperText={errors.regimen?.message}
                                    />}
                            />
                        </Grid>
                        <Grid item container justifyContent="flex-end" spacing={1}>
                            <Grid item>
                                <Button type="submit" variant="contained">Confirmer</Button>
                            </Grid>
                            <Grid item>
                                <Button onClick={handleReset} color="error" variant="contained">Reset</Button>
                            </Grid>
                        </Grid>
                    </Grid>
                </form>
            </Grid>
        </Grid>
    );
};

export default GeneralInformationForm;