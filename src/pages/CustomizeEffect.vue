<template>
  <v-ons-page modifier="white">
    <custom-toolbar v-bind="toolbarInfo"></custom-toolbar>

    <v-ons-list>
      <v-ons-list-header>{{$t('customize.textFormatSettings')}}</v-ons-list-header>
      <v-ons-list-item modifier="longdivider">
        <div class="left">{{$t('customize.fontFamily')}}</div>
        <div class="right">
          <select
            class="select-input"
            style="width: 150px;text-align:right;"
            v-model="selectedFont"
          >
            <option v-for="item of fonts" :key="item.text" :value="item.value">{{ item.text }}</option>
          </select>
        </div>
      </v-ons-list-item>
      <v-ons-list-item modifier="longdivider">
        <div class="left">{{$t('customize.fontSize')}}</div>
        <div class="right">
          <select
            class="select-input"
            style="width: 150px;text-align:right;"
            v-model="selectedFontSize"
          >
            <option v-for="item of fontSizes" :key="item.text" :value="item.value">{{ item.text }}</option>
          </select>
        </div>
      </v-ons-list-item>
      <v-ons-list-item modifier="longdivider">
        <div class="left">{{$t('customize.textColor')}}</div>
        <div class="right">
          <input style="width:39px;border:none;" type="color" v-model="txtColor">
        </div>
      </v-ons-list-item>
      <v-ons-list-item modifier="longdivider" tappable>
        <div class="left">{{$t('customize.textAnimate')}}</div>
        <div class="right">
          <select
            class="select-input"
            style="width: 150px;text-align:right;"
            v-model="selectedAnimate"
          >
            <option v-for="item of animates" :key="item.text" :value="item.value">{{ item.text }}</option>
          </select>
        </div>
      </v-ons-list-item>
    </v-ons-list>

    <v-ons-list>
      <v-ons-list-header>{{$t('customize.backgroundSettings')}}</v-ons-list-header>
      <v-ons-list-item modifier="longdivider">
        <div class="left">{{$t('customize.backgroundColor')}}</div>
        <div class="right">
          <input style="width:39px;border:none;" type="color" v-model="bgColor">
        </div>
      </v-ons-list-item>
      <!-- <v-ons-list-item modifier="longdivider">
          <v-ons-row>透明度</v-ons-row>
          <v-ons-row>
            <v-ons-col width="40px" style="text-align: center; line-height: 31px;">
              <v-ons-icon icon="md-minus"></v-ons-icon>
            </v-ons-col>
            <v-ons-col>
              <v-ons-range v-model="opacity" min="0.0" max="1.0" step="0.1" style="width: 100%;"></v-ons-range>
            </v-ons-col>
            <v-ons-col width="40px" style="text-align: center; line-height: 31px;">
              <v-ons-icon icon="md-plus"></v-ons-icon>
            </v-ons-col>
          </v-ons-row>
          <v-ons-row>当前值: {{ opacity }}</v-ons-row>
      </v-ons-list-item>-->
    </v-ons-list>

    <!-- <v-ons-card>
      <v-ons-list>
        <v-ons-list-header>动效设置</v-ons-list-header>
        <v-ons-list-item modifier="longdivider chevron" tappable>
          <div class="left">背景动效</div>
          <div class="right">B</div>
        </v-ons-list-item>
      </v-ons-list>
    </v-ons-card>-->
  </v-ons-page>
</template>

<script>
import animateNames from "../assets/animate.json";

export default {
  data() {
    return {
      fonts: [
        { text: "Monospace", value: "Monospace" },
        { text: "Serif", value: "Serif" },
        { text: "Sans-Serif", value: "Sans-Serif" },
        { text: "Roboto", value: "'Roboto', Verdana, sans-serif" },
        {
          text: "Apple-System",
          value: '-apple-system, "Helvetica Neue", "Helvetica", "Arial"'
        },
        { text: "TexasLED", value: "'texas_ledregular', Arial, sans-serif" },
      ],
      fontSizes: [
        { text: "1em", value: 1 },
        { text: "2em", value: 2 },
        { text: "3em", value: 3 },
        { text: "4em", value: 4 },
        { text: "5em", value: 5 },
        { text: "6em", value: 6 },
        { text: "7em", value: 7 },
        { text: "8em", value: 8 },
        { text: "9em", value: 9 },
        { text: "10em", value: 10 },
        { text: "11em", value: 11 },
        { text: "12em", value: 12 },
        { text: "13em", value: 13 },
        { text: "14em", value: 14 },
        { text: "15em", value: 15 },
        { text: "16em", value: 16 },
        { text: "17em", value: 17 },
        { text: "18em", value: 18 },
        { text: "19em", value: 19 },
        { text: "20em", value: 20 },
      ],
      opacity: 0.5
    };
  },
  computed: {
    animates: function() {
      let anims = [];
      for (let anim of animateNames) {
        anims.push({ text: anim, value: anim });
      }
      return anims;
    },
    selectedFontSize: {
      get() {
        return this.$store.state.settings.fontSize;
      },
      set(val) {
        this.$store.commit("settings/setFontSize", val);
      }
    },
    selectedFont: {
      get() {
        return this.$store.state.settings.fontFamily;
      },
      set(val) {
        this.$store.commit("settings/setFontFamily", val);
      }
    },
    txtColor: {
      get() {
        return this.$store.state.settings.txtColor;
      },
      set(val) {
        this.$store.commit("settings/setTextColor", val);
      }
    },
    bgColor: {
      get() {
        return this.$store.state.settings.bgColor;
      },
      set(val) {
        this.$store.commit("settings/setBackgroundColor", val);
      }
    },
    selectedAnimate: {
      get() {
        return this.$store.state.settings.animate;
      },
      set(val) {
        this.$store.commit("settings/setAnimate", val);
      }
    }
  },

  methods: {}
};
</script>

<style>
</style>
