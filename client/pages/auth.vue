<template>
  <div class="page">
    <div class="page__box">
      <transition name="pages" >
        <div class="page__box__page">
          <div class="page__box__page__title">
            <div class="page__box__page__title__btn-back" @click="!verify.status ? $router.push({path: '/'}) : verify.clear()">
              <lfa icon="times"/>
            </div>
            <transition name="fade" mode="out-in">
              <span v-if="auth && !verify.status" key="auth">Вход</span>
              <span v-else-if="verify.status" key="verify">Активация</span>
              <span v-else key="reg">Регистрация</span>
            </transition>
          </div>
          <div class="page__box__page__box">
            <transition name="pages" mode="out-in">
              <form
                class="page__box__page__box__form"
                @submit.prevent="auth ? login() : registration()"
                v-if="!verify.status"
                key="auth-page"
              >
                <div
                  :style="auth ? 'max-height: 90px;' : ''"
                  class="page__box__page__box__form__inputs"
                >
                  <l-input
                    placeholder="Логин"
                    type="text"
                    :input-function="user.username.validate"
                    :valid="user.username.valid"
                    v-model="user.username.text"
                  />
                  <l-input
                    placeholder="Пароль"
                    type="password"
                    :input-function="user.password.validate"
                    :valid="user.password.valid"
                    v-model="user.password.text"
                  />
                  <l-input
                    placeholder="Имя"
                    type="text"
                    v-model="user.firstName"
                  />
                  <l-input
                    placeholder="Фамилия"
                    type="text"
                    v-model="user.secondName"
                  />
                  <l-input
                    placeholder="Email"
                    type="text"
                    :input-function="user.email.validate"
                    :valid="user.email.valid"
                    v-model="user.email.text"
                  />
                </div>
                <l-button
                  type="submit"
                  ref="auth-ref"
                  :disabled="auth ?
                    !(user.username.valid && user.password.valid) :
                    !(user.username.valid && user.password.valid && user.email.valid)
                  ">
                  <transition name="fade" mode="out-in">
                    <span v-if="auth" key="auth">Войти</span>
                    <span v-else key="reg">Продолжить</span>
                  </transition>
                </l-button>
              </form>
              <form
                class="page__box__page__box__form"
                @submit.prevent="sendCode(false)"
                v-else-if="!verify.send"
                key="send-page"
              >
                <div class="page__box__page__box__form__inputs">
                  <l-input
                    :class="{'input-red': !user.email.valid}"
                    placeholder="Email"
                    type="email"
                    :disabled="true"
                    v-model="user.email.text"
                  />
                </div>
                <l-button type="submit" ref="send-ref">
                  <span>Отправить код</span>
                </l-button>
              </form>
              <form
                class="page__box__page__box__form"
                @submit.prevent="activation()"
                v-else
                key="verify-page"
              >
                <div class="page__box__page__box__form__inputs">
                  <l-input-masked
                    :placeholder="`Код (${verify.timeToSendAgain > 0 ? intToTime(verify.timeToSendAgain) : '0:00'})`"
                    type="text"
                    mask="######"
                    :input-function="verify.code.validate"
                    :valid="verify.code.valid"
                    v-model="verify.code.text"
                  />
                </div>
                <l-button
                  type="submit"
                  :disabled="verify.timeToSendAgain <= 0 || !verify.code.valid"
                  ref="activate-ref"
                >
                  <span>Активировать</span>
                </l-button>
              </form>
            </transition>
          </div>
          <div class="page__box__page__subtitle">
            <transition name="fade" mode="out-in">
              <span v-if="verify.timeToSendAgain < 270" key="verify">Не пришел код? <a @click="sendCode(true)">Отправить</a></span>
              <span v-else-if="verify.send" key="update">Новый код через {{ intToTime(verify.timeToSendAgain - 270) }}</span>
              <span v-else-if="auth && !verify.status" key="auth">Нет аккаунта? <a @click="auth = false">Регистрация</a></span>
              <span v-else-if="!verify.status" key="reg">Уже зарегистрированы? <a @click="auth = true">Вход</a></span>
            </transition>
          </div>
        </div>
      </transition>
    </div>
  </div>
</template>

