<template>
  <div class="users">
    <div class="users__box main-box">
      <h1 v-if="$auth.user.role === 3">Управление пользователями</h1>
      <h1 v-else>Пользователи</h1>
      <div class="users__box__table">
        <l-table>
          <l-theadsort-module v-model="tableColumns"/>
          <l-tfilter-module v-model="tableColumns"/>
          <l-tbody :full-size="limit">
            <l-tr
              v-if="tableData.length"
              v-for="row in tableData"
              :key="row.id"
              :hover="true"
              :modal="true"
              :modal-add-function="() => selectedRow = row"
            >
              <l-td
                v-for="column in tableColumns"
                :key="column.id"
                :text-align="column.align"
                :style="column.type === 'img' && 'padding: 0;'"
              >
                <template v-if="column.type === 'increment'">{{ row.n }}</template>
                <template v-else-if="column.type === 'text'">{{ row[column.id] }}</template>
                <template v-else-if="column.type === 'role'">
                  {{ rolesList[row[column.id]] }} ({{row[column.id]}})
                </template>
                <template v-else-if="column.type === 'img'">
                  <l-avatar :src="row[column.id]" diameter="25px" style="margin: 0 auto;"/>
                </template>
                <template v-else-if="column.type === 'svg-boolean'">
                  <l-svg-boolean-status v-model="row[column.id]"/>
                </template>
              </l-td>
            </l-tr>
            <l-tr v-if="!tableData.length">
              <l-td text-align="center" colspan="100%">Нет Данных</l-td>
            </l-tr>
          </l-tbody>
          <l-tloader-module />
          <l-tmodal-module class="modal">
            <div class="modal__header" slot="header">
              <span>Пользователь</span>
              <span>{{ selectedRow.username }}</span>
            </div>
            <div class="modal__body" slot="body">
              <div class="modal__body__user">
                <div>
                  <p>Профиль</p>
                  <l-avatar :src="selectedRow.image" diameter="200px"/>
                </div>
                <div class="modal__body__user__info-table">
                  <span>ID</span>
                  <span>{{ selectedRow._id }}</span>
                  <span>Имя</span>
                  <span :class="{faded: !selectedRow.firstName}">
                    {{ selectedRow.firstName ? selectedRow.firstName : 'Не задано' }}
                  </span>
                  <span>Фамилия</span>
                  <span :class="{faded: !selectedRow.secondName}">
                    {{ selectedRow.secondName ? selectedRow.secondName : 'Не задано' }}
                  </span>
                  <span>Почта</span>
                  <span class="multi-blocks">
                    <l-svg-boolean-status v-model="selectedRow.emailVerify"/>
                    {{ selectedRow.email }}
                  </span>
                  <span>Роль</span>
                  <span>{{ rolesList[selectedRow.role] }}</span>
                  <span>Гендер</span>
                  <span :class="{faded: !selectedRow.gender}">
                    {{ selectedRow.gender ? selectedRow.gender : 'Не задано'  }}
                  </span>
                </div>
              </div>
              <div class="modal__body__seller" v-if="selectedRow.sellerData">
                <div>
                  <p>Профиль продавца</p>
                  <l-avatar :src="selectedRow.sellerData.image" diameter="200px"/>
                  <p>{{ selectedRow.sellerData.name }}</p>
                </div>
                <l-button :click="sellerButtonAction">
                  {{ selectedRow.sellerData.verify ? 'Перейти' : 'Ожидает верификации' }}
                </l-button>
              </div>
              <div class="modal__body__seller modal__body__seller--center" v-else>
                <p>У пользователя отсутствует зарегистрированный магазин продавца</p>
              </div>
            </div>
            <div class="modal__footer" slot="footer">
              <l-button
                v-if="this.$auth.user._id !== selectedRow._id && this.$auth.user.role > selectedRow.role"
                :click="userDelete"
              >
                Удалить
              </l-button>
            </div>
          </l-tmodal-module>
          <l-tpag-module url="api/users" v-model="tableData" :limit="limit" @page="(n) => this.page = n"/>
        </l-table>
      </div>
    </div>
  </div>
</template>

