<template>
  <div class="gameplay">
    <!-- <nav class="navbar navbar-light bg-light">
      <span class="navbar-brand mb-0 h1">Navbar</span>
    </nav> -->
    <div class="container-fluid">
      <div class="row ">
        <div class="col-2">
          <div class="card shadow">
            <div class="card-header">
              Question
            </div>
            <div class="card-body">
              <h5 class="card-title">{{ user }}</h5>
              <hr>
              <div id="userScoreBoard">
                User score:
                <h3>50</h3>
              </div>
              <hr>
              <div id="otherPlayers">
                <div>
                  Player 1: 43
                </div>
                <div>
                  Player 2: 12
                </div>
                <div>
                  Player 3: 65
                </div>
                <div>
                  Player 4: 18
                </div>
              </div>
            </div>
          </div>
        </div>
        <div class="col-7">
          <div class="card shadow">
            <div class="card-header">
              Gameboard
            </div>
            <div class="card-body">
              <button @click.prevent="gameStart" type="button" class="btn btn-info">Trigger Start Play</button>
              <div id="timer-gameplay">
                <div>
                  Timer:
                </div>
                <div>
                  50
                </div>
              </div>
              <div id="answer" style="width: 18rem;">
                <div id="answer-list">
                  <div class="row">
                    <div class="col-6 border">
                      <div class="badge badge-secondary">Secondary</div>
                    </div>
                    <div class="col-6 border">
                      <div class="badge badge-secondary">23</div>
                    </div>
                  </div>
                  <div class="row">
                    <div class="col-6 border">
                      <div class="badge badge-secondary">Secondary</div>
                    </div>
                    <div class="col-6 border">
                      <div class="badge badge-secondary">23</div>
                    </div>
                  </div>
                  <div class="row">
                    <div class="col-6 border">
                      <div class="badge badge-secondary">Secondary</div>
                    </div>
                    <div class="col-6 border">
                      <div class="badge badge-secondary">23</div>
                    </div>
                  </div>
                </div>
              </div>
              <div>
                <div >
                  <h3>{{ question }}</h3>
                </div>
                <hr>
                <div class="input-group mb-3">
                  <input type="text" class="form-control" placeholder="Your answer..." aria-label="Recipient's username" aria-describedby="button-addon2">
                  <div class="input-group-append">
                    <button class="btn btn-outline-secondary" type="button" id="button-addon2">Submit</button>
                  </div>
                </div>
              </div>
            </div>
          </div>
        </div>
        <div class="col-3">
          <div class="card shadow">
            <div class="card-header">
              Chat
            </div>
            <div class="card-body">
              <h5 class="card-title">Card title</h5>
              <p class="card-text">Some quick example text to build on the card title and make up the bulk of the card's content.</p>
              <div class="input-group mb-3">
                  <input v-model="message" type="text" class="form-control" placeholder="Your answer..." aria-label="Recipient's username" aria-describedby="button-addon2">
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
      message: ''
    }
  },
  methods: {
    gameStart () {
      this.$socket.emit('fetchQuestion')
      this.$socket.emit('fetchAnswer')
    },
    sendMessage () {
      const data = {
        user: localStorage.getItem('user'),
        message: this.message
      }
      this.$socket.emit('sendMessage', data)
      this.message = ''
    }
  },
  computed: {
    question () {
      return this.$store.state.questions
    },
    answer () {
      return this.$store.state.answers
    },
    userList () {
      return this.$store.state.users
    },
    messages () {
      return this.$store.state.messages
    },
    user () {
      return this.$store.state.user
    }
  }
}
</script>

<style>

</style>
