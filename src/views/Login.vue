<template>
  <div>
    <section id="loginpage" class="w3-animate-opacity page">
      <div class="containter-lg login p-5">
        <div class="row justify-content-center w-100 h-100 p-5">
          <div class="col-sm-6 h-100">
            <img
              class="h-100"
              src="../asset/asset1.svg"
              width="100%"
              alt=""
              srcset=""
            />
          </div>
          <div class="col-sm-5 w-50 h-100 shadow-lg rounded p-4">
            <h1 class="text-dark">Hello, Login Here</h1>

            <form class="form-container" @submit.prevent="login()">
              <div class="form-group textbox">
                <label class="text-dark" for="loginemail">Email</label>
                <input
                  v-model="email"
                  type="email"
                  placeholder="input email here"
                  class="form-control"
                  id="email"
                  aria-describedby="emailHelp"
                />
              </div>
              <div class="form-group textbox">
                <label class="text-dark" for="inputpassword">Password</label>
                <input
                  v-model="password"
                  type="password"
                  placeholder="input your password"
                  class="form-control"
                  id="password"
                />
                <small
                  @click="toregister()"
                  style="cursor: pointer"
                  class="text-dark"
                  >Register here
                </small>
              </div>
              <div class="">
                <button type="submit" class="btn btn-primary">Login</button>
              </div>
            </form>
            <div class="mt-3">
              <button
                :data-clientid="clientId"
                @click="handleGoogleSignIn"
                class="google-signin-button btn btn-info mt-1 w-100"
              >
                Continue with Google
              </button>
            </div>
          </div>
        </div>
      </div>
    </section>
  </div>
</template>

<script>
export default {
  name: "Login",
  data() {
    return {
      email: "",
      password: "",
      clientId:
        "245291727558-vofc4itller4qprc8d0rtsmgpc4d6vhj.apps.googleusercontent.com",
    };
  },
  mounted() {
    this.initGoogleSignIn();
  },
  methods: {
    initGoogleSignIn() {
      if (window.gapi) {
        window.gapi.load("auth2", () => {
          window.gapi.auth2.init({
            client_id: this.clientId,
          });
        });
      }
    },
    handleGoogleSignIn() {
      if (window.gapi && window.gapi.auth2) {
        const auth2 = window.gapi.auth2.getAuthInstance();
        auth2
          .signIn()
          .then((googleUser) => {
            const idToken = googleUser.getAuthResponse().id_token;
            this.OnGoogleAuthSuccess(idToken);
          })
          .catch((error) => {
            this.OnGoogleAuthFail(error);
          });
      }
    },
    login() {
      let payload = {
        email: this.email,
        password: this.password,
      };
      this.$emit("login", payload);
    },
    toregister() {
      let payload = {
        page: "register",
      };
      this.$emit("toregister", payload);
    },
    OnGoogleAuthSuccess(idToken) {
      // Receive the idToken and make your magic with the backend
      console.log(idToken, "token");
      let payload = {
        token: idToken,
      };
      this.$emit("googlelogin", payload);
    },
    OnGoogleAuthFail(error) {
      console.log(error, "error");
    },
  },
};
</script>

<style>
.google-signin-button {
  display: flexbox;
  color: rgb(48, 42, 42);
  background-color: rgba(140, 146, 146, 0.986);
  font-size: 16px;
  border-radius: 5px;
}
</style>
