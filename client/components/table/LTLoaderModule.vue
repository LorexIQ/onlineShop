<template>
  <l-tbody class="l-tloader">
    <l-tr>
      <l-td colspan="100%">
        <span class="wobblebar-loader"/>
      </l-td>
    </l-tr>
  </l-tbody>
</template>

<script>
export default {
  name: "LTLoaderModule"
}
</script>

<style lang="scss" scoped>
.l-tbody {
  position: absolute;
  z-index: 10;
  pointer-events: none;
  opacity: 0;
  top: 20px;
  right: 20px;
  left: 20px;
  bottom: 20px;
  transition: .3s;
  &:before {
    display: none;
  }
  & .l-tr {
    display: block;
    width: 100%;
    height: 100%;
    & .l-td {
      display: flex;
      justify-content: center;
      align-items: center;
      width: inherit;
      height: inherit;
      background-color: var(--MainDimPurpleColor);
      box-sizing: border-box;
    }
  }
}
</style>
