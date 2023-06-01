import React, {useState} from 'react';
import {Box, Button, Grid, IconButton, InputAdornment, MenuItem, Paper, TextField, Typography} from "@mui/material";
import * as yup from "yup";
import {Controller, SubmitHandler, useForm} from "react-hook-form";
import VisibilityOffIcon from "@mui/icons-material/VisibilityOff";
import VisibilityIcon from "@mui/icons-material/Visibility";
import {yupResolver} from "@hookform/resolvers/yup";
import PasswordIcon from '@mui/icons-material/Password';
import InfoIcon from "@mui/icons-material/Info";
import {sexeData} from "../../../Secondary/InMemory/data";
import { changePassword } from '../../../Secondary/Api/AxiosRequests/ProfilRequests';
import { Profile } from '../../../Corelogic/Models/Profile';
import { signIn } from '../../../Secondary/Api/AxiosRequests/AuthLogin';

interface PasswordFormInterface {
    userLoggedProfile: Profile | null
}

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
    newPassword: yup.string().required("Please enter your password").matches(
        /^.*(?=.{8,})((?=.*[!@#$%^&*()\-_=+{};:,<.>]){1})(?=.*\d)((?=.*[a-z]){1})((?=.*[A-Z]){1}).*$/,
        "Password must contain at least 8 characters, one uppercase, one number and one special case character"
    ),
    confirmNewPassword: yup.string().oneOf([yup.ref('newPassword'), null], "Passwords don't match.")
}).required();

const PasswordForm = (props: PasswordFormInterface) => {
    const {userLoggedProfile} = props
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
        const jwtToken = localStorage.getItem('HealthTrackerJWT');
        //TODO Check si l'ancien password enst bon
        changePassword(String(userLoggedProfile?.user_id), data.confirmNewPassword, jwtToken)
            .then(function (response) {
                console.log(response)
            })
            .catch(function (error) {
                console.log(error);
            })
    }

    //Fonction reset click
    const handleReset = () => {
        reset({password: "", newPassword: "", confirmNewPassword: ""})
    }

    return (
        <Grid container direction="column">
            <Grid item container p={3}>
                <PasswordIcon/>
                <Typography marginLeft="5px">Change your password</Typography>
            </Grid>
            <Grid item>
                <form onSubmit={handleSubmit(onSubmit)}>
                    <Grid container spacing={4} px={2} py={1}>
                        <Grid item md={12}>
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
                        <Grid item md={12}>
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
                        <Grid item md={12}>
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
                    <Grid item container justifyContent="flex-end" p={3} spacing={2}>
                        <Grid item>
                            <Button type="submit" variant="contained">Submit</Button>
                        </Grid>
                        <Grid item>
                            <Button onClick={handleReset} color="error" variant="contained">Reset</Button>
                        </Grid>
                    </Grid>
                </form>
            </Grid>
        </Grid>
    );
};

export default PasswordForm;