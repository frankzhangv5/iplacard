<template>
  <v-ons-page modifier="white">
    <v-ons-card style="margin: 0; margin-bottom: 10px; padding: 0">
      <div id="preview" v-if="!modalVisible" :style="backgroundStyle">
        <div :class="animateCls" :style="previewTextStyle">{{ text }}</div>
      </div>

      <button
        class="button button--material--flat"
        button--material--flat
        style="width: 100%"
        @click="play"
      >
        <v-ons-icon size="24px" icon="md-play"></v-ons-icon>
      </button>
    </v-ons-card>
    <v-ons-modal
      @click="handleModalClick"
      @postshow="postshow"
      @prehide="prehide"
      :visible="modalVisible"
      :style="modalStyle"
      >{{ text }}</v-ons-modal
    >
    <v-ons-list>
      <v-ons-list-header>{{ $t("my.settings") }}</v-ons-list-header>
      <v-ons-list-item
        v-for="item of items"
        :key="item.title"
        @click="push(item.component, item.title)"
        modifier="chevron"
        tappable
      >
        <span class="list-item__title">{{ item.title }}</span>
        <span class="list-item__subtitle">{{ item.subtitle }}</span>
      </v-ons-list-item>
    </v-ons-list>
  </v-ons-page>
</template>

<script>
import TextEditor from "./TextEditor.vue";
import PredefinedScenes from "./PredefinedScenes.vue";
import CustomizeEffect from "./CustomizeEffect.vue";
import { mapState } from "vuex";
import { eventHub } from "../event.js";

