<template>
  <div
    class="button"
    :class="{'button--disabled': disabled}"
  >
    <button
      :type="type"
      :class="{'loader': loader}"
      @click="click"
    >
      <transition name="fade" mode="out-in">
        <span v-if="!loader" key="slot"><slot/></span>
        <span v-else class="wobblebar-loader" key="loader"></span>
      </transition>
    </button>
  </div>
</template>

<script>
export default {
  name: "LButton",
  data() {
    return {
      loader: false
    }
  },
  props: {
    label: {
      type: String,
      default: () => {
        return 'Кнопка'
      }
    },
    type: {
      type: String,
      default: () => {
        return 'button'
      }
    },
    disabled: {
      type: Boolean,
      default: () => {
        return false
      }
    },
    click: {
      type: Function,
      default: () => {
        return () => {}
      }
    }
  }
}
</script>

<style lang="scss" scoped>
.button {
  & button {
    font-size: 16px;
    font-weight: 400;
    display: flex;
    align-items: center;
    justify-content: center;
    width: 100%;
    height: 100%;
    color: #fff;
    background: rgba(108, 99, 255, 0.5);
    border-radius: 5px;
    border: 0;
    cursor: pointer;
    transition: .3s;
    &:hover {
      background: rgba(152, 145, 253, 0.5);
    }
    &.loader {
      background-color: var(--MainDimPurpleColor);
      user-select: none;
      pointer-events: none;
    }
  }
  &--disabled {
    cursor: not-allowed;
    & button {
      background: rgba(151, 147, 218, 0.5);
      pointer-events: none;
    }
  }
}
</style>
