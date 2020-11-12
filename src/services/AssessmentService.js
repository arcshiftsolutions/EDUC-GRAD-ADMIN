import axios from 'axios'

const apiClient = axios.create({
    baseURL: process.env.VUE_APP_STUDENT_ASSESSMENTS_API_HOST,
    withCredentials: false,
    headers: {
        Accept: 'application/json',
        'Content-Type': 'application/json',
        "Access-Control-Allow-Origin": "*"
    }
})

export default {
    getStudentAssessment(pen) {
        return apiClient.get('/api/v1/studentassessment/pen/' + pen);
    }
}