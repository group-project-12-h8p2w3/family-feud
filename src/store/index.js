import Vue from 'vue'
import Vuex from 'vuex'

Vue.use(Vuex)

export default new Vuex.Store({
  state: {
    question: 'Benda apa yang disukai seorang anak kecil?',
    user: '',
    users: [],
    questions: [],
    answers: [],
    messages: []
  },
  mutations: {
    SOCKET_userLogin (state, data) {
      state.user = localStorage.getItem('user')
      state.users = data
    },
    SOCKET_questionsList (state, data) {
      state.questions = data
    },
    SOCKET_answersList (state, data) {
      state.answers = data
    },
    SOCKET_messages (state, data) {
      state.messages = data
    }

  },
  actions: {

  },
  modules: {
  }
})
