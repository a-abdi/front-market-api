<template>
    <div class="flex items-center justify-center mt-28">
        <div class="p-4 w-11/12 sm:w-9/12 md:w-7/12 lg:w-5/12 xl:w-4/12 2xl:w-2/12 shadow-lg border border-gray-200 rounded-lg bg-white">
            <form @submit.prevent="auth">
                <label class="text-gray-600 text-sm my-2" for="email">Email</label>
                <input id="email" name="email" class="px-2 text-gray-600 w-full border border-gray-300 rounded mb-2 py-1 focus:ring-2 focus:ring-blue-300 focus:outline-none" type="email" v-model="form.email">
                <label class="text-gray-600 text-sm my-2" for="password">Password</label>
                <input id="password" name="password" class="px-2 text-gray-600 w-full border border-gray-300 rounded mb-2 py-1 focus:ring-2 focus:ring-blue-300 focus:outline-none" type="password" v-model="form.password">
                <button :disabled="loading" :class="{'cursor-wait': loading}" type="submit" class="w-full rounded my-2 py-1 bg-blue-300 hover:bg-blue-500 focus:bg-blue-600 active:bg-blue-700 focus:outline-none tracking-wider text-gray-700"><slot></slot></button>
            </form>
            <message-error v-if="error" class="text-center">
                {{ error }}
            </message-error> 
        </div>
    </div>
</template>

<script>
import { ref } from 'vue'
import { reactive } from 'vue'
import MessageError from '@/components/MessageError'
import store from '@/store'
import router from '@/router'

export default {

    components: {
        MessageError,
    },

    methods: {
        push () {
            this.$router.push('/')
        }
    },

    props: {
        url: String
    },

    setup (props) {
        let error = ref(null)
        let resulte = ref(null)
        let loading = ref(false)
        const form = reactive(
            {
                email: null,
                password: null,
            }
        )

        const auth = async () => {
            loading.value = true
            const data = {
                credentials: { email: form.email,  password: form.password },
                url: props.url
            }
           
            resulte.value = await store.dispatch('auth', data)
            loading.value = false
            if(resulte.value.status == 201) {
                router.push('/')
            } else {
                error.value = resulte.value.data.err.msg
            }
        }

        return {
            error,
            form,
            loading,
            auth
        }
    }
}
</script>