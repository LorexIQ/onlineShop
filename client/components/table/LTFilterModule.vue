<template>
  <l-tbody class="module" v-if="values.length">
    <l-tr>
      <l-th colspan="100%">
        <div class="module__box">
          <l-combobox :values="[valueAsAllObjects, ...values]" v-model="valueSelected"/>
          <div class="module__box__input">
            <l-input placeholder="Строка поиска" v-model="valueInput"/>
            <div class="module__box__input__times" @click="valueInput = ''">
              <lfa icon="times"/>
            </div>
          </div>
        </div>
      </l-th>
    </l-tr>
  </l-tbody>
</template>

<script>
export default {
  name: "LTFilterModule",
  data() {
    return {
      valueAsAllObjects: { name: 'Все', faded: true },
      valueSelected: {},
      values: [],
      valueInput: '',
      delayFilterId: null
    }
  },
  watch: {
    valueSelected() {
      if (this.valueInput.length) {
        this.configUrl()
      }
    },
    valueInput() {
      this.configUrl()
    }
  },
  props: {
    value: {
      type: Array,
      default: () => {
        return []
      }
    },
    name: {
      type: String,
      default: () => {
        return 'default'
      }
    },
    config: {
      type: Object,
      default: () => {
        return {
          nameKey: 'name',
          idKey: 'id'
        }
      }
    }
  },
  mounted() {
    this.values = this.value.filter(item => item.filter === true)
    const filterQuery = this.$route.query.filter
    if (filterQuery) {
      try {
        const [keyString, value] = filterQuery.split('-')
        this.valueInput = value
        const keys = keyString.split('*')
        if (keys.length > 1) {
          this.valueSelected = this.valueAsAllObjects
        } else {
          this.valueSelected = this.values.filter(item => item[this.config.idKey] === keys[0])[0]
        }
      } catch (err) {
        this.valueSelected = this.valueAsAllObjects
        console.error('Ошибка парсинга параметра фитрации. Ячейка поиска сброшена по умолчанию!')
      }
    }
  },
  methods: {
    configUrl() {
      clearTimeout(this.delayFilterId)
      this.delayFilterId = setTimeout(() => {
        if (this.valueInput.length) {
          this.$router.push({
            path: this.$route.path,
            query: {
              ...this.$route.query,
              filter: `${
                this.valueSelected[this.config.idKey] ?
                  this.valueSelected[this.config.idKey] :
                  this.values.reduce((prev, current) => {
                    prev.push(current[this.config.idKey])
                    return prev
                  }, []).join('*')
              }-${this.valueInput}`
            }
          })
        } else {
          this.$router.push({
            path: this.$route.path,
            query: {
              ...this.$route.query,
              filter: ''
            }
          })
        }
        setTimeout(() => {
          this.$evBus.send(`table-pag-${this.name}-update`)
        }, 100)
      }, 400)
    }
  }
}
</script>

<style lang="scss" scoped>
.module {
  &__box {
    display: flex;
    gap: 10px;
    &__input {
      position: relative;
      width: 100%;
      &__times {
        position: absolute;
        right: 5px;
        top: calc(50% - 10px);
        display: flex;
        justify-content: center;
        align-items: center;
        width: 20px;
        height: 20px;
        color: var(--MainHoverDarknesColor);
        cursor: pointer;
        transition: .3s;
        &:hover {
          color: var(--MainDarknesColor);
        }
      }
      & .input {
        height: 24px;
      }
    }
    & .combobox {
      height: 24px;
      width: 180px;
    }
  }
}
</style>
