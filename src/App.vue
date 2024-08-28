<script setup>
import { RouterView } from 'vue-router'
import axios from 'axios'
import { ref } from 'vue'

const loading = ref(false)

axios.interceptors.request.use(
  (config) => {
    loading.value = true
    return config
  },
  (error) => {
    loading.value = false
    return Promise.reject(error)
  }
)

axios.interceptors.response.use(
  (response) => {
    loading.value = false
    return response
  },
  (error) => {
    loading.value = false
    return Promise.reject(error)
  }
)
</script>

<template>
  <div v-if="loading">
    <div id="spinner-div" class="pt-5">
      <div class="spinner-border text-primary" role="status"></div>
      <p id="loading">Loading...</p>
    </div>
  </div>
  <RouterView />
</template>

<style>
#spinner-div {
  position: fixed;
  top: 0;
  left: 0;
  width: 100%;
  height: 100%;
  display: flex;
  justify-content: center;
  align-items: center;
  background-color: rgba(255, 255, 255, 0.8);
  z-index: 9999;
  flex-direction: column;
}
</style>
