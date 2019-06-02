<template>
  <v-ons-page modifier="white">
    <custom-toolbar v-bind="toolbarInfo"></custom-toolbar>
    <v-ons-list>
      <v-ons-list-item v-for="effect of effects" :key="effect.label" modifier="divider">
        <effect v-bind="effect" infinite="true"></effect>
      </v-ons-list-item>
    </v-ons-list>
  </v-ons-page>
</template>

<script>
import { mapState } from "vuex";

export default {
  computed: {
    effects: function() {
      let efs = [];
      if (this.favorites.length > 0) {
        var self = this;
        // eslint-disable-next-line
        this.$configs.effects.forEach(function(effect, index) {
          if (self.favorites.indexOf(effect.label) != -1) {
            efs.push(effect);
          }
        });
        // eslint-disable-next-line
        this.$configs.scenes.forEach(function(effect, index) {
          if (self.favorites.indexOf(effect.label) != -1) {
            efs.push(effect);
          }
        });
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
