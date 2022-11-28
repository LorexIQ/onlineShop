<template>
  <div class="combobox">
    <div
      class="combobox__header"
      :class="{
        'combobox__header--faded': !values.length || selectedValue.faded,
        'combobox__header--focus': openedList
      }"
      ref="header"
      @click="windowClick"
    >
      {{ values.length ? selectedValue[config.nameKey] : 'Пусто'}}
      <div class="combobox__header__arrow">
        <lfa icon="caret-down" :class="{'fa-flip-vertical': openedList}"/>
      </div>
    </div>
    <transition name="list-transition">
      <div v-if="values.length && openedList" ref="test" class="combobox__body">
        <ul>
          <li
            v-for="(item, index) in values"
            :key="item[config.idKey] ? item[config.idKey] : 'comboItem-' + index"
            @click="selectItem(item)"
          >
            {{ item[config.nameKey] }}
          </li>
        </ul>
      </div>
    </transition>
  </div>
</template>

<script>
export default {
  name: "LComboBox",
  data() {
    return {
      openedList: false,
      selectedValue: {}
    }
  },
  props: {
    value: {
      type: Object,
      default: () => {
        return {}
      }
    },
    values: {
      type: Array,
      default: () => {
        return []
      }
    },
    config: {
      type: Object,
      default: () => {
        return {
          nameKey: 'name',
          idKey: 'id'
        }
      }
    }
  },
  watch: {
    value() {
      this.selectedValue = this.value
    }
  },
  mounted() {
    if (this.values.length) {
      if (Object.keys(this.value) > 0) {
        this.selectedValue = this.value
      } else {
        this.selectedValue = this.values[0]
        this.$emit('input', this.selectedValue)
      }
    }
  },
  methods: {
    windowClick(event) {
      if ([this.$refs.header].includes(event.target)) {
        window.removeEventListener('click', this.windowClick)
        this.openedList = !this.openedList
        setTimeout(() => {
          if (this.openedList) {
            window.addEventListener('click', this.windowClick)
          } else {
            window.removeEventListener('click', this.windowClick)
          }
        })
      } else {
        window.removeEventListener('click', this.windowClick)
        this.openedList = false
      }
    },
    selectItem(item) {
      this.selectedValue = item
      this.$emit('input', this.selectedValue)
    }
  }
}
</script>

<style lang="scss" scoped>
.combobox {
  font-size: 14px;
  position: relative;
  user-select: none;
  & > div {
    width: 100%;
    border-radius: 5px;
    border: 0.5px solid rgba(126, 124, 124, 0.4);
    box-sizing: border-box;
    background-color: #ececec;
  }
  &__header {
    position: absolute;
    height: 100%;
    padding: 3px 10px;
    color: var(--MainDarknesColor);
    transition: 0.3s;
    cursor: pointer;
    z-index: 3;
    &--faded {
      color: var(--MainHoverDarknesColor);
    }
    &--focus {
      outline: 1px solid rgba(108, 99, 255, 0.5);
    }
    &__arrow {
      position: absolute;
      right: 5px;
      top: calc(50% - 8px);
      & svg {
        transition: .3s;
      }
    }
  }
  &__body {
    position: absolute;
    z-index: 2;
    top: 100%;
    border-top: 0 !important;
    & ul {
      margin: 7px;
      padding: 0;
      border-radius: 3px;
      background-color: #fff;
      list-style: none;
      overflow: hidden;
      & li {
        position: relative;
        padding: 4px 10px;
        cursor: pointer;
        transition: .3s;
        &:not(&:last-child) {
          &:before {
            position: absolute;
            content: ' ';
            width: 100%;
            bottom: 0;
            right: 0;
            border-bottom: 1px solid #f2f2f2;
          }
        }
        &:hover {
          background-color: #f8f8f8;
        }
      }
    }
  }
}
.list-transition {
  &-enter-active, &-leave-active {
    transition: .3s;
  }
  &-enter-to, &-leave {

  }
  &-enter, &-leave-to {
    transform: scale(0.95);
    transform-origin: top;
    opacity: 0;
  }
}
</style>
