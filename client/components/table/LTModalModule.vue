<template>
  <l-tbody class="l-tmodal">
    <l-tr :hover="false">
      <l-td>
        <div class="l-tmodal__box">
          <div class="l-tmodal__box__header">
            <slot name="header"/>
            <div
              class="l-tmodal__box__header__close"
              @click="sendState(false)"
            >
              <lfa icon="times"/>
            </div>
          </div>
          <div class="l-tmodal__box__body">
            <slot name="body"/>
          </div>
          <div class="l-tmodal__box__footer">
            <slot name="footer"/>
          </div>
        </div>
      </l-td>
    </l-tr>
  </l-tbody>
</template>

<script>
export default {
  name: "LTModalModule",
  props: {
    name: {
      type: String,
      default: () => {
        return 'default'
      }
    }
  },
  methods: {
    sendState(newState) {
      console.log(1)
      this.$evBus.send('table-modal-' + this.name, newState)
    }
  }
}
</script>

<style lang="scss" scoped>
.l-tmodal {
  position: absolute;
  z-index: 5;
  top: 20px;
  right: 20px;
  bottom: 20px;
  left: 20px;
  opacity: 0;
  pointer-events: none;
  transition: .3s;
  &:before {
    display: none;
  }
  & .l-tr {
    display: block;
    width: 100%;
    height: 100%;
    & .l-td {
      display: block;
      width: inherit;
      height: inherit;
      padding: 10px;
      box-sizing: border-box;
    }
  }
  &__box {
    display: flex;
    flex-direction: column;
    justify-content: space-between;
    height: inherit;
    & > div {
      padding: 10px;
    }
    &__header {
      position: relative;
      display: flex;
      align-items: center;
      height: 50px;
      padding-top: 0 !important;
      &:before {
        content: '';
        position: absolute;
        bottom: 0;
        left: 0;
        width: 100%;
        border: 1px dashed var(--MainGrayColor);
      }
      &__close {
        position: absolute;
        right: 0;
        font-size: 20px;
        display: flex;
        justify-content: center;
        align-items: center;
        width: 30px;
        height: 30px;
        color: var(--MainDarknesColor);
        cursor: pointer;
        transition: .3s;
        &:hover {
          color: var(--MainHoverDarknesColor);
        }
      }
    }
    &__body {
      height: inherit;
    }
    &__footer {
      position: relative;
      display: flex;
      align-items: center;
      height: 50px;
      padding-bottom: 0 !important;
      &:before {
        content: '';
        position: absolute;
        top: 0;
        left: 0;
        width: 100%;
        border: 1px dashed var(--MainGrayColor);
      }
    }
  }
}
</style>
