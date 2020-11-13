<template>
  <div class="gameplay">
    <div class="container-fluid">
      <div class="row justify-content-center">
        <div class="col-7 d-flex flex-column justify-content-center gameboard-side">
          <div class="card shadow gameboard">
            <div class="card-body">
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
                  <!-- Trigger Play Button -->
                <div v-if="!canPlay" id="btn-trigger-play">
                  <button @click.prevent="gameStart" type="button" class="btn btn-info">Play</button>
                </div>
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
              <div>
                <form @submit.prevent="inputAnswer">
                  <input
                  @submit="inputAnswer"
                  v-model="inputanswer"
                  type="text" class="form-control w-100"
                  placeholder="Your answer..."
                  aria-label="Recipient's username"
                  aria-describedby="button-addon2">
                </form>
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
                        </table>
                      </div>
                    </div>
                  </div>
                </div>
              </div>
              <!-- chat board -->
              <div class="border p-2 text-left" id="message-board" style="overflow: auto;  height: 30vh;">
                <div v-for="(message, i) in messages" :key="i">
                  <img class="user-avatar-scoreboard" :src="`https://avatars.dicebear.com/api/bottts/${message.user}.svg`" alt="user-avatar">
                  <span> : {{message.answer}}</span>
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
      inputanswer: ''
    }
  },
  methods: {
    gameStart () {
      if (!this.canPlay) {
        this.$socket.emit('fetchQuestion')
        this.timer()
      } else {
        this.$router.push('/rooms')
      }
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
          this.$socket.emit('finish')
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
    },
    canPlay () {
      return this.$store.state.isPlay
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
  height: 56vh;
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
