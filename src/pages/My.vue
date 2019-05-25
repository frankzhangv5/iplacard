<template>
  <v-ons-page modifier="white">
    <v-ons-card style="margin:0; margin-bottom:10px; padding:0;">
      <div id="wallpaper">
        <img src="../assets/logo.png" alt>
        <v-ons-row id="github">
          <v-ons-col id="col-star">
            <github-button
              href="https://github.com/frankzhangv5/iplacard/"
              data-icon="octicon-star"
              data-show-count="true"
              aria-label="Star frankzhangv5/harvest on GitHub"
            >Star</github-button>
          </v-ons-col>
          <v-ons-col id="col-follow">
            <github-button
              href="https://github.com/frankzhangv5"
              data-show-count="true"
              aria-label="Follow @frankzhangv5 on GitHub"
            >Follow</github-button>
          </v-ons-col>
        </v-ons-row>
      </div>
    </v-ons-card>
    <v-ons-list style="margin:0; margin-bottom:10px; padding:0;">
      <v-ons-list-item
        v-for="item of settings"
        @click="push(item.component, item.title)"
        :key="item.title"
        modifier="chevron"
        tappable
      >
        <v-ons-icon class="icon" size="16px" :icon="item.icon"></v-ons-icon>
        <span class="title">{{item.title}}</span>
      </v-ons-list-item>
    </v-ons-list>
  </v-ons-page>
</template>

<script>
import GithubButton from "vue-github-button";
import Settings from "./Settings.vue";
import Favorites from "./Favorites.vue";
import Thanks from "./Thanks.vue";
import About from "./About.vue";

export default {
  components: {
    GithubButton
  },
  data() {
    return {
      settings: [
        {
          component: Settings,
          title: this.$t('my.settings'),
          icon: "md-settings"
        },
        {
          component: Favorites,
          title: this.$t('my.favorites'),
          icon: "md-favorite"
        },
        {
          component: Thanks,
          title: this.$t('my.thanks'),
          icon: "md-star"
        },
        {
          component: About,
          title: this.$t('my.about'),
          icon: "md-account"
        }
      ]
    };
  },
  methods: {
    push(component, key) {
      this.$store.commit("navigator/push", {
        extends: component,
        data() {
          return {
            toolbarInfo: {
              backLabel: this.$t('tabs.my'),
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
#wallpaper {
  text-align: center;
  width: 100%;
  height: 200px;
  line-height: 200px;
  background-color: #ff3b3d;
}

#github {
  position: absolute;
  top: 60px;
}

#col-star {
  text-align: right;
  padding-right: 10px;
}
#col-follow {
  text-align: left;
  padding-left: 10px;
}

.icon {
  /* color: grey; */
}

.title {
  padding-left: 10px;
}
</style>
