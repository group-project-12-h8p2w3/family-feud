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
                  <p>Question:</p>
                  <h3>{{ question }}</h3>
                  <hr>
                </div>
                <!-- Answer list -->
                <div class="" id="answer">
                  <table class="table table-bordered" style="margin: auto; width: 50%;">
                    <col style="width: 8em;" />
                    <col style="width: 1em;" />
                    <thead>
                      <tr>
                        <th colspan="2">Answers</th>
                      </tr>
                    </thead>
                    <tbody>
                      <tr v-for="el in answer" :key="el.id">
                        <td>{{ el.answer }}</td>
                        <td>{{ el.point }}</td>
                      </tr>
                    </tbody>
                  </table>
                  <hr>
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
                <!-- <div class="input-group-append">
                  <button @click.prevent="inputAnswer" class="btn btn-outline-secondary" type="button" id="button-addon2">Submit</button>
                </div> -->
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
export default {
  name: 'Gameplay',
  data () {
    return {
      inputanswer: ''
    }
  },
  // beforedEnter: {
  //   gameCheck () {
  //     this.gameStart()
  //   }
  // },
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
    answer () {
      return this.$store.state.answered
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
  height: 50vh;
}

.timer {
  width: 8vw;
  border-radius: 10px !important;
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

.chatBackground {
  background-color: greenyellow;
}
</style>
