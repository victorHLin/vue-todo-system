<script setup>
import { useRouter } from 'vue-router'
import { onMounted } from 'vue'

const router = useRouter()
onMounted(() => {
  setTimeout(() => {
    router.push('/')
  }, 3000)
})
</script>

<template>
  <div id="notFound">
    <h1>Route Not Found</h1>
    <div>You will be redirected to login page</div>
  </div>
</template>

<style>
#notFound {
  position: fixed;
  top: 0;
  left: 0;
  width: 100%;
  height: 100%;
  display: flex;
  justify-content: center;
  align-items: center;
  flex-direction: column;
}
</style>
