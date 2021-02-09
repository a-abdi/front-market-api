import { createStore } from 'vuex'
// import { json } from 'body-parser';
import axios from 'axios';

export default createStore({
    state () {
        return {
          user: null
        }
    },

    mutations: {
        setUserData (state, userData) {
          state.user = userData;
          localStorage.setItem('user', JSON.stringify(userData));
          axios.defaults.headers.common.Authorization = `Bearer ${userData.token}`;
        },
        
        clearUserData () {
          localStorage.removeItem('user');
          location.reload();
        }
    },

    getters: {
        isLoged (state) {
          return state.user;
        }
    },

    actions: {
      login ({ commit }, credentials) {
        return axios
          .post('/login', credentials)
          .then(({ data }) => {
            commit('setUserData', data)
          })
      },

      logout({commit}) {
        commit('clearUserData')
      }
    }
})