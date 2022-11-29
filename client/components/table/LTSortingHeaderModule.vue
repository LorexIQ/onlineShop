<template>
  <l-thead>
    <l-tr>
      <l-th
        :class="{sortable: column.sort, 'hover-on': sortState.slice(1) === column.id}"
        v-for="column in value"
        :key="column.id"
        :text-align="column.align"
        :width="column.width"
        :click="() => sortWork(column)"
      >
        {{ column.name }}
        <lfa
          v-if="column.sort"
          :icon="sortState.length && sortState.slice(1) === column.id ? sortState[0] === '+' ? `sort-up` :  `sort-down` : `sort`"
        />
      </l-th>
    </l-tr>
  </l-thead>
</template>

<script>
export default {
  name: "LTSortingHeaderModule",
  data() {
    return {
      sortState: '',
      sortDelayId: null
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
  },
  watch: {
    sortState() {
      clearTimeout(this.sortDelayId)
      this.sortDelayId = setTimeout(() => {
        this.$router.push({
          path: this.$route.path,
          query: {
            ...this.$route.query,
            sort: this.sortState
          }
        })
        setTimeout(() => {
          this.$evBus.send(`table-pag-${this.name}-update`)
        }, 100)
      }, 900)
    }
  },
  methods: {
    sortWork(column) {
      if (column.sort) {
        if (!this.sortState.length || this.sortState.slice(1) !== column.id) {
          this.sortState = `+${column.id}`
        } else {
          const sortMode = this.sortState[0]
          if (sortMode === '+') {
            this.sortState = `-${this.sortState.slice(1)}`
          } else {
            this.sortState = ''
          }
        }
      }
    }
  }
}
</script>

<style lang="scss" scoped>
.sortable {
  cursor: pointer;
  user-select: none;
  transition: .3s;
  & svg {
    margin-left: 3px;
    color: var(--MainHoverDarknesColor);
    opacity: 0;
    transition: .3s;
  }
  &:hover {
    background-color: #fafafa;
    & svg {
      opacity: 1;
    }
  }
}
.hover-on {
  & svg {
    color: var(--MainDarknesColor) !important;
    opacity: 1 !important;
  }
}
</style>
