<template>
  <v-ons-page modifier="white">
    <v-ons-toolbar>
      <div class="left">
        <v-ons-toolbar-button @click="close">
          <v-ons-icon icon="ion-close, material:md-close"></v-ons-icon>
        </v-ons-toolbar-button>
      </div>
      <div class="center">{{$t('editor.title')}}</div>
      <div class="right">
        <v-ons-toolbar-button @click="check">
          <v-ons-icon icon="ion-check, material:md-check"></v-ons-icon>
        </v-ons-toolbar-button>
      </div>
    </v-ons-toolbar>

    <div id="edit">
      <textarea
        class="textarea textarea--transparent"
        rows="3"
        :placeholder="$t('editor.title')"
        float
        v-model="text"
        material
      ></textarea>
    </div>
  </v-ons-page>
</template>

<script>
export default {
  inject: ["navigator"],

  data() {
    return {
      tmpInput: ""
    };
  },

  computed: {
    text: {
      get() {
        return this.$store.state.settings.text;
      },
      set(val) {
        this.tmpInput = val;
      }
    }
  },

  methods: {
    close() {
      if (this.navigator.pageStack.length > 1) {
        this.navigator.popPage();
      }
    },
    check() {
      this.$store.commit("settings/setText", this.tmpInput);
      this.close();
    }
  }
};
</script>

<style scoped>
.center {
  text-align: center;
}

#edit {
  width: 100%;
  height: 100%;
}

textarea {
  border: 0;
  border-radius: 5px;
  background-color: rgba(241, 241, 241, 0.98);
  width: 100%;
  height: 100%;
  padding: 10px;
  resize: none;
}
</style>
