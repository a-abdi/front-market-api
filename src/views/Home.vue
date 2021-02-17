<template>
    <div class="bg-gray-200 w-full">
        <loading-page v-if="loading"> loading </loading-page>
        <div v-else class="grid grid-cols-12">
          <div class="col-span-12 sm:col-span-6 md:col-span-4 lg:col-span-3 2xl:col-span-2 pb-10 px-2 sm:p-4 md:p-6 shadow-2xl"
            v-for="product in products" :key="product.id">
            <div class="cursor-pointer" @click="productShow(product.id)">
              <img :src="product.url" :alt="product.name">
            </div>
            <div class="h-10 cursor-pointer" @click="productShow(product.id)">
              <p class="truncate text-base text-gray-600 leading-6 font-serif antialiased semibold tracking-wide py-2"> {{ product.name }} </p>
            </div>
            <div class="text-center">
              <span class="text-red-600 my-2 font-medium"> ${{ formatPrice(product.price) }} </span>
            </div> 
          </div>
        </div>
    </div>
</template>

<script>
import useAxios from 'vue3-use-axios'
import { ref, onMounted } from 'vue'
import router from '@/router'
import LoadingPage from '@/components/LoadingPage.vue'

export default {
  name: 'Home',
  components: {
    LoadingPage
  },
  setup () {
    let products = ref()
    const { response, error, loading, exec } = useAxios()

    onMounted(async () => {
      await exec({
        url: 'http://192.168.43.83:88/api/v1/product',
        method: 'get'
      })
      products.value = response.value.data.product_list
    })

    const productShow = (id) => {
      router.push('/product/'+ id)
    }
    
    const formatPrice = (price) => {
      let val = (price/1).toFixed(2).replace('.', ',')
      return val.toString().replace(/\B(?=(\d{3})+(?!\d))/g, ".")
    }

    return {
      formatPrice,
      loading,
      products,
      error,
      productShow
    }
  }
}
</script>