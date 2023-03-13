<template>
  <section id="registerpage" class="w3-animate-opacity page">
      <div class="containter-lg p-5">
        <div class="row justify-content-center w-100 h-100 p-5">
          <div class="col-sm-6  h-100">
            <img class="h-100" src="../asset/asset1.svg" width="100%" alt="" srcset="">
          </div>
          <div class="col-sm-5 h-100 w-100 shadow-lg rounded p-4">
            <h1 class="text-dark">Hello, Register Here</h1>
           
            <form class="form-container" @submit.prevent= "register">
              <div class="form-group textbox">
                <label class="text-dark" for="loginemail">Username</label>
                <input v-model= "username" type="text" placeholder="input username here" class="form-control" aria-describedby="emailHelp">
               </div>
              <div class="form-group textbox">
                <label class="text-dark" for="loginemail">Email</label>
                <input v-model= "email" type="email" placeholder="input email here" class="form-control"  aria-describedby="emailHelp">
               </div>
              <div class="form-group textbox">
                <label class="text-dark" for="inputpassword">Password</label>
                <input v-model= "password" type="password" placeholder="input your password" class="form-control">
                <small @click= "tologin" style="cursor: pointer;"  class="text-primary">Login here </small>
              </div>
              <div class="">
                <button type="submit" class="btn btn-primary">Register</button>
              </div>
            </form>
          </div>
        </div>
      </div>
    </section>
</template>

<script>
export default {
    name: 'register',
    data() {
        return {
            email: '',
            password: '',
            username: '',
            page: ''
        }
    },
    methods: {
        register() {
        let payload = {
            email: this.email,
            password: this.password,
            username: this.username
            }
        this.$emit('register', payload)
        },
        tologin() {
        let payload = {
                page: 'login'
            }
        this.$emit('tologin', payload)
        }
    }
}
</script>

<style>

</style>