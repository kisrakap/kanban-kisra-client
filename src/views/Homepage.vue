<template>
  <div>
      <section class="homepage page container-block w-100">
        <navbar :user="user"
                @logout="logout"
        ></navbar>
        <div class="container-block mx-auto p-2 w-100">
          <div class="row categories ml-2 mr-2 h-100 justify-content-between">
              <category v-for="(category, i) in listcategory" 
              :key="i" 
              :category="category" 
              :listtask="listtask"   
              @edittask="edittask"
              @addtask="addtask"
              @deletetask="deletetask"
              @dragged="dragged"></category>               
          </div>
        </div>
      </section>
  </div>
</template>

<script>
import category from '../components/category.vue'
import navbar from '../components/navbar.vue'
export default {
    name: 'Homepage',
    props: ['listtask', 'user'],
    components: { category, navbar },
    data(){
      return {
        listTask: [],
        listcategory: [
          { title: "Backlog",
            color: "light"
          },
          { title: "Todo",
            color: "info"
          },
          { title: "Done",
            color: "warning"
          },
          { title: "Completed",
            color: "success"}
        ]
      }
    },
    methods: {
      fetchdata(){
      console.log(this.listtask);
      this.listTask = this.listtask
      },
        edittask(payload){
          this.$emit('edittask', payload)
        },
        addtask(payload) {
          this.$emit('addtask', payload)
        },
        deletetask(payload){
          this.$emit('deletetask', payload)
        },
        logout() {
          let payload = {
            page: 'login'
          }
          this.$emit('logout', payload)
        },
        dragged(data) {
          this.$emit('dragged', data)
        }
  },  
  created(){
      this.fetchdata()
    }

}

</script>

<style>

</style>