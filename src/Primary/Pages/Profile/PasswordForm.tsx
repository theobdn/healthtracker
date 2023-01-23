import React, {useState} from 'react';
import {Box, Button, Grid, IconButton, InputAdornment, Paper, TextField, Typography} from "@mui/material";
import * as yup from "yup";
import {Controller, SubmitHandler, useForm} from "react-hook-form";
import VisibilityOffIcon from "@mui/icons-material/VisibilityOff";
import VisibilityIcon from "@mui/icons-material/Visibility";
import {yupResolver} from "@hookform/resolvers/yup";
import PasswordIcon from '@mui/icons-material/Password';

type InputsPasswordsProfilePage = {
    password: string
    newPassword: string
    confirmNewPassword: string
}
//Définition du schéma de validation pour chaque champs avec YUP
const schemaValidation = yup.object({
    password: yup.string().required("Please enter your password").matches(
        /^.*(?=.{8,})((?=.*[!@#$%^&*()\-_=+{};:,<.>]){1})(?=.*\d)((?=.*[a-z]){1})((?=.*[A-Z]){1}).*$/,
        "Password must contain at least 8 characters, one uppercase, one number and one special case character"
    ),
    newPassword: yup.string().required("Please enter your new password").matches(
        /^.*(?=.{8,})((?=.*[!@#$%^&*()\-_=+{};:,<.>]){1})(?=.*\d)((?=.*[a-z]){1})((?=.*[A-Z]){1}).*$/,
        "Password must contain at least 8 characters, one uppercase, one number and one special case character"
    ),
    confirmPassword: yup.string().oneOf([yup.ref('password'), null], "Passwords don't match.")
}).required();

const PasswordForm = () => {
    const [visibility, setVisibility] = useState({
        password: false,
        newPassword: false,
        confirmNewPassword: false
    })

    const {handleSubmit, reset, formState: {errors}, control} = useForm<InputsPasswordsProfilePage>(
        {
            resolver: yupResolver(schemaValidation),
        }
    )

    //Fonction submit click
    const onSubmit: SubmitHandler<InputsPasswordsProfilePage> = (data) => {
        console.log(data)
    }

    //Fonction reset click
    const handleReset = () => {
        reset({password: "", newPassword: "", confirmNewPassword: ""})
    }

    return (
        <Box sx={{height: "32vh", marginTop: "7.5px"}}>
            <Paper sx={{height: "100%", marginLeft: "15px", marginRight: "15px"}}>
                <Box sx={{display: "flex", padding: "10px"}}>
                    <PasswordIcon/>
                    <Typography marginLeft="5px">Change your password</Typography>
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
                        <Grid item xs={12} md={12}>
                            <Controller
                                name="password"
                                control={control}
                                render={({field}) =>
                                    <TextField
                                        {...field}
                                        fullWidth
                                        variant="filled"
                                        placeholder="Your current password..."
                                        type={visibility.password ? 'text' : 'password'}
                                        error={!!errors.password}
                                        helperText={errors.password?.message}
                                        InputProps={{
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
                        <Grid item xs={6} md={6}>
                            <Controller
                                name="newPassword"
                                control={control}
                                render={({field}) =>
                                    <TextField
                                        {...field}
                                        fullWidth
                                        variant="filled"
                                        placeholder="Your new password..."
                                        type={visibility.newPassword ? 'text' : 'password'}
                                        error={!!errors.newPassword}
                                        helperText={errors.newPassword?.message}
                                        InputProps={{
                                            endAdornment: (
                                                <InputAdornment position="end">
                                                    <IconButton>
                                                        {visibility.newPassword ?
                                                            <VisibilityOffIcon
                                                                onClick={() => setVisibility({
                                                                    ...visibility,
                                                                    newPassword: false
                                                                })
                                                                }/>
                                                            :
                                                            <VisibilityIcon onClick={() => setVisibility({
                                                                ...visibility,
                                                                newPassword: true
                                                            })}/>
                                                        }
                                                    </IconButton>
                                                </InputAdornment>
                                            )
                                        }}
                                    />}
                            />
                        </Grid>
                        <Grid item xs={6} md={6}>
                            <Controller
                                name="confirmNewPassword"
                                control={control}
                                render={({field}) =>
                                    <TextField
                                        {...field}
                                        fullWidth
                                        variant="filled"
                                        placeholder="Confirm your new password..."
                                        type={visibility.confirmNewPassword ? 'text' : 'password'}
                                        error={!!errors.confirmNewPassword}
                                        helperText={errors.confirmNewPassword?.message}
                                        InputProps={{
                                            endAdornment: (
                                                <InputAdornment position="end">
                                                    <IconButton>
                                                        {visibility.confirmNewPassword ?
                                                            <VisibilityOffIcon
                                                                onClick={() => setVisibility({
                                                                    ...visibility,
                                                                    confirmNewPassword: false
                                                                })
                                                                }/>
                                                            :
                                                            <VisibilityIcon onClick={() => setVisibility({
                                                                ...visibility,
                                                                confirmNewPassword: true
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

export default PasswordForm;