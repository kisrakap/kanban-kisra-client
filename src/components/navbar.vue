<template>
  <div class="container-block m-0 p-0 mr-0 w-100">
    <nav
      class="navbar row p-1 w-100 m-0 navbar-light transparent justify-content-between d-flex align-items-center bg-dark compact-navbar"
    >
      <div class="d-flex align-items-center">
        <button class="btn btn-sm btn-danger mr-2" @click="logout">
          logout
        </button>
      </div>
      <div>
        <h2 class="text-light text-center mb-0 d-block d-sm-none">KANBAN</h2>
      </div>
      <div class="d-flex align-items-center">
        <span class="users text-light small mr-2">hello {{ user }}</span>
        <div class="text-center">
          <img
            :src="`https://api.dicebear.com/9.x/pixel-art/svg?seed=${user}`"
            class="nav-avatar"
            alt=""
          />
        </div>
      </div>
    </nav>
  </div>
</template>

<script>
export default {
  name: "navbar",
  props: ["user"],
  methods: {
    logout() {
      let payload = {
        page: "login",
      };
      this.$emit("logout", payload);
    },
  },
};
</script>

<style scoped>
.compact-navbar {
  padding: 8px 12px;
}
.compact-navbar .users {
  margin-right: 6px;
}
.nav-avatar {
  width: 36px;
  height: 36px;
  border-radius: 50%;
}
@media (max-width: 576px) {
  .compact-navbar {
    padding: 6px 8px;
  }
  .nav-avatar {
    width: 30px;
    height: 30px;
  }
}
</style>
