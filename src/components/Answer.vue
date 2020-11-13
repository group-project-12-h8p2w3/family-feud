<template>
  <div class="answer-component">
    <div v-show="isRevealed" class="card answer-card answered-card">
      <div class="card-body">
        <small>{{ answer.answer }} ({{answer.point}})</small>
      </div>
    </div>
    <div v-show="!isRevealed" class="card answer-card">
      <div class="card-body">
      </div>
    </div>
  </div>
</template>

<script>
export default {
  name: 'Answer',
  props: ['answer'],
  computed: {
    answered () {
      return this.$store.state.answered
    },
    isRevealed () {
      let isShow = false
      this.answered.forEach(el => {
        if (el.id === this.answer.id) {
          isShow = true
        }
      })
      return isShow
    }
  }
}
</script>

<!-- Add "scoped" attribute to limit CSS to this component only -->
<style scoped>
.answer-card {
  margin-left: 8px;
  margin-top: 8px;
  width: 10vw;
  height: 5vh;
}

.answered-card {
  background-color: #a1be02;
}
</style>
