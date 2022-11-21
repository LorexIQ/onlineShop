<template>
  <div class="btn" @click="click">
    <slot />
    <span>{{ title }}</span>
  </div>
</template>

<script>
export default {
  name: "LNavBarButton",
  props: {
    title: {
      type: String,
      default: () => {
        return 'Кнопка'
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
.btn {
  display: flex;
  flex-direction: column;
  justify-content: space-between;
  align-items: center;
  gap: 2px;
  cursor: pointer;
  user-select: none;
  & span {
    font-size: 12px;
    font-weight: 500;
    color: var(--MainPurpleColor);
  }
}
</style>
