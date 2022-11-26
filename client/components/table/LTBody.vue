<template>
  <tbody class="l-tbody">
    <slot/>
    <div v-if="fullSize - rows > 0" v-for="row in fullSize - rows" :key="row" style="height: 40px"/>
  </tbody>
</template>

<script>
export default {
  name: "LTBody",
  data() {
    return {
      rows: 0
    }
  },
  props: {
    fullSize: {
      type: Number,
      default: 0
    }
  },
  updated() {
    if (this.fullSize && this.$slots.default && this.$slots.default.length) {
      this.rows = this.$slots.default.reduce((prev, next) => {
        next.tag && prev++
        return prev
      }, 0)
    }
  },
  mounted() {

  }
}
</script>

<style lang="scss" scoped>
.l-tbody {
  background-color: #f2f2f2;
  &:before {
    content: '';
    display: block;
    height: 10px;
  }
}
</style>
