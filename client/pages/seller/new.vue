<template>
  <div class="seller-new">
    <div class="seller-new__box box">
      <h1>Регистрация продавца</h1>
      <transition name="pages" mode="out-in">
        <div class="seller-new__box__data" key="reg" v-if="!Object.keys(sellerResData).length">
          <div class="seller-new__box__data__id">
            <span>Id Покупателя:</span>
            <span>{{$auth.user._id}}</span>
          </div>
          <l-input
            placeholder="Название магазина"
            v-model="sellerData.name"
            :valid="sellerData.name.length > 2 && sellerData.name.length < 36"
          />
          <l-input-masked
            mask="############"
            placeholder="ИНН"
            v-model="sellerData.INN"
            :valid="sellerData.INN.length === 12"
          />
          <l-button
            ref="reg"
            :click="registration"
            :disabled="!(
            sellerData.name.length > 2 &&
            sellerData.name.length < 36 &&
            sellerData.INN.length === 12
          )">Далее</l-button>
        </div>
        <div class="seller-new__box__data-act" key="act" v-else>
          <p>
            Данные аккаунта находятся на проверке администрации. Ожидайте, вам придёт
            письмо на почту, после результатов проверки
          </p>
          <lfa :icon="['far', 'clock']"/>
          <l-button ref="cancel" :click="cancelRegistration">Отменить</l-button>
        </div>
      </transition>
    </div>
  </div>
</template>

<script>
export default {
  name: "NewSeller",
  middleware: 'logged',
  data() {
    return {
      sellerData: {
        name: '',
        INN: ''
      },
      sellerResData: {}
    }
  },
  async fetch() {
    if (this.$auth.user && this.$auth.user.sellerId) {
      this.sellerResData = (await this.$axios.get(`/api/sellers/me/`)).data
    }
  },
  beforeMount() {
    if (this.sellerResData && this.sellerResData.verify) {
      this.$router.back()
    }
  },
  methods: {
    cancelRegistration() {
      this.$refs['cancel'].loader = true
      Promise.all([
        this.$axios.delete('/api/sellers/me')
      ]).then(res => {
        this.$refs['cancel'].loader = false
        this.$router.push({ path: '/profile' })
      }).catch(err => {
        this.$refs['cancel'].loader = false
        this.$ctoast.error('Ошибка отмены', { description: err.response.data.message })
      })
    },
    registration() {
      this.$refs['reg'].loader = true
      Promise.all([
        this.$axios.post('/api/sellers/', this.sellerData)
      ]).then(res => {
        this.sellerResData = res[0].data
        this.$refs['reg'].loader = false
      }).catch(err => {
        this.$refs['reg'].loader = false
        this.$ctoast.error('Ошибка регистрации', { description: err.response.data.message })
      })
    }
  }
}
</script>

<style lang="scss" scoped>
.seller-new {
  &__box {
    max-width: min-content;
    margin: 40px auto;
    & > h1 {
      margin: 0 0 20px;
      white-space: nowrap;
    }
    &__data {
      &__id {
        margin-bottom: 10px;
        & span {
          &:first-child {
            font-weight: 500;
            color: var(--MainPurpleColor);
          }
          &:nth-child(2) {
            color: var(--MainDarknesColor);
          }
        }
      }
    }
    &__data-act {
      display: grid;
      row-gap: 10px;
      grid-template-areas: "A B" "C C";
      align-items: center;
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
        grid-area: C;
      }
    }
  }
  & .input {
    height: 36px;
    margin-bottom: 10px;
  }
  & .button {
    height: 36px;
  }
}
</style>
