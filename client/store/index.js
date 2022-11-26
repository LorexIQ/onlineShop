import Vue from 'vue'
import Vuex from 'vuex'

import Images from './modules/images'

Vue.use(Vuex)

const store = () => new Vuex.Store({
  modules: {
    Images
  }
})

export default store
