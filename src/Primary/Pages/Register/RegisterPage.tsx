import React, {useState} from 'react';
import * as yup from "yup";
import {Controller, SubmitHandler, useForm} from "react-hook-form";
import {yupResolver} from "@hookform/resolvers/yup";
import {Button, Divider, Grid, IconButton, InputAdornment, Paper, TextField, Typography} from "@mui/material";
import {useNavigate} from "react-router-dom";
import VisibilityOffIcon from "@mui/icons-material/VisibilityOff";
import VisibilityIcon from "@mui/icons-material/Visibility";
import {signUp} from "../../../Secondary/Api/AxiosRequests/AuthLogin";

//Typescript tipage des inputs
export type InputsRegister = {
    email: string
    password: string
    confirmPassword: string
}

//Définition du schéma de validation pour chaque champs avec YUP
const schemaValidation = yup.object({
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

    const {handleSubmit, reset, formState: {errors}, control} = useForm<InputsRegister>(
        {
            resolver: yupResolver(schemaValidation),
        }
    )

    //Fonction submit click
    const onSubmit: SubmitHandler<InputsRegister> = (data) => {
        signUp(data)
            .then(function (response) {
                navigate(`/registerMoreInfos/${response.data.id}`)
                console.log(response)
            })
            .catch(function (error) {
                console.log(error)
            })
    }
    //Fonction reset click
    const handleReset = () => {
        reset({email: "", password: "", confirmPassword: ""})
    }

    const handleNavigationSignIn = () => {
        navigate("/login")
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
                        <Typography variant="h6" sx={{paddingLeft: "10px"}}>Inscription</Typography>
                    </Grid>
                    <Grid item>
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
                                                type={visibility.password ? 'text' : 'password'}
                                                error={!!errors.password}
                                                helperText={errors.password?.message}
                                                InputProps={{
                                                    endAdornment: (
                                                        <InputAdornment position="end">
                                                            <IconButton>
                                                                {visibility.password ?
                                                                    <VisibilityOffIcon sx={{fill: "#2196f3"}}
                                                                                       onClick={() => setVisibility({
                                                                                           ...visibility,
                                                                                           password: false
                                                                                       })
                                                                                       }/>
                                                                    :
                                                                    <VisibilityIcon sx={{fill: "#2196f3"}}
                                                                                    onClick={() => setVisibility({
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
                                                label="Confirm password"
                                                placeholder="Confirm password..."
                                                type={visibility.confirmPassword ? 'text' : 'password'}
                                                error={!!errors.confirmPassword}
                                                helperText={errors.confirmPassword?.message}
                                                InputProps={{
                                                    endAdornment: (
                                                        <InputAdornment position="end">
                                                            <IconButton>
                                                                {visibility.confirmPassword ?
                                                                    <VisibilityOffIcon sx={{fill: "#2196f3"}}
                                                                                       onClick={() => setVisibility({
                                                                                           ...visibility,
                                                                                           confirmPassword: false
                                                                                       })
                                                                                       }/>
                                                                    :
                                                                    <VisibilityIcon sx={{fill: "#2196f3"}}
                                                                                    onClick={() => setVisibility({
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
                    <Grid item container justifyContent="center">
                        <Button onClick={handleNavigationSignIn}>Already have an account ? Sign in</Button>
                    </Grid>
                </Grid>
            </Paper>
        </Grid>
    );
};

export default RegisterPage;