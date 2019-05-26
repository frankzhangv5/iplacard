<template>
  <v-ons-page modifier="white">
    <custom-toolbar v-bind="toolbarInfo"></custom-toolbar>

    <v-ons-list>
      <v-ons-list-header>{{$t('settings.title')}}</v-ons-list-header>
      <v-ons-list-item modifier="longdivider">
        <div class="left">{{$t('settings.lang')}}</div>
        <div class="right">
          <select
            class="select-input"
            style="width: 200px;text-align:right;"
            v-model="selectedLang"
          >
            <option v-for="item of langs" :key="item.text" :value="item.value">{{ item.text }}</option>
          </select>
        </div>
      </v-ons-list-item>
      <v-ons-list-item modifier="longdivider">
        <div class="left">{{$t('settings.theme')}}</div>
        <div class="right">
          <select
            class="select-input"
            style="width: 200px;text-align:right;"
            v-model="selectedTheme"
          >
            <option v-for="item of themes" :key="item.text" :value="item.value">{{ item.text }}</option>
          </select>
        </div>
      </v-ons-list-item>
    </v-ons-list>
  </v-ons-page>
</template>

<script>
import { mapState } from "vuex";

export default {
  data() {
    return {
      langs: [
        { text: this.$t("lang.zh_CN"), value: "zh_CN" },
        { text: this.$t("lang.en_US"), value: "en_US" }
      ],
      themes: [
        { text: this.$t("theme.red"), value: [255, 59, 61] },
        { text: this.$t("theme.blue"), value: [30, 136, 229] },
        { text: this.$t("theme.purple"), value: [103, 58, 183] }
      ]
    };
  },

  computed: {
    selectedLang: {
      get() {
        return localStorage.getItem("locale") || "zh_CN";
      },
      set(val) {
        let currentLang = localStorage.getItem("locale") || "zh_CN";
        if (currentLang != val) {
          this.$i18n.locale = val;
          localStorage.setItem("locale", val);
          this.$store.commit("settings/setLanguage", val);
          window.location.reload();
        }
      }
    },
    selectedTheme: {
      get() {
        return this.theme;
      },
      set(val) {
        this.$store.commit("settings/setTheme", val);
        window.location.reload();
      }
    },
    ...mapState({
      theme: state => state.settings.theme
    })
  }
};
</script>

<style scoped>
</style>
