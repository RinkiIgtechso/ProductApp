import { ref } from 'vue';

const getData = () => {
  const data = ref([]);
  const error = ref(null);
  const load = ()=>{
    fetch("http://localhost:3000/products")
    .then(res =>{ return res.json()})
    .then((res)=>{
      data.value = res;
    })
    .catch((err)=>{error.value=err.message});
  }
  return {data, error, load}

};

export default getData;