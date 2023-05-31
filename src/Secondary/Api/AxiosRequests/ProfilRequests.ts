import axios from "axios";
import {InputsProfilePage} from "../../../Primary/Pages/Profile/GeneralInformationForm";

export function getProfile(jwtToken: string) {
    return axios.get('http://localhost:8080/api/profil', {
        headers: {
            'Authorization': `Bearer ${jwtToken}`
        }
    })
}

export function updateProfile(userId: string, data: InputsProfilePage, jwtToken: string | null) {
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