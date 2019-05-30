<template>
  <div id="about">
    <p>{{counter}}</p>
  </div>
</template>

<script>
export default {
  name: 'about',
  computed: {
    counter: function() {
      return this.$store.getters.counter;
    }
  },
}
</script>
<!-- styling for the component -->
<style>
#about {
  font-family: 'Avenir', Helvetica, Arial, sans-serif;
  -webkit-font-smoothing: antialiased;
  -moz-osx-font-smoothing: grayscale;
  text-align: center;
  color: #2c3e50;
  margin-top: 60px;
}
</style>