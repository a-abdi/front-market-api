import { createStore } from 'vuex'
// import { json } from 'body-parser';
import axios from 'axios';

axios.defaults.baseURL = 'http://192.168.43.83:88/api/v1'
export default createStore({
    state () {
        return {
          user: null,
        }
    },

    mutations: {
        setUserData (state, userData) {
          state.user = userData;
          localStorage.setItem('user', JSON.stringify(userData));
          axios.defaults.headers.common['Authorization'] = `Bearer ${userData.token}`;
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
      auth ({ commit }, data) {
        return axios
          .post( data.url, data.credentials )
          .then(( response ) => {
            commit('setUserData', response.data)
            return response
          }).catch( (error) => {
            return error.response
          })
      },

      order ({commit}, credentials) {
        return axios
          .post('/order', credentials)
          .then(({ data }) => {
            commit('setUserData', data)
          })
      },

      logout({commit}) {
        commit('clearUserData')
      }
    }
})