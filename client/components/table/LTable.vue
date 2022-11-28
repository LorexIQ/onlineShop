<script>
export default {
  name: "LTable",
  data() {
    return {
      loader: false,
      modal: false
    }
  },
  props: {
    name: {
      type: String,
      default: () => {
        return 'default'
      }
    },
    modalDelay: {
      type: Number,
      default: 0
    }
  },
  render(element) {
    return element('table', { class: `l-table ${this.loader  ? 'loader' : ''} ${this.modal && !this.loader ? 'modal' : ''}` }, this.$slots.default)
  },
  mounted() {
    this.$evBus.listen('table-pag-' + this.name, (loaderStatus) => this.loader = loaderStatus)
    this.$evBus.listen('table-modal-' + this.name, (modalStatus) => {
      setTimeout(() => {
        this.modal = modalStatus
      }, this.modalDelay)
    })
  }
}
</script>

<style lang="scss" scoped>
.l-table {
  position: relative;
  width: 100%;
  padding: 20px;
  border-spacing: 0 0;
  border-radius: 10px;
  background-color: #f2f2f2;
  &.loader {
    & .l-tloader {
      pointer-events: all;
      opacity: 1;
    }
  }
  &.modal {
    & .l-tmodal {
      pointer-events: all;
      opacity: 1;
    }
  }
}
</style>
