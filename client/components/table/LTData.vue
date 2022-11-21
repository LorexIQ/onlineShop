<script>
export default {
  name: "LTData",
  props: {
    textAlign: {
      type: String,
      default: () => {
        return 'left'
      }
    }
  },
  render(element) {
    return element('td', {
      class: `l-td justify-${this.textAlign}`
    }, this.$slots.default)
  }
}
</script>

<style lang="scss" scoped>
.l-td {
  padding: 8px 8px;
  color: var(--MainDarknesColor);
  background-color: #fff;
  transition: .3s;
}
</style>
