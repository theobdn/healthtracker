import axios from "axios";
import { Goal } from "../../../Corelogic/Models/Goal";

export function getGoal(userId: string) {
    const jwtToken = localStorage.getItem('HealthTrackerJWT')

    return axios.get(`http://localhost:8080/api/goal/${userId}`, {
        headers: {
            'Authorization': `Bearer ${jwtToken}`
        }
    })
}

export function updateGoal(userId: string, goal: Goal) {
    const jwtToken = localStorage.getItem('HealthTrackerJWT')

    return axios.patch(`http://localhost:8080/api/goal/${userId}`, goal, {
        headers: {
            'Authorization': `Bearer ${jwtToken}`
        }
    })
}