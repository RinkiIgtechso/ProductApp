<template>
  <div class="post">
    <!-- <router-link :to="{ name: 'Details', params: {id: post.id} }">
        <h3>{{ post.title }}</h3>
    </router-link> -->
    <!-- <p></p>
    <span v-for="tag in post.tags" :key="tag">
        #{{ tag }}
    </span> -->
    <div class="list">
        <h3>{{ post.title }}</h3>
        <p>{{ post.description }}</p>
    </div>
  </div>
</template>

<script>

import { computed } from 'vue';

export default {
    props: [ 'post' ],
    setup(props){
        // const snippet = computed(()=>{
        //     return props.post.body.substring(0,40) + '...'
        // })

        // return { snippet }
    }
}
</script>

<style>
    
</style>