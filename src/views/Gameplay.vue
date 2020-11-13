<template>
  <div class="gameplay">
    <div class="container-fluid">
      <div class="row justify-content-center">
        <div class="col-7 d-flex flex-column justify-content-center gameboard-side">
          <div class="card shadow gameboard">
            <div class="card-body">
              <!-- Trigger Play Button -->
              <div id="btn-trigger-play">
                <button @click.prevent="gameStart" type="button" class="btn btn-info">Trigger Start Play</button>
                <hr>
              </div>
              <!-- Timer -->
              <div class="card shadow timer">
                <div class="card-body">
                  <div>
                    Timer:
                  </div>
                  <div>
                    {{time}}
                  </div>
                </div>
              </div>
              <div class="gameboard-main">
                <!-- Question -->
                <div id="question">
                  <h3>{{ question }}</h3>
                  <hr>
                </div>
                <!-- Answer list -->
                <div v-if="question" class="answer-part">
                  <h3>Answers</h3>
                  <div class="answer-content d-flex flex-column justify-content-center flex-wrapper">
                    <div class="align-self-center">
                      <Answer
                      v-for="answer in answers"
                      :key="answer.id"
                      :answer="answer"
                      ></Answer>
                    </div>
                  </div>
                </div>
              </div>
              <!-- Answer Input -->
              <div class="input-group mb-3">
                <input
                @submit="inputAnswer"
                v-model="inputanswer"
                type="text" class="form-control"
                placeholder="Your answer..."
                aria-label="Recipient's username"
                aria-describedby="button-addon2">
                <div class="input-group-append">
                  <button @click.prevent="inputAnswer" class="btn btn-outline-secondary" type="button" id="button-addon2">Submit</button>
                </div>
              </div>
            </div>
          </div>
        </div>
        <div class="col-3 d-flex flex-column justify-content-center gameboard-side">
          <div class="card shadow gameboard">
            <div class="card-body">
              <div>
                <div class="scoreboard">
                  <div class="card scoreboard-card">
                    <div class="card-body">
                      <h3>Scoreboard</h3>
                      <div class="scoreboard-table">
                        <table class="table table-bordered" style="font-size: 0.8em;">
                          <col style="width: 9em;" />
                          <col style="width: 1em;" />
                          <tr v-for="(user, i) in usersPlaying" :key="i">
                            <td class="align-middle text-left">
                              <img class="user-avatar-scoreboard" :src="`https://avatars.dicebear.com/api/bottts/${user.username}.svg`" alt="user-avatar">
                              <span class="username-scoreboard"> {{ user.username }}</span>
                            </td>
                            <td class="align-middle">{{ user.score }}</td>
                          </tr>
                          <tr>
                            <td>Halo</td>
                            <td>0</td>
                          </tr>
                          <tr>
                            <td>Halo</td>
                            <td>0</td>
                          </tr>
                          <tr>
                            <td>Halo</td>
                            <td>0</td>
                          </tr>
                          <tr>
                            <td>Halo</td>
                            <td>0</td>
                          </tr>
                          <tr>
                            <td>Halo</td>
                            <td>0</td>
                          </tr>
                          <tr>
                            <td>Halo</td>
                            <td>0</td>
                          </tr>
                        </table>
                      </div>
                    </div>
                  </div>
                </div>
              </div>
              <!-- chat board -->
              <div class="border p-2 text-left" id="message-board" style="overflow: auto;  height: 30vh;">
                <div>
                  <img class="user-avatar-scoreboard" :src="`https://avatars.dicebear.com/api/bottts/${user.username}.svg`" alt="user-avatar">
                  <span> : hai guys</span>
                </div>
                <div>
                  <img class="user-avatar-scoreboard" :src="`https://avatars.dicebear.com/api/bottts/sasasa.svg`" alt="user-avatar">
                  <span> : hai</span>
                </div>
              </div>
            </div>
          </div>
        </div>
      </div>
    </div>
  </div>
</template>

<script>
import Answer from '../components/Answer.vue'

export default {
  name: 'Gameplay',
  components: {
    Answer
  },
  data () {
    return {
      message: '',
      isGameStarted: false,
      inputanswer: ''
    }
  },
  methods: {
    gameStart () {
      this.$socket.emit('fetchQuestion')
      this.timer()
    },
    sendMessage () {
      const data = {
        user: localStorage.getItem('user'),
        message: this.message
      }
      this.$socket.emit('sendMessage', data)
      this.message = ''
    },
    inputAnswer () {
      const user = localStorage.getItem('user')
      const answer = this.inputanswer
      const data = {
        user, answer
      }
      this.$socket.emit('compareAnswer', data)
      this.inputanswer = ''
    },
    timer () {
      const gameTime = setInterval(() => {
        if (!this.question) {
          clearInterval(gameTime)
          this.$socket.emit('resetTimer')
        } else if (this.time <= 0) {
          clearInterval(gameTime)
          this.$socket.emit('resetTimer')
          this.getQuestion()
        } else {
          this.$socket.emit('timer')
        }
      }, 1000)
    },
    getQuestion () {
      this.$socket.emit('getQuestion')
      this.timer()
    }
  },
  computed: {
    usersPlaying () {
      // ambil score semua user
      return this.$store.state.scores
    },
    question () {
      return this.$store.state.questions
    },
    messages () {
      return this.$store.state.messages
    },
    user () {
      return this.$store.state.user
    },
    answered () {
      return this.$store.state.answered
    },
    answers () {
      return this.$store.state.answers
    },
    time () {
      return this.$store.state.time
    }
  }
}
</script>

<style>
.gameboard-side {
  min-height: 100vh;
}

.gameboard {
  border-radius: 20px !important;
  min-height: 80vh;
}

.gameboard-main {
  height: 50vh;
}

.timer {
  width: 8vw;
  border-radius: 10px !important;
}

#question {
  margin-top: 16px;
}

.scoreboard-card {
  border-radius: 10px !important;
  height: 40vh;
}

.scoreboard-table {
  height: 30vh;
  overflow-y: auto;
}

.user-avatar-scoreboard {
  width: 2vw;
}

.username-scoreboard {
  font-size: 1rem;
  margin-left: 8px;
}

#message-board {
  margin-top: 16px;
  border-radius: 10px !important;
}
</style>
