<template id="main">
  <v-ons-page>
    <v-ons-carousel fullscreen swipeable auto-scroll overscrollable :index.sync="carouselIndex">
      <v-ons-carousel-item
        v-for="(value, key) in items"
        :key="key"
        :style="{backgroundColor: value}"
      >
        <div style="text-align: center; font-size: 30px; margin-top: 250px; color: #fff;">{{key}}</div>
      </v-ons-carousel-item>
    </v-ons-carousel>

    <v-ons-row class="pager-row">
      <v-ons-col class="pager-col" @click="prev">{{prev_text}}</v-ons-col>
      <v-ons-col class="pager-col">
        <span
          :index="dotIndex - 1"
          v-for="dotIndex in Object.keys(items).length"
          :key="dotIndex"
          style="margin-left:4px;font-size:12px;"
          @click="carouselIndex = dotIndex - 1"
        >{{ carouselIndex === dotIndex - 1 ? '\u25CF' : '\u25CB' }}</span>
      </v-ons-col>
      <v-ons-col class="pager-col" @click="next">{{next_text}}</v-ons-col>
    </v-ons-row>
  </v-ons-page>
</template>

<script>
export default {
  inject: ["navigator"],
  data() {
    return {
      carouselIndex: 0,
      prev_text: "跳过",
      next_text: "继续",
      items: {
        BLUE: "#085078",
        DARK: "#373B44",
        ORANGE: "#D38312"
      }
    };
  },
  methods: {
    close() {
      if (this.navigator.pageStack.length > 1) {
        this.navigator.popPage();
      }
    },
    prev() {
      var carouselLen = Object.keys(this.items).length;

      if (this.carouselIndex == 0) {
        this.close();
      }
      if (this.carouselIndex > 0 && this.carouselIndex < carouselLen - 1) {
        this.carouselIndex--;
      }
    },
    next() {
      var carouselLen = Object.keys(this.items).length;

      if (this.carouselIndex >= 0 && this.carouselIndex < carouselLen - 1) {
        this.carouselIndex++;
      } else {
        this.close();
      }
    }
  },
  watch: {
    carouselIndex: function() {
      var carouselLen = Object.keys(this.items).length;
      if (this.carouselIndex > 0 && this.carouselIndex < carouselLen - 1) {
        this.prev_text = "返回";
      } else if (this.carouselIndex == carouselLen - 1) {
        this.prev_text = "";
        this.next_text = "完成";
      } else if (this.carouselIndex == 0) {
        this.prev_text = "跳过";
        this.next_text = "继续";
      }
    }
  }
};
</script>

<style scoped>
.pager-row {
  height: 3em;
  line-height: 3em;
  position: absolute;
  bottom: 0;
  left: 0;
  right: 0;
  z-index: 2;
  background-color: rgba(255, 255, 255, 0.25);
}

.pager-col {
  text-align: center;
  font-size: 1.2em;
  font-family: "Roboto, Noto, sans-serif";
  font-weight: 400;
  cursor: pointer;
  color: #fff;
  z-index: 2;
}
</style>
