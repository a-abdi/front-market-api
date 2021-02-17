<template>
    <auth url="/auth">
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
