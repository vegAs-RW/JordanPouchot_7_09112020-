import { createStore } from 'vuex'

export default createStore({
    state: {
        userId:null,
        token:null
    },
    mutations: {
    },
    actions: {
    },
    getters: {
        isLogged:state => state.userId !== null && state.token !== null
    }
})