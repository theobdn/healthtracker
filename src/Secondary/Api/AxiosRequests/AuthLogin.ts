import axios from "axios";
import {InputsLogin} from "../../../Primary/Pages/Login/LoginPage";
import {InputsRegister} from "../../../Primary/Pages/Register/RegisterPage";

export function getProfile(jwtToken: string) {
    return axios.get('http://localhost:8080/api/profil', {
        headers: {
            'Authorization': jwtToken
        }
    })
}

export function signIn(data: InputsLogin) {
    return axios.post("http://localhost:8080/auth/signin", data)
}

export function signUp(data: InputsRegister) {
    return axios.post('http://localhost:8080/auth/signup', {
        "password": data.password,
        "email": data.email
    })
}