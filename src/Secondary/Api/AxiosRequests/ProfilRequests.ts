import axios from "axios";
import {InputsProfilePage} from "../../../Primary/Pages/Profile/GeneralInformationForm";
import {Inputs} from "../../../Primary/Pages/Register/RegisterMoreInfosPage";

export function getProfile() {
    const jwtToken = localStorage.getItem('HealthTrackerJWT')

    return axios.get('http://localhost:8080/api/profil', {
        headers: {
            'Authorization': `Bearer ${jwtToken}`
        }
    })
}

export function createProfile(data: Inputs, userId: number) {
    const jwtToken = localStorage.getItem('HealthTrackerJWT')

    return axios.post(`http://localhost:8080/api/profil`, {
        "birth": data.birthDate,
        "food_preference": data.foodPreference,
        "height": data.height,
        "name": data.name,
        "sexe": data.gender,
        "surname": data.firstName,
        "user_id": userId,
        "weight": data.weight
    }, {
        headers: {
            'Authorization': `Bearer ${jwtToken}`
        }
    })
}

export function updateProfile(userId: string, data: InputsProfilePage) {
    const jwtToken = localStorage.getItem('HealthTrackerJWT')

    return axios.patch(`http://localhost:8080/api/profil/${userId}`, {
        "name": data.lastName,
        "surname": data.firstName,
        "height": data.height
    }, {
        headers: {
            'Authorization': `Bearer ${jwtToken}`
        }
    })
}

export function changePassword(userId: string, password: string, jwtToken: string | null) {
    return axios.patch(`http://localhost:8080/api/user/${userId}`, {
        password: password
    }, {
        headers: {
            'Authorization': `Bearer ${jwtToken}`
        }
    })
}