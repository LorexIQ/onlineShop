import Vue from 'vue';
const eventBus = new Vue();

const bus = {
  install(Vue) {
    Vue.prototype.$evBus = {
      send: (name, value) => {
        if (value) {
          eventBus.$emit(name, value)
        } else {
          eventBus.$emit(name)
        }
      },
      listen: (name, func) => {
        eventBus.$on(name, func)
      }
    }

  }
}
bus.install(Vue)
export default bus
