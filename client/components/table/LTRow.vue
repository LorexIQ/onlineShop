<script>
import Vue from 'vue'
export default {
  name: "LTRow",
  props: {
    name: {
      type: String,
      default: () => {
        return 'default'
      }
    },
    hover: {
      type: Boolean,
      default: () => {
        return true
      }
    },
    modal: {
      type: Boolean,
      default: () => {
        return false
      }
    }
  },
  methods: {
    clickFunction() {
      if (this.modal) {
        this.$evBus.send('table-modal-' + this.name, true)
      }
    }
  },
  render(element) {
    return element('tr', { class: `l-tr ${this.hover ? 'l-tr--hover' : ''}`, on: { click: this.clickFunction } }, this.$slots.default)
  }
}
</script>

<style lang="scss" scoped>
.l-tr {
  position: relative;
  &:not(&:last-child) {
    &:after {
      content: ' ';
      position: absolute;
      bottom: 0;
      right: 0;
      width: 100%;
      border-bottom: 1px solid #f2f2f2;
    }
  }
  & .l-th {
    &:not(&:last-child) {
      &:after {
        content: ' ';
        position: absolute;
        top: 5px;
        right: 0;
        width: 1px;
        height: calc(100% - 10px);
        border-radius: 1px;
        background-color: #e2e2e2;
      }
    }
  }
  &:first-child {
    & .l-th, & .l-td {
      &:first-child {
        border-top-left-radius: 5px;
      }
      &:last-child {
        border-top-right-radius: 5px;
      }
    }
  }
  &:last-child {
    & .l-th, & .l-td {
      &:first-child {
        border-bottom-left-radius: 5px;
      }
      &:last-child {
        border-bottom-right-radius: 5px;
      }
    }
  }
  &--hover {
    cursor: pointer;
    &:hover {
      & .l-td {
        background-color: #f8f8f8;
      }
    }
  }
}
</style>
