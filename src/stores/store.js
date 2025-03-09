import Vuex from 'vuex'
const store = new Vuex.Store({
    state: {
        name :'lapvt state'
    },getters: {
        name: function(state) {
            return state.name
        }
    },mutations: {
        setName(state, nameData){
            state.name = nameData
        }
    }
})
export default store