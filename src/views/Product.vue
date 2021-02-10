<template>
    <div v-if="product" class="mx-0.5 sm:mx-2 md:mx-4 lg:mx-8 sm:px-2 md:px-4 lg:px-8 my-8 pb-2">
        <div class="grid grid-cols-12">
            <div class="col-span-full sm:col-span-3">
                <img :src="product.url" alt="">
            </div>

            <div class="col-span-full sm:col-span-9 sm:relative">
                <div class="border-b border-gray-100 sm:mx-8 sm:pb-4 mx-4 py-2">
                    <p class="text-lg text-gray-700 font-medium tracking-wide"> {{ product.name }} </p>
                </div>
                <div class="sm:mx-8 sm:py-4 mx-4 py-2">
                    <p class="text-xs text-gray-600"> {{ product.desc }} </p>
                </div>

                <div v-if="this.$store.getters.isLoged" class="sm:absolute md:bottom-2 md:right-8 sm:-bottom-9 sm:right-6">
                    <button @click="addToCart" class="w-full text-sm text-gray-600 sm:px-8 py-2 rounded bg-blue-200 hover:bg-blue-300 focus:bg-blue-400 active:bg-blue-500 focus:outline-none"> add to cart </button>
                </div>
            {{ error }}
            </div>
            {{ order }}
        </div>
    </div>
</template>

<script>
import useAxios from 'vue3-use-axios'
import { onMounted } from 'vue'
import { ref } from 'vue'
import { useRoute } from 'vue-router'
import router from '@/router'
import store from '@/store'
import axios from 'axios';

export default {

    setup() {
        const { response, error, loading, exec, } = useAxios()
        const route = useRoute()
        const productId = route.params.id
        let product = ref(null)
        let order = ref(null)

        onMounted(async () => {
            await exec({
                url: 'http://192.168.43.83:91/api/v1/product/'+ productId,
                method: 'get',
            })

            if(!response.value.data.id) {
                router.push({ name: 'NotFound' })
            }

            product.value = response.value.data
        })
            const token = store.getters.isLoged.token
axios.defaults.headers.common['Authorization'] = `Bearer ${token}`;

        const addToCart =async () => {
            const userId = store.getters.isLoged.account_id
            console.log(token)
            // axios.defaults.headers.common['Authorization'] = token
            await exec({
                url: 'http://192.168.43.83:91/api/v1/order',
                method: 'post',
                data: {
                    account_id: userId,
                    product_id: productId
                }
                // headers: {
                //     'Authorization': `Bearer ${token}` 
                // }
            })
            order.value = response.value
        }

        return {
            order,
            product, 
            error, 
            loading, 
            exec,
            addToCart,
        }
    }
    
}
</script>