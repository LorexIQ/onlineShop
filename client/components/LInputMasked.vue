<template>
  <div class="input" :class="{ 'input-red': typeof valid !== 'undefined' ? !valid : false }">
    <input
      :id="id"
      :type="type"
      :value="value"
      :placeholder="placeholder"
      v-mask="`${mask}`"
      @input="input($event)"
    >
  </div>
</template>

<script>
export default {
  name: "InputMasked",
  props: {
    id: {
      type: String,
      default: () => {
        return `l-input-${Math.random() * 1000000000}`
      }
    },
    value: null,
    placeholder: {
      type: String,
      default: () => {
        return ''
      }
    },
    type: {
      type: String,
      default: () => {
        return 'text'
      }
    },
    inputFunction: {
      type: Function,
      default: () => {
        return () => {}
      }
    },
    mask: {
      type: String,
      default: () => {
        return ''
      }
    },
    valid: undefined
  },
  methods: {
    input(event) {
      this.$emit('input', event.target.value)
      this.inputFunction()
    },
  }
}
</script>

<style lang="scss" scoped>
.input {
  &.input-red {
    & input {
      outline: 1px solid rgba(251, 47, 124, 0.5);
    }
  }
  & input {
    width: 100%;
    height: 100%;
    padding: 0 10px;
    color: #454545;
    background-color: #ececec;
    border-radius: 5px;
    border: 0.5px solid rgba(126, 124, 124, 0.4);
    box-sizing: border-box;
    transition: .3s;
    &::placeholder {
      color: #7E7C7C;
      opacity: .4;
    }
    &:focus {
      outline: 1px solid rgba(108, 99, 255, 0.5);
    }
  }
}
</style>
