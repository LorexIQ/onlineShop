<template>
  <div class="page">
    <div class="page__products">
      <div class="page__products__empty box">
        Нет товаров
      </div>
    </div>
  </div>
</template>

<script>
export default {
  name: 'IndexPage',
  async mounted() {
  },
  methods: {

  }
}
</script>

<style lang="scss" scoped>
.page {
  &__products {
    width: 1100px;
    margin: 0 auto;
    min-height: 100%;
    &__empty {
      font-size: 18px;
      margin-top: 40px;
      color: var(--MainHoverDarknesColor);
      text-align: center;
    }
  }
}
</style>
