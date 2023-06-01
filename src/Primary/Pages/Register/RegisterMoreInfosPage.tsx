import React from 'react';
import {Alert, Autocomplete, Button, Divider, Grid, Paper, TextField, Typography} from "@mui/material";
import {Controller, SubmitHandler, useForm} from "react-hook-form";
import * as yup from "yup";
import {yupResolver} from "@hookform/resolvers/yup/dist/yup";
import {useNavigate, useParams} from "react-router-dom";
import {Parameter} from "../../../Corelogic/Models/Parameter";
import {foodPreferenceData, sexeData} from "../../../Secondary/InMemory/data";
import {createProfile} from "../../../Secondary/Api/AxiosRequests/ProfilRequests";

//Typescript tipage des inputs
export type Inputs = {
    name: string
    firstName: string
    birthDate: Date | null
    foodPreference: Parameter | null
    gender: Parameter | null
    height: number
    weight: number
}

//Définition du schéma de validation pour chaque champs avec YUP
const schemaValidation = yup.object({
    name: yup.string().required("Please enter your email"),
    firstName: yup.string().required("Please enter your email"),
    foodPreference: yup.string().required("Please enter your email"),
    gender: yup.string().required("Please enter your email"),
    height: yup.string().required("Please enter your email"),
    weight: yup.string().required("Please enter your email")
}).required();

const RegisterMoreInfosPage = () => {
    const navigate = useNavigate()
    const params = useParams()
    const {handleSubmit, reset, formState: {errors}, control} = useForm<Inputs>(
        {
            resolver: yupResolver(schemaValidation),
        }
    )

    //Fonction submit click
    const onSubmit: SubmitHandler<Inputs> = (data) => {
        createProfile(data, Number(params.userId))
            .then(function (response) {
                navigate("/")
                window.location.reload()
                console.log(response)
            })
            .catch(function (error) {
                console.log(error)
            })
    }

    //Fonction reset click
    const handleReset = () => {
        reset({firstName: "", gender: null, name: "", weight: 70, height: 170, birthDate: null, foodPreference: null})
    }

    return (
        <Grid container justifyContent="center" alignItems="center" height="100vh">
            <Paper sx={{margin: "10px", width: "30%"}}>
                <Grid container direction="column" p={1}>
                    <Grid item container justifyContent="center" alignItems="center">
                        <Grid item>
                            <img src="/logo.png" height="50px"/>
                        </Grid>
                        <Grid item>
                            <Typography variant="h4" sx={{paddingLeft: "10px"}}>Health Tracker</Typography>
                        </Grid>
                    </Grid>
                    <Divider variant="middle"/>
                    <Grid item container justifyContent="center">
                        <Alert severity="success">Veuillez compléter les informations du profil</Alert>
                    </Grid>
                    <Grid item>
                        <form style={{margin: "10px", display: "flex", flexDirection: "column", alignItems: "center"}}
                              onSubmit={handleSubmit(onSubmit)}>
                            <Grid container spacing={2}>
                                <Grid item xs={12}>
                                    <Controller
                                        name="name"
                                        control={control}
                                        defaultValue=""
                                        render={({field}) =>
                                            <TextField
                                                {...field}
                                                fullWidth
                                                variant="filled"
                                                label="Name"
                                                placeholder="Name..."
                                                type="text"
                                                error={!!errors.name}
                                                helperText={errors.name?.message}
                                                InputLabelProps={{shrink: !!field.value}}
                                            />}
                                    />
                                </Grid>
                                <Grid item xs={12}>
                                    <Controller
                                        name="firstName"
                                        control={control}
                                        defaultValue=""
                                        render={({field}) =>
                                            <TextField
                                                {...field}
                                                fullWidth
                                                variant="filled"
                                                label="First name"
                                                placeholder="First name..."
                                                type="text"
                                                error={!!errors.firstName}
                                                helperText={errors.firstName?.message}
                                                InputLabelProps={{shrink: !!field.value}}
                                            />}
                                    />
                                </Grid>
                                <Grid item xs={12}>
                                    <Controller
                                        name="birthDate"
                                        control={control}
                                        render={({field}) =>
                                            <TextField
                                                {...field}
                                                fullWidth
                                                variant="filled"
                                                label="Birth date"
                                                placeholder="Birth date..."
                                                type="date"
                                                error={!!errors.birthDate}
                                                helperText={errors.birthDate?.message}
                                                InputLabelProps={{shrink: !!field.value}}
                                            />}
                                    />
                                </Grid>
                                <Grid item xs={12}>
                                    <Controller
                                        name="foodPreference"
                                        control={control}
                                        render={({field: {onChange}}) =>
                                            <Autocomplete
                                                options={foodPreferenceData ? foodPreferenceData : []}
                                                onChange={(event, param) => {
                                                    onChange(param?.code)
                                                }}
                                                getOptionLabel={(option => option.label || "")}
                                                isOptionEqualToValue={(option, value) => option === value}
                                                renderInput={(params) => <TextField {...params}
                                                                                    label={"Food preference"}
                                                                                    variant="standard"
                                                />}
                                            />}
                                    />
                                </Grid>
                                <Grid item xs={12}>
                                    <Controller
                                        name="gender"
                                        control={control}
                                        render={({field: {onChange}}) =>
                                            <Autocomplete
                                                options={sexeData ? sexeData : []}
                                                onChange={(event, param) => {
                                                    onChange(param?.code)
                                                }}
                                                getOptionLabel={(option => option.label || "")}
                                                isOptionEqualToValue={(option, value) => option === value}
                                                renderInput={(params) => <TextField {...params}
                                                                                    label={"Gender"}
                                                                                    variant="standard"
                                                />}
                                            />}
                                    />
                                </Grid>
                                <Grid item xs={12}>
                                    <Controller
                                        name="height"
                                        control={control}
                                        defaultValue={170}
                                        render={({field}) =>
                                            <TextField
                                                {...field}
                                                fullWidth
                                                variant="filled"
                                                label="Height"
                                                placeholder="Height..."
                                                type="number"
                                                error={!!errors.height}
                                                helperText={errors.height?.message}
                                                InputLabelProps={{shrink: !!field.value}}
                                            />}
                                    />
                                </Grid>
                                <Grid item xs={12}>
                                    <Controller
                                        name="weight"
                                        control={control}
                                        defaultValue={70}
                                        render={({field}) =>
                                            <TextField
                                                {...field}
                                                fullWidth
                                                variant="filled"
                                                label="Weight"
                                                placeholder="Weight..."
                                                type="number"
                                                error={!!errors.weight}
                                                helperText={errors.weight?.message}
                                                InputLabelProps={{shrink: !!field.value}}
                                            />}
                                    />
                                </Grid>
                                <Grid item container justifyContent="flex-end">
                                    <Grid item>
                                        <Button type="submit" variant="contained"
                                                sx={{margin: "5px"}}>Confirmer</Button>
                                    </Grid>
                                    <Grid item>
                                        <Button onClick={handleReset} color="error" variant="contained"
                                                sx={{margin: "5px"}}>Reset</Button>
                                    </Grid>
                                </Grid>
                            </Grid>
                        </form>
                    </Grid>
                </Grid>
            </Paper>
        </Grid>
    );
};

export default RegisterMoreInfosPage;