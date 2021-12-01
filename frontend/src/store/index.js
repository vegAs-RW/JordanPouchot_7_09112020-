import { createStore } from 'vuex'

const axios = require ('axios');

const instance = axios.create({
    baseURL: 'http://localhost:4000/api/users/'
  });

  

export default createStore({
    state: {
        status: '',
        user: {
            isLogged: false,
            userId : '-1',
            token: '',
        }
    },
    mutations: {
        setStatus: function (state, status) {
            state.status = status;
        },
        logUser: function (state, user) {
            instance.defaults.headers.common['Authorization'] = user.token;
            state.user = user;
        },
        logout: function (state) {
            state.user = {
                userId: -1,
                token:"",
            }

        }
    },
    actions: {
        login: ({ commit }, userInfos) => {
            commit ('setStatus', 'loading');
            return new Promise ((resolve, reject) => {
            instance.post('/login', userInfos)
              .then(function (response) {
                commit ('setStatus', '');
                commit ('logUser', response.data);
                resolve(response);
              })
              .catch(function (error) {
                commit ('setStatus', 'error_login');
                reject(error);
              });
            })
        },
        register: ({ commit }, userInfos) => {
            return new Promise ((resolve, reject) => {
                commit;
            instance.post('/register', userInfos)
              .then(function (response) {
                commit ('setStatus', 'created');
                resolve(response);
              })
              .catch(function (error) {
                commit ('setStatus', 'error_create');
                reject(error);
              }); 
            })
        },
        
    },
    getters: {
        
    }
})