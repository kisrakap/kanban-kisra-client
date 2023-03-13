<template>
  <div class="container-block m-0 p-0 mr-0 w-100">
          <nav class="navbar row p-1 w-100 m-0 navbar-light transparent justify-content-between d-flex align-items-center bg-dark shadow-lg">
              <ul class="col-sm ml-3 text-left d-flex align-items-center mb-0">
                  <li class="d-flex mb-0">
                    <button class="btn btn-danger" @click="logout"> logout</button>
                  </li>
              </ul>
              <ul class="col-sm d-flex mb-0 justify-content-center text-center">
                  <h2 class="text-light text-center">KANBAN</h2>
              </ul>
              <ul class="col-sm mb-1 mr-0 pr-2 w3-animate-fading d-flex text-right justify-content-end">
                  <h5 href="" class="users text-center align-items-center mb-0 text-light"> hello {{user}}</h5>
                  <div class="text-center "> <img :src="`https://avatars.dicebear.com/api/human/${user}.svg`" width="40px" alt=""></div>
              </ul>
          </nav>
        </div>
</template>

<script>
export default {
name: 'navbar',
props: ['user'],
methods: {
     logout() {
          let payload = {
            page: 'login'
          }
          this.$emit('logout', payload)
        },
}
}

</script>

<style>

</style>