import Vue from 'vue';
import AppComponent from './App.vue';

const app = new Vue({
    el: '#app',
    render: h => h(AppComponent)
});