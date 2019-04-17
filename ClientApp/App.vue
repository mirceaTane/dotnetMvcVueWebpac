<template>
    <home></home>
</template>

<script lang="ts">
    import Vue from 'vue';
    import { Component } from 'vue-property-decorator';
    import Home from "./components/Home.vue"

    const AppProps = Vue.extend({})
    @Component({
        components: {
            "home": Home
        }
    })
    export default class App extends AppProps {}
</script>
