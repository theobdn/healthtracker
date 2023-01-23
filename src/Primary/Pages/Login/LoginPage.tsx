import React, {useState} from 'react';
import * as yup from "yup";
import {Controller, SubmitHandler, useForm} from "react-hook-form";
import {yupResolver} from "@hookform/resolvers/yup";
import {Box, Button, Divider, Grid, IconButton, InputAdornment, Paper, TextField, Typography} from "@mui/material";
import AlternateEmailIcon from "@mui/icons-material/AlternateEmail";
import PasswordIcon from '@mui/icons-material/Password';
import {useNavigate} from "react-router-dom";
import VisibilityIcon from '@mui/icons-material/Visibility';
import VisibilityOffIcon from '@mui/icons-material/VisibilityOff';

//Typescript tipage des inputs
type Inputs = {
    email: string
    password: string
}

//Définition du schéma de validation pour chaque champs avec YUP
const schemaValidation = yup.object({
    email: yup.string().required("Please enter your email"),
    password: yup.string().required("Please enter your password").matches(
        /^.*(?=.{8,})((?=.*[!@#$%^&*()\-_=+{};:,<.>]){1})(?=.*\d)((?=.*[a-z]){1})((?=.*[A-Z]){1}).*$/,
        "Password must contain at least 8 characters, one uppercase, one number and one special case character"
    )
}).required();


const LoginPage = () => {
    const navigate = useNavigate()
    const [visibility, setVisibility] = useState<boolean>(false)

    const {handleSubmit, reset, formState: {errors}, control} = useForm<Inputs>(
        {
            resolver: yupResolver(schemaValidation),
        }
    )

    //Fonction submit click
    const onSubmit: SubmitHandler<Inputs> = (data) => {
        console.log(data)
    }

    //Fonction reset click
    const handleReset = () => {
        reset({email: "", password: ""})
    }

    const handleNavigationSignIn = () => {
        navigate("/register")
    }

    const handleSwitchPasswordVisibility = () => {
        setVisibility(prevState => !prevState)
    }

    return (
        <Box sx={{display: "flex", justifyContent: "center", alignItems: "center", height: "100vh"}}>
            <Paper sx={{margin: "10px", width: "70%"}}>
                <Box sx={{display: "flex", justifyContent: "space-between"}}>
                    <Box sx={{display: "flex", alignItems: "center", margin: "5px"}}>
                        <img src="/logo.png" height="50px"/>
                        <Typography variant="h4" sx={{paddingLeft: "10px"}}>Formulaire de connexion</Typography>
                    </Box>
                    <Button onClick={handleNavigationSignIn}>Don't have an account ? Register</Button>
                </Box>
                <Divider variant="middle"/>
                <form style={{margin: "10px", display: "flex", flexDirection: "column", alignItems: "center"}}
                      onSubmit={handleSubmit(onSubmit)}>
                    <Grid container spacing={2}>
                        <Grid item xs={12}>
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
                                        InputProps={{
                                            startAdornment: (
                                                <InputAdornment position="start">
                                                    <AlternateEmailIcon/>
                                                </InputAdornment>
                                            ),
                                        }}
                                    />}
                            />
                        </Grid>
                        <Grid item xs={12}>
                            <Controller
                                name="password"
                                control={control}
                                render={({field}) =>
                                    <TextField
                                        {...field}
                                        fullWidth
                                        variant="filled"
                                        placeholder="Your password..."
                                        type={visibility ? 'text' : 'password'}
                                        error={!!errors.password}
                                        helperText={errors.password?.message}
                                        InputProps={{
                                            startAdornment: (
                                                <InputAdornment position="start">
                                                    <PasswordIcon/>
                                                </InputAdornment>
                                            ),
                                            endAdornment: (
                                                <InputAdornment position="end">
                                                    <IconButton>
                                                        {visibility ?
                                                            <VisibilityOffIcon
                                                                onClick={handleSwitchPasswordVisibility}/>
                                                            :
                                                            <VisibilityIcon onClick={handleSwitchPasswordVisibility}/>
                                                        }
                                                    </IconButton>
                                                </InputAdornment>
                                            )
                                        }}
                                    />}
                            />
                        </Grid>
                    </Grid>
                    <br/>
                    <Box sx={{display: "flex", margin: "10px"}}>
                        <Button type="submit" variant="contained" sx={{margin: "5px"}}>Connexion</Button>
                        <Button onClick={handleReset} color="error" variant="contained"
                                sx={{margin: "5px"}}>Reset</Button>
                    </Box>
                </form>
            </Paper>
        </Box>
    );
};

export default LoginPage;