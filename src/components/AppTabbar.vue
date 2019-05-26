<template>
  <v-ons-page :style="swipePosition">
    <custom-toolbar :style="swipeTheme" modifier="white-content">
      <v-ons-toolbar-button
        modifier="white-content"
        slot="left"
        @click="$store.commit('splitter/toggle');"
      >
        <img width="22px" height="22px" src="../assets/logo.png">
      </v-ons-toolbar-button>
      <v-ons-toolbar-button
        slot="right"
        modifier="white-content"
        @click="$store.commit('splitter/toggle');"
      >
        <v-ons-icon icon="ion-navicon, material:md-menu"></v-ons-icon>
      </v-ons-toolbar-button>
    </custom-toolbar>

    <v-ons-tabbar
      position="auto"
      :modifier="md ? 'autogrow white-content' : ''"
      :on-swipe="md ? onSwipe : null"
      :tabbar-style="swipeTheme"
      :tabs="tabs"
      :index.sync="index"
    ></v-ons-tabbar>
  </v-ons-page>
</template>

<script>
import Home from "../pages/Home.vue";
import Animate from "../pages/Animate.vue";
import My from "../pages/My.vue";


// Just a linear interpolation formula
const lerp = (x0, x1, t) => parseInt((1 - t) * x0 + t * x1, 10);

export default {
  props: ["theme"],
  data() {
    return {
      colors: this.theme,
      animationOptions: {},
      topPosition: 0,
      tabs: [
        {
          label: this.$t("tabs.home"),
          icon: this.md ? null : "ion-home",
          page: Home,
          theme: this.theme
        },
        {
          label: this.$t("tabs.animate"),
          icon: this.md ? null : "ion-edit",
          page: Animate,
          theme: this.theme
        },
        {
          label: this.$t("tabs.my"),
          icon: this.md ? null : "ion-film-marker",
          page: My,
          theme: this.theme
        }
      ]
    };
  },

  methods: {
    onSwipe(index, animationOptions) {
      // Apply the same transition as ons-tabbar
      this.animationOptions = animationOptions;

      // Interpolate colors and top position
      const a = Math.floor(index),
        b = Math.ceil(index),
        ratio = index % 1;
      this.colors = this.colors.map((c, i) =>
        lerp(this.tabs[a].theme[i], this.tabs[b].theme[i], ratio)
      );
      this.topPosition = lerp(
        this.tabs[a].top || 0,
        this.tabs[b].top || 0,
        ratio
      );
    },
  },

  computed: {
    index: {
      get() {
        return this.$store.state.tabbar.index;
      },
      set(newValue) {
        this.$store.commit("tabbar/set", newValue);
      }
    },
    title() {
      return this.md
        ? this.$t("app.name")
        : this.tabs[this.index].title || this.tabs[this.index].label;
    },
    swipeTheme() {
      return (
        this.md && {
          backgroundColor: `rgb(${this.colors.join(",")})`,
          transition: `all ${this.animationOptions.duration || 0}s ${this
            .animationOptions.timing || ""}`
        }
      );
    },
    swipePosition() {
      return (
        this.md && {
          top: this.topPosition + "px",
          transition: `all ${this.animationOptions.duration || 0}s ${this
            .animationOptions.timing || ""}`
        }
      );
    }
  }
};
</script>

<style>
/* Custom 'white-content' modifier */

.page--material .toolbar--white-content__center,
.page--material .toolbar-button--white-content,
.page--material :checked + .tabbar--white-content__button {
  color: white;
}

.page--material .tabbar--white-content__button {
  color: rgba(255, 255, 255, 0.7);
}

.page--material .tabbar--white-content__border {
  background-color: white;
}
</style>
