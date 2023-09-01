<template>
    <div class="home">
      <h1>Welcome to the homepage</h1>
      <input type="text" v-model="search">
      <p>search - term: {{ search }}</p>
      <div v-for="name in matchingNames" :key="name">{{ name }}</div><br/>
      <button @click="handleClick">Stop Watching</button>
    </div>
  </template>
   
  <script>
  import { computed, ref,watch, watchEffect } from 'vue';
  
  export default {
    name: 'Example',
    setup(){
      const search = ref('');
      const names = ref(['mario', 'yoshi', 'luigi', 'toad', 'bowser', 'koopa', 'peach']);
  
      const stopWatch = watch(search, ()=>{
        console.log('watch function ran');
      })
  
      const stopEffect = watchEffect(()=>{
        console.log('watcheffect function ran');
      })
  
      const matchingNames = computed(()=>{
        return names.value.filter((name) => name.includes(search.value));
      })
  
      const handleClick = ()=>{
        stopWatch();
        stopEffect();
      }
  
      return { names, search, matchingNames, handleClick };
  
    }
  }
  </script>
  