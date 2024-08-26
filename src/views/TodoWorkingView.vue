<template>
    <ul class="todoList_item">
      <li v-for="todo in todos" :key="todo.id" >
        <div v-if="!todo.status">
        <label class="todoList_label">
          <input
            class="todoList_input"
            type="checkbox"
            v-model="todo.status"
            @click="toggleStatus(todo.id)"
          />
          <span>{{ todo.content }}</span>
        </label>
        <a href="#" @click.prevent="deleteTodo(todo.id)">
          <i class="fa fa-times">-</i>
        </a></div>
      </li>
    </ul>
    <div class="todoList_statistics">
      <p>{{DoneCount}} todo Done</p>
    </div>
  </template>
  
  <script setup>
  import { ref, onMounted, computed } from 'vue'
  import axios from 'axios'
  const api = 'https://todolist-api.hexschool.io'
  const todos = ref([])
  
  const token = ref('')
  
  onMounted(async () => {
    const cookie = document.cookie.replace(/(?:(?:^|.*;\s*)customName\s*=\s*([^;]*).*$)|^.*$/, '$1')
    token.value = cookie
    getTodos()
  })
  
  // get todos
  const getTodos = async () => {
    try {
      const response = await axios.get(`${api}/todos`, {
        headers: {
          Authorization: token.value
        }
      })
      todos.value = response.data.data
      console.log(todos.value)
    } catch (err) {
      console.log(err.response.data.message)
    }
  }
  // delete
  const deleteTodo = async (id) => {
    try {
      await axios.delete(`${api}/todos/${id}`, {
        headers: {
          Authorization: token.value
        }
      })
  
      getTodos()
    } catch (err) {
      console.log(err.response.data.message)
    }
  }
  // patch toggle
  const toggleStatus = async (id) => {
    try {
      console.log('toggle', id)
      await axios.patch(
        `${api}/todos/${id}/toggle`,
        {},
        {
          headers: {
            Authorization: token.value
          }
        }
      )
  
      getTodos()
    } catch (err) {
      console.log(err.response.data.message)
    }
  }

  const DoneCount = computed(() => {
  return todos.value.reduce((pre, next) => {
    return pre + next.status
  }, 0)
})
  </script>