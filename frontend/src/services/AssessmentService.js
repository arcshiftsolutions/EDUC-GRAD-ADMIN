import axios from 'axios';
const apiClient = axios.create({
    baseURL: "https://grad-admin-75e61b-tools.apps.silver.devops.gov.bc.ca",
})

export default {
    getStudentAssessment(pen, token) {
        const headers = { Accept: 'application/json','Content-Type': 'application/json',"Access-Control-Allow-Origin": "*",'Authorization': 'Bearer '+ token }
        //console.log("TOKEN IN SERVICE getStudentAssessment: " + token);
        return apiClient.get('/api/v1/studentassessment/pen/' + pen,{ headers });
    }
}