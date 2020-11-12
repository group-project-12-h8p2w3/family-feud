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
        <div class="align-self-center">
          <div class="card rooms-card">
            <div class="card-body">
              <h1>Rooms</h1>
            </div>
          </div>
        </div>
      </div>
    </div>
  </div>
</template>

<script>
export default {
  name: 'Rooms'
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
    width: 45vw;
    height: 50vh;
    box-shadow: 0px 3px 15px rgba(0,0,0,0.4);
    border-radius: 25px !important;
  }
</style>
