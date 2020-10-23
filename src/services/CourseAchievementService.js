import axios from 'axios'

const apiClient = axios.create({

  baseURL: process.env.VUE_APP_COURSE_ACHIEVEMENT_API_HOST,
  withCredentials: false,
  headers: {
    Accept: 'application/json',
    'Content-Type': 'application/json'
  }
})

export default {
  getCourseAchievements() {
    return apiClient.get('/api/v1/course-achievements')
  },
  getCourseAchievement(id) {
    return apiClient.get('/api/v1/course-achievements/' + id)
  },

  getStudentCourseAchievements(pen) {
    return apiClient.get('/api/v1/studentcourse/pen/' + pen)
  },
  editStudentCourseAchievement(id, data) {
    return apiClient.put("/api/v1/course-achievements/" + id, data, {
      useCredentials: false
    })
  },
  addStudentCourseAchievement(data) {
    return apiClient.post("/api/v1/course-achievements/", data, {
      useCredentials: false
    })
  }
}