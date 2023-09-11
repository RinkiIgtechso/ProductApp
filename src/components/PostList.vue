<template>
    <h2>Product List</h2>
    
    <div class="product-list">
        <div class="list" v-for="post in posts" :key="post.id">
            <h3>{{ post.title }}</h3>
            <img v-bind:src="getImage(post.thumbnail)" :key="post">
            <p>{{ post.description }}</p>
            <div class="brand">{{ post.brand }}</div>
            <div class="btns">
                <button @click="editPost(post.id)">Edit</button>
                <button @click="deleteData(post.id)">Delete</button>
            </div>
            <div class="backdrop" v-if="show === post.id" >
                <div class="edit">
                    <input type="text" v-model="title" placeholder="Enter name" />
                    <input type="description" v-model="desc" placeholder="Enter description" />
                    <input type="text" v-model="price" placeholder="Enter new price" />
                    <button @click="submit">Edit {{ show }}</button>&nbsp;&nbsp;
                    <button @click="clickaway" style="background-color: red">Cancel</button>
                </div>
            </div>
        </div>
    </div>
</template>
  
<script>

import { ref } from 'vue';
import SinglePost from "./SinglePost.vue";
import getData from '@/composable/getData';

export default {
    props:[ 'posts', 'getData' ],
    components:{ SinglePost },
    setup(props){
        console.log(props.getData)
        // console.log(props.posts);
        const title = ref(null);
        const desc = ref(null);
        const price = ref(null);
        const show = ref(null);
        const {data, error, load} = getData();
        const getImage = (img) => {
            return img;
        };
        const editPost = (id)=>{
            show.value = id;
            document.body.style.overflow = 'hidden';
        };
        const deleteData = (id)=>{
            fetch(`http://localhost:3000/products/${id}`,{
                method:"DELETE"
            })
            .then((res)=>{return res.json()})
            .then((res)=>{console.log(res);load()})
            .catch((err)=>{console.log(err)})
        };
        const clickaway = ()=>{
            show.value = null;
            document.body.style.overflow = 'unset';
        }
        const submit = ()=>{
            let obj = {"title":title.value,"description":desc.value, "price":Number(price.value)};
            console.log(obj)
            fetch(`http://localhost:3000/products/${show.value}`,{
                method:'PATCH',
                body:JSON.stringify(obj),
                headers:{
                    "Content-Type": "application/json"
                }
            })
            .then((res)=>{return res.json()})
            .then((res)=>{;show.value = null; document.body.style.overflow = 'unset'; load()})
            .catch((err)=>console.log(err))
        }
        return { getImage, editPost, deleteData, title, desc, price, show, clickaway, submit }
    }
}
</script>

<style scoped>
    input{
        width:90%;
        padding: 10px 12px;
        margin-bottom: 15px;
    }
    .product-list{
        display: grid;
        grid-template-columns: repeat(4, 1fr);
        gap:25px;
        padding:15px;
    }
    .product-list>div{
        box-shadow: 0px 0px 8px rgba(0, 0, 0, 0.25);
        border-radius:10px ;
        transition: 0.4s;
        position: relative;
    }
    .product-list>div:hover{
        box-shadow: 0px 0px 16px rgba(0, 0, 0, 0.25);
        border-radius: 0;
    }
    .list{
        padding: 10px;
        text-align: center;
    }
    .list h3{
        font-size: 15px;
    }
    .list p{
        font-style:normal;
        font-size: 13px;
        margin-top: 0px !important;
        color:#3d3d3d;
        font-style: italic;
    }
    .list img{
        width: 100%;
        height: 200px;
        margin: 15px 0px;
    }
    .brand{
        background-color:#8b6e8d;
        position: absolute;
        padding: 10px;
        top: 75px;
        left: 10px;
        border-radius: 7px;
        font-size: 10px;
        color:#FFF;
    }
    .btns{
        display: flex;
        justify-content: space-around;
    }
    .btns button{
        padding:8px 14px;
        cursor:pointer;
        border:none;
        outline:none;
        color:white;
        border-radius: 5px;
    }
    .btns>button:nth-child(1){
        background-color: rgb(9, 64, 9);
    }
    .btns>button:nth-child(2){
        background-color: rgb(161, 8, 8);
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
    .edit{
        width:30%;
        margin:auto;
        background: white;
        padding: 20px;
    }
    .edit button{
        padding: 10px 25px;
        border:none;
        outline: none;
        border-radius: 3px;
        background-color: #8b6e8d;
        color: white;
        font-weight: 500;
        cursor: pointer;
    }
</style>