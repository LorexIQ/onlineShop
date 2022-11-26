<template>
  <img v-if="src && src.length && GET_DATA[src] && GET_DATA[src].length" :src="GET_DATA[src]" alt="">
</template>

<script>
import { mapActions, mapGetters } from 'vuex'
export default {
  name: "LImg",
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
  computed: {
    ...mapGetters([
      'GET_DATA'
    ])
  },
  beforeMount() {
    this.loadImage(false)
    this.$evBus.listen('l-img-' + this.name, () => {
      this.loadImage(true)
    })
  },
  methods: {
    ...mapActions([
      'RUN_LOAD_DATA',
      'RUN_UPDATE_DATA'
    ]),
    loadImage(update) {
      if (this.src) {
        if (update) {
          this.RUN_UPDATE_DATA(this.src)
        } else {
          this.RUN_LOAD_DATA(this.src)
        }
      }
    }
  }
}
</script>

<style lang="scss" scoped>

</style>
