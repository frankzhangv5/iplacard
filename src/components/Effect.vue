<template>
  <div class="slider" @touchstart="touchStart" @touchmove="touchMove" @touchend="touchEnd">
    <div class="content" :style="sliderStyle">
      <div class="title">{{label}}</div>
      <div class="preview" :style="backgroundStyle">
        <div :class="animateCls" :style="previewTextStyle">{{text}}</div>
      </div>
    </div>
    <div class="menu" ref="menu">
      <div class="icon" @click="favorite">
        <v-ons-icon
          size="24px"
          class="favorite"
          :class="{checked: isFavoriteChecked}"
          icon="md-favorite"
        ></v-ons-icon>
      </div>
      <div class="icon" @click="preview">
        <v-ons-icon size="24px" class="play" icon="md-play"></v-ons-icon>
      </div>
      <div class="icon" @click="use">
        <v-ons-icon size="24px" class="use" :class="{checked: isUseChecked}" icon="md-check"></v-ons-icon>
      </div>
    </div>
  </div>
</template>

<script>
import { mapState } from "vuex";
import { eventHub } from "../event";

export default {
  props: [
    "label",
    "fontSize",
    "fontFamily",
    "txtColor",
    "bgColor",
    "animate",
    "infinite"
  ],
  data() {
    return {
      startX: 0,
      endX: 0,
      moveX: 0,
      disX: 0,
      sliderStyle: ""
    };
  },

  computed: {
    isFavoriteChecked: {
      get: function() {
        if (this.favorites.indexOf(this.label) != -1) {
          return true;
        }
        return false;
      },
      set: function() {}
    },
    isUseChecked: {
      get: function() {
        if (this.labelInuse === this.label) {
          return true;
        }
        return false;
      },
      set: function() {}
    },
    animateCls: function() {
      return this.infinite
        ? `animated infinite ${this.animate}`
        : `animated ${this.animate}`;
    },
    previewTextStyle: function() {
      return `font-size:${this.fontSize / 3.5}em;font-family:${
        this.fontFamily
      };color:${this.txtColor};
      font-weight:bold;
      white-space:nowrap;
      overflow:hidden;
      word-break:keep-all;
      text-overflow:ellipsis;`;
    },
    backgroundStyle: function() {
      return `background-color:${this.bgColor} !important;`;
    },
    ...mapState({
      text: state => state.settings.text,
      favorites: state => state.settings.favorites,
      labelInuse: state => state.settings.label
    })
  },

  methods: {
    favorite() {
      if (this.isFavoriteChecked) {
        this.$store.commit("settings/undoFavorite", this.label);
        this.isFavoriteChecked = false;
      } else {
        this.$store.commit("settings/doFavorite", this.label);
        this.isFavoriteChecked = true;
      }
      this.sliderStyle = "transform:translateX(0px)";
    },
    preview() {
      // eslint-disable-next-line
      console.log("fire preview");
      eventHub.$emit("preview", {
        label: this.label,
        fontSize: this.fontSize,
        fontFamily: this.fontFamily,
        txtColor: this.txtColor,
        bgColor: this.bgColor,
        animate: this.animate
      });
      this.sliderStyle = "transform:translateX(0px)";
    },
    use() {
      if (!this.isUseChecked) {
        this.$store.commit("settings/setFontSize", this.fontSize);
        this.$store.commit("settings/setFontFamily", this.fontFamily);
        this.$store.commit("settings/setTextColor", this.txtColor);
        this.$store.commit("settings/setBackgroundColor", this.bgColor);
        this.$store.commit("settings/setAnimate", this.animate);
        this.$store.commit("settings/setLabel", this.label);
        this.isUseChecked = true;
      }
      this.sliderStyle = "transform:translateX(0px)";
    },
    touchStart(ev) {
      ev = ev || event;
      if (ev.touches.length == 1) {
        this.startX = ev.touches[0].clientX;
      }
    },
    touchMove(ev) {
      ev = ev || event;
      let wd = this.$refs.menu.offsetWidth;
      if (ev.touches.length == 1) {
        this.moveX = ev.touches[0].clientX;
        this.disX = this.startX - this.moveX;

        if (this.disX < 0) {
          this.sliderStyle = "transform:translateX(0px)";
        } else if (this.disX > 0) {
          this.sliderStyle = "transform:translateX(-" + this.disX * 5 + "px)";
          if (this.disX * 5 >= wd) {
            this.sliderStyle = "transform:translateX(-" + wd + "px)";
          }
        }
      }
    },
    touchEnd(ev) {
      ev = ev || event;
      let wd = this.$refs.menu.offsetWidth;
      if (ev.changedTouches.length == 1) {
        let endX = ev.changedTouches[0].clientX;

        this.disX = this.startX - endX;
        // eslint-disable-next-line
        // console.log(this.disX);
        if (this.disX * 5 < wd / 2) {
          // this.sliderStyle = "transform:translateX(0px)";
        } else {
          this.sliderStyle = "transform:translateX(-" + wd + "px)";
        }
      }
    }
  }
};
</script>


<style scoped>
.slider {
  width: 100%;
  height: 180px;
  text-align: center;
  user-select: none;
  position: relative;
}

.slider > .content {
  position: absolute;
  left: 0;
  right: 0;
  top: 0;
  bottom: 0;
  transition: 0.3s;
  z-index: 100;
}
.slider > .content > .title {
  font-family: -apple-system, "Helvetica Neue", "Helvetica", "Arial",
    "Lucida Grande", sans-serif;
  text-transform: uppercase;
  font-weight: 500;
  color: #2979ff;
  width: 100%;
  line-height: 30px;
}
.slider > .content > .preview {
  text-align: center;
  width: 100%;
  line-height: 150px;
}

.slider > .menu {
  position: absolute;
  width: 20%;
  /* line-height: 147px; */
  right: 0;
  bottom: 0;
  background-color: #07c160;
}

.slider > .menu > .icon {
  color: white;
  line-height: 46.5px;
}
.favorite:hover {
  color: black;
}

.favorite.checked {
  color: #ff3b3d;
}

.play:hover {
  color: black;
}

.use:hover {
  color: black;
}
.use.checked {
  color: #ff3b3d;
}
</style>
