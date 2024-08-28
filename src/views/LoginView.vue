<script setup>
import { ref } from 'vue'
import axios from 'axios'
import { useRouter } from 'vue-router'
const router = useRouter()

const api = 'https://todolist-api.hexschool.io'

//sign in
const signInField = ref({
  email: '',
  password: ''
})

const signInRes = ref('')
const signInErrMsg = ref('')
const token = ref('')

const signIn = async () => {
  try {
    const res = await axios.post(`${api}/users/sign_in`, signInField.value)

    signInRes.value = res.data.token
    document.cookie = `customName=${res.data.token};`
    token.value = res.data.token
    signInErrMsg.value = ''
    router.push('/todo')
  } catch (err) {
    // console.log(err)
    signInErrMsg.value = err.response.data.message
    console.log(err.response.data.message)
    signInField.value.email = ''
    signInField.value.password = ''
  }
}
</script>

<template>
  <div id="loginPage" class="bg-yellow">
    <div class="conatiner loginPage vhContainer">
      <div class="side">
        <a href="#"
          ><img
            class="logoImg"
            src="https://raw.githubusercontent.com/hexschool/2022-web-layout-training/main/todolist/logo.png"
            alt=""
        /></a>
        <img
          class="d-m-n"
          src="https://raw.githubusercontent.com/hexschool/2022-web-layout-training/main/todolist/img.png"
          alt="workImg"
        />
      </div>
      <div>
        <form class="formControls" action="index.html">
          <h2 class="formControls_txt">Todo List</h2>
          <label class="formControls_label" for="email">Email</label>
          <input
            class="formControls_input"
            type="text"
            id="email"
            name="email"
            placeholder="Please insert email"
            required
            v-model="signInField.email"
          />
          <label class="formControls_label" for="pwd">Password</label>
          <input
            class="formControls_input"
            type="password"
            name="pwd"
            id="pwd"
            placeholder="Please insert password"
            required
            v-model="signInField.password"
          />
          <span v-if="signInErrMsg">{{ signInErrMsg }}</span>
          <input class="formControls_btnSubmit" type="button" @click="signIn()" value="Login" />
          <a class="formControls_btnLink" href="#" @click.prevent="router.push('/register')"
            >Register</a
          >
        </form>
      </div>
    </div>
  </div>
</template>
