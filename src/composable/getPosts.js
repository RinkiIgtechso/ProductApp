import { ref } from 'vue';

const getPosts = () =>{
    const posts = ref([]);
    const error = ref(null);

    const load = async () =>{
      try{
        let data = await fetch('https://dummyjson.com/products');
        if(!data.ok){
          throw Error("no data available");
        }
        let ref = await data.json();
        posts.value = ref.products;
      }
      catch(err){
        error.value = err.message;
        console.log(err.message)
      }
    }
    return { posts, error, load }
}

export default getPosts;