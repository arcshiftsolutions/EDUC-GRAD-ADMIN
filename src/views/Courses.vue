<template>
  <div>
    <h1>Courses</h1>
    <div>
      <b-card no-body>
        <b-tabs card>
          <b-tab title="Course search" active>
            <b-card-text>
              <div class="row col-12">
                <label class="float-left w-100">Search by course code:</label>
                <b-input class="col-10 my-2" v-model="courseCode" placeholder="" />
                <b-button variant="primary" class="m-2" @click="getAllCourses">Search</b-button>
              </div>
              <DisplayTable title="Courses" v-bind:items="courses" v-bind:fields="courseFields" id="courseCode"
                v-bind:role="role"></DisplayTable>
            </b-card-text>
          </b-tab>
          <b-tab title="Course restrictons">
            <b-card-text>
              <DisplayTable title="Course restriction" v-bind:items="courseRestrictions"
                v-bind:fields="courseRestrictionFields" id="courseRestrictionId"
                create="createCourseRestriction" delete="deleteCourseRestriction" update="updateCourseRestriction">
              </DisplayTable>

            </b-card-text>
          </b-tab>
        </b-tabs>
      </b-card>
    </div>

  </div>
</template>

<script>
  import {
    mapGetters
  } from "vuex";
  import CourseService from '@/services/CourseService.js';
  import DisplayTable from '@/components/DisplayTable.vue';
  export default {
    name: "courses",
    components: {
      DisplayTable: DisplayTable
    },



    data() {
      return {
        courses: {},
        courseRestrictions: [],
        courseFields: [{
            key: 'more',
            label: 'More'
          },
          {
            key: 'courseCode',
            label: 'Course code',
            sortable: true,
            sortDirection: 'desc'
          },
          {
            key: 'courseName',
            label: 'Course name',
            sortable: true,
            class: 'text-center'
          },
          {
            key: 'startDate',
            label: 'Start date',
            sortable: true,
            sortDirection: 'desc'
          },
          {
            key: 'endDate',
            label: 'End date',
            sortable: true,
            class: 'text-center'
          },
          {
            key: 'workExpFlag',
            label: 'Start date',
            sortable: true,
            sortDirection: 'desc'
          },
          {
            key: 'genericCourseType',
            label: 'End date',
            sortable: true,
            class: 'text-center'
          },

        ],
        courseRestrictionFields: [{
            key: 'more',
            label: 'More'
          },
          {
            key: 'mainCourse',
            label: 'Course',
            sortable: true,
            class: 'text-left',
            editable: true
          },
          {
            key: 'restrictedCourse',
            label: 'Restricted course',
            sortable: true,
            class: 'text-left',
            sortDirection: 'desc',
            editable: true
          },
          {
            key: 'restrictedCourseLevel',
            label: 'Course level',
            sortable: true,
            class: 'text-left',
            editable: true
          },
          {
            key: 'restrictionStartDate',
            label: 'Start date',
            sortable: true,
            class: 'text-left',
            sortDirection: 'desc',
            editable: true
          },
          {
            key: 'restrictionEndDate',
            label: 'End date',
            sortable: true,
            class: 'text-left',
            editable: true
          }

        ],
        courseCode: "",
        show: false,
        displayMessage: null,
      };
    },
    computed: {
      ...mapGetters({
        token: "getToken",
        role: "getRoles"
      }),
    },
    created() {
      this.getAllCourses();
      this.getAllCourseRestrictions();
    },
    methods: {
      searchCourseByCourseCode() {
        CourseService.getCourses(this.courseCode, this.token)
          .then((response) => {
            this.courses = response.data;
          })   
          .catch((error) => {
            // eslint-disable-next-line
            console.log('There was an error:' + error);
          });
      },
      getAllCourses() {
        CourseService.getAllCourses(this.token)
          .then((response) => {
            this.courses = response.data;
          })
          // eslint-disable-next-line
          .catch((error) => {
            this.$bvToast.toast("ERROR " + error.response.statusText, {
              title: "ERROR" + error.response.status,
              variant: 'danger',
              noAutoHide: true,
            });
          });
      },
      getAllCourseRestrictions() {
        CourseService.getCourseRestrictions(this.token)
          .then((response) => {
            this.courseRestrictions = response.data;
          })
          // eslint-disable-next-line no-unused-vars
          .catch((error) => {
            this.$bvToast.toast("ERROR " + error.response.statusText, {
              title: "ERROR" + error.response.status,
              variant: 'danger',
              noAutoHide: true,
            });
          });
      },
      getAllCourseRestriction(mainCourseLevel, mainCourseCode) {
        CourseService.getCourseRestriction(mainCourseLevel, mainCourseCode, this.token)
          .then((response) => {
            this.courseRestrictions = response.data;
          })
          // eslint-disable-next-line no-unused-vars
          .catch((error) => {
            this.$bvToast.toast("ERROR " + error.response.statusText, {
              title: "ERROR" + error.response.status,
              variant: 'danger',
              noAutoHide: true,
            });
          });
      }


    },
  };
</script>

<style scoped>
  .close-record {
    float: right;
  }

  .tab-loading {
    color: green !important;
  }

  .profile-name {
    padding-bottom: 10px;
  }
</style>
