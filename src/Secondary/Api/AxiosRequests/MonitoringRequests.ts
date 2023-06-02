import axios from "axios";

export function getMonitorings(userId: string) {
    const jwtToken = localStorage.getItem('HealthTrackerJWT')

    return axios.get(`http://localhost:8080/api/monitoring/${userId}`, {
        headers: {
            'Authorization': `Bearer ${jwtToken}`
        }
    })
}