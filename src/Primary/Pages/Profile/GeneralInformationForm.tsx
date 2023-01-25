import React, {useState} from 'react';
import {
    Box,
    Button,
    Grid,
    IconButton,
    InputAdornment,
    MenuItem,
    Paper,
    Select,
    TextField,
    Typography
} from "@mui/material";
import * as yup from "yup";
import {Controller, SubmitHandler, useForm} from "react-hook-form";
import {yupResolver} from "@hookform/resolvers/yup";
import InfoIcon from '@mui/icons-material/Info';
import {sexeData} from "../../../Secondary/InMemory/data";

type InputsProfilePage = {
    firstName: string
    lastName: string
    height: number
    weight: number
    sex: boolean
    birthDate: string
    regimen: string
    email: string
}

//Définition du schéma de validation pour chaque champs avec YUP
const schemaValidation = yup.object({
    firstName: yup.string().required("Please enter your name"),
    lastName: yup.string().required("Please enter your name"),
    height: yup.number().required("Please enter your height").max(210).min(100),
    weight: yup.number().required("Please enter your weight").max(300).min(30),
    sex: yup.boolean().required("Please confirm your sex"),
    birthdate: yup.date().required("Please enter your birth date"),
    regimen: yup.object().required("Please enter your regimen"),
    email: yup.string().required("Please enter your email")
}).required();

const GeneralInformationForm = () => {

    const {handleSubmit, reset, formState: {errors}, control} = useForm<InputsProfilePage>(
        {
            resolver: yupResolver(schemaValidation),
        }
    )

    //Fonction submit click
    const onSubmit: SubmitHandler<InputsProfilePage> = (data) => {
        console.log(data)
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
        <Box sx={{height: "50vh", marginBottom: "7.5px"}}>
            <Paper sx={{height: "100%", marginLeft: "15px", marginRight: "15px"}}>
                <Box sx={{display: "flex", padding: "10px"}}>
                    <InfoIcon/>
                    <Typography marginLeft="5px">Change your general informations</Typography>
                </Box>
                <form style={{
                    marginLeft: "10px",
                    marginRight: "10px",
                    display: "flex",
                    flexDirection: "column",
                    alignItems: "center"
                }}
                      onSubmit={handleSubmit(onSubmit)}>
                    <Grid container spacing={2}>
                        <Grid item xs={6} md={6}>
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
                        <Grid item xs={6} md={6}>
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
                        <Grid item xs={4} md={4}>
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
                        <Grid item xs={4} md={4}>
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
                        <Grid item xs={4} md={4}>
                            <Controller
                                name="sex"
                                control={control}
                                render={({field}) =>
                                    <TextField
                                        {...field}
                                        select
                                        fullWidth
                                        defaultValue=""
                                        label="Select"
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
                                name="birthDate"
                                control={control}
                                render={({field}) =>
                                    <TextField
                                        {...field}
                                        fullWidth
                                        label="Birth Date"
                                        variant="filled"
                                        placeholder="Birth date..."
                                        type="text"
                                        error={!!errors.birthDate}
                                        helperText={errors.birthDate?.message}
                                    />}
                            />
                        </Grid>
                        <Grid item xs={6} md={6}>
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
                        <Grid item xs={12} md={12}>
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
                    </Grid>
                    <Box sx={{width: "100%", display: "flex", justifyContent: "flex-end", margin: "10px"}}>
                        <Button type="submit" variant="contained" sx={{marginRight: "5px"}}>Submit</Button>
                        <Button onClick={handleReset} color="error" variant="contained"
                                sx={{marginLeft: "5px"}}>Reset</Button>
                    </Box>
                </form>
            </Paper>
        </Box>
    );
};

export default GeneralInformationForm;