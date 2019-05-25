<template>
  <v-ons-page modifier="white">
    <custom-toolbar v-bind="toolbarInfo"></custom-toolbar>
    <v-ons-list>
      <v-ons-list-item v-for="effect of effects" :key="effect.label" modifier="divider">
        <effect v-bind="effect"></effect>
      </v-ons-list-item>
    </v-ons-list>
  </v-ons-page>
</template>

<script>
import animates from "../assets/animate.json";
import colors from "../assets/color.json";
import { mapState } from "vuex";

export default {
  computed: {
    effects: function() {
      let efs = [];
      for (let i = 0; i < animates.length; i++) {
        let anim = animates[i];
        if (this.favorites.indexOf(anim) != -1) {
          efs.push({
            label: anim,
            fontFamily: "Monospace",
            fontSize: 6,
            bgColor: colors[i],
            txtColor: "#ffffff",
            animate: anim
          });
        }
      }
      return efs;
    },
    ...mapState({
      favorites: state => state.settings.favorites
    })
  }
};
</script>

<style scoped>
</style>
