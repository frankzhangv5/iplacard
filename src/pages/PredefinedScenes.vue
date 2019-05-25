<template>
  <v-ons-page>
    <custom-toolbar v-bind="toolbarInfo"></custom-toolbar>
    <v-ons-list>
      <v-ons-list-item style="padding:0;" v-for="effect of effects" :key="effect.label" modifier="divider">
        <effect v-bind="effect"></effect>
      </v-ons-list-item>
    </v-ons-list>
  </v-ons-page>
</template>

<script>
import { mapState } from "vuex";

export default {
  data() {
    return {
      effects: [
        {
          label: "机场接人",
          fontFamily: "Monospace",
          fontSize: 6,
          bgColor: "#07c160",
          txtColor: "#ffffff",
          animate: "bounce"
        },
        {
          label: "火车站接人",
          fontFamily: "Monospace",
          fontSize: 6,
          bgColor: "#2e8cff",
          txtColor: "#ffffff",
          animate: "flash"
        },
        {
          label: "滴滴等车",
          fontFamily: "Monospace",
          fontSize: 6,
          bgColor: "#fe523c",
          txtColor: "#ffffff",
          animate: "heartBeat"
        },
        {
          label: "演唱会",
          fontFamily: "Monospace",
          fontSize: 6,
          bgColor: "#ffb129",
          txtColor: "#ffffff",
          animate: "swing"
        }
      ]
    };
  },
  computed: {
    ...mapState({
      text: state => state.settings.text
    })
  },

  methods: {}
};
</script>

<style>
</style>
