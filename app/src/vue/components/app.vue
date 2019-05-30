<template>
  <div id="app">
    <button @click="decrement">-</button>
    <p>{{counter}}</p>
    <button @click="increment">+</button>
    
    <router-link v-bind:to="'/'">Home</router-link>
    <router-link v-bind:to="'/About'">About</router-link>
    <router-view></router-view>
  </div>
</template> 

<script>
export default {
  name: 'app',
  computed: {
    counter: function() {
      return this.$store.getters.counter;
    }
  },
  methods: {
    decrement: function(event) {
      this.$store.dispatch('decrement');
    },
    increment: function(event) {
      this.$store.dispatch('increment');
    },
  }
}
</script>

<style>
#app {
  font-family: 'Avenir', Helvetica, Arial, sans-serif;
  -webkit-font-smoothing: antialiased;
  -moz-osx-font-smoothing: grayscale;
  text-align: center;
  color: #2c3e50;
  margin-top: 60px;
}
</style>