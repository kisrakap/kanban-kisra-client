<template>
    <div class="card task transparent m-1" >
        <div class="card-body p-1 m-1 container-fluid w-100" v-show="taskkart">
            <div class="d-flex flex-row h-auto w-100 m-0 p-1 justify-content-between">
                <div class="col-sm-8 flex w-auto h-auto ml-1 p-0 ">
                    <h5 class="card-title h-auto w-100 m-0 p-0 text-wrap" ><b>{{taskdetail.title}}</b></h5>
                </div>
                <div class="col-sm-4 w-100 h-50 m-1 mr-2 p-1 pr-2 d-flex justify-content-between">
                    <button class="col flex-shrink-1 mr-2 btn p-1  btn btn-info" style="cursor:pointer;" @click="showedittask">edit</button>
                    <button class="col flex-shrink-1 btn btn-dark mr-2 p-1 text-danger" style="cursor:pointer;" @click="deletetask">delete</button>
                </div>
            </div>
            <div class="w-100 border-bottom border-secondary">
                <p class="text-wrap p-0 mt-0 mb-0 mr-0 ">{{taskdetail.detail}}</p>
            </div>
            <div class=" transparent row-fluid m-0 p-0">
                <div class="row m-0 p-0 justify-content-start d-flex ">
                    <img class=" w3-animate-fading col-1 m-0 p-0" :src="`https://avatars.dicebear.com/api/human/${taskdetail.User.email}.svg`" width="20px" alt="">
                    <h6 class="flex-fill w3-animate-fading m-0 p-0 ml-1 d-flex align-items-end w-auto text-dark ">{{taskdetail.User.email}}</h6>
                    <!-- <h6 class="col-auto flex-fill text-right align-items-end align-items-end p-0 m-0 text-muted m-0 p-0"> {{taskdetail.createdAt}}</h6> -->
                </div>
            </div>
            
        </div>
        <div class="card-body p-1 m-0 container-fluid w-100"  v-show="showedit" >
            <div  class="row w-100 m-0 p-0">
                <form  class="m-1 p-0 w-100" @submit.prevent="edit">
                <input v-model="edittitle" class="w-100 m-0 card-title form-control" placeholder="title">
                <select class="card-title form-control m-0 w-100 " name="category" id="category" placeholder="select category" v-model="editcategory">
                    <option class=" flex-fill" value="Backlog">Backlog</option>
                    <option class=" flex-fill" value="Todo">Todo</option>
                    <option class=" flex-fill" value="Done">Done</option>
                    <option class=" flex-fill" value="Completed">Completed</option>
                </select>
                <textarea v-model="editdetail" class="m-0 w-100 mb-1 form-control" type="text"  placeholder="detail"></textarea>
                <button type="submit" class="btn btn-info">edit task</button>
                </form>
            </div> 
        </div>
    </div>
</template>

<script>
export default {
name: 'Task',
props: ['taskdetail', 'user'],
data () {
    return {
        showedit: false,
        taskkart: true,
        edittitle: this.taskdetail.title,
        editcategory: this.taskdetail.category,
        editdetail: this.taskdetail.detail
    }
},
methods: {
    showedittask() {
        this.showedit = true
        this.taskkart = false
    },
    edit(){
        this.taskkart = true
        this.showedit = false

        let payload = {
          id: this.taskdetail.id,
          title: this.edittitle,
          detail: this.editdetail,
          category: this.editcategory
        }
        console.log(payload, "dari task");
        this.$emit('edittask', payload)
    },
    deletetask(){
        let payload = {
         id: this.taskdetail.id
        }
        console.log(payload);
        this.$emit('deletetask', payload)

    }
}
}

</script>

<style>

</style>