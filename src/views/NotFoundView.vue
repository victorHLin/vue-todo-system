<template>
    <h1>Route Not Found</h1>
    <div>You will be redirected to login page</div>
</template>

<script setup>
import { useRouter } from 'vue-router';
import {onMounted} from 'vue'

const router = useRouter();
onMounted(() =>{
    setTimeout(() =>{
        router.push('/')
    }, 3000)
});

</script>