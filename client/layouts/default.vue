<template>
  <main class="default">
    <l-navbar class="default__navbar"/>
    <Nuxt class="default__body"/>
  </main>
</template>

<script>
export default {
  name: "default"
}
</script>

<style lang="scss" scoped>
.default {
  &__navbar {
    width: 100%;
  }
  &__body {
    width: 100vw !important;
    height: calc(100vh - 60px) !important;
    background-color: rgba(0, 0 , 0, 0.05);
    overflow: auto;
  }
}
</style>
