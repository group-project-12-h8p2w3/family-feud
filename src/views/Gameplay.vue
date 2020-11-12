<template>
  <div class="gameplay">
    <nav class="navbar navbar-light bg-light">
      <span class="navbar-brand mb-0 h1">Family-feud</span>
    </nav>
    <div class="container-fluid">
      <div class="row justify-content-center">
        <div class="col-7">
          <div class="card shadow">
            <div class="card-header">
              Gameboard
            </div>
            <div class="card-body">
              <!-- Trigger Play Button -->
              <div id="btn-trigger-play">
                <button @click.prevent="gameStart" type="button" class="btn btn-info">Trigger Start Play</button>
                <hr>
              </div>
              <!-- Timer -->
              <div id="timer-gameplay">
                <div>
                  Timer:
                </div>
                <div>
                  50
                </div>
                <hr>
              </div>
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
        <div class="col-3">
          <div class="card shadow">
            <div class="card-header">
              <h5 class="card-title">{{ user }}</h5>
            </div>
            <div class="card-body">
              <div>
                <div id="userScoreBoard">
                User score:
                <h3>50</h3>
              </div>
              <hr>
              <div id="otherPlayers">
                <table class="table table-bordered" style="font-size: 0.8em;">
                  <col style="width: 8em;" />
                  <col style="width: 1em;" />
                  <col style="width: 1em;" />
                  <tr v-for="(user, i) in usersPlaying" :key="i">
                    <td>{{ user.username }}</td>
                    <td>:</td>
                    <td>{{ user.score }}</td>
                  </tr>
                </table>
              </div>
              </div>
              <!-- chat board -->
              <div class="border p-2 text-left" id="message-board" style="overflow: auto;  height: 20vh;">
                <div>Siapa: hai guys</div>
                <div>Siapa: hai guys</div>
                <div>Siapa: hai guys</div>
                <div>Siapa: hai guys</div>
                <div>Siapa: hai guys</div>
                <div>Siapa: hai guys</div>
                <div>Siapa: hai guys</div>
                <div>Siapa: hai guys</div>
                <div>Siapa: hai guys</div>
                <div>Siapa: hai guys</div>
                <div>Siapa: hai guys</div>
                <div>Siapa: hai guys</div>
                <div>Siapa: hai guys</div>
                <div>Siapa: hai guys</div>
                <div>Siapa: hai guys</div>
              </div>
              <!-- Form input message -->
              <div id="message-input" class="input-group mb-3">
                <input type="text" class="form-control" placeholder="Your message...">
                <div class="input-group-append">
                  <button class="btn btn-outline-secondary" type="button" id="button-addon2">Submit</button>
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
      message: '',
      isGameStarted: false,
      inputanswer: ''
    }
  },
  methods: {
    gameStart () {
      this.$socket.emit('fetchQuestion')
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
    }
  }
}
</script>

<style>

</style>
