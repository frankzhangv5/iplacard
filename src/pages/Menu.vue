<template>
  <v-ons-page modifier="white">
    <div class="profile-pic" :style="profileTheme">
      <img width="40px" height="40px" src="../assets/logo.png">
    </div>

    <div class="list-view">
      <v-ons-list>
        <v-ons-list-item
          v-for="item in links"
          :key="item.title"
          :modifier="md ? 'divider' : ''"
          @click="loadLink(item.url)"
        >
          <div class="left">
            <v-ons-icon fixed-width class="list-item__icon" :icon="item.icon"></v-ons-icon>
          </div>
          <div class="center">{{ item.title }}</div>
          <div class="right">
            <v-ons-icon icon="fa-external-link"></v-ons-icon>
          </div>
        </v-ons-list-item>
      </v-ons-list>
    </div>
  </v-ons-page>
</template>

<script>
import { mapState } from "vuex";

export default {
  methods: {
    loadLink(url) {
      window.open(url, "_blank");
    }
  },
  data() {
    return {
      links: [
        {
          title: "Github",
          icon: "ion-social-github",
          url: "https://github.com/frankzhangv5/iplacard/"
        },
        {
          title: this.$t("social.blog"),
          icon: "md-blogger",
          url: "http://zhangfeng.ink/my-blogs/"
        },
        {
          title: this.$t("social.weibo"),
          icon: "fa-weibo",
          url: "https://weibo.com/u/5991851238"
        }
      ]
    };
  },
  computed: {
    profileTheme: function() {
      return {
        backgroundColor: `rgb(${this.theme.join(",")})`
      };
    },
    ...mapState({
      theme: state => state.settings.theme
    })
  }
};
</script>

<style scoped>
.profile-pic {
  width: 100%;
  height: 15%;
  /* background-color: #ff3b3d; */
  border-bottom: 1px solid #ddd;
  padding-bottom: 8px;
  position: relative;
}
/* .page--material .profile-pic {
  background-color: #ff3b3d;
} */

.profile-pic > img {
  display: block;
  max-width: 100%;
  position: absolute;
  top: 50%;
  left: 20%;
  transform: translate(-50%, -50%);
}

.list-view {
  width: 100%;
  height: 85%;
  position: relative;
}

.list-view > ons-list {
  position: absolute;
  top: 30%;
  left: 30%;
  transform: translate(-50%, -50%);
}
</style>

<style>
.page--material__background.page--white__background {
  background-color: #fff;
}
</style>
