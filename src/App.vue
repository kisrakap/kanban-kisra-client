<template>
  <div>
    <Login
      v-if="page === 'login'"
      @login="login"
      @toregister="toregister"
      @googlelogin="googlelogin"
    ></Login>
    <Register
      v-else-if="page === 'register'"
      @tologin="tologin"
      @register="register"
    ></Register>
    <Homepage
      v-else-if="page === 'homepage'"
      :listtask="listtask"
      :user="user"
      :userId="userId"
      @edittask="edittask"
      @addtask="addtask"
      @deletetask="deletetask"
      @logout="logout"
      @dragged="dragged"
    ></Homepage>
  </div>
</template>

<script>
import Homepage from "./views/Homepage.vue";
import Login from "./views/Login.vue";
import Register from "./views/Register.vue";
import axios from "axios";
import swal from "sweetalert";

let api = "http://localhost:3000";

export default {
  name: "App",
  components: { Homepage, Login, Register },
  data() {
    return {
      page: "login",
      listtask: [],
      user: "",
      userId: null,
      em: "",
    };
  },
  methods: {
    auth() {
      if (localStorage.access_token) {
        this.user = localStorage.getItem("user") || this.user;
        this.userId = localStorage.getItem("userId") || this.userId;
        this.page = "homepage";
        this.fetchtask();
      } else {
        this.page = "login" || "register";
      }
    },
    login(payload) {
      axios({
        method: "post",
        url: `${api}/login`,
        data: {
          email: payload.email,
          password: payload.password,
        },
      })
        .then(({ data }) => {
          console.log(data, "ini data dari login");
          localStorage.setItem("access_token", data.access_token);
          localStorage.setItem("user", data.username);
          localStorage.setItem("userId", data.id);
          this.user = data.username;
          this.userId = data.id;
          this.auth();
          swal("Welcome", "login is successful", "success");
          this.email = "";
          this.password = "";
        })
        .catch((err) => {
          console.log(err.response.data.errors);
          this.em = err.response.data.errors;
          swal("Error", `${this.em}`, "error");
        });
    },
    tologin(payload) {
      this.page = payload.page;
    },
    toregister(payload) {
      this.page = payload.page;
    },
    register(payload) {
      axios({
        method: "post",
        url: `${api}/register`,
        data: {
          email: payload.email,
          password: payload.password,
          username: payload.username,
        },
      })
        .then((data) => {
          console.log(data);
          swal("Hello", "Register is successful", "success");
          this.auth();
          this.email = "";
          this.password = "";
          this.username = "";
        })
        .catch((err) => {
          this.em = err.response.data.errors;
          swal("Error", `${this.em}`, "error");
        });
    },
    fetchtask() {
      axios({
        method: "get",
        url: `${api}/tasks`,
        headers: { access_token: localStorage.access_token },
      })
        .then(({ data }) => {
          console.log(data);
          this.listtask = data.task;
        })
        .catch((err) => {
          console.log(err.response.data);
        });
    },
    edittask(payload) {
      console.log(payload, "dari task ke app");

      axios({
        method: "put",
        url: `${api}/tasks/${payload.id}`,
        data: {
          title: payload.title,
          category: payload.category,
          detail: payload.detail,
        },
        headers: { access_token: localStorage.access_token },
      })
        .then(({ data }) => {
          console.log(data);
          swal("", "edit data is successful", "success");
          this.title = "";
          this.category = "";
          this.detail = "";
          this.auth();
        })
        .catch((err) => {
          this.em = err.response.data.errors;
          swal("Error", `${this.em}`, "error");
        });
    },
    addtask(payload) {
      console.log(payload, "add dari task ke app");

      axios({
        method: "post",
        url: `${api}/tasks`,
        data: {
          title: payload.title,
          category: payload.category,
          detail: payload.detail,
        },
        headers: { access_token: localStorage.access_token },
      })
        .then(({ data }) => {
          console.log(data.data, "ini data add");
          swal("Added Task", "successful added task", "success");
          this.title = "";
          this.category = "";
          this.detail = "";
          this.auth();
        })
        .catch((err) => {
          console.log(err.response);
          this.em = err.response.data.errors;
          swal("Error", `${this.em}`, "info");
          this.auth();
        });
    },
    deletetask(payload) {
      axios({
        method: "delete",
        url: `${api}/tasks/${payload.id}`,
        headers: { access_token: localStorage.access_token },
      })
        .then(({ data }) => {
          console.log(data, "ini sudah di hapus");
          this.em = data.msg;
          swal("info", `${this.em}`, "info");
          this.auth();
        })
        .catch((err) => {
          this.em = err.response.data.errors;
          console.log(em);
          swal("You ", "You are not authorize to do this", "info");
        });
    },
    logout(payload) {
      localStorage.clear();
      this.page = payload.page;
    },
    googlelogin(payload) {
      axios({
        method: "post",
        url: `${api}/googlelogin`,
        data: {
          id_token: payload.token,
        },
      })
        .then(({ data }) => {
          console.log(data, "ini user google login");
          localStorage.setItem("access_token", data.access_token);
          localStorage.setItem("user", data.email);
          localStorage.setItem("userId", data.id);
          this.user = data.email;
          this.userId = data.id;
          swal("Welcome", "login is successful", "success");
          this.page = "homepage";
          this.auth();
        })
        .catch((err) => {
          console.log(err.response);
        });
    },
    dragged(data) {
      axios({
        method: "put",
        url: `${api}/tasks/${data.id}`,
        data: {
          title: data.title,
          category: data.category,
          detail: data.detail,
        },
        headers: { access_token: localStorage.access_token },
      })
        .then((data) => {
          console.log(data);
          this.auth();
        })
        .catch((err) => {
          console.log(err.response);
          swal("You ", "You are not authorize to do this", "info");
        });
    },
  },
  created() {
    this.auth();
  },
};
</script>

<style></style>
