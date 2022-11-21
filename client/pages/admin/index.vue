<template>
  <div class="admin">
    <div class="admin__box">
      <l-admin-button title="Продавцы" icon="user-tag" :click="() => { $router.push({ path: '/admin/sellers' }) }"/>
    </div>
  </div>
</template>

<script>
export default {
  name: "Admin",
  middleware: 'admin'
}
</script>

<style lang="scss" scoped>
.admin {
  &__box {
    display: flex;
    justify-content: center;
    flex-wrap: wrap;
    max-width: 1100px;
    margin: 40px auto;
  }
}
</style>
