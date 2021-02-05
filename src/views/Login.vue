<template>
    <auth url="http://192.168.43.83:91/api/v1/auth">
        Login
    </auth>
</template>

<script>

import Auth from '@/components/Auth.vue'

export default {
    name: "Login",

    components: {
        Auth,
    },
}
</script>
