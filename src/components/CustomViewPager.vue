<template id="main">
  <v-ons-page>
    <v-ons-carousel fullscreen auto-scroll overscrollable :index.sync="carouselIndex">
      <v-ons-carousel-item
        v-for="item of items"
        :key="item.key"
        style="display:table-cell;text-align:center;"
        :style="{backgroundColor: item.bgColor}"
      >
        <div
          class="animated slower"
          :class="item.animate"
          style="display:inline-block;height:100%;font-weight:bold;writing-mode: vertical-rl;text-orientation: sideways;"
          :style="item.style"
        >{{item.text}}</div>
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
      prev_text: "SKIP",
      next_text: "NEXT",
      items: [
        {
          key: 1,
          bgColor: "#ff3b3d",
          style:
            "font-family:alien_encountersregular;font-size:6em;color:#ffffff;z-index:10;",
          text: "Welcome to here !",
          animate: "rotateIn"
        },
        {
          key: 2,
          bgColor: "#1e88e5",
          style: "font-family:lianmengqiyilushuaizhengruiRg;font-size:6em;color:#ffffff;z-index:9;",
          text: "欢迎使用！",
          animate: "zoomIn"
        },
        {
          key: 3,
          bgColor: "#673ab7",
          style: "font-family:Helvetica;font-size:6em;color:#ffffff;z-index:8;",
          text: "Bienvenue !",
          animate: "slideInUp"
        }
      ]
    };
  },
  computed: {},
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
        this.prev_text = "BACK";
      } else if (this.carouselIndex == carouselLen - 1) {
        this.prev_text = "";
        this.next_text = "DONE";
      } else if (this.carouselIndex == 0) {
        this.prev_text = "SKIP";
        this.next_text = "NEXT";
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