export default {
  created: function () {
    eventHub.$on("preview", this.preview);
    document.addEventListener("backbutton", this.onBackKeyDown, false);
  },
  beforeDestroy: function () {
    eventHub.$off("preview", this.preview);
  },
  data() {
    return {
      lock: false,
      modalVisible: false,
      modalStyle: "",
      isInfinite: true,
      effect: {},
    };
  },
  computed: {
    items: function () {
      return [
        {
          component: TextEditor,
          title: this.$t("home.edit"),
          subtitle: this.text,
        },
        {
          component: PredefinedScenes,
          title: this.$t("home.predefine"),
          subtitle: this.$t("home.predefineSubtitle"),
        },
        {
          component: CustomizeEffect,
          title: this.$t("home.customize"),
          subtitle: this.$t("home.customizeSubtitle"),
        },
      ];
    },
    lockStyle: function () {
      return `display:${this.lock ? "" : "none"};`;
    },

    animateCls: function () {
      return this.isInfinite
        ? `animated infinite ${this.animate}`
        : `animated ${this.animate}`;
    },
    previewTextStyle: function () {
      return `font-size:${this.fontSize / 3.5}em;font-family:${
        this.fontFamily
      };color:${this.txtColor};
      font-weight:bold;
      white-space:nowrap;
      overflow:hidden;
      word-break:keep-all;
      text-overflow:ellipsis;`;
    },

    backgroundStyle: function () {
      return `background-color:${this.bgColor} !important;`;
    },
    ...mapState({
      text: (state) => state.settings.text,
      fontSize: (state) => state.settings.fontSize,
      fontFamily: (state) => state.settings.fontFamily,
      txtColor: (state) => state.settings.txtColor,
      animate: (state) => state.settings.animate,
      bgColor: (state) => state.settings.bgColor,
      label: (state) => state.settings.label,
      tabIndex: (state) => state.tabbar.index,
    }),
  },
  watch: {
    tabIndex: function () {
      // eslint-disable-next-line
      console.log("currentTabIndex:" + this.tabIndex);
      if (this.tabIndex === 0) {
        this.isInfinite = true;
      } else {
        this.isInfinite = false;
      }
    },
  },
  methods: {
    postshow(event) {
      var lockButton = document.createElement("ons-icon");
      lockButton.setAttribute("icon", "md-lock-open");
      lockButton.setAttribute("size", "24px");
      lockButton.setAttribute("color", "white");
      lockButton.setAttribute(
        "style",
        "padding-bottom:10px;display:table-cell;vertical-align: middle;visibility:visible;"
      );
      lockButton.setAttribute("id", "lock-button");
      var self = this;
      lockButton.addEventListener("click", function (event) {
        // eslint-disable-next-line
        console.log("lock button clicked.");
        event.stopPropagation();
        if (self.lock) {
          lockButton.setAttribute("icon", "md-lock-open");
          self.lock = false;
        } else {
          lockButton.setAttribute("icon", "md-lock-outline");
          self.lock = true;
        }
      });
      setTimeout(function () {
        lockButton.style.visibility = "hidden";
      }, 5000);

      let el = event.modal.getElementsByClassName("modal__content")[0];
      el.className += ` animated infinite ${this.effect.animate}`;
      el.style.fontFamily = this.effect.fontFamily;
      el.style.color = this.effect.txtColor;
      el.style.display = "table-cell";

      event.modal.appendChild(lockButton);

      window.plugins &&
        window.plugins.insomnia &&
        window.plugins.insomnia.keepAwake(
          function () {
            // eslint-disable-next-line
            console.log("set keepAwake success");
          },
          function () {
            // eslint-disable-next-line
            console.log("set keepAwake failed");
          }
        );
    },
    prehide(event) {
      var lockButton = document.getElementById("lock-button");
      if (lockButton != null) {
        event.modal.removeChild(lockButton);
      }
      let el = event.modal.getElementsByClassName("modal__content")[0];
      el.className = "modal__content";
      el.style.fontFamily = "";
      window.plugins &&
        window.plugins.insomnia &&
        window.plugins.insomnia.allowSleepAgain(
          function () {
            // eslint-disable-next-line
            console.log("set allowSleepAgain success");
          },
          function () {
            // eslint-disable-next-line
            console.log("set allowSleepAgain failed");
          }
        );
    },
    handleModalClick() {
      // eslint-disable-next-line
      console.log("handleModalClick : " + this.lock);
      var lockButton = document.getElementById("lock-button");

      if (!this.lock && lockButton.style.visibility === "visible") {
        this.modalVisible = false;
        return;
      }
      lockButton.style.visibility = "visible";
      setTimeout(function () {
        lockButton.style.visibility = "hidden";
      }, 5000);
    },
    play() {
      this.preview({
        label: this.label,
        fontSize: this.fontSize,
        fontFamily: this.fontFamily,
        txtColor: this.txtColor,
        bgColor: this.bgColor,
        animate: this.animate,
      });
      // el.style.alignItems = "center";
    },
    preview(effect) {
      this.effect = effect;
      this.modalStyle = `
      font-size:${effect.fontSize}em;
      font-family:${effect.fontFamily};
      color:${effect.txtColor};
      background-color:${effect.bgColor} !important;
      font-weight:bold;
      writing-mode: vertical-rl;
      text-orientation: sideways;
      white-space:nowrap;
      overflow:hidden;
      text-overflow:ellipsis;
      word-break:keep-all;`;
      this.modalVisible = true;
      // eslint-disable-next-line
      console.log("on preview:");
      // eslint-disable-next-line
      // console.log(effect);
    },
    push(page, key) {
      this.$store.commit("navigator/push", {
        extends: page,
        data() {
          return {
            toolbarInfo: {
              backLabel: this.$t("tabs.home"),
              title: key,
            },
          };
        },
      });
    },
    onBackKeyDown(e) {
      e.preventDefault();
      // console.log("Back Button is Pressed!");
      setTimeout(function () {
        history.go(-1);
      }, 200);
    },
  },
};
</script>

<style scoped>
#preview {
  display: inline-block;
  text-align: center;
  width: 100%;
  height: 156px;
  line-height: 156px;
}
</style>
