<template>
  <div class="col-sm category m-3 p-1 w-100 rounded mt-2">
      <div class="border m-0 p-0 w-100 border-dark bg-dark rounded shadow-lg">
          <div class=" row text-center w-100 m-0 p-0 rounded"> 
            <h3 class="mt-1 pt-1 text-center col-sm-auto flex-fill"
              :class="`text-${category.color}`"> {{category.title}}</h3>
            <button class="btn btn-dark col-sm-2 flex-shrink-1 m-0 p-0" @click.prevent="showaddtask" alt="add task" aria-placeholder="add task"> + </button>
          </div>
          <div class="card task form p-1 m-1" v-show="showadd" id="addtask">
                  <div  class="card-body p-0 m-0 container-fluid w-100 task" >
                    <div class="row w-100 m-0 p-0 justify-content-between">
                        <h4 class=" m-0 p-2 flex-fill">Add task to {{category.title}} </h4>
                        <button @click="tutup" class="m-1 flex-shrink-1 btn btn-danger float-right h-25 w-auto" > X </button>
                      <form @submit.prevent="addtask" class="m-1 p-0 pr-1 w-100" >
                        <input v-model="title" class="w-100 card-title form-control m-0 " placeholder="title">
                        <textarea v-model="detail" class="w-100 mb-1 form-control m-0 " type="text"  placeholder="detail"></textarea>
                        <button type="submit" class="btn btn-info">Add task</button>
                      </form>
                    </div>
                  </div>
                </div>
          <div class="category-body text-start p-1 mt-0 rounded">         
              <div class="m-0 p-1">
                <draggable :list="taskpercategory" group='task' 
                :move="onMove" :category="category.title"
                @end="updated"
                >
                  <Task v-for="task in taskpercategory" 
                  :key="task.id" 
                  :id="task.id"
                  :taskdetail="task"
                  :user="user"
                  @edittask="edittask"
                  @deletetask="deletetask"
                  ></Task>
                </draggable>               
              </div>
          </div>    
      </div> 
  </div>
</template>

<script>
import Task from './Task.vue'
import draggable from 'vuedraggable'
export default {
  name: 'category',
  props: ['category', 'listtask', 'user'],
  components: {Task, draggable},
  data () {
    return {
      showadd: false,
      showedit: false,
      title: '', 
      detail:'', 
      addcategory: this.category.title,
      currentId: null,
      currentcategory: null,
      updateTitle: null,
      updateDesc: null,
      updateCategory: null
      
    }
  },
  methods: {
    showaddtask() {
      this.showadd = true
    },
    addtask(){
      let payload = {
        title: this.title,
        detail: this.detail,
        category: this.addcategory
      }
      console.log(payload);
      this.showadd = false
      this.$emit('addtask', payload)
      this.title = ''
      this.detail = ''
      this.category = ''
    },
    showeddittask(payload) {
      console.log(payload);
      this.showedit = payload.show
    },
    edittask(payload){
      this.$emit('edittask', payload)
    },
    deletetask(payload){
      this.$emit('deletetask', payload)
    },
    onMove(ev) {
      // console.log(ev, "ini ev");
      // console.log(ev.draggedContext.element.title);
      // console.log(ev.draggedContext.element.detail);
      // console.log(ev.relatedContext.component.$attrs.category);
      this.currentId = ev.draggedContext.element.id
      this.currentcategory = ev.relatedContext.component.$attrs.category
      this.updateTitle = ev.draggedContext.element.title,
      this.updateDetail = ev.draggedContext.element.detail
    },
    tutup(){
      this.showadd = false
    },
    updated() {
       let data = {
        id: this.currentId,
        title: this.updateTitle,
        detail: this.updateDetail,
        category: this.currentcategory
      }
      this.$emit('dragged', data)
    }
  },
  computed: {
    taskpercategory(){
      let result = []
            this.listtask.forEach(task => {
                if (task.category === this.category.title){
                    result.push(task)
                }
            })
      return result 
    }
  }
  
}
</script>

<style>

</style>