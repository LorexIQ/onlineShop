<template>
  <div class="avatar" :style="{ width: diameter, height: diameter }">
    <template>
      <div class="avatar__img" v-if="src">
        <l-img :src="src" name="user-avatar" draggable="false"/>
      </div>
      <div class="avatar__img" v-else>
        <lfa icon="user"/>
      </div>
    </template>
    <div class="avatar__actions" v-if="actions">
      <input
        id="photo-upload"
        type="file"
        @change="actionTop.func($event)"
        accept=".jpg, .png, .jpeg|image/*"
      >
      <label for="photo-upload" class="avatar__actions__action">
        {{ actionTop.title }}
      </label>
      <div class="avatar__actions__action" @click="actionBottom.func()">
        {{ actionBottom.title }}
      </div>
    </div>
  </div>
</template>

<script>
export default {
  name: "LAvatar",
  props: {
    src: {
      type: String | undefined,
      required: true
    },
    diameter: {
      type: String,
      default: '100px'
    },
    svgSize: {
      type: String,
      default: '104px'
    },
    actions: {
      type: Boolean,
      default: false
    },
    actionTop: {
      type: Object,
      default: () => {
        return {
          title: 'top',
          func: (evn) => {}
        }
      }
    },
    actionBottom: {
      type: Object,
      default: () => {
        return {
          title: 'bottom',
          func: (evn) => {}
        }
      }
    }
  }
}
</script>

<style lang="scss" scoped>
.avatar {
  position: relative;
  grid-area: A;
  &__img {
    display: flex;
    justify-content: center;
    align-items: center;
    width: 100%;
    height: 100%;
    border-radius: 100%;
    border: 2px solid var(--MainPurpleColor);
    background-color: var(--MainPurpleColor);
    box-sizing: border-box;
    overflow: hidden;
    & svg {
      width: 40%;
      height: 40%;
      color: #fff;
    }
    & img {
      width: 100%;
      height: 100%;
      object-fit: cover;
    }
  }
  &__actions {
    position: absolute;
    top: 0;
    left: 0;
    display: flex;
    flex-direction: column;
    width: 100%;
    height: 100%;
    border-radius: 100%;
    background-color: rgba(0, 0, 0, .4);
    overflow: hidden;
    opacity: 0;
    transition: .3s;
    &:hover {
      opacity: 1;
    }
    &__action {
      font-size: 14px;
      font-weight: 500;
      display: flex;
      justify-content: center;
      height: 50px;
      width: 100px;
      color: #f0f0f0;
      background-color: rgba(0, 0, 0, 0);
      cursor: pointer;
      user-select: none;
      transition: .3s;
      &:nth-child(2) {
        align-items: flex-end;
        padding-bottom: 5px;
      }
      &:last-child {
        padding-top: 5px;
      }
      &:hover {
        background-color: rgba(0, 0, 0, .2);
      }
    }
  }
  & input {
    display: none;
  }
}
</style>
