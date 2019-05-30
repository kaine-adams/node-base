import Vue from 'vue'
import Vuex from 'vuex'
Vue.use(Vuex);

import VueSocketio from 'vue-socket.io-extended'
import io from 'socket.io-client'
const socket = io();

export const VueStore = new Vuex.Store({
	state: {
  	counter: 0,
    connect: false,
    message: ''
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
      state.counter = data.sum;
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
  	counter: function(state) {
    	return state.counter;
    },
  	connect: function(state) {
    	return state.connect;
    }
  }
});

Vue.use(VueSocketio,socket,{store: VueStore});

