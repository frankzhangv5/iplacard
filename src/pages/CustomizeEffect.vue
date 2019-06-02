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
export default {
  data() {
    return {};
  },
  computed: {
    animates: function() {
      return this.$configs.animates;
    },
    fonts: function() {
      return this.$configs.fonts;
    },
    fontSizes: function() {
      return this.$configs.fontSizes;
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
