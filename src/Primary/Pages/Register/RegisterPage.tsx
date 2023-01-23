import React, {useEffect, useState} from 'react';
import * as yup from "yup";
import {Controller, SubmitHandler, useForm} from "react-hook-form";
import {yupResolver} from "@hookform/resolvers/yup";
import {
    Autocomplete,
    Box,
    Button,
    Divider,
    Grid,
    IconButton,
    InputAdornment,
    Paper,
    TextField,
    Typography
} from "@mui/material";
import AlternateEmailIcon from '@mui/icons-material/AlternateEmail';
import PasswordIcon from '@mui/icons-material/Password';
import PersonIcon from '@mui/icons-material/Person';
import {useNavigate} from "react-router-dom";
import VisibilityOffIcon from "@mui/icons-material/VisibilityOff";
import VisibilityIcon from "@mui/icons-material/Visibility";

//Typescript tipage des inputs
type Inputs = {
    firstName: string
    lastName: string
    email: string
    password: string
    confirmPassword: string
}

//Définition du schéma de validation pour chaque champs avec YUP
const schemaValidation = yup.object({
    firstName: yup.string().required("Please enter your name"),
    lastName: yup.string().required("Please enter your name"),
    email: yup.string().required("Please enter your email"),
    password: yup.string().required("Please enter your password").matches(
        /^.*(?=.{8,})((?=.*[!@#$%^&*()\-_=+{};:,<.>]){1})(?=.*\d)((?=.*[a-z]){1})((?=.*[A-Z]){1}).*$/,
        "Password must contain at least 8 characters, one uppercase, one number and one special case character"
    ),
    confirmPassword: yup.string().oneOf([yup.ref('password'), null], "Passwords don't match.")
}).required();

const RegisterPage = () => {
    const navigate = useNavigate()
    const [visibility, setVisibility] = useState({
        password: false,
        confirmPassword: false
    })

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
        reset({firstName: "", lastName: "", email: "", password: "", confirmPassword: ""})
    }

    const handleNavigationSignIn = () => {
        navigate("/login")
    }

    return (
        <Box sx={{display: "flex", justifyContent: "center", alignItems: "center", height: "100vh"}}>
            <Paper sx={{margin: "10px", width: "70%"}}>
                <Box sx={{display: "flex", justifyContent: "space-between"}}>
                    <Box sx={{display: "flex", alignItems: "center", margin: "5px"}}>
                        <img src="/logo.png" height="50px"/>
                        <Typography variant="h4" sx={{paddingLeft: "10px"}}>Formulaire d'inscription</Typography>
                    </Box>
                    <Button onClick={handleNavigationSignIn}>Already have an account ? Sign in</Button>
                </Box>
                <Divider variant="middle"/>
                <form style={{margin: "10px", display: "flex", flexDirection: "column", alignItems: "center"}}
                      onSubmit={handleSubmit(onSubmit)}>
                    <Grid container spacing={2}>
                        <Grid item xs={6}>
                            <Controller
                                name="firstName"
                                control={control}
                                render={({field}) =>
                                    <TextField
                                        {...field}
                                        fullWidth
                                        variant="filled"
                                        placeholder="Your first name..."
                                        type="text"
                                        error={!!errors.firstName}
                                        helperText={errors.firstName?.message}
                                        InputProps={{
                                            startAdornment: (
                                                <InputAdornment position="start">
                                                    <PersonIcon/>
                                                </InputAdornment>
                                            ),
                                        }}
                                    />}
                            />
                        </Grid>
                        <Grid item xs={6}>
                            <Controller
                                name="lastName"
                                control={control}
                                render={({field}) =>
                                    <TextField
                                        {...field}
                                        fullWidth
                                        variant="filled"
                                        placeholder="Your last name..."
                                        type="text"
                                        error={!!errors.lastName}
                                        helperText={errors.lastName?.message}
                                        InputProps={{
                                            startAdornment: (
                                                <InputAdornment position="start">
                                                    <PersonIcon/>
                                                </InputAdornment>
                                            ),
                                        }}
                                    />}
                            />
                        </Grid>
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
                                        type={visibility.password ? 'text' : 'password'}
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
                                                        {visibility.password ?
                                                            <VisibilityOffIcon
                                                                onClick={() => setVisibility({
                                                                    ...visibility,
                                                                    password: false
                                                                })
                                                                }/>
                                                            :
                                                            <VisibilityIcon onClick={() => setVisibility({
                                                                ...visibility,
                                                                password: true
                                                            })
                                                            }/>
                                                        }
                                                    </IconButton>
                                                </InputAdornment>
                                            )
                                        }}
                                    />}
                            />
                        </Grid>
                        <Grid item xs={12}>
                            <Controller
                                name="confirmPassword"
                                control={control}
                                render={({field}) =>
                                    <TextField
                                        {...field}
                                        fullWidth
                                        variant="filled"
                                        placeholder="Confirm your password..."
                                        type={visibility.confirmPassword ? 'text' : 'password'}
                                        error={!!errors.confirmPassword}
                                        helperText={errors.confirmPassword?.message}
                                        InputProps={{
                                            startAdornment: (
                                                <InputAdornment position="start">
                                                    <PasswordIcon/>
                                                </InputAdornment>
                                            ),
                                            endAdornment: (
                                                <InputAdornment position="end">
                                                    <IconButton>
                                                        {visibility.confirmPassword ?
                                                            <VisibilityOffIcon
                                                                onClick={() => setVisibility({
                                                                    ...visibility,
                                                                    confirmPassword: false
                                                                })
                                                                }/>
                                                            :
                                                            <VisibilityIcon onClick={() => setVisibility({
                                                                ...visibility,
                                                                confirmPassword: true
                                                            })}/>
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
                        <Button type="submit" variant="contained" sx={{margin: "5px"}}>Submit</Button>
                        <Button onClick={handleReset} color="error" variant="contained"
                                sx={{margin: "5px"}}>Reset</Button>
                    </Box>
                </form>
            </Paper>
        </Box>
    );
};

export default RegisterPage;