import Vue from 'vue';
import Vuex from 'vuex';
import createPersistedState from 'vuex-persistedstate'

Vue.use(Vuex);

const strictMode = process.env.NODE_ENV !== 'production';

export default new Vuex.Store({
  state: {
    app_version: "1.1"
  },
  plugins: [createPersistedState()],
  modules: {
    navigator: {
      strict: strictMode,
      namespaced: true,
      state: {
        stack: [],
        options: {}
      },
      mutations: {
        push(state, page) {
          state.stack.push(page);
        },
        pop(state) {
          if (state.stack.length > 1) {
            state.stack.pop();
          }
        },
        replace(state, page) {
          state.stack.pop();
          state.stack.push(page);
        },
        reset(state, page) {
          state.stack = [page || state.stack[0]];
        },
        options(state, newOptions = {}) {
          state.options = newOptions;
        }
      }
    },

    splitter: {
      strict: strictMode,
      namespaced: true,
      state: {
        open: false
      },
      mutations: {
        toggle(state, shouldOpen) {
          if (typeof shouldOpen === 'boolean') {
            state.open = shouldOpen;
          } else {
            state.open = !state.open;
          }
        }
      }
    },

    tabbar: {
      strict: strictMode,
      namespaced: true,
      state: {
        index: 0
      },
      mutations: {
        set(state, index) {
          state.index = index;
        }
      }
    },

    settings: {
      strict: strictMode,
      namespaced: true,
      state: {
        bgColor: "#000000",
        text: "Welcome to Earth !",
        fontSize: 8,
        fontFamily: "Helvetica Neue",
        txtColor: "#ffffff",
        animate: "neonBlue",
        label: "neonBlue",
        lang: 'zh_CN',
        theme: [255, 59, 61],
        favorites: []
      },
      mutations: {
        setBackgroundColor(state, color) {
          state.bgColor = color;
        },
        setText(state, text) {
          state.text = text;
        },
        setFontSize(state, fontSize) {
          state.fontSize = fontSize;
        },
        setFontFamily(state, fontFamily) {
          state.fontFamily = fontFamily;
        },
        setTextColor(state, color) {
          state.txtColor = color;
        },
        setAnimate(state, animate) {
          state.animate = animate;
        },
        setLabel(state, label) {
          state.label = label;
        },
        setLanguage(state, lang) {
          state.lang = lang;
        },
        setTheme(state, theme) {
          state.theme = theme;
        },
        doFavorite(state, animId) {
          state.favorites.push(animId);
        },
        undoFavorite(state, animId) {
          if (state.favorites.length > 0) {
            var index = state.favorites.indexOf(animId);
            if (index > -1) {
              state.favorites.splice(index, 1);
            }
          }
        },
      }
    }
  }
});
