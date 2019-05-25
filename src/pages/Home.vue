<template>
  <v-ons-page modifier="white">
    <v-ons-card style="margin:0; margin-bottom:10px;padding:0;">
      <div id="preview" v-if="!modalVisible" :style="backgroundStyle">
        <div :class="animateCls" :style="previewTextStyle">{{text}}</div>
      </div>

      <button
        class="button button--material--flat"
        button--material--flat
        style="width: 100%;"
        @click="play"
      >
        <v-ons-icon size="24px" icon="md-play"></v-ons-icon>
      </button>
    </v-ons-card>
    <v-ons-modal
      @click="modalVisible = false"
      @postshow="postshow"
      @prehide="prehide"
      :visible="modalVisible"
      :style="modalStyle"
    >{{text}}</v-ons-modal>
    <v-ons-list>
      <v-ons-list-header>{{$t('my.settings')}}</v-ons-list-header>
      <v-ons-list-item @click="handleEditClick" modifier="chevron" tappable>
        <span class="list-item__title">{{$t('home.edit')}}</span>
        <span class="list-item__subtitle">{{text}}</span>
      </v-ons-list-item>
      <v-ons-list-item @click="handlePredefinedClick" modifier="chevron" tappable>
        <span class="list-item__title">{{$t('home.predefine')}}</span>
        <span class="list-item__subtitle">{{$t('home.predefineSubtitle')}}</span>
      </v-ons-list-item>
      <v-ons-list-item @click="handleCustomizeClick" modifier="chevron" tappable>
        <span class="list-item__title">{{$t('home.customize')}}</span>
        <span class="list-item__subtitle">{{$t('home.customizeSubtitle')}}</span>
      </v-ons-list-item>
    </v-ons-list>
  </v-ons-page>
</template>

<script>
import TextEditor from "./TextEditor.vue";
import PredefinedScenes from "./PredefinedScenes.vue";
import CustomizeEffect from "./CustomizeEffect.vue";
import { mapState } from "vuex";

export default {
  data() {
    return {
      modalVisible: false
    };
  },
  computed: {
    animateCls: function() {
      return ` animated infinite ${this.animate}`;
    },
    previewTextStyle: function() {
      return `font-size:${this.fontSize / 3.0}em;font-family:${
        this.fontFamily
      };color:${this.txtColor};
      white-space:nowrap;
      overflow:hidden;
      text-overflow:ellipsis;`;
    },
    modalStyle: function() {
      return `font-size:${this.fontSize}em;
      font-family:${this.fontFamily};
      color:${this.txtColor};
      background-color:${this.bgColor} !important;
      writing-mode: vertical-rl;
      text-orientation: sideways;
      white-space:nowrap;
      overflow:hidden;
      text-overflow:ellipsis;
      word-break:keep-all;`;
    },
    backgroundStyle: function() {
      return `background-color:${this.bgColor} !important;`;
    },
    // 使用对象展开运算符将此对象混入到外部对象中
    ...mapState({
      text: state => state.settings.text,
      fontSize: state => state.settings.fontSize,
      fontFamily: state => state.settings.fontFamily,
      txtColor: state => state.settings.txtColor,
      animate: state => state.settings.animate,
      bgColor: state => state.settings.bgColor
    })
  },

  methods: {
    postshow(event) {
      let el = event.modal.getElementsByClassName("modal__content")[0];
      el.className += this.animateCls;
      el.style.fontFamily = this.fontFamily;
    },
    prehide(event) {
      let el = event.modal.getElementsByClassName("modal__content")[0];
      el.className = "modal__content";
      el.style.fontFamily = "";
    },
    handleEditClick() {
      this.push(TextEditor, this.$t("home.edit"));
    },
    handlePredefinedClick() {
      this.push(PredefinedScenes, this.$t("home.predefine"));
    },
    handleCustomizeClick() {
      this.push(CustomizeEffect, this.$t("home.customize"));
    },
    play() {
      this.modalVisible = true;
    },
    push(page, key) {
      this.$store.commit("navigator/push", {
        extends: page,
        data() {
          return {
            toolbarInfo: {
              backLabel: this.$t("tabs.home"),
              title: key
            }
          };
        }
      });
    }
  }
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
