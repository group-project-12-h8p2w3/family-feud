import Vue from 'vue'
import Vuex from 'vuex'
import router from '../router/index'

Vue.use(Vuex)

export default new Vuex.Store({
  state: {
    user: '', // username user ini
    users: [], // data user di waiting room
    scores: [],
    questions: '',
    answers: [],
    messages: [],
    answered: [],
    time: 10
  },
  mutations: {
    SOCKET_userLogin (state, data) {
      state.user = localStorage.getItem('user')
      state.users = data
    },
    SOCKET_fetchEnteredUser (state, data) {
      state.scores = data
      router.push('/gameplay')
    },
    SOCKET_questionsList (state, data) {
      state.answered = []
      state.answers = data.answer
      state.questions = data.question
    },
    SOCKET_messages (state, data) {
      state.messages = data
    },
    SOCKET_compareAnswer (state, data) {
      if (data.isTrue) {
        let score
        state.answers.forEach(el => {
          if (el.id === data.id) {
            state.answered.push(el)
            score = el.point
          }
        })
        state.scores.forEach(el => {
          if (el.username === data.user) {
            el.score += score
          }
        })
      }
    },
    SOCKET_fetchTime (state, data) {
      state.time = data
    }
  },
  actions: {

  },
  modules: {
  }
})
