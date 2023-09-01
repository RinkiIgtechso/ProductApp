<template>
  <div class="home">
    <div v-if="error">{{ error }}</div>
    <div class="addPro" @click="this.show = !show" >Add Product</div>
    <input type="text" v-model="query" placeholder="Enter product name" @keypress="searchData">
    <div v-if="data.length">
      <PostList :posts="data" />
    </div>
    <div v-else>Loading...</div>
    <div class="backdrop" v-if="show">
      <div class="add">
        <h3>Add Product</h3>
        <input type="text" v-model="title" placeholder="Enter title" >
        <input type="text" v-model="description" placeholder="Enter description" >
        <input type="text" v-model="price" placeholder="Enter price" >
        <input type="text" v-model="brand" placeholder="Enter brand">
        <input type="text" v-model="thumbnail" placeholder="Enter thumbnail" ><br/>
        <button @click="submit">Submit</button>
      </div>
    </div>
  </div>
</template>
 
<script>

import PostList from '@/components/PostList.vue';
import { onMounted } from 'vue';
import { ref } from 'vue';

export default {
  name: 'Home',
  components:{ PostList },
  data(){
    return{
    query:'',
    data:[],
    error:"",
    show:false
    }
  },
  methods:{

  },
  setup(){
    const data = ref([]);
    const error = ref(null);
    const title = ref(null);
    const description = ref(null);
    const price = ref(null);
    const brand = ref(null);
    const thumbnail = ref(null);

    const getData = () => {
      fetch("http://localhost:3000/products")
      .then(res =>{ return res.json()})
      .then((res)=>{
        data.value = res;
      })
      .catch((err)=>{error.value=err.message});
    };

    const searchData =  (e) =>{
      if(e.key==='Enter'){
        let val = e.target.value;
        fetch(`http://localhost:3000/products?title=${val}`)
        .then((res)=>{return res.json()})
        .then((res)=>{data.value = res})
        .catch((err)=>{error.value=err.message})
      }
    }
    onMounted(()=>{
      getData();
    })

    const submit = ()=>{
      let data = {
        "title":title.value,
        "description":description.value,
        "price":price.value,
        "brand":brand.value,
        "thumbnail":thumbnail.value
      }
      fetch("http://localhost:3000/products",{
        method:"POST",
        body:JSON.stringify(data),
        headers:{
          "Content-Type": "application/json"
        }
      })
      .then((res)=>{return res.json()})
      .then((res)=>{console.log(res, this.show);this.show = false})
      .catch((err)=>{console.log(err)})
    }

    return { data, searchData, title, description, price, brand, thumbnail, submit }
  }
    
}


</script>

<style scoped>
  input{
    outline: none;
    width: 300px;
    height: 30px;
    padding: 5px 15px;
    border-radius:7px;
    border:1px solid #2d2d2d;
    margin-bottom:10px;
  }
  input:focus{
    border:none;
    box-shadow: rgba(17, 17, 26, 0.1) 0px 0px 16px;
  }
  .addPro{
    width: 160px;
    margin: auto 0 auto auto;
    padding: 10px;
    background-color: lightseagreen;
    color: white;
    font-weight: 500;
    border-radius: 4px;
    cursor:pointer;
  }
  .backdrop{
    background: rgba(0,0,0,0.55);
    position:fixed;
    top:0;
    left:0;
    z-index: 99;
    width:100%;
    height:100%;
    overflow:hidden;
    display: flex;
    align-content:center;
  }
  .add{
    background-color: white;
    width:30%;
    margin:auto;
    padding:20px;
  }
  button{
    padding:10px 25px;
    border:none;
    border-radius:7px;
    background-color: darkslategray;
    color: white;
    cursor: pointer;
  }
</style>
