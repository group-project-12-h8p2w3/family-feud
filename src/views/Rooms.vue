<template>
  <div>
    <div class="row">
      <div class="col d-flex flex-column justify-content-center illustration-side">
        <div class="align-self-center">
          <img class="waiting-illustration" src="../assets/waiting-illustration.svg" alt="">
          <h1 class="text-muted waiting-room-title">Waiting Room...</h1>
        </div>
      </div>
      <div class="col-7 d-flex flex-column justify-content-center">
        <div class="card rooms-card">
          <div class="card-body d-flex flex-column justify-content-center">
            <div class="align-self-center">
              <h1>Players</h1>
              <div class="player-container scrollable d-flex flex-wrap">
                <div v-for="(user, i) in users" :key="i" class="card player-card">
                  <div class="card-body d-flex flex-column justify-content-center">
                    <div class="align-self-center">
                      <img class="user-avatar" :src="`https://avatars.dicebear.com/api/bottts/${user}.svg`" alt="user-avatar">
                      <h5 class="username-card">{{ user }}</h5>
                    </div>
                  </div>
                </div>
              </div>
              <button v-if="!isStart" @click="play" class="play-btn">Play</button>
              <h5 v-if="isStart" class="waiting-info text-muted">Current game is running please wait until it ended</h5>
            </div>
          </div>
        </div>
      </div>
    </div>
  </div>
</template>

<script>
export default {
  name: 'Rooms',
  data () {
    return {
      isStart: false
    }
  },
  methods: {
    play () {
      this.$socket.emit('enterGame')
    }
  },
  computed: {
    users () {
      return this.$store.state.users
    }
  }
}
</script>

<style>
  .waiting-illustration {
    width: 30vw;
  }

  .illustration-side {
    height: 100vh;
    width: 100vw;
  }

  .waiting-room-title {
    margin-top: 16px;
  }

  .rooms-card {
    width: 50vw;
    height: 60vh;
    box-shadow: 0px 3px 15px rgba(0,0,0,0.4);
    border-radius: 25px !important;
  }

  .player-container {
    margin-top: 16px;
    width: 43vw;
    height: 35vh;
    max-width: 43vw;
    max-height: 35vh;
    overflow-x: auto;
  }

  .player-card {
    width: 8vw;
    height: 12vh;
    box-shadow: 0px 3px 5px rgba(0,0,0,0.1);
    border-radius: 5px !important;
    margin-top: 8px;
    margin-left: 8px;
  }

  .user-avatar {
    width: 4vw;
  }

  .username-card {
    margin-top: 4px;
  }

  .play-btn {
    margin-top: 16px;
    background-color: #a1be02;
    color: #ffffff;
    font-size: 25px;
    border-radius: 10px;
    padding: 12px;
    border: 0;
    box-shadow: 0px 3px 15px rgba(0,0,0,0.3);
    width: 10vw;
  }

  .play-btn:hover {
    transform: scale(1.05);
    cursor: pointer;
  }

  .waiting-info {
    margin-top: 24px;
  }
</style>
