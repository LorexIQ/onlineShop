<script>
export default {
  name: "LTFooter",
  render(element) {
    return element('tfoot', {
      class: 'l-foot'
    }, this.$slots.default)
  }
}
</script>

<style lang="scss" scoped>
.l-foot {
  background-color: #f2f2f2;
  &:before {
    content: '';
    display: block;
    height: 10px;
  }
}
</style>
