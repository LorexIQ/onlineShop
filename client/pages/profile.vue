<template>
  <div class="profile">
    <div class="profile__box profile__box--user box">
      <div class="profile__box__title">
        <h1>Профиль</h1>
        <div class="profile__box__title__exit" @click="logout">
          <lfa icon="right-from-bracket"/>
        </div>
      </div>
      <div class="profile__box__info-table">
        <l-avatar
          :src="$auth.user.image"
          :actions="true"
          :action-top="{ title: 'Загрузить', func: uploadImage }"
          :action-bottom="{ title: 'Удалить', func: deleteImage }"
        />
        <div class="profile__box__info-table__full-name">
          <span>Имя</span>
          <span v-if="userData.firstName">{{ userData.firstName }}</span>
          <span class="no-data" v-else>Не задано</span>
          <span>Фамилия</span>
          <span v-if="userData.secondName">{{ userData.secondName }}</span>
          <span class="no-data" v-else>Не задано</span>
        </div>
        <div class="profile__box__info-table__info">
          <div class="profile__box__info-table__info__item">
            <span>ID</span>
            <span>{{ userData['_id'] }}</span>
          </div>
          <div class="profile__box__info-table__info__item">
            <span>Логин</span>
            <span>{{ userData.username }}</span>
          </div>
          <div class="profile__box__info-table__info__item">
            <span>Email</span>
            <span>{{ userData.email }}</span>
          </div>
          <div class="profile__box__info-table__info__item">
            <span>Роль</span>
            <span>{{ rolesList[userData.role] }}</span>
          </div>
          <div class="profile__box__info-table__info__item">
            <span>Гендер</span>
            <span v-if="userData.gender">{{ userData.gender }}</span>
            <span class="no-data" v-else>Не задано</span>
          </div>
        </div>
      </div>
    </div>
    <div
      class="profile__box profile__box--seller box"
      :class="{'profile__box--seller-box': sellerData.verify}"
    >
      <div class="profile__box__title">
        <h1>Профиль продавца</h1>
      </div>
      <transition :name="loadedAnimation ? 'pages' : ''" mode="out-in">
        <div class="profile__box__empty" key="seller-profile-empty" v-if="!Object.keys(sellerData).length">
          <p>Вы не зарегистрированы в качестве <br> продавца</p>
          <l-button :click="() => { $router.push({ path: '/seller/new' }) }">Регистрация</l-button>
        </div>
        <div class="profile__box__info-table" key="seller-profile-loaded" v-else-if="sellerData.verify">
          <l-avatar :src="sellerData.image"/>
          <div class="profile__box__info-table__full-name">
            <span>Имя</span>
            <span>{{ sellerData.name }}</span>
          </div>
          <div class="profile__box__info-table__info">
            <div class="profile__box__info-table__info__item">
              <span>ID</span>
              <span>{{ sellerData['_id'] }}</span>
            </div>
            <div class="profile__box__info-table__info__item">
              <span>ИНН</span>
              <span>{{ sellerData.INN }}</span>
            </div>
          </div>
        </div>
        <div class="profile__box__info-table" key="seller-profile-wait" v-else>
          Заявка отправлена. Ожидайте проверки администрации
          <lfa :icon="['far', 'clock']"/>
          <l-button ref="cancel" :click="cancelSellerRegistration">Отменить</l-button>
        </div>
      </transition>
    </div>
  </div>
</template>

<script>
export default {
  name: "Profile",
  middleware: 'logged',
  data() {
    return {
      rolesList: {
        1: 'Пользователь',
        2: 'Администратор',
        3: 'СуперАдмин'
      },
      userData: {},
      sellerData: {},
      loadedAnimation: false
    }
  },
  async fetch() {
    this.userData = (await this.$axios.get(`/api/users/me`)).data
    this.sellerData = (await this.$axios.get(`/api/sellers/me`)).data
  },
  fetchDelay: 300,
  mounted() {
    setTimeout(() => {
      this.loadedAnimation = true
    }, 1000)
  },
  methods: {
    async APIPatchUpdateUser(data) {
      return await this.$axios.patch(`/api/users/me`, data)
    },
    async APIGetSeller() {
      return await this.$axios.get(`/api/sellers/me`)
    },

    logout() {
      this.$router.push({ path: '/auth' })
      setTimeout(() => {
        this.$auth.logout()
      }, 300)
    },

    uploadImage(event) {
      this.$fileM.upload(`users/${this.userData.username}/avatar.png`, event.target.files[0])
        .then(res => {
          this.$set(this.$auth.user, 'image', res.path)
          this.$evBus.send('l-img-user-avatar')
          this.updateUserInServer({
            image: this.$auth.user.image
          })
        })
        .catch(err => {
          this.$ctoast.error('Ошибка обновления фотографии')
        })
      let reader = new FileReader()
    },
    deleteImage() {
      this.$set(this.$auth.user, 'image', '')
      delete this.$auth.user.image
      this.updateUserInServer({
        image: ''
      })
    },
    updateUserInServer(data) {
      Promise.all([
        this.APIPatchUpdateUser(data)
      ]).then(res => {
      }).catch(err => {
        this.$ctoast.error('Ошибка обновления пользователя')
      })
    },

    cancelSellerRegistration() {
      this.$refs['cancel'].loader = true
      Promise.all([
        this.$axios.delete('/api/sellers/me')
      ]).then(res => {
        this.$refs['cancel'].loader = false
        Promise.all([
          this.APIGetSeller()
        ]).then(res => {
          this.sellerData = res[0].data
        }).catch(err => {
          this.$ctoast.error('Ошибка обновления', { description: 'Возникла ошибка загрузки данных профиля продавца' })
        })
      }).catch(err => {
        this.$refs['cancel'].loader = false
        this.$ctoast.error('Ошибка отмены', { description: err.response.data.message })
      })
    },
  }
}
</script>

