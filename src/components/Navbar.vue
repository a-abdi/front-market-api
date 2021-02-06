<template>
    <div class="h-screen w-full">
        <div class="px-2 py-2 flex items-center bg-gray-100" id="nav">
            <router-link class="px-2 pb-1" to="/">
            <svg class="h-5 w-5 inline-flex" xmlns="http://www.w3.org/2000/svg" fill="none" viewBox="0 0 24 24" stroke="currentColor">
                <path stroke-linecap="round" stroke-linejoin="round" stroke-width="2" d="M3 12l2-2m0 0l7-7 7 7M5 10v10a1 1 0 001 1h3m10-11l2 2m-2-2v10a1 1 0 01-1 1h-3m-6 0a1 1 0 001-1v-4a1 1 0 011-1h2a1 1 0 011 1v4a1 1 0 001 1m-6 0h6" />
            </svg>
            </router-link>
            <router-link class="px-2 text-gray-600" to="/about">About</router-link>
            <div class="ml-auto text-xs">
            <router-link class="px-2" to="/register">Register</router-link>
            <router-link class="px-2" to="/login">Login</router-link>
            </div>
        </div>
        <router-view class="h-5/6" />
    </div>
</template>