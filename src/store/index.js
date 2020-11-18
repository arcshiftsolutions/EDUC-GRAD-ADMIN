  import Vue from "vue";
  import Vuex from "vuex";

  Vue.use(Vuex);
  export default new Vuex.Store({
    init: {
      //Initialize the store
    },
    state: {
      student: {
        profile: {},
        courses: "not loaded",
        assessments: "not loaded",
        exams: "not loaded",
        hasExams: false,
        hasAssessments: false,
        hasCourses: false,

      }
    },
    mutations: {
      setStudentProfile(state, payload) {
        state.student.profile = payload;
      },
      setStudentCourses(state, payload) {
        state.student.courses = payload;
        if(state.student.courses.length){
          state.student.hasCourses = true;
        }
      },
      setStudentAssessments(state, payload) {
        state.student.assessments = payload;
        if(state.student.assessments.length){
          state.student.hasAssessments = true;
        }
      },
      setStudentExams(state, payload) {
        state.student.exams = payload;
        if(state.student.exams.length){
          state.student.hasExams = true;
        }
      },
      unsetStudent(state) {
        state.student.profile = {};
        state.student.courses = "not loaded";
        state.student.assessments = "not loaded";
        state.student.exams = "not loaded";
        state.student.hasExams = false;
        state.student.hasAssessments = false;
        state.student.hasCourses = false;
      },
    },
    actions: {
      setStudentProfile({
        commit
      }, payload) {
        commit('setStudentProfile', payload);
      },
      setStudentCourses({
        commit
      }, payload) {
        commit('setStudentCourses', payload);
      },
      setStudentAssessments({
        commit
      }, payload) {
        commit('setStudentAssessments', payload);
      },
      setStudentExams({
        commit
      }, payload) {
        commit('setStudentExams', payload);
      }
      

    },
    getters: {
      getStudentProfile(state) {
        return state.student.profile;
      },
      getStudentFullName(state) {
        return state.student.profile.studSurname + ", " + state.student.profile.studGiven + " " + state.student.profile.studMiddle + "(" + state.student.profile.pen + ")";
      },
      getStudentCourses(state) {
        return state.student.courses;
      },
      getStudentExams(state) {
        return  state.student.exams;
      },
      getStudentAssessments(state) {
        return  state.student.assessments;
      },
      studentHasCourses(state){
        return state.student.hasCourses;
      },
      studentHasExams(state){
        return state.student.hasExams;
      },
      studentHasAssessments(state){
        return state.student.hasAssessments;
      }

      // getStudentProfile: state => state.student.profiles
    },
    modules: {}
  })
