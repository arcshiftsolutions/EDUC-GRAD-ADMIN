import axios from 'axios'

const apiClient = axios.create({
  baseURL: process.env.VUE_APP_GRADUATION_STATUS_API_HOST,
})
export default {
  getGraduationStatus(pen, token) {
    const headers = { Accept: 'application/json','Content-Type': 'application/json',"Access-Control-Allow-Origin": "*",'Authorization': 'Bearer '+ token }
    //console.log("TOKEN IN SERVICE getGraduationStatus: " + token);
    return apiClient.get('/api/v1/gradstatus/pen/' + pen,{ headers });
  }
}