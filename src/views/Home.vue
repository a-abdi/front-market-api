<template>
    <div class="bg-gray-200 w-full">
        <div v-if="loading" class="flex justify-center items-center h-screen bg-white-100">
            <div class="bg-blue-200 rounded-lg p-4 text-purple-600">
              <svg class="animate-spin h-8 w-8 mr-3 inline-flex"  xmlns="http://www.w3.org/2000/svg" fill="none" viewBox="0 0 24 24" stroke="currentColor">
                <path stroke-linecap="round" stroke-linejoin="round" stroke-width="2" d="M4 4v5h.582m15.356 2A8.001 8.001 0 004.582 9m0 0H9m11 11v-5h-.581m0 0a8.003 8.003 0 01-15.357-2m15.357 2H15" />
              </svg>
              <span>Loading</span>
            </div>
        </div>
        <div class="grid grid-cols-12">
            <div class="col-span-12 sm:col-span-6 md:col-span-4 lg:col-span-3 2xl:col-span-2 pb-10 px-2 sm:p-4 md:p-6 shadow-2xl"
              v-for="product in products" :key="product.id">
              <div class="">
                <img :src="product.url" :alt="product.name">
              </div>

              <div class="h-10">
                <p class="truncate text-base text-gray-600 leading-6 font-serif antialiased semibold tracking-wide py-2"> {{ product.name }} </p>
              </div>

              <div class="text-center">
                <span class="text-red-600 my-2 font-medium"> ${{ formatPrice(product.price) }}</span>
              </div>
            </div>
          </div>
    </div>
</template>

<script>
import useAxios from 'vue3-use-axios'
import { ref, onMounted } from 'vue'

export default {
  name: 'Home',
  setup () {
    let products = ref()
    const { response, error, loading, exec } = useAxios()

    onMounted(async () => {
      await exec({
        url: 'http://192.168.43.83:91/api/v1/product',
        method: 'get'
      })
      products.value = response.value.data.product_list
    })
    
    const formatPrice = (price) => {
      let val = (price/1).toFixed(2).replace('.', ',')
      return val.toString().replace(/\B(?=(\d{3})+(?!\d))/g, ".")
    }

    return {
      formatPrice,
      loading,
      products,
      error,
    }
  }
}
</script>