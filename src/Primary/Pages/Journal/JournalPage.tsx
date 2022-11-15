import React from 'react';
import {Autocomplete, Box, Button, Divider, Grid, Paper, TextField, Typography} from "@mui/material";
import JournalHeader from "./JournalHeader";
import {useForm, Controller, SubmitHandler} from "react-hook-form";
import {Parameter} from "../../../Corelogic/Models/parameter";
import * as yup from "yup";
import {yupResolver} from "@hookform/resolvers/yup";
import {dataLangague} from "../../../Secondary/InMemory/data";

//Typescript tipage des inputs
type Inputs = {
    name: string
    email: string
    age: string
    password: string
    confirmPassword: string
    country: Parameter | null
}

//Définition du schéma de validation pour chaque champs avec YUP
const schemaValidation = yup.object({
    name: yup.string().required("Please enter your name"),
    email: yup.string().required("Please enter your email"),
    age: yup.number().required("Please enter your age").positive().integer().min(18).max(99),
    country: yup.object().required("Please choose a country").typeError("Country can't be of type null"),
    password: yup.string().required("Please enter your password").matches(
        /^.*(?=.{8,})((?=.*[!@#$%^&*()\-_=+{};:,<.>]){1})(?=.*\d)((?=.*[a-z]){1})((?=.*[A-Z]){1}).*$/,
        "Password must contain at least 8 characters, one uppercase, one number and one special case character"
    ),
    confirmPassword: yup.string().oneOf([yup.ref('password'), null], "Passwords don't match.")
}).required();

const JournalPage = () => {
    const {handleSubmit, reset, formState: {errors}, control} = useForm<Inputs>(
        {
            resolver: yupResolver(schemaValidation),
        }
    )

    //Fonction submit click
    const onSubmit: SubmitHandler<Inputs> = data => console.log(data)

    //Fonction reset click
    const handleReset = () => {
        reset({name: "", email: "", age: "", password: "", confirmPassword: "", country: null})
    }

    return (
        <Box>
            {/*<JournalHeader/>*/}
            <Paper sx={{margin: "10px"}}>
                <Typography variant="h4" sx={{paddingLeft: "10px"}}>Ajouter un nouveau repas</Typography>
                <Divider variant="middle"/>
                <form style={{marginTop: "10px", display: "flex", flexDirection: "column"}} onSubmit={handleSubmit(onSubmit)}>
                    <Grid container spacing={2}>
                        <Grid item xs={6}>
                            <Controller
                                name="name"
                                control={control}
                                render={({field}) =>
                                    <TextField
                                        {...field}
                                        fullWidth
                                        variant="filled"
                                        placeholder="Your name..."
                                        type="text"
                                        error={!!errors.name}
                                        helperText={errors.name?.message}
                                    />}
                            />
                        </Grid>
                        <Grid item xs={6}>
                            <Controller
                                name="email"
                                control={control}
                                render={({field}) =>
                                    <TextField
                                        {...field}
                                        fullWidth
                                        variant="filled"
                                        placeholder="Your email..."
                                        type="email"
                                        error={!!errors.email}
                                        helperText={errors.email?.message}
                                    />}
                            />
                        </Grid>
                        <Grid item xs={6}>
                            <Controller
                                name="age"
                                control={control}
                                render={({field}) =>
                                    <TextField
                                        {...field}
                                        fullWidth
                                        variant="filled"
                                        placeholder="Your age..."
                                        type="number"
                                        error={!!errors.age}
                                        helperText={errors.age?.message}
                                    />}
                            />
                        </Grid>
                        <Grid item xs={6}>
                            <Controller
                                name="country"
                                control={control}
                                render={({field: {onChange, value}}) =>
                                    <Autocomplete
                                        options={dataLangague}
                                        onChange={(event, country) => {
                                            onChange(country)
                                        }}
                                        value={value || null}
                                        getOptionLabel={(option => option.label || "")}
                                        isOptionEqualToValue={(option, value) => option.id === value.id}
                                        renderInput={(params) => <TextField {...params}
                                                                            label="Country"
                                                                            error={!!errors.country}
                                                                            helperText={errors.country?.message}/>}
                                    />}
                            />
                        </Grid>
                        <Grid item xs={6}>
                            <Controller
                                name="password"
                                control={control}
                                render={({field}) =>
                                    <TextField
                                        {...field}
                                        fullWidth
                                        variant="filled"
                                        placeholder="Your password..."
                                        type="password"
                                        error={!!errors.password}
                                        helperText={errors.password?.message}
                                    />}
                            />
                        </Grid>
                        <Grid item xs={6}>
                            <Controller
                                name="confirmPassword"
                                control={control}
                                render={({field}) =>
                                    <TextField
                                        {...field}
                                        fullWidth
                                        variant="filled"
                                        placeholder="Confirm your password..."
                                        type="password"
                                        error={!!errors.confirmPassword}
                                        helperText={errors.confirmPassword?.message}
                                    />}
                            />
                        </Grid>
                    </Grid>
                    <br/>
                    <Box sx={{display: "flex", justifyContent: "flex-end", margin: "10px"}}>
                        <Button type="submit" variant="contained" sx={{margin: "5px"}}>Submit</Button>
                        <Button onClick={handleReset} color="error" variant="contained" sx={{margin: "5px"}}>Reset</Button>
                    </Box>
                </form>
            </Paper>
        </Box>
    );
};

export default JournalPage;