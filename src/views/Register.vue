<template>
    <auth url="http://192.168.43.83:91/api/v1/account">
        Register
    </auth>
</template>

<script>

import Auth from '@/components/Auth.vue'

export default {
    name: "Register",

    components: {
        Auth,
    },
}
</script>