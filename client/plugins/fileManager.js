import Vue from 'vue'

const file = {
  install(Vue) {
    Vue.prototype.$fileM = () => {}
    Vue.prototype.$fileM.upload = (path, file) => {
      return new Promise((resolve) => {
        let formData = new FormData()
        formData.append('file', file)
        window.$nuxt.$axios.post(`/api/files/upload?path=${path}`, formData)
          .then(res => {
            resolve(res.data)
          })
          .catch(err => {
            resolve(new Error(err))
          })
      })
    }
    Vue.prototype.$fileM.load = (path) => {
      return new Promise((resolve) => {
        window.$nuxt.$axios.get(`/api/files/download?path=${path}`, { responseType: "blob" })
          .then(async res => {
            resolve(window.URL.createObjectURL(await res.data))
          }).catch(err => {
            resolve(new Error(err))
          })
      })
    }
  }
}
file.install(Vue)
export default file
