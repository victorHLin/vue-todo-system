<script setup>
import { ref, onMounted } from 'vue'
import axios from 'axios'
import { RouterView, useRouter } from 'vue-router'
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
    // getTodos()

    newTodo.value = ''
    router.push('/todo/all')
    var navItems = document.querySelectorAll('.nav-item')
    for (var i = 0; i < navItems.length; i++) {
      if (navItems[i].id === 'all') {
        navItems[i].classList.add('active')
      } else {
        navItems[i].classList.remove('active')
      }
    }
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

const changeActive = (e) => {
  console.log(e.target.id)
  var navItems = document.querySelectorAll('.nav-item')
  for (var i = 0; i < navItems.length; i++) {
    if (navItems[i].id === e.target.id) {
      navItems[i].classList.add('active')
    } else {
      navItems[i].classList.remove('active')
    }
  }
  //document.querySelector(`#${e.target.id}`).classList.add('active')
  router.push(`/todo/${e.target.id}`)
}

//const active=ref('all')
</script>

<template>
  <div id="todoListPage" class="bg-half">
    <nav>
      <h1><a href="#">ONLINE TODO LIST</a></h1>
      <ul>
        <li class="todo_sm">
          <a href="#"
            ><span>{{ user.nickname }}'s Todo List</span></a
          >
        </li>
        <li><a href="#" @click="signout">Logout</a></li>
      </ul>
    </nav>
    <div class="conatiner todoListPage vhContainer">
      <div class="todoList_Content">
        <div class="inputBox">
          <input type="text" placeholder="Enter Task" v-model="newTodo" />
          <a href="#" @click.prevent="addTodo()">
            <i class="fa fa-plus"></i>
          </a>
        </div>
        <div class="todoList_list">
          <ul class="todoList_tab">
            <li>
              <a href="#" id="all" class="nav-item active" @click.prevent="changeActive">All</a>
            </li>
            <li>
              <a href="#" id="working" class="nav-item" @click.prevent="changeActive">Working</a>
            </li>
            <li><a href="#" id="done" class="nav-item" @click.prevent="changeActive">Done</a></li>
          </ul>
          <div class="todoList_items">
            <RouterView />
          </div>
        </div>
      </div>
    </div>
  </div>
</template>
