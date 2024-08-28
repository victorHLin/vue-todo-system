<script setup>
import { ref, onMounted, computed } from 'vue'
import axios from 'axios'
import { useRouter } from 'vue-router'
const router = useRouter()

const api = 'https://todolist-api.hexschool.io'

const user = ref({
  nickname: '',
  uid: ''
})

//validation
onMounted(async () => {
  const cookie = document.cookie.replace(/(?:(?:^|.*;\s*)customName\s*=\s*([^;]*).*$)|^.*$/, '$1')
  // token.value = cookie
  axios.defaults.headers.common['Authorization'] = cookie
  if (cookie) {
    validation()
  } else {
    alert("You haven't login")
    router.push('/login')
  }
})

const validation = async () => {
  try {
    const res = await axios.get(`${api}/users/checkout`)
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
    await axios.post(`${api}/users/sign_out`, {})
    axios.defaults.headers.common['Authorization'] = ''
    document.cookie = `customName=;`
    user.value = {}
    alert('Logout success!')
    router.push('/login')
  } catch (err) {
    console.log(err.response.data.message)
  }
}

const todos = ref([])

// get todos
const getTodos = async () => {
  try {
    const response = await axios.get(`${api}/todos`)
    todos.value = response.data.data
  } catch (err) {
    console.log(err.response.data.message)
  }
}

// add todo
const newTodo = ref('')

const addTodo = async () => {
  try {
    await axios.post(`${api}/todos`, { content: newTodo.value })
    getTodos()
    newTodo.value = ''
  } catch (err) {
    console.log(err.response.data.message)
  }
}

// delete
const deleteTodo = async (id) => {
  try {
    await axios.delete(`${api}/todos/${id}`)

    getTodos()
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

const todoFilteredByActive = computed(() => {
  if (active.value === 'all') {
    return todos.value
  } else if (active.value === 'working') {
    return todos.value.filter((todo) => !todo.status)
  } else {
    return todos.value.filter((todo) => todo.status)
  }
})
const active = ref('all')
const toggleStatus = async (id) => {
  try {
    await axios.patch(`${api}/todos/${id}/toggle`, {})

    getTodos()
  } catch (err) {
    console.log(err.response.data.message)
  }
}

const WorkingCount = computed(() => {
  return todos.value.reduce((pre, next) => {
    return pre + !next.status
  }, 0)
})

const DoneCount = computed(() => {
  return todos.value.reduce((pre, next) => {
    return pre + next.status
  }, 0)
})
</script>

<template>
  <div id="todoListPage" class="bg-half">
    <nav>
      <h1><a href="#">ONLINE TODO LIST</a></h1>
      <ul>
        <li class="todo_sm">
          <a href="#" id="nickName" @click.prevent="active = 'all'"
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
              <a
                href="#"
                id="all"
                :class="{ active: active === 'all' }"
                @click.prevent="active = 'all'"
                >All</a
              >
            </li>
            <li>
              <a
                href="#"
                id="working"
                :class="{ active: active === 'working' }"
                @click.prevent="active = 'working'"
                >Working</a
              >
            </li>
            <li>
              <a
                href="#"
                id="done"
                :class="{ active: active === 'done' }"
                @click.prevent="active = 'done'"
                >Done</a
              >
            </li>
          </ul>
          <div class="todoList_items">
            <ul class="todoList_item">
              <li v-for="todo in todoFilteredByActive" :key="todo.id">
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
                  <i class="fa fa-times"></i>
                </a>
              </li>
            </ul>
            <div class="todoList_statistics">
              <p>{{ WorkingCount }} still working, {{ DoneCount }} Done</p>
            </div>
          </div>
        </div>
      </div>
    </div>
  </div>
</template>
