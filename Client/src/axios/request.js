import axios from "axios"


const baseURL = `http://localhost:5000/api/v1.0.0/`


export const postRequest = async (endPoint, data, headers = {}) => {

    try {
        const response = await axios.post(`${baseURL}${endPoint}`, data, headers);
        return response.data
    } catch (error) {
        console.log(error)
        throw error
    }

}