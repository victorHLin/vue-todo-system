<script setup>
import { ref, onMounted } from 'vue'
import axios from 'axios'
import { useRouter } from 'vue-router'
const router = useRouter()

const api = 'https://todolist-api.hexschool.io'

const user = ref({
  nickname: '',
  uid: ''
})

const token = ref('')

//validation
onMounted(async () => {
  const cookie = document.cookie.replace(/(?:(?:^|.*;\s*)customName\s*=\s*([^;]*).*$)|^.*$/, '$1')
  token.value = cookie
  if (cookie) {
    validation()
  } else {
    this.$router.push('login')
  }
})

const validation = async () => {
  try {
    const res = await axios.get(`${api}/users/checkout`, {
      headers: {
        Authorization: token.value
      }
    })
    user.value = res.data
    getTodos()
  } catch (err) {
    // validation failed should logout the user
    console.log(err.response.data.message)
    signout()
  }
}

// signout
const signout = async () => {
  try {
    await axios.post(
      `${api}/users/sign_out`,
      {},
      {
        headers: {
          Authorization: token.value
        }
      }
    )
    token.value = ''
    document.cookie = `customName=;`
    user.value = {}
    router.push('login')
  } catch (err) {
    console.log(err.response.data.message)
  }
}

const todos = ref([])

// get todos
const getTodos = async () => {
  try {
    const response = await axios.get(`${api}/todos`, {
      headers: {
        Authorization: token.value
      }
    })
    todos.value = response.data.data
  } catch (err) {
    console.log(err.response.data.message)
  }
}

// add todo
const newTodo = ref('')

const addTodo = async () => {
  try {
    await axios.post(
      `${api}/todos`,
      { content: newTodo.value },
      {
        headers: {
          Authorization: token.value
        }
      }
    )
    getTodos()

    newTodo.value = ''
  } catch (err) {
    console.log(err.response.data.message)
  }
}

// update
/*
const isEditing = ref(-1)
const tempTitle = ref('')

const edit = (index) => {
  isEditing.value = index
  tempTitle.value = todos.value[index].content
}

const confirm = async () => {
  try {
    await axios.put(
      `${api}/todos/${todos.value[isEditing.value].id}`,
      { content: tempTitle.value },
      {
        headers: {
          Authorization: token.value
        }
      }
    )

    getTodos()
    cancel()
  } catch (err) {
    console.log(err.response.data.message)
  }
}

const cancel = () => {
  tempTitle.value = ''
  isEditing.value = -1
}
*/
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

//const active=ref('all')
</script>

<template>
  <div id="todoListPage" class="bg-half">
    <nav>
      <h1><a href="#">ONLINE TODO LIST</a></h1>
      <ul>
        <li class="todo_sm">
          <a href="#"><span>{{user.nickname}} Todo List</span></a>
        </li>
        <li><a href="#" @click="signout">Logout</a></li>
      </ul>
    </nav>
    <div class="conatiner todoListPage vhContainer">
      <div class="todoList_Content">
        <div class="inputBox">
          <input type="text" placeholder="Enter Task" v-model="newTodo" />
          <a href="#" @click="addTodo()">
            <i class="fa fa-plus"></i>
          </a>
        </div>
        <div class="todoList_list">
          <ul class="todoList_tab">
            <li><a href="#" class="active">All</a></li>
            <li><a href="#">Working</a></li>
            <li><a href="#">Done</a></li>
          </ul>
          <div class="todoList_items">
            <ul class="todoList_item">
              <li v-for="todo in todos" :key="todo.id">
                <label class="todoList_label">
                  <input
                    class="todoList_input"
                    type="checkbox"
                    value="todo.status"
                    @click="toggleStatus(todo.id)"
                  />
                  <span>{{ todo.content }}</span>
                </label>
                <a href="#" @click="deleteTodo(item.id)">
                  <i class="fa fa-times"></i>
                </a>
              </li>
            </ul>
            <div class="todoList_statistics">
              <p> X todo Done</p>
            </div>
          </div>
        </div>
      </div>
    </div>
  </div>
</template>
