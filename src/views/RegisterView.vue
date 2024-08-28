<script setup>
import { ref } from 'vue'
import axios from 'axios'
import { useRouter } from 'vue-router'
const router = useRouter()

// sign up
const signupField = ref({
  email: '',
  password: '',
  passwordConfirm: '',
  nickname: ''
})

const signupRes = ref('')
const signupErrMsg = ref('')

const api = 'https://todolist-api.hexschool.io'

const signup = async () => {
  if (signupField.value.password !== signupField.value.passwordConfirm) {
    signupErrMsg.value = 'Passwords are not the same'
    return
  }
  try {
    const res = await axios.post(`${api}/users/sign_up`, signupField.value)
    signupRes.value = res.data.uid
    signupErrMsg.value = ''
    setTimeout(() => {
      alert('Register success! Please login')
      router.push('/login')
    }, 500)
  } catch (err) {
    signupErrMsg.value = err.response.data.message
  }
}
</script>

<template>
  <div id="signUpPage" class="bg-yellow">
    <div class="conatiner signUpPage vhContainer">
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
          <h2 class="formControls_txt">Register</h2>
          <label class="formControls_label" for="email">Email</label>
          <input
            class="formControls_input"
            type="text"
            id="email"
            name="email"
            placeholder="Please insert email"
            required
            v-model="signupField.email"
          />
          <label class="formControls_label" for="name">Nickname</label>
          <input
            class="formControls_input"
            type="text"
            name="name"
            id="name"
            placeholder="Please insert your name"
            v-model="signupField.nickname"
          />
          <label class="formControls_label" for="pwd">Password</label>
          <input
            class="formControls_input"
            type="password"
            name="pwd"
            id="pwd"
            placeholder="Please insert password"
            required
            v-model="signupField.password"
          />
          <label class="formControls_label" for="pwdConfirm">Confirm Password</label>
          <input
            class="formControls_input"
            type="password"
            name="pwdConfirm"
            id="pwdConfirm"
            placeholder="Please insert password again"
            required
            v-model="signupField.passwordConfirm"
          />
          <span v-if="signupErrMsg">{{ signupErrMsg }}</span>
          <input class="formControls_btnSubmit" type="button" @click="signup()" value="Register" />
          <a class="formControls_btnLink" href="#" @click.prevent="router.push('login')">Login</a>
        </form>
      </div>
    </div>
  </div>
</template>
