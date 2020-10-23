<template>
  <header>
    <nav class="navbar navbar-expand-lg navbar-dark">
      <div class="container">
        <a class="navbar-brand" href="https://www2.gov.bc.ca">
          <img
            class="img-fluid d-none d-md-block"
            src="../assets/images/bcid-logo-rev-en.svg"
            width="181"
            height="44"
            alt="B.C. Government Logo"
          />
          <img
            class="img-fluid d-md-none"
            src="/public"
            width="64"
            height="44"
            alt="B.C. Government Logo"
          />
        </a>
        <div class="navbar-brand">
          <router-link class="app-name" to="/"
            >Student Achievement MVP</router-link
          >
        </div>
        <button
          class="navbar-toggler"
          type="button"
          data-toggle="collapse"
          data-target="#navbarNavAltMarkup"
          aria-controls="navbarNavAltMarkup"
          aria-expanded="false"
          aria-label="Toggle navigation"
        >
          <span class="navbar-toggler-icon"></span>
        </button>
        <!--
          <div class="collapse navbar-collapse" id="navbarNavAltMarkup">
            <div class="navbar-nav">
              <router-link class="nav-item nav-link" to="/">Home</router-link>
              <router-link class="nav-item nav-link" to="/courses">Courses</router-link>
              <router-link class="nav-item nav-link" to="/about">About</router-link>
            </div>
          </div>
          -->
      </div>
    </nav>
  </header>
</template>

<script>
export default {
  props: {
    //course: Array
    course: Object,
  },
};
</script>
<style>
.app-name,
.app-name:hover {
  color: #fff;
  text-decoration: unset;
}
</style>
