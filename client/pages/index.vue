<template>
  <div class="page">
    <div class="test"></div>
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
  & .test {
    height: 3000px;
    width: 20px;
    background-color: #c0bcfa;
  }
}
</style>
