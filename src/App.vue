<template>
  <main>
      <nav class="navbar navbar-expand-lg navbar-dark bg-dark">
          <div class="container-fluid">
              <router-link to="/home" class="navbar-brand" href="#">XEPOS</router-link>
              <div v-if="isLoggedIn" class="collapse navbar-collapse">
                  <div class="navbar-nav">
                      <router-link exact-active-class="active" to="/companies" class="nav-item nav-link">Company</router-link>
                      <router-link exact-active-class="active" to="/employees" class="nav-item nav-link">Employee</router-link>
                      <a href="javascript:void(0)" exact-active-class="active" @click="logoutFunction()" class="nav-item nav-link">Logout</a>
                  </div>
              </div>
              <div v-else class="collapse navbar-collapse">
                  <div class="navbar-nav">
                      <router-link exact-active-class="active" to="/login" class="nav-item nav-link">Login</router-link>
                      <router-link exact-active-class="active" to="/register" class="nav-item nav-link">Register</router-link>
                  </div>
              </div>
          </div>
      </nav>
      <div class="container mt-5">
          <router-view></router-view>
      </div>
  </main>
</template>

<script>
  import useCounter from './mixins/logoutMixin.js';
  import router from "@/router";

  export default {
    setup(){
        const {logout , isLoggedIn} = useCounter()
        function logoutFunction() {     
            router.replace("home");
            logout();
            window.location.reload();
        }
        
        return {
            logoutFunction,
            isLoggedIn
        }
    }
  }
</script>