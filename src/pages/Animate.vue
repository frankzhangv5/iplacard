<template>
  <v-ons-page modifier="white">
    <!-- <div style="display:inline-block;height:55px;">
      <v-ons-toolbar>
        <div class="center">
          <div class="segment" style="width:200px;margin:7px 50px;">
            <div class="segment__item">
              <input type="radio" class="segment__input" name="navi-segment-a" checked>
              <div class="segment__button">官方推荐</div>
            </div>

            <div class="segment__item">
              <input type="radio" class="segment__input" name="navi-segment-a">
              <div class="segment__button">用户上传</div>
            </div>
          </div>
        </div>
      </v-ons-toolbar>
    </div>-->
    <v-ons-list>
      <v-ons-list-item
        style="padding:0;"
        v-for="effect of effects"
        :key="effect.label"
        modifier="divider"
      >
        <effect v-bind="effect" :infinite="isInfinite"></effect>
      </v-ons-list-item>
    </v-ons-list>
    <!-- <v-ons-list>
      <v-ons-lazy-repeat :effects="effects" :render-item="renderItem" :length="effects.length"></v-ons-lazy-repeat>
    </v-ons-list>-->
  </v-ons-page>
</template>

<script>
// import Vue from "vue/dist/vue.js";
import { mapState } from "vuex";

export default {
  data() {
    return {
      isInfinite: false
      //this.tabIndex === 1
      // renderItem: i =>
      //   new Vue({
      //     inheritAttrs: false,
      //     template: `
      //       <v-ons-list-item :key="index">
      //        {{index}}
      //       </v-ons-list-item>
      //     `,
      //     data() {
      //       return {
      //         index: i
      //       };
      //     }
      //   })
    };
  },
  computed: {
    effects: function() {
      return this.$configs.effects;
    },
    ...mapState({
      tabIndex: state => state.tabbar.index
    })
  },
  watch: {
    tabIndex: function() {
      // eslint-disable-next-line
      console.log("currentTabIndex:" + this.tabIndex);
      if (this.tabIndex === 1) {
        this.isInfinite = false;
      } else {
        this.isInfinite = false;
      }
    }
  },

  methods: {}
};
</script>

<style scoped>
.effect-box {
  display: inline-block;
  width: 100%;
  height: 10em;
}
</style>
