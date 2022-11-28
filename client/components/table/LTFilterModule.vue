<template>
  <l-tbody class="module" v-if="values.length">
    <l-tr>
      <l-th colspan="100%">
        <div class="module__box">
          <l-combobox :values="[{ name: 'Все', faded: true }, ...values]" v-model="valueSelected"/>
          <l-input placeholder="Строка поиска" v-model="valueInput"/>
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
    & .input {
      height: 24px;
      width: 100%;
    }
    & .combobox {
      height: 24px;
      width: 180px;
    }
  }
}
</style>
