import Vue from "vue";
import { Component, Prop } from 'vue-property-decorator';

@Component
export default class Home extends Vue {
    @Prop({type: String, default: 'Hello from the Vue component.'}) readonly msg!: String;
}