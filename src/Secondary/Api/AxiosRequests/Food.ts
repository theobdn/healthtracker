import axios from "axios";

export function searchFood(input: string, jwtToken: string) {
    return axios.get('http://localhost:8080/api/search', {
        headers: {
            'Authorization': jwtToken
        },
        params: {
            foodName: input
        }
    })
}