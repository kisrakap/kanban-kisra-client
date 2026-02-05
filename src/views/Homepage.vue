<template>
  <div>
    <section class="homepage page container-block w-100">
      <navbar :user="user" @logout="logout"></navbar>
      <div class="container-block mx-auto p-2 w-100">
        <div class="categories d-flex flex-wrap mx-n2">
          <category
            v-for="(category, i) in listcategory"
            :key="i"
            :category="category"
            :listtask="listtask"
            :user="user"
            :userId="userId"
            @edittask="edittask"
            @addtask="addtask"
            @deletetask="deletetask"
            @dragged="dragged"
            class="px-2 py-1"
          />
        </div>
      </div>
    </section>
  </div>
</template>

<script>
import category from "../components/category.vue";
import navbar from "../components/navbar.vue";
export default {
  name: "Homepage",
  props: ["listtask", "user", "userId"],
  components: { category, navbar },
  data() {
    return {
      listTask: [],
      listcategory: [
        { title: "Backlog", color: "light" },
        { title: "Todo", color: "info" },
        { title: "Done", color: "warning" },
        { title: "Completed", color: "success" },
      ],
    };
  },
  methods: {
    fetchdata() {
      console.log(this.listtask);
      this.listTask = this.listtask;
    },
    edittask(payload) {
      this.$emit("edittask", payload);
    },
    addtask(payload) {
      this.$emit("addtask", payload);
    },
    deletetask(payload) {
      this.$emit("deletetask", payload);
    },
    logout() {
      let payload = {
        page: "login",
      };
      this.$emit("logout", payload);
    },
    dragged(data) {
      this.$emit("dragged", data);
    },
  },
  created() {
    this.fetchdata();
  },
};
</script>

<style scoped>
.categories {
  gap: 12px;
}
.categories > * {
  box-sizing: border-box;
}
@media (min-width: 992px) {
  .categories > * {
    flex: 0 0 calc((100% - 36px) / 4);
    max-width: calc((100% - 36px) / 4);
  }
}
@media (min-width: 576px) and (max-width: 991px) {
  .categories > * {
    flex: 0 0 calc((100% - 24px) / 2);
    max-width: calc((100% - 24px) / 2);
  }
}
@media (max-width: 575px) {
  .categories > * {
    flex: 0 0 100%;
    max-width: 100%;
  }
}
</style>
