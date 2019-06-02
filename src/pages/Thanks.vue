<template>
  <v-ons-page>
    <custom-toolbar v-bind="toolbarInfo"></custom-toolbar>
    <v-ons-list>
      <v-ons-list-item
        v-for="item in items"
        :key="item.title"
        :modifier="md ? 'nodivider' : ''"
        @click="loadLink(item.url)"
      >
        <v-ons-card>
          <div class="title">{{item.title}}</div>
          <div class="content">{{item.desc}}</div>
        </v-ons-card>
      </v-ons-list-item>
    </v-ons-list>
  </v-ons-page>
</template>

<script>
export default {
  data() {
    return {
      items: [
        {
          title: "animate.css",
          desc:
            "animate.css is a bunch of cool, fun, and cross-browser animations for you to use in your projects. Great for emphasis, home pages, sliders, and general just-add-water-awesomeness.",
          url: "https://daneden.github.io/animate.css/"
        },
        {
          title: "cordova",
          desc: `Mobile apps with HTML, CSS & JS
              Target multiple platforms with one code base
              Free and open source`,
          url: "https://cordova.apache.org/"
        },
        {
          title: "cordova-plugin-splashscreen",
          desc:
            "This plugin displays and hides a splash screen while your web application is launching. Using its methods you can also show and hide the splash screen manually.",
          url: "https://github.com/apache/cordova-plugin-splashscreen"
        },
        {
          title: "onsenui",
          desc:
            "Mobile app development framework and SDK using HTML5 and JavaScript. Create beautiful and performant cross-platform mobile apps. Based on Web Components, and provides bindings for Angular 1, 2, React and Vue.js.",
          url: "https://github.com/OnsenUI/OnsenUI"
        },
        {
          title: "vue",
          desc:
            "Vue.js is a progressive, incrementally-adoptable JavaScript framework for building UI on the web.",
          url: "https://github.com/vuejs/vue"
        },
        {
          title: "vuex",
          desc: "Centralized State Management for Vue.js.",
          url: "https://github.com/vuejs/vuex"
        },
        {
          title: "vuex-persistedstate",
          desc: "Persist and rehydrate your Vuex state between page reloads.",
          url: "https://github.com/robinvdvleuten/vuex-persistedstate"
        },
        {
          title: "vue-onsenui",
          desc:
            "With Onsen UI you can create beautiful and performant hybrid apps that run on both Android and iOS. This package contains Vue.js v2 bindings and components that make it easy to integrate the Onsen UI components in Vue apps.",
          url: "https://onsen.io/"
        },
        {
          title: "vue-github-button",
          desc: "Unofficial github:button component for Vue.js.",
          url: "https://github.com/ntkme/vue-github-button"
        },
        {
          title: "vue-cli-plugin-cordova",
          desc: `Vue Cli 3 Cordova Plugin.
                 Integrate Cordova into Vue Cli App.`,
          url: "https://github.com/m0dch3n/vue-cli-plugin-cordova"
        },
        {
          title: "图标工厂",
          desc:
            "移动应用图标/启动图生成工具，一键生成所有尺寸的应用图标/启动图。",
          url: "http://icon.wuruihong.com/"
        },
        {
          title: "iconfont",
          desc:
            "阿里妈妈MUX倾力打造的矢量图标管理、交流平台。设计师将图标上传到Iconfont平台，用户可以自定义下载多种格式的icon，平台也可将图标转换为字体，便于前端工程师自由调整与调用。",
          url: "https://www.iconfont.cn"
        },
        {
          title: "UI中国",
          desc:
            "UI中国是专业的用户体验设计行业媒体、知识分享互动社区、创意整合营销平台。包含学习、展示、外包、竞赛、招聘等，是用户体验设计师的职业成长平台。",
          url: "https://www.ui.cn/"
        },
        {
          title: "UpLabs",
          desc:
            "UpLabs is the place to find high-quality design resources for designers, creative agencies and developers Get Started. Latest Premium Downloads.",
          url: "https://www.uplabs.com/"
        },
        {
          title: "DaFont",
          desc:
            "The fonts presented on this website are their authors' property, and are either freeware, shareware, demo versions or public domain. The licence mentioned above the download button is just an indication.",
          url: "https://www.dafont.com/"
        },
        {
          title: "FontSquirrel",
          desc:
            "Font Squirrel relies on advertising in order to keep bringing you great new free fonts and to keep making improvements to the web font generator. ",
          url: "https://www.fontsquirrel.com/"
        },
        {
          title: "字体天下",
          desc:
            "字体天下提供中文字体、手写字体、英文字体、图形字体等各种字体的高速免费下载和在线预览服务。",
          url: "http://www.fonts.net.cn/"
        }
      ]
    };
  },
  methods: {
    loadLink(url) {
      window.open(url, "_blank");
    }
  }
};
</script>

<style scoped>
ons-list-item {
  margin: 0;
  padding: 0;
}

ons-card {
  width: 100%;
  margin: 0;
  padding: 1em;
  font-family: "'Roboto', Verdana, sans-serif";
}

.title {
  font-size: 1.2em;
}

.content {
  color: #666666;
}
</style>
