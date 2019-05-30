const socket = io();
const store = new Vuex.Store({
	state: {
  	sum: 0,
    connect: false,
    message: null
  },
  mutations: {
  	increment: function(state, payload) {
    	socket.emit('sum', {action: 'increment'});
    },
  	decrement: function(state, payload) {
    	socket.emit('sum', {action: 'decrement'});
    },        
    SOCKET_CONNECT: function(state,  status ) {
      console.log("Connected");
      state.connect = true;
    },
    SOCKET_DISCONNECT: function(state,  status ) {
      console.log("Disconnected");
      state.connect = false;
    },
    SOCKET_MESSAGECHANNEL: function(state,  data) {
      console.log("Message Recieved");
      state.message = data;
    },
    SOCKET_UPDATESUM: function(state,  data) {
      state.sum = data.sum;
    },
  	
  },
  actions: {
  	increment(context) {
    	context.commit('increment');
    },
  	decrement(context) {
    	context.commit('decrement');
    }
  },
  getters: {
  	sum: function(state) {
    	return state.sum;
    },
  	connect: function(state) {
    	return state.connect;
    }
  }

})

Vue.use(VueSocketIOExt,socket,{store});

var app = new Vue({
  el: '#app',
  store: store,
  computed: {
  	sum: function() {
    	return this.$store.getters.sum;
    },
    helloworld: function() {
    	return this.$store.getters.connect;
    }
  },
  data: {
  },
  
})