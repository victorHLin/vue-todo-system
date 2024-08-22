<script setup>
// import { RouterView } from 'vue-router'
// import LoginView from './views/LoginView.vue';
import { ref, onMounted } from 'vue'
import axios from 'axios'
// import RegisterView from './views/RegisterView.vue';
// import TodoView from './views/TodoView.vue';
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
    router.push({ name: 'todo' })
  } catch (err) {
    // validation failed should logout the user
    console.log(err.response.data.message)
    router.push({ name: 'login' })
  }
}
</script>

<template>
  <header>
    <!-- <LoginView/> -->
    <!-- <RegisterView/>  -->
    <!-- <TodoView/> -->
    <router-view></router-view>
  </header>
</template>

<style scoped></style>
