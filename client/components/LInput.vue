<template>
  <div
    class="input"
    :class="{
      'input--disabled': disabled,
      'input-red': typeof valid !== 'undefined' ? !valid : false
    }"
  >
    <input
      :style="type === 'password' ? 'padding: 0 40px 0 10px;' : ''"
      :id="id"
      :type="type === 'password' ? passwordHide ? type : 'text' : type"
      :value="value"
      :required="required"
      :placeholder="placeholder"
      @input="input($event)"
    >
    <div
      class="input__btn-password"
      v-if="type === 'password'"
      @click="passwordHide = !passwordHide"
    >
      <lfa icon="eye" v-if="passwordHide" key="hide"/>
      <lfa icon="eye-slash" v-else key="un-hide"/>
    </div>
  </div>
</template>

<script>
export default {
  name: "Input",
  data() {
    return {
      passwordHide: true
    }
  },
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
    disabled: {
      type: Boolean,
      default: () => {
        return false
      }
    },
    required: {
      type: Boolean,
      default: () => {
        return false
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
  position: relative;
  height: 0;
  &__btn-password {
    position: absolute;
    top: 0;
    right: 0;
    display: flex;
    align-items: center;
    justify-content: center;
    height: 100%;
    width: 40px;
    cursor: pointer;
    & svg {
      color: #454545;
      transition: .3s;
    }
    &:hover {
      & svg {
        color: #6d6d6d;
      }
    }
  }
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
  &--disabled {
    & input {
      color: #7E7C7C;
      pointer-events: none;
    }
  }
}
</style>
