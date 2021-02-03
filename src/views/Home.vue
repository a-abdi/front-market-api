<template>
    <div class="bg-gray-200 w-full">
        <div class="grid grid-cols-4">
          <div class="col-span-1 p-8" v-for="product in response.data.product_list" :key="product.id">
            <img :src="product.url" alt="">
            <p class="text-lg	text-gray-900"> {{ product.name }} </p>
            <p class="text-xs text-gray-600	"> {{ product.desc }} </p>
            <span class="text-red-600 my-2">{{ product.price }} </span>
          </div>
        </div>
    </div>
</template>

<script>
import useAxios from 'vue3-use-axios'
// import { ref } from 'vue'

export default {
  name: 'Home',
  setup () {
    const { response, error, exec } = useAxios()

      exec({
        url: 'http://192.168.43.83:91/api/v1/product',
        method: 'get'
      })
 
    // const yourFunction = async () => {
    //   await exec({
    //     url: 'http://192.168.43.83:91/api/v1/product',
    //     method: 'get'
    //   })
    //   // You can validate if an error occurs, set the data where you need to be or not
    // //   characters.value = await !error.value ? await response.value : null
    // }
 
    return {
        // yourFunction,
        response,
        error,
      // You can return whaever you need or use it inside the component logic
    }
  }
}
</script>