<script>
export default {
  name: "LTHeader",
  props: {
    textAlign: {
      type: String,
      default: () => {
        return 'left'
      }
    },
    width: {
      type: String,
      default: () => {
        return ''
      }
    },
    click: {
      type: Function,
      default: () => {}
    }
  },
  render(element) {
    return element('th', {
      class: `l-th justify-${this.textAlign}`,
      style: this.width ? `width: ${this.width};` : '',
      on: { click: this.clickFunction }
    }, this.$slots.default)
  },
  methods: {
    clickFunction() {
      this.click()
    }
  }
}
</script>

<style lang="scss" scoped>
.l-th {
  font-weight: 500;
  position: relative;
  padding: 8px 8px;
  color: var(--MainDarknesColor);
  background-color: #fff;
}
</style>
