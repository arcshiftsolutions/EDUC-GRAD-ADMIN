<template>
  <div id="app">
    <!-- <Header></Header> -->
    <Bcheader style="margin-top:50px;margin-bottom: 28px;"></Bcheader>
    <div class="main-container">
      <router-view />
    </div>
  </div>
</template>
<script>
import Bcheader from "@/components/BCHeader";
export default {
  components: {
    Bcheader,
  },
};
</script>
<style lang="css">
@import "/node_modules/@bcgov/bootstrap-theme/dist/css/bootstrap-theme.min.css";
</style>

<style>
#app {
  -webkit-font-smoothing: antialiased;
  -moz-osx-font-smoothing: grayscale;
}
.main-container {
  margin: 35px;
  margin-top: 130px;
}
.logo {
  align-self: center;
  color: #fff;
  font-weight: bold;
  font-family: "Lato";
}

.main-nav {
  display: flex;
  justify-content: space-between;
  padding: 0.5rem 0.8rem;
}

ul.sidebar-panel-nav {
  list-style-type: none;
}

ul.sidebar-panel-nav > li > a {
  color: #fff;
  text-decoration: none;
  font-size: 1.2rem;
  display: block;
  padding-bottom: 0.5em;
}
</style>
