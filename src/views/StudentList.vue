<template>
  <div class="studentlist">
    <div class="container">
      <SiteMessage
        v-bind:message="this.displayMessage"
        v-if="displayMessage"
      ></SiteMessage>
      <form v-on:submit.prevent>
        <div class="form-group">
          <input
            v-model="username"
            placeholder="username"
            class="pen-search form-control"
          />
          <input
            v-model="password"
            placeholder="password"
            class="pen-search form-control"
          />
          <input
            v-model="penInput"
            placeholder="Student PEN"
            class="pen-search form-control"
          />
          <button
            v-on:click="findStudent"
            class="btn btn-primary pen-search-button"
          >
            Find Student
          </button>
        </div>
      </form>

      <p>
        Samples: 101696920
      </p>
      <div v-if="student.pen" class="card" style="width: 100%;">
        <div class="card-body">
          <h2 class="card-title">
            {{ student.studGiven }} {{ student.studMiddle }}
            {{ student.Surname }} ( {{ student.pen }})
          </h2>
          <ul>
            <li>Birthdate: {{ student.studBirth }}</li>
            <li>
              Graduation Requirement Year: {{ student.gradRequirementYear }}
            </li>

            <li>Address: {{ student.address1 }}</li>
            <li v-if="student.address2 === ' '">
              Address2: {{ student.address2 }}
            </li>
            <li>City: {{ student.city }}</li>
            <li>PostalCode: {{ student.postalCode }}</li>
          </ul>

          <div class="student-links">
            <button
              class="btn btn-primary active"
              v-on:click="storePen(student.pen)"
            >
              View Graduation Status
            </button>
            <router-link
              class="course-achievement-list"
              :to="{
                name: 'course-achievement-list',
                params: {
                  currentStudent: this.student,
                },
              }"
              ><button class="btn btn-primary active">
                View Course Achievements
              </button></router-link
            >
          </div>
        </div>
      </div>
    </div>
  </div>
</template>
<script>
// @ is an alias to /src
import { store } from "@/store.js";
import StudentService from "@/services/StudentService.js";
import SiteMessage from "@/components/SiteMessage";
export default {
  name: "studentlist",
  data() {
    return {
      student: [],
      penInput: "",
      displayMessage: "",
      username: "",
      password: "",
    };
  },
  components: {
    SiteMessage: SiteMessage,
  },
  methods: {
    findStudent: function() {
      let currentObj = this;
      if (this.penInput) {
        try {
          StudentService.getStudentByPen(
            this.penInput,
            this.username,
            this.password
          ).then((response) => {
            this.student = response.data;
          });
        } catch (error) {
          currentObj.displayMessage = "Pen (" + this.penInput + ") not found";
        }
      }
    },
    selectStudent: function(pen) {
      console.log("Loading Student Profile");
      store.currentPen = pen;
      store.currentStudent = this.student;
    },
    clearStudent: function() {
      store.currentPen = "";
      store.currentStudent = "";
      this.student = [];
    },
  },
};
</script>
<style scoped>
.alert,
.card,
.btn.btn-primary {
  position: inherit;
  margin-right: 10px;
}
.pen-search {
  margin-right: 9px;
  padding: 5px;
  float: left;
  width: 50%;
}
.pen-search-button {
  position: absolute;
  top: -10;
}
h6 {
  font-size: 1.5rem;
}
</style>
