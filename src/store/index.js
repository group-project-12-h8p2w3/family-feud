import Vue from 'vue'
import Vuex from 'vuex'
import router from '../router/index'
import swal from 'sweetalert'

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
    time: 20,
    isPlay: false
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
      state.isPlay = true
      let user = ''
      let max = 0
      state.scores.forEach(el => {
        if (el.score > max) {
          max = el.score
          user = el.username
        }
      })
      if (!data.question) {
        swal({
          title: 'Congrats!',
          text: `winner: ${user}`,
          icon: 'success',
          button: 'Back to home'
        })
          .then((value) => {
            router.push('/')
          })
      }
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
    },
    SOCKET_gameStart (state, data) {
      state.messages = []
      state.answered = []
      state.isPlay = false
      state.canStart = data
    }
  },
  actions: {

  },
  modules: {
  }
})
