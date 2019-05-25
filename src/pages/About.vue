<template>
  <v-ons-page modifier="white">
    <custom-toolbar v-bind="toolbarInfo"></custom-toolbar>
    <div id="background">
      <img id="ic_launcher" src="../assets/ic_launcher.png">
      <div id="app">
        <span id="app_name">{{$t('app.name')}}</span>
        <span id="app_version">Ver{{version}}</span>
      </div>
    </div>
  </v-ons-page>
</template>

<script>
import { mapState } from "vuex";

export default {
  computed: {
    ...mapState({
      version: state => state.app_version
    })
  }
};
</script>

<style scoped>
#background {
  width: 100%;
  height: 100%;
  position: relative;
}

#ic_launcher {
  position: absolute;
  top: 30%;
  left: 50%;
  transform: translate(-50%, -50%);
}

#app {
  position: absolute;
  bottom: 10%;
  left: 50%;
  transform: translate(-50%, -50%);
  text-align: center;
  font-family: "'Roboto', Verdana, sans-serif";
  color: #777777;
}

#app_name {
  text-align: right;
  padding-right: 10px;
  font-size: 1em;
  font-weight: bold;
}
#app_version {
  text-align: left;
  padding-left: 10px;
  font-size: 1em;
  font-weight: bold;
}
</style>