<script>
export default {
  name: "users",
  middleware: 'admin',
  data() {
    return {
      page: 1,
      limit: 15,
      tableData: [],
      tableColumns: [
        {
          id: 'n',
          name: '№ п/п',
          type: 'increment',
          align: 'center',
          width: '70px'
        },
        {
          id: 'image',
          name: '',
          type: 'img'
        },
        {
          id: 'username',
          name: 'Логин',
          type: 'text',
          filter: true,
          sort: true
        },
        {
          id: 'email',
          name: 'Почта',
          type: 'text',
          filter: true,
          sort: true
        },
        {
          id: 'role',
          name: 'Роль',
          type: 'role',
          width: '160px',
          filter: true,
          sort: true
        },
        {
          id: 'emailVerify',
          name: 'Активирован',
          type: 'svg-boolean',
          align: 'center',
          width: '130px',
          sort: true
        }
      ],
      selectedRow: {},
      rolesList: {
        1: 'Пользователь',
        2: 'Администратор',
        3: 'СуперАдмин'
      },
    }
  },
  watch: {
    'selectedRow.sellerId'() {
      if (!this.selectedRow.sellerData && this.selectedRow.sellerId) {
        this.$evBus.send('table-pag-default', true)
        Promise.all([
          this.APIGetSellerId()
        ]).then(res => {
          this.$set(this.selectedRow, 'sellerData', res[0].data)
          setTimeout(() => {
            this.$evBus.send('table-pag-default', false)
          }, 300)
        }).catch(err => {
          this.$ctoast.error('Ошибка загрузки информации об пользователе')
          this.$evBus.send('table-modal-default', false)
          setTimeout(() => {
            this.$evBus.send('table-pag-default', false)
          }, 300)
        })
      }
    }
  },
  methods: {
    async APIGetSellerId() {
      return await this.$axios.get(`api/sellers/${this.selectedRow.sellerId}`)
    },
    async APIDeleteUserId() {
      return await this.$axios.delete(`api/users/${this.selectedRow._id}`)
    },

    sellerButtonAction() {
      if (this.selectedRow.sellerData.verify) {
      } else {
        this.$router.push({ path: 'sellers' })
      }
    },
    userDelete() {
      this.$evBus.send('table-pag-default', true)
      Promise.all([
        this.APIDeleteUserId()
      ]).then(res => {
        this.$evBus.send('table-modal-default', false)
        this.$evBus.send('table-pag-default-update')
      }).catch(err => {
        this.$ctoast.error('Ошибка удаления пользователя')
        this.$evBus.send('table-pag-default', false)
      })
    }
  }
}
</script>

<style lang="scss" scoped>
.users {
  &__box {
    &__table {
      margin-top: 20px;
      & .modal {
        &__header {
          & span {
            font-weight: 600;
            font-size: 22px;
            color: var(--MainDarknesColor);
            &:first-child {
              color: var(--MainPurpleColor);
            }
            &:last-child {
              font-weight: 500;
            }
          }
        }
        &__body {
           display: flex;
           gap: 50px;
           height: 100%;
           padding: 10px 30px 30px;
           box-sizing: border-box;
           & > div {
             display: flex;
             flex-direction: column;
             justify-content: space-between;
             width: 100%;
           }
           &__user {
             &__info-table {
               display: grid;
               grid-template-columns: auto auto;
               & span {
                 font-size: 18px;
                 font-weight: 500;
                 color: var(--MainPurpleColor);
                 &:nth-child(even) {
                   text-align: right;
                   color: var(--MainDarknesColor);
                 }
               }
               & .faded {
                 color: var(--MainHoverDarknesColor) !important;
               }
             }
             & p {
               font-size: 20px;
               font-weight: 500;
               margin: 0;
               text-align: center;
             }
             & .avatar {
               margin: 15px auto;
             }
             & .multi-blocks {
               display: flex;
               justify-content: flex-end;
               gap: 5px;
               flex-wrap: nowrap;
             }
           }
           &__seller {
             & p {
               font-weight: 500;
               margin: 0;
               text-align: center;
               &:first-child {
                 font-size: 20px;
               }
             }
             & .avatar {
               margin: 15px auto;
             }
             .button {
               width: 250px;
               height: 35px;
               margin: 0 auto;
             }
             &--center {
               justify-content: center !important;
             }
           }
         }
        &__footer {
          display: flex;
          justify-content: center;
          width: 100%;
          & .button {
            width: 100px;
            height: 35px;
          }
        }
      }
    }
  }
}
</style>
