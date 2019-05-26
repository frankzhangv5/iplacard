<template>
  <v-ons-page>
    <keep-alive>
      <v-ons-splitter>
        <v-ons-splitter-side
          swipeable
          collapse
          side="left"
          width="260px"
          :swipe-target-width="md && 25"
          :animation="md ? 'overlay' : 'reveal'"
          :open.sync="isOpen"
        >
          <menu-page></menu-page>
        </v-ons-splitter-side>

        <v-ons-splitter-content>
          <app-tabbar :theme="theme"></app-tabbar>
        </v-ons-splitter-content>
      </v-ons-splitter>
    </keep-alive>
  </v-ons-page>
</template>

<script>
import AppTabbar from "./AppTabbar.vue";
import MenuPage from "../pages/Menu.vue";
import { mapState } from "vuex";


export default {

  methods: {
    reload() {
      // eslint-disable-next-line
      console.log('force-update');
      this.$forceUpdate();
    }
  },
  computed: {
    isOpen: {
      get: function() {
        return this.open;
      },
      set: function(newValue) {
        this.$store.commit("splitter/toggle", newValue);
      }
    },
    ...mapState({
      theme: state => state.settings.theme,
      open: state => state.splitter.open
    })
  },
  components: { AppTabbar, MenuPage }
};
</script>

<style scoped>
ons-splitter-side[animation="overlay"] {
  border-left: 1px solid #bbb;
}
</style>
