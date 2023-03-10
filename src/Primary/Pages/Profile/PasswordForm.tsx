import React, {useState} from 'react';
import {Button, Grid, IconButton, InputAdornment, TextField, Typography} from "@mui/material";
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
    confirmPassword: yup.string().required("Please confirm your new password").oneOf([yup.ref('password'), null], "Passwords don't match.")
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
        <Grid container direction="column" p={2}>
            <Grid item container>
                <Grid item>
                    <PasswordIcon/>
                </Grid>
                <Grid item>
                    <Typography marginLeft="5px">Change your password</Typography>
                </Grid>
            </Grid>
            <Grid item container>
                <form onSubmit={handleSubmit(onSubmit)} style={{width: "100%"}}>
                    <Grid container spacing={2}>
                        <Grid item xs={12} md={4}>
                            <Controller
                                name="password"
                                control={control}
                                render={({field}) =>
                                    <TextField
                                        {...field}
                                        fullWidth
                                        variant="filled"
                                        label="Current password"
                                        placeholder="Your current password..."
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
                        <Grid item xs={12} md={4}>
                            <Controller
                                name="newPassword"
                                control={control}
                                render={({field}) =>
                                    <TextField
                                        {...field}
                                        fullWidth
                                        variant="filled"
                                        label="New password"
                                        placeholder="Your new password..."
                                        type={visibility.newPassword ? 'text' : 'password'}
                                        error={!!errors.newPassword}
                                        helperText={errors.newPassword?.message}
                                        InputProps={{
                                            endAdornment: (
                                                <InputAdornment position="end">
                                                    <IconButton>
                                                        {visibility.newPassword ?
                                                            <VisibilityOffIcon sx={{fill: "#2196f3"}}
                                                                               onClick={() => setVisibility({
                                                                                   ...visibility,
                                                                                   newPassword: false
                                                                               })
                                                                               }/>
                                                            :
                                                            <VisibilityIcon sx={{fill: "#2196f3"}}
                                                                            onClick={() => setVisibility({
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
                        <Grid item xs={12} md={4}>
                            <Controller
                                name="confirmNewPassword"
                                control={control}
                                render={({field}) =>
                                    <TextField
                                        {...field}
                                        fullWidth
                                        variant="filled"
                                        label="Confirm new password"
                                        placeholder="Confirm your new password..."
                                        type={visibility.confirmNewPassword ? 'text' : 'password'}
                                        error={!!errors.confirmNewPassword}
                                        helperText={errors.confirmNewPassword?.message}
                                        InputProps={{
                                            endAdornment: (
                                                <InputAdornment position="end">
                                                    <IconButton>
                                                        {visibility.confirmNewPassword ?
                                                            <VisibilityOffIcon sx={{fill: "#2196f3"}}
                                                                               onClick={() => setVisibility({
                                                                                   ...visibility,
                                                                                   confirmNewPassword: false
                                                                               })
                                                                               }/>
                                                            :
                                                            <VisibilityIcon sx={{fill: "#2196f3"}}
                                                                            onClick={() => setVisibility({
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

export default PasswordForm;