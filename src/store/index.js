import Vue from "vue";
import Vuex from "vuex";

Vue.use(Vuex);

export default new Vuex.Store({
  state: {
    isSignIn: 0,
    token: '',
    userName:''
  },
  mutations: {
    changeSignState(state,n) {
      state.isSignIn = n
    },
    setToken(state,token) {
      state.token = token
    }

  }
});
