import axios from 'axios'

const apiClient = axios.create({
    baseURL: process.env.VUE_APP_STUDENTS_API_HOST,
    withCredentials: true,
    headers: {
        Accept: 'application/json',
        'Content-Type': 'application/json',
        'Access-Control-Allow-Origin': '*',
    }
})

export default {
    getStudentByPen(pen, user, pass) {
        //console.log(" ENV " + process.env.VUE_APP_STUDENTS_API_HOST);
        return apiClient.get('/api/v1/' + pen, {}, {
            auth: {
                username: user,
                password: pass
            }
        })
    }
}