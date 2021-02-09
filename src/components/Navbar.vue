<template>
    <div class="h-screen w-full">
        <div class="px-2 py-2 flex items-center bg-gray-100" id="nav">
            <router-link class="px-2 pb-1" to="/">
                <svg class="h-6 w-6 inline-flex" xmlns="http://www.w3.org/2000/svg" fill="none" viewBox="0 0 24 24" stroke="currentColor">
                    <path stroke-linecap="round" stroke-linejoin="round" stroke-width="2" d="M3 12l2-2m0 0l7-7 7 7M5 10v10a1 1 0 001 1h3m10-11l2 2m-2-2v10a1 1 0 01-1 1h-3m-6 0a1 1 0 001-1v-4a1 1 0 011-1h2a1 1 0 011 1v4a1 1 0 001 1m-6 0h6" />
                </svg>
            </router-link>

            <router-link class="px-2 pb-1" to="/">
                <svg class="h-6 w-6 inline-flex" xmlns="http://www.w3.org/2000/svg" fill="none" viewBox="0 0 24 24" stroke="currentColor">
                    <path stroke-linecap="round" stroke-linejoin="round" stroke-width="2" d="M3 3h2l.4 2M7 13h10l4-8H5.4M7 13L5.4 5M7 13l-2.293 2.293c-.63.63-.184 1.707.707 1.707H17m0 0a2 2 0 100 4 2 2 0 000-4zm-8 2a2 2 0 11-4 0 2 2 0 014 0z" />
                </svg>
            </router-link>

            <div v-if="!this.$store.getters.isLoged" class="ml-auto text-xs mr-8">
                <router-link class="px-2" to="/register">Register</router-link>
                <router-link class="px-2" to="/login">Login</router-link>
            </div>

            <div v-else class="ml-auto text-xs text-gray-600 static">
            <!-- <router-link class="px-2 text-gray-600" to="/about">About</router-link> -->
                <button @click="showInfo = !showInfo" class="focus:outline-none mr-16">
                    <svg class="h-6 w-6 inline-flex" xmlns="http://www.w3.org/2000/svg" fill="none" viewBox="0 0 24 24" stroke="currentColor">
                        <path stroke-linecap="round" stroke-linejoin="round" stroke-width="2" d="M16 7a4 4 0 11-8 0 4 4 0 018 0zM12 14a7 7 0 00-7 7h14a7 7 0 00-7-7z" />
                    </svg>   
                </button>
                <div v-if="showInfo" class="absolute mt-2 py-2 rounded border border-gray-300 bg-gray-50">
                    <ul>
                        <li class="py-1.5 hover:bg-gray-100" @click="showInfo = false">
                            <router-link class=" pl-4 pr-6" to="/profile">
                                profile 
                            </router-link>
                        </li>
                        <li @click="logout" class="py-1.5 pl-4 pr-6 hover:bg-gray-100 cursor-pointer"> logout </li>
                    </ul>
                </div>
            </div>
        </div>
        <router-view class=""/>
    </div>
</template>

<script>
import { ref } from 'vue'
import store from '@/store'

export default {
    data() {
        return {

        }
    },
    
    methods: {
      
    },

    setup() {
        var showInfo = ref(false)
        const logout = () => {
            store.dispatch('logout')
        }

        return {
            showInfo,
            logout,
        }
    }
    
}
</script>