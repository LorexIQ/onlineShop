<template>
  <div class="navbar">
    <div class="navbar__box">
      <nuxt-link to="/" class="navbar__box__logo">
        <img src="~assets/image/svg/logo.svg" alt="">
        <span>OnlineShop</span>
      </nuxt-link>
      <transition-group name="fade" class="navbar__box__nav" tag="div">
        <l-navbar-btn
          :click="() => { $router.push({ path: logged ? '/profile' : '/auth' }) }"
          :title="logged ? 'Профиль' : 'Войти'"
          key="profile"
        >
          <div class="navbar__box__nav__profile" key="profile" v-if="$auth.user && $auth.user.image">
            <img :src="$auth.user.image" alt="">
          </div>
          <div class="navbar__box__nav__profile" key="no-profile" v-else>
            <lfa icon="user"/>
          </div>
        </l-navbar-btn>
        <l-navbar-btn title="Заказы" v-if="logged" key="orders">
          <div class="navbar__box__nav__svg">
            <lfa icon="box"/>
          </div>
        </l-navbar-btn>
        <l-navbar-btn title="Корзина" v-if="logged" key="basket">
          <div class="navbar__box__nav__svg">
            <lfa icon="basket-shopping"/>
          </div>
        </l-navbar-btn>
        <l-navbar-btn
          title="Админ"
          key="admin"
          :click="() => { $router.push({ path: '/admin' }) }"
          v-if="logged && $auth.user.role === 3"
        >
          <div class="navbar__box__nav__svg">
            <lfa icon="unlock"/>
          </div>
        </l-navbar-btn>
      </transition-group>
    </div>
  </div>
</template>

<script>
export default {
  name: "LNavBar",
  data() {
    return {

    }
  },
  computed: {
    logged() {
      return this.$auth.loggedIn
    }
  },
  methods: {
  }
}
</script>

<style lang="scss" scoped>
.navbar {
  height: 60px;
  background-color: #fff;
  box-shadow: 0 0 70px 20px #f0f0f0;
  &__box {
    display: flex;
    align-items: center;
    justify-content: space-between;
    height: 100%;
    max-width: 1100px;
    margin: 0 auto;
    &__logo {
      display: flex;
      align-items: center;
      gap: 5px;
      user-select: none;
      cursor: pointer;
      & * {
        color: var(--MainPurpleColor);
      }
      & img {
        height: 35px;

      }
      & span {
        font-family: 'Saira', sans-serif;
        font-weight: 700;
        font-size: 25px;
        text-transform: uppercase;
      }
    }
    &__nav {
      display: flex;
      gap: 20px;
      &__profile {
        display: flex;
        justify-content: center;
        align-items: center;
        width: 25px;
        height: 25px;
        border: 1px solid var(--MainPurpleColor);
        border-radius: 100%;
        background-color: var(--MainPurpleColor);
        overflow: hidden;
        & svg {
          font-size: 12px;
          color: #fff;
        }
        & img {
          width: 100%;
          height: 100%;
          object-fit: cover;
        }
      }
      &__svg {
        color: var(--MainPurpleColor);
        max-height: 25px;
        & svg {
          font-size: 25px;
        }
      }
    }
  }
}
</style>
