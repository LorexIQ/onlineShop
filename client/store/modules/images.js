import Vue from 'vue'

export default {
  state() {
    return {
      data: {}
    }
  },
  getters: {
    GET_DATA: (state) => {
      return state.data
    }
  },
  mutations: {
    SET_DATA: (state, data) => {
      window.$nuxt.$set(state.data, data.key, data.value)
    }
  },
  actions: {
    RUN_LOAD_DATA({ commit, state }, src) {
      if (!state.data[src]) {
        commit('SET_DATA', { key: src, value: 'load' })
        window.$nuxt.$fileM.load(src)
          .then(res => {
            commit('SET_DATA', { key: src, value: res })
          })
          .catch(err => {
            console.log(err)
          })
      }
    },
    RUN_UPDATE_DATA({ commit, state }, src) {
      if (!['load', 'update'].includes(state.data[src])) {
        commit('SET_DATA', { key: src, value: 'update' })
        window.$nuxt.$fileM.load(src)
          .then(res => {
            commit('SET_DATA', { key: src, value: res })
          })
          .catch(err => {
            console.log(err)
          })
      }
    }
  }
}
