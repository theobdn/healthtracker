import axios from "axios";

export function searchFood(input: string, jwtToken: string | null) {
    return axios.get(`http://localhost:8080/api/search/${input}`, {
        headers: {
            'Authorization': `Bearer ${jwtToken}`
        }
    })
}