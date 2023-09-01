import { ref } from 'vue';

const getPost = (val) =>{
    const post = ref([]);
    const error = ref(null);

    const loads = async () =>{
      try{
        let data = await fetch(`https://dummyjson.com/products/search?q=${val}`);
        if(!data.ok){
          throw Error("no data available");
        }
        let ref = await data.json();
        post.value = ref.products;
      }
      catch(err){
        error.value = err.message;
        console.log(err.message)
      }
    }
    return { post, loads }
}

export default getPost;