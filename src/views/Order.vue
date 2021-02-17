<template>
    <div class="m-2 sm:mx-4 md:mx-12">
        <table class="table-fixed w-full">
            <thead>
                <tr class="mb-4">
                    <th class="w-1/6 ...">Image</th>
                    <th class="w-2/6 ...">Name</th>
                    <th class="w-1/6 ...">Price</th>
                    <th class="w-2/6 ...">date</th>
                </tr>
            </thead>
            <tbody>
                <tr v-for="(order, i) in orders" :key="i" class="text-center text-sm text-gray-600 my-4 border border-gray-200">
                    <td class="flex justify-center"> <img :src="order.url" :alt="order.name" class="w-24 h-32"> </td>
                    <td> {{ order.name }} </td>
                    <td> {{ order.price }} </td>
                    <td> {{ order.date }} </td>
                </tr>
            </tbody>
        </table>
    </div>
</template>

<script>
import { onMounted, ref } from 'vue'
import useAxios from 'vue3-use-axios'
import store from '@/store'

export default {
    setup() {
        const { response, error, loading, exec } = useAxios()
        const token = store.getters.isLoged.token
        var orders = ref([])

        onMounted(async () => {
            await exec({
                url: 'http://192.168.43.83:88/api/v1/order',
                method: 'get',
                headers: {
                    'Authorization': `Bearer ${token}` 
                }
            })

            response.value.data.order_list.forEach(async (order, i) => {
                await exec({
                    url: `http://192.168.43.83:88/api/v1/product/${order.product_id}`,
                    method: 'get'
                })

                orders.value[i] = {
                    date: new Date(order.created_at * 1000),
                    url: response.value.data.url,
                    name: response.value.data.name,
                    price: response.value.data.price,

                }
            });
        })
                
        return {
            orders, 
            error, 
            loading,
        }
    }
}
</script>