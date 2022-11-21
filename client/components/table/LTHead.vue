<script>
export default {
  name: "LTHead",
  render(element) {
    return element('thead', { class: 'l-thead' }, this.$slots.default)
  }
}
</script>

<style lang="scss" scoped>
.l-thead {
  background-color: #f2f2f2;
}
</style>
