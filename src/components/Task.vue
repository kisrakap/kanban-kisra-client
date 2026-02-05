<template>
  <div class="card task compact m-1">
    <div class="card-body p-2 m-0 container-fluid w-100" v-show="taskkart">
      <div
        class="d-flex flex-row align-items-start w-100 m-0 p-0 justify-content-between"
      >
        <div class="flex-fill pr-2">
          <h6
            class="card-title m-0 p-0 text-truncate"
            :title="taskdetail.title"
          >
            <b>{{ taskdetail.title }}</b>
          </h6>
          <p
            class="detail text-muted m-0 mt-1 text-truncate"
            :title="taskdetail.detail"
          >
            {{ taskdetail.detail }}
          </p>
        </div>
        <div v-if="isOwner" class="actions d-flex flex-column ml-2">
          <button
            class="btn btn-sm btn-info mb-1"
            style="cursor: pointer"
            @click="showedittask"
          >
            Edit
          </button>
          <button
            class="btn btn-sm btn-outline-danger"
            style="cursor: pointer"
            @click="deletetask"
          >
            Delete
          </button>
        </div>
      </div>
      <div class="mt-2 d-flex align-items-center small-info">
        <img
          class="avatar"
          :src="`https://api.dicebear.com/9.x/pixel-art/svg?seed=${taskdetail.User.email}`"
          alt=""
        />
        <span class="ml-2 small text-muted truncate">{{
          taskdetail.User.email
        }}</span>
      </div>
    </div>
    <div class="card-body p-2 m-0 container-fluid w-100" v-show="showedit">
      <div class="row w-100 m-0 p-0">
        <form class="m-0 p-0 w-100" @submit.prevent="edit">
          <input
            v-model="edittitle"
            class="w-100 m-0 card-title form-control form-control-sm"
            placeholder="title"
          />
          <select
            class="card-title form-control m-0 w-100 form-control-sm mt-1"
            name="category"
            id="category"
            v-model="editcategory"
          >
            <option value="Backlog">Backlog</option>
            <option value="Todo">Todo</option>
            <option value="Done">Done</option>
            <option value="Completed">Completed</option>
          </select>
          <textarea
            v-model="editdetail"
            class="m-0 w-100 mb-1 form-control form-control-sm mt-1"
            type="text"
            placeholder="detail"
          ></textarea>
          <button type="submit" class="btn btn-sm btn-info w-100">Save</button>
        </form>
      </div>
    </div>
  </div>
</template>

<script>
export default {
  name: "Task",
  props: ["taskdetail", "user", "userId"],
  data() {
    return {
      showedit: false,
      taskkart: true,
      edittitle: this.taskdetail.title,
      editcategory: this.taskdetail.category,
      editdetail: this.taskdetail.detail,
    };
  },
  computed: {
    isOwner() {
      // Prefer comparing numeric user id when available
      if (this.userId != null) {
        const taskUserId =
          this.taskdetail && this.taskdetail.User && this.taskdetail.User.id;
        if (taskUserId != null)
          return String(taskUserId) === String(this.userId);
      }
      // Fallback: compare by email or username (supports older behavior)
      const current = this.user || "";
      const taskUser = (this.taskdetail && this.taskdetail.User) || {};
      const email = taskUser.email || "";
      const username = taskUser.username || "";
      return (
        current &&
        (current === email ||
          current === username ||
          email.includes(current) ||
          username.includes(current))
      );
    },
  },
  methods: {
    showedittask() {
      this.showedit = true;
      this.taskkart = false;
    },
    edit() {
      this.taskkart = true;
      this.showedit = false;

      let payload = {
        id: this.taskdetail.id,
        title: this.edittitle,
        detail: this.editdetail,
        category: this.editcategory,
      };
      console.log(payload, "dari task");
      this.$emit("edittask", payload);
    },
    deletetask() {
      let payload = {
        id: this.taskdetail.id,
      };
      console.log(payload);
      this.$emit("deletetask", payload);
    },
  },
};
</script>

<style scoped>
.task.compact {
  padding: 6px;
  margin-bottom: 8px;
  border-radius: 6px;
}
.task.compact .card-title {
  font-size: 14px;
}
.task.compact .detail {
  font-size: 12px;
  max-height: 36px;
  overflow: hidden;
}
.task.compact .actions {
  min-width: 70px;
}
.avatar {
  width: 28px;
  height: 28px;
  border-radius: 50%;
}
.small-info .truncate {
  max-width: 160px;
  display: inline-block;
  overflow: hidden;
  text-overflow: ellipsis;
  white-space: nowrap;
}
.text-truncate {
  overflow: hidden;
  text-overflow: ellipsis;
  white-space: nowrap;
}

@media (max-width: 576px) {
  .task.compact .actions {
    flex-direction: row;
    gap: 6px;
  }
  .task.compact .actions button {
    padding: 4px 6px;
  }
  .small-info .truncate {
    max-width: 120px;
  }
}
</style>
