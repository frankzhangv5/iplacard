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
    </div> -->
    <v-ons-list>
      <v-ons-list-item style="padding:0;" v-for="effect of effects" :key="effect.label" modifier="divider">
        <effect v-bind="effect"></effect>
      </v-ons-list-item>
    </v-ons-list>
    <!-- <v-ons-list>
      <v-ons-lazy-repeat :effects="effects" :render-item="renderItem" :length="effects.length"></v-ons-lazy-repeat>
    </v-ons-list> -->
  </v-ons-page>
</template>

<script>
import animates from "../assets/animate.json";
import colors from "../assets/color.json";
import Vue from 'vue/dist/vue.js';

export default {
  data() {
    return {
      renderItem: i =>
        new Vue({
          inheritAttrs: false,
          template: `
            <v-ons-list-item :key="index">
             {{index}}
            </v-ons-list-item>
          `,
          data() {
            return {
              index: i,
            };
          }
        })
    };
  },
  computed: {
    effects: function() {
      let efs = [];
      for (let i=0; i<animates.length; i++) {
        let anim = animates[i];
        efs.push({
          label: anim,
          fontFamily: "Monospace",
          fontSize: 6,
          bgColor: colors[i],
          txtColor: "#ffffff",
          animate: anim
        });
      }
      return efs;
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
