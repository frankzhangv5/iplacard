<template>
  <v-ons-page>
    <custom-toolbar v-bind="toolbarInfo"></custom-toolbar>
    <v-ons-list>
      <v-ons-list-item
        style="padding:0;"
        v-for="scene of scenes"
        :key="scene.label"
        modifier="divider"
      >
        <effect v-bind="scene" infinite="true"></effect>
      </v-ons-list-item>
    </v-ons-list>
  </v-ons-page>
</template>

<script>
import { mapState } from "vuex";

export default {
  data() {
    return {};
  },
  computed: {
    scenes: function() {
      return this.$configs.scenes;
    },
    ...mapState({
      text: state => state.settings.text
    })
  },

  methods: {}
};
</script>

<style>
</style>
