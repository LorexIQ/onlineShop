<template>
  <img v-if="src && src.length && imageData.length" :src="imageData" alt="">
</template>

<script>
export default {
  name: "LImg",
  data() {
    return {
      imageData: ''
    }
  },
  props: {
    src: {
      type: String | undefined,
      required: true
    },
    name: {
      type: String,
      default: 'default'
    }
  },
  watch: {
    src() {
      this.loadImage()
    }
  },
  beforeMount() {
    this.loadImage()
    this.$evBus.listen('l-img-' + this.name, () => {
      this.loadImage()
    })
  },
  methods: {
    loadImage() {
      if (this.src) {
        this.$fileM.load(this.src).then(res => {
          this.imageData = res
        }).catch(err => {
          this.imageData = ''
          console.error(err)
        })
      }
    }
  }
}
</script>

<style lang="scss" scoped>

</style>
