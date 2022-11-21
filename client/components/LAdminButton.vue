<template>
  <div class="button" @click="click">
    <lfa :icon="icon"/>
    <div class="button__title">
      {{ title }}
    </div>
  </div>
</template>

<script>
export default {
  name: "LAdminButton",
  props: {
    title: {
      type: String,
      default: () => {
        return 'Button'
      }
    },
    icon: {
      type: String,
      default: () => {
        return 'stop'
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
  background-color: #fff;
  border-radius: 10px;
  padding: 20px;
  max-width: max-content;
  display: flex;
  align-items: center;
  gap: 10px;
  cursor: pointer;
  box-shadow: 0 0 10px 5px #e6e6e6;
  transition: .3s;
  & > svg {
    font-size: 32px;
    color: var(--MainPurpleColor);
    transition: .3s;
  }
  &__title {
    color: var(--MainDarknesColor);
    font-weight: 500;
    font-size: 18px;
    user-select: none;
  }
  &:hover {
    background-color: #f7f7f7;
    box-shadow: 0 0 10px 5px #dedede;
    & > svg {
      color: var(--MainHoverPurpleColor);
    }
  }
}
</style>
