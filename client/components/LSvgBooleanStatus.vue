<template>
<div class="status">
  <lfa
    :style="{color: status ? trueColor : falseColor}"
    :icon="status ? trueIcon : falseIcon"
  />
</div>
</template>

<script>
export default {
  name: "LSvgBooleanStatus",
  data() {
    return {
      status: false
    }
  },
  props: {
    value: {
      type: Boolean,
      default: false
    },
    trueColor: {
      type: String,
      default: '#1eb000'
    },
    falseColor: {
      type: String,
      default: '#ff4141'
    },
    trueIcon: {
      type: String,
      default: 'check'
    },
    falseIcon: {
      type: String,
      default: 'times'
    }
  },
  watch: {
    value() {
      this.status = this.value
    }
  },
  mounted() {
    this.status = this.value
  }
}
</script>

<style lang="scss" scoped>
</style>
