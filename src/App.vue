<template>
    <navbar/>
</template>

<script>
import Navbar from '@/components/Navbar'
import store from '@/store' 

export default {
  name: 'App',
  components: {
    Navbar  
  },
  
  setup () {
  const userInfo = localStorage.getItem('user')
  if (userInfo) {
    const userData = JSON.parse(userInfo)
    store.commit('setUserData', userData)
  }

    return {

    }
  }

}
</script>