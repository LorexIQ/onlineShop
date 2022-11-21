<script>
export default {
  name: "LTBody",
  render(element) {
    return element('tbody', { class: 'l-tbody' }, this.$slots.default)
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
