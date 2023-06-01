import React, {useEffect, useState} from 'react';
import * as yup from "yup";
import {Controller, SubmitHandler, useForm} from "react-hook-form";
import {yupResolver} from "@hookform/resolvers/yup";
import {Button, Divider, Grid, IconButton, InputAdornment, Paper, TextField, Typography} from "@mui/material";
import {useNavigate} from "react-router-dom";
import VisibilityIcon from '@mui/icons-material/Visibility';
import VisibilityOffIcon from '@mui/icons-material/VisibilityOff';
import {signIn} from "../../../Secondary/Api/AxiosRequests/AuthLoginRequests";
import {useSelector} from "react-redux";
import {RootState} from "../../../Secondary/Redux/Store/store";

//Typescript tipage des inputs
export type InputsLogin = {
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

interface LoginPageInterface {
    onSubmitClick: (jwt: string) => void
}

const LoginPage = (props: LoginPageInterface) => {
    const {onSubmitClick} = props
    const userLogged = useSelector((state: RootState) => state.profile.user)
    const navigate = useNavigate()
    const [visibility, setVisibility] = useState<boolean>(false)

    useEffect(() => {
        if (userLogged) {
            navigate("/")
        }
    })

    const {handleSubmit, reset, formState: {errors}, control} = useForm<InputsLogin>(
        {
            resolver: yupResolver(schemaValidation),
        }
    )

    //Fonction submit click
    const onSubmit: SubmitHandler<InputsLogin> = (data) => {
        signIn(data)
            .then(function (response) {
                onSubmitClick(response.data.jwt)
            })
            .catch(function (error) {
                console.log(error)
            })
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
                        <Typography variant="h6" sx={{paddingLeft: "10px"}}>Connexion</Typography>
                    </Grid>
                    <Grid item>
                        <form
                            style={{margin: "10px", display: "flex", flexDirection: "column", alignItems: "center"}}
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
                                                label="Email"
                                                placeholder="Email..."
                                                type="email"
                                                error={!!errors.email}
                                                helperText={errors.email?.message}
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
                                                label="Password"
                                                placeholder="Password..."
                                                type={visibility ? 'text' : 'password'}
                                                error={!!errors.password}
                                                helperText={errors.password?.message}
                                                InputProps={{
                                                    endAdornment: (
                                                        <InputAdornment position="end">
                                                            <IconButton>
                                                                {visibility ?
                                                                    <VisibilityOffIcon sx={{fill: "#2196f3"}}
                                                                                       onClick={handleSwitchPasswordVisibility}/>
                                                                    :
                                                                    <VisibilityIcon sx={{fill: "#2196f3"}}
                                                                                    onClick={handleSwitchPasswordVisibility}/>
                                                                }
                                                            </IconButton>
                                                        </InputAdornment>
                                                    )
                                                }}
                                            />}
                                    />
                                </Grid>
                                <Grid item container justifyContent="flex-end">
                                    <Grid item>
                                        <Button type="submit" variant="contained"
                                                sx={{margin: "5px"}}>Connexion</Button>
                                    </Grid>
                                    <Grid item>
                                        <Button onClick={handleReset} color="error" variant="contained"
                                                sx={{margin: "5px"}}>Reset</Button>
                                    </Grid>
                                </Grid>
                            </Grid>
                        </form>
                    </Grid>
                    <Grid item container justifyContent="center">
                        <Button onClick={handleNavigationSignIn}>Don't have an account ? Register</Button>
                    </Grid>
                </Grid>
            </Paper>
        </Grid>
    )
}

export default LoginPage;