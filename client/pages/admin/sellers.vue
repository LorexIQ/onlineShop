<template>
  <div class="sellers">
    <div class="sellers__box main-box">
      <h1>Панель управления продавцами</h1>
      <div class="sellers__box__table">
        <l-table>
          <l-theadsort-module v-model="tableColumns"/>
          <l-tfilter-module v-model="tableColumns"/>
          <l-tbody :full-size="15">
            <l-tr :hover="true"
              v-if="tableData.length"
              v-for="row in tableData"
              :key="'row-' + row._id"
              :modal="true"
              :modal-add-function="() => selectedRow = row"
            >
              <l-td
                v-for="column in tableColumns"
                :key="`field-${row._id}-${column.id}`"
                :text-align="column.align"
              >
                <template v-if="column.type === 'increment'">
                  {{ row.n }}
                </template>
                <template v-else-if="typeof row[column.id] !== 'undefined'">
                  <template v-if="column.type === 'svg-boolean'">
                    <l-svg-boolean-status v-model="row[column.id]"/>
                  </template>
                  <template v-else>
                    {{ row[column.id] }}
                  </template>
                </template>
              </l-td>
            </l-tr>
            <l-tr v-if="!tableData.length">
              <l-td text-align="center" colspan="100%">Нет Данных</l-td>
            </l-tr>
          </l-tbody>
          <l-tloader-module/>
          <l-tmodal-module>
            <div class="modal__header" slot="header">
              <span>Продавец</span>
              <span>{{ selectedRow.name }}</span>
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
                  <span>Наименоваие</span>
                  <span>{{ selectedRow.name }}</span>
                  <span>INN</span>
                  <span>{{ selectedRow.INN }}</span>
                  <span>Статус</span>
                  <span>
                    <l-svg-boolean-status v-model="selectedRow.verify"/>
                  </span>
                </div>
              </div>
              <div class="modal__body__seller" v-if="selectedRow.userData">
                <div>
                  <p>Профиль пользователя</p>
                  <l-avatar :src="selectedRow.userData.image" diameter="200px"/>
                  <p>{{ selectedRow.userData.firstName }} {{ selectedRow.userData.secondName }}</p>
                </div>
                <l-button :click="goToUser">Перейти</l-button>
              </div>
              <div class="modal__body__seller modal__body__seller--center" v-else>
                <p>Ошибка загрузки информации о владельце</p>
              </div>
            </div>
            <div class="modal__footer" slot="footer">
              <l-button
                v-if="this.$auth.user.role >= 2"
                :click="sellerDelete"
              >
                Удалить
              </l-button>
              <l-button
                v-if="!selectedRow.verify"
                :click="sellerVerify"
              >
                Верифицировать
              </l-button>
            </div>
          </l-tmodal-module>
          <l-tpag-module url="api/sellers" v-model="tableData" :visible-buttons="5"/>
        </l-table>
      </div>
    </div>
  </div>
</template>

<script>
export default {
  name: "AdminSellers",
  middleware: 'admin',
  data() {
    return {
      selectedRow: {},
      tableData: [],
      tableColumns: [
        {
          id: 'N',
          name: '№ п/п',
          type: 'increment',
          align: 'center',
          width: '70px'
        },
        {
          id: 'image',
          name: '',
          type: 'image'
        },
        {
          id: 'name',
          name: 'Наименование',
          type: 'text',
          filter: true,
          sort: true
        },
        {
          id: 'INN',
          name: 'ИНН',
          type: 'text',
          filter: true,
          sort: true
        },
        {
          id: 'verify',
          name: 'Подтверждён',
          type: 'svg-boolean',
          align: 'center',
          width: '130px',
          sort: true
        }
      ]
    }
  },
  watch: {
    'selectedRow.buyerId'() {
      if (!this.selectedRow.userData) {
        this.$evBus.send('table-pag-default', true)
        Promise.all([
          this.APIGetUserId()
        ]).then(res => {
          this.$set(this.selectedRow, 'userData', res[0].data)
          setTimeout(() => {
            this.$evBus.send('table-pag-default', false)
          }, 300)
        }).catch(err => {
          this.$ctoast.error('Ошибка загрузки информации о продавце')
          this.$evBus.send('table-modal-default', false)
          setTimeout(() => {
            this.$evBus.send('table-pag-default', false)
          }, 300)
        })
      }
    }
  },
  mounted() {
    const idSeller = this.$route.query.id
    if (idSeller && idSeller.length) {
      this.$nextTick(() => {
        this.$router.push({ path: this.$route.path, query: { ...this.$route.query, id: null } })
      })
      this.$evBus.send('table-loader-default', true)
      Promise.all([
        this.APIGetSellerId(idSeller)
      ]).then(res => {
        this.selectedRow = res[0].data
        this.$evBus.send('table-modal-default', true)
        setTimeout(() => {
          this.$evBus.send('table-loader-default', false)
        }, 300)
      }).catch(err => {
        this.$ctoast.error('Ошибка загрузки предпросмотра продавца')
        setTimeout(() => {
          this.$evBus.send('table-loader-default', false)
        }, 300)
      })
    }
  },
  methods: {
    async APIGetUserId() {
      return await this.$axios.get(`api/users/${this.selectedRow.buyerId}`)
    },
    async APIGetSellerId(id) {
      return await this.$axios.get(`api/sellers/${id}`)
    },
    async APIPatchVerifySeller() {
      return await this.$axios.patch(`api/sellers/verify/${this.selectedRow._id}`)
    },

    sellerDelete() {

    },
    sellerVerify() {
      Promise.all([
        this.APIPatchVerifySeller()
      ]).then(res => {
        this.$set(this.selectedRow, 'verify', true)
      }).catch(err => {
        this.$ctoast.error('Ошибка верификации', { description: 'Проверьте консоль разработчика' })
      })
    },
    goToUser() {
      this.$router.push({ path: 'users', query: { id: this.selectedRow.buyerId } })
    }
  }
}
</script>

<style lang="scss" scoped>
.sellers {
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
          gap: 10px;
          width: 100%;
          & .button {
            width: max-content;
            height: 35px;
          }
        }
      }
    }
  }
}
</style>