<style lang="scss" scoped>
.profile {
  &__box {
    max-width: 1100px;
    margin: 40px auto 0;
    &__title {
      display: flex;
      justify-content: space-between;
      align-items: center;
      gap: 30px;
      margin: 0 0 20px;
      white-space: nowrap;
      &__exit {
        font-size: 22px;
        display: flex;
        align-items: center;
        justify-content: center;
        width: 38px;
        height: 38px;
        color: var(--MainPurpleColor);
        cursor: pointer;
        transition: .3s;
        &:hover {
          color: var(--MainHoverPurpleColor);
        }
      }
    }
    &__empty {
      white-space: pre-line;
      & .button {
        height: 36px;
      }
    }
    &--user {
      width: max-content;
      .profile {
        &__box {
          &__info-table {
            display: grid;
            grid-template-areas: "A B" "C C";
            grid-auto-columns: 120px auto;
            row-gap: 10px;
            &__full-name {
              grid-area: B;
              display: grid;
              grid-template-areas: "A B" "C D";
              grid-auto-rows: 40px 40px;
              grid-auto-columns: 100px auto;
              align-items: center;
              align-content: center;
              & span {
                font-size: 18px;
                font-weight: 500;
                &:first-child {
                  grid-area: A;
                  color: var(--MainPurpleColor);
                }
                &:nth-child(2) {
                  grid-area: B;
                  justify-self: flex-end;
                  color: var(--MainDarknesColor);
                }
                &:nth-child(3) {
                  grid-area: C;
                  color: var(--MainPurpleColor);
                }
                &:last-child {
                  grid-area: D;
                  justify-self: flex-end;
                  color: var(--MainDarknesColor);
                }
              }
            }
            &__info {
              grid-area: C;
              display: flex;
              flex-direction: column;
              gap: 10px;
              &__item {
                display: flex;
                justify-content: space-between;
                gap: 20px;
                & span {
                  font-weight: 500;
                  &:first-child {
                    grid-area: A;
                    color: var(--MainPurpleColor);
                  }
                  &:last-child {
                    grid-area: B;
                    color: var(--MainDarknesColor);
                  }
                }
              }
            }
            & .no-data {
              color: rgba(0, 0, 0, 0.2) !important;
            }
          }
        }
      }
    }
    &--seller {
      width: min-content;
      .profile {
        &__box {
          &__info-table {
            display: grid;
            row-gap: 10px;
            grid-template-areas: "A B" "C C";
            align-items: center;
            &__full-name {
              grid-area: B;
              display: grid;
              grid-template-areas: "A B";
              grid-auto-rows: 40px 40px;
              grid-auto-columns: 100px auto;
              align-items: center;
              align-content: center;
              & span {
                font-size: 18px;
                font-weight: 500;
                &:first-child {
                  grid-area: A;
                  color: var(--MainPurpleColor);
                }
                &:nth-child(2) {
                  grid-area: B;
                  justify-self: flex-end;
                  color: var(--MainDarknesColor);
                }
              }
            }
            &__info {
              grid-area: C;
              display: flex;
              flex-direction: column;
              gap: 10px;
              &__item {
                display: flex;
                justify-content: space-between;
                gap: 20px;
                & span {
                  font-weight: 500;
                  &:first-child {
                    grid-area: A;
                    color: var(--MainPurpleColor);
                  }
                  &:last-child {
                    grid-area: B;
                    color: var(--MainDarknesColor);
                  }
                }
              }
            }
            & p {
              grid-area: A;
              margin: 0;
              color: var(--MainDarknesColor);
            }
            & svg {
              grid-area: B;
              font-size: 40px;
              color: var(--MainPurpleColor);
            }
            & .button {
              height: 36px;
              grid-area: C;
            }
          }
        }
      }
    }
    &--seller-box {
      .profile {
        &__box {
          &__info-table {
            grid-auto-columns: 120px auto;
          }
        }
      }
    }
  }
}
</style>
