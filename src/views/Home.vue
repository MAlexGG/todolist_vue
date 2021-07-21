<template>
  <div class="home">
    <h1>Todo</h1>
    <ul>
      <li v-for="todo of todos" :key="todo.id">
        <textarea v-model="todo.title"></textarea>
        <button @click="deleteTodo(todo.id)">Delete</button>

        <button @click="updateTodo(todo)">Update</button>
      </li>
    </ul>
    <input type="text" v-model="todoTitle" placeholder="New Task">
    <button type="submit" @click="addTodo()">OK</button>
  
  </div>
</template>
<script>


import { courseService } from "../../services/courseService";

export default {
  name: 'Home',
  components: {
  },
  data () {
    return {
      todos: [],
      todoTitle:'',

    }
  },
  async created () {
    try {
      const res = await courseService.getAll()
      this.todos = res.data;
      } catch (e) {
      console.error(e)
    }
  },
  methods: {
    async addTodo() {
      let newTodo = this.todoTitle
      await courseService.createTodo(newTodo)

     const res = await courseService.getAll() 

      this.todos = res.data
      this.todoTitle = ''
    },

    async deleteTodo(id) {
      await courseService.deleteTodo(id)

      const res = await courseService.getAll() 

      this.todos = res.data

      
    },
    
    async updateTodo(todo){
      let data = {
        id: todo.id,
        title: todo.title,
        isFinished: todo.isFinished
      }
      const res = await courseService.updateTodo(todo.id, data)
      this.todos = res.data
      this.$router.go();
    }
  }
}
</script>
