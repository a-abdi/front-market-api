<template>
    <div class="flex items-center justify-center h-screen w-full">
        <div class="p-4 w-11/12 sm:w-9/12 md:w-7/12 lg:w-5/12 xl:w-4/12 2xl:w-2/12 shadow-lg border border-gray-200 rounded-lg bg-white">
            <form @submit.prevent="register">
                <label class="text-gray-600 text-sm my-2" for="email">Email</label>
                <input id="email" name="email" class="px-2 text-gray-600 w-full border border-gray-300 rounded mb-2 py-1 focus:ring-2 focus:ring-blue-300 focus:outline-none" type="email" v-model="form.email">
                <label class="text-gray-600 text-sm my-2" for="password">Password</label>
                <input id="password" name="password" class="px-2 text-gray-600 w-full border border-gray-300 rounded mb-2 py-1 focus:ring-2 focus:ring-blue-300 focus:outline-none" type="password" v-model="form.password">
                <button type="submit" class="w-full rounded my-2 py-1 bg-blue-300 hover:bg-blue-500 focus:bg-blue-600 active:bg-blue-700 focus:outline-none tracking-wider text-gray-700">Register</button>
            </form>
        <div>
            <p class="text-center text-red-700 text-sm">
                {{ result }}
            </p>
        </div>
        </div>
    </div>
</template>

<script>
import useAxios from 'vue3-use-axios'
import { reactive, ref } from 'vue'


export default {
    name: "Register",

    setup () {
        const { response, error, loading, exec } = useAxios()
        let result = ref(null)
        const form = reactive(
            {
                email: null,
                password: null
            }
        )

        const register = async () => {

            await exec({
                url: 'http://192.168.43.83:91/api/v1/account',
                method: 'post',
                data: 
                {
                    email: form.email,
                    password: form.password
                }
            })
            
            result.value = await error.value ? await error.value.data.err.msg : await response.value
        }

        return {
            result,
            form,
            loading,
            register
        }
    }
    
}
</script>