<script>
export default {
  name: "Auth",
  layout: 'auth',
  middleware: 'unlogged',
  data() {
    return {
      auth: true,
      verify: {
        send: false,
        timeToSendAgain: 360,
        status: false,
        code: {
          text: '',
          valid: false,
          validate: () => {
            this.verify.code.valid = /^.{6}$/.test(this.verify.code.text)
          }
        },
        timerId: null,
        clear() {
          this.send = false
          this.timeToSendAgain = 360
          this.status = false
          this.code.text = ''
          this.code.valid = false
          clearInterval(this.timerId)
          this.timerId = null
        }
      },
      user: {
        username: {
          text: '',
          valid: null,
          validate: () => {
            this.user.username.valid = /^.{6,20}$/.test(this.user.username.text)
          }
        },
        password: {
          text: '',
          valid: null,
          validate: () => {
            this.user.password.valid = /^.{8,30}$/.test(this.user.password.text)
          }
        },
        firstName: '',
        secondName: '',
        email: {
          text: '',
          valid: null,
          validate: () => {
            this.user.email.valid = /^[0-9a-zA-Z._-]{3,30}@[a-zA-Z]{1,10}\.[a-zA-Z]{1,10}$/.test(this.user.email.text)
          }
        }
      },
      errorsAuth: []
    }
  },
  methods: {
    async POSTSignUpAuth(data) {
      return await this.$axios.post('/api/auth/signup', data)
    },
    async POSTVerifyUser(data) {
      return await this.$axios.post('api/auth/verify', data)
    },

    intToTime(num) {
      const hours = `${Math.ceil(num / 60) - 1}`
      const minutes = `${num % 60}`
      return `${minutes === '0' ? parseInt(hours) + 1 : hours}:${minutes.length === 1 ? '0' : ''}${minutes}`
    },

    async login() {
      this.$refs['auth-ref'] && (this.$refs['auth-ref'].loader = true)
      this.$auth.loginWith('local', {
        data: {
          username: this.user.username.text,
          password: this.user.password.text
        }
      }).then(res => {
        this.$refs['auth-ref'] && (this.$refs['auth-ref'].loader = false)
        if (typeof res.data.emailVerify === "boolean") {
          this.user.email.text = res.data.email
          this.user.email.validate()
          this.verify.status = true
        }
      }).catch(err => {
        this.$refs['auth-ref'] && (this.$refs['auth-ref'].loader = false)
        this.$ctoast.error('Ошибка входа', { description: err.response.data.message })
      })
    },
    registration() {
      this.$refs['auth-ref'].loader = true
      Promise.all([
        this.POSTSignUpAuth({
          username: this.user.username.text,
          password: this.user.password.text,
          email: this.user.email.text,
          firstName: this.user.firstName,
          secondName: this.user.secondName
        })
      ]).then(() => {
        this.$refs['auth-ref'].loader = false
        this.login()
      }).catch(err => {
        this.$refs['auth-ref'].loader = false
        this.$ctoast.error('Ошибка регистрации', { description: err.response.data.message })
      })
    },
    sendCode(update) {
      this.$refs['send-ref'].loader = true
      Promise.all([
        this.POSTVerifyUser({ email: this.user.email.text, ...(update && { update }) })
      ]).then(res => {
        this.$refs['send-ref'].loader = false
        this.verify.send = true
        this.verify.timeToSendAgain = 360 - Math.ceil(((new Date()).getTime() - (new Date(res[0].data.updatedAt)).getTime()) / 1000)
        clearInterval(this.verify.timerId)
        this.verify.timerId = setInterval(() => {
          this.$set(this.verify, 'timeToSendAgain', this.verify.timeToSendAgain - 1)
          if (this.verify.timeToSendAgain < 0) {
            clearInterval(this.verify.timerId)
          }
        }, 1000)
      }).catch(err => {
        this.$refs['send-ref'].loader = false
        this.$ctoast.error('Ошибка отправки кода', { description: err.response.data.message })
      })
    },
    activation() {
      this.$refs['activate-ref'].loader = true
      Promise.all([
        this.POSTVerifyUser({
          email: this.user.email.text,
          code: this.verify.code.text
        }).then(res => {
          this.$refs['activate-ref'].loader = false
          this.login()
        }).catch(err => {
          this.$refs['activate-ref'].loader = false
          this.verify.code.text = ''
          this.verify.code.validate()
          this.$ctoast.error('Ошибка активации', { description: err.response.data.message })
        })
      ])
    }
  }
}
</script>

<style lang="scss" scoped>
.page {
  display: flex;
  justify-content: center;
  align-items: center;
  min-height: 100vh;
  background-color: #C0BCFA;
  &__box {
    position: relative;
    &__page {
      display: flex;
      flex-direction: column;
      align-items: center;
      padding: 15px 25px 25px;
      border-radius: 10px;
      background-color: #fff;
      filter: drop-shadow(-2px 50px 72px rgba(0, 0, 0, 0.25));
      &__title {
        position: relative;
        padding: 10px;
        box-sizing: border-box;
        width: 100%;
        user-select: none;
        &__btn-back {
          position: absolute;
          right: 0;
          display: flex;
          justify-content: center;
          align-items: center;
          width: 40px;
          height: 40px;
          cursor: pointer;
          & svg {
            font-size: 20px;
            color: rgba(58, 47, 255, 0.5);
            transition: .3s;
          }
          &:hover {
            & svg {
              color: rgba(106, 97, 253, 0.5);
            }
          }
        }
        & span {
          font-size: 35px;
          font-weight: 900;
          color: #2F2E41;
        }
      }
      &__box {
        display: flex;
        overflow: hidden;
        &__form {
          display: flex;
          flex-direction: column;
          gap: 10px;
          padding: 10px;
          width: 260px;
          &__inputs {
            display: flex;
            flex-direction: column;
            max-height: 232px;
            padding: 1px;
            transition: .3s;
            overflow: hidden;
          }
          & .input {
            min-height: 36px;
            margin-bottom: 10px;
          }
          & .button {
            height: 36px;
          }
        }
      }
      &__subtitle {
        & span {
          font-size: 14px;
          font-weight: 300;
          letter-spacing: 0;
          user-select: none;
          & a {
            color: rgba(58, 47, 255, 0.5);
            cursor: pointer;
            transition: .3s;
            &:hover {
              color: rgba(106, 97, 253, 0.5);
            }
          }
        }
      }
    }
  }
}
</style>
