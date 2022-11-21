<template>
  <l-tfoot v-if="pages > 1">
    <l-tr :hover="false">
      <l-td colspan="100%">
        <transition-group tag="div" class="module" name="fade-pro">
          <div
            class="module__button module__button--small"
            v-if="arrayPages[0] !== 0"
            @click="selectPage(0)"
            key="start"
          >
            <lfa icon="angles-left"/>
          </div>
          <div
            class="module__button module__button--small"
            v-if="arrayPages[0] !== page"
            @click="selectPage(page - 1)"
            key="prev"
          >
            <lfa icon="angle-left"/>
          </div>
          <div
            class="module__button"
            :class="{'module__button--active': page === button}"
            v-for="button in arrayPages"
            :key="'button-' + button"
            @click="selectPage(button)"
          >
            {{ button + 1 }}
          </div>
          <div
            class="module__button module__button--small"
            v-if="arrayPages[arrayPages.length - 1] !== page"
            @click="selectPage(page + 1)"
            key="next"
          >
            <lfa icon="angle-right"/>
          </div>
          <div
            class="module__button module__button--small"
            v-if="arrayPages[arrayPages.length - 1] !== pages - 1"
            @click="selectPage(pages - 1)"
            key="end"
          >
            <lfa icon="angles-right"/>
          </div>
        </transition-group>
      </l-td>
    </l-tr>
  </l-tfoot>
</template>

<script>
export default {
  name: "LTPaginationModule",
  data() {
    return {
      dataServer: [],
      arrayPages: [],
      page: null,
      pages: 0,
      innerVisibleButtons: null
    }
  },
  props: {
    value: {
      type: Array,
      default: () => {
        return []
      }
    },
    url: {
      type: String,
      default: () => {
        return ''
      }
    },
    limit: {
      type: Number,
      default: () => {
        return 15
      }
    },
    visibleButtons: {
      type: Number,
      default: () => {
        return 7
      }
    },
    name: {
      type: String,
      default: () => {
        return 'default'
      }
    }
  },
  watch: {
    value() {
      this.dataServer = this.value
    },
    page() {
      this.$router.push({ path: this.$route.path, query: { page: this.page + 1 } })
      this.loadPage()
    }
  },
  mounted() {
    this.dataServer = this.value
    this.innerVisibleButtons = this.visibleButtons
    if (this.$route.query.page) {
      const newPage = parseInt(String(this.$route.query.page)) - 1
      this.page = newPage < 0 ? 0 : newPage
    } else {
      this.page = 0
    }
  },
  methods: {
    async APIGetUrlData() {
      return await this.$axios.get(`${this.url}/?limit=${this.limit}&offset=${this.page * this.limit}`)
    },

    selectPage(nPage) {
      this.page = parseInt(nPage)
    },
    loadPage() {
      this.$evBus.send('table-pag-' + this.name, true)
      Promise.all([
        this.APIGetUrlData()
      ]).then(res => {
        setTimeout(() => {
          this.pages = Math.ceil(res[0].data.count / this.limit)
          if (res[0].data.count && !res[0].data.values.length) {
            this.page = this.pages - 1
          } else {
            this.createArrayPages()
            this.$emit('input', res[0].data.values)
            this.$emit('page', this.page + 1)
            this.$evBus.send('table-pag-' + this.name, false)
          }
        }, 300)
      }).catch(err => {
        setTimeout(() => {
          this.$evBus.send('table-pag-' + this.name, false)
        }, 300)
      })
    },
    createArrayPages() {
      this.arrayPages = []
      const selectedPage = this.page
      if (this.innerVisibleButtons % 2 === 1) {
        this.innerVisibleButtons--
      }
      if (this.pages > this.innerVisibleButtons) {
        let leftBlocks = this.innerVisibleButtons / 2,
          rightBlocks = leftBlocks = this.innerVisibleButtons / 2;
        if (selectedPage - leftBlocks < 0) {
          rightBlocks += leftBlocks - selectedPage
          leftBlocks -= leftBlocks - selectedPage
        } else if (selectedPage + rightBlocks > this.pages - 1) {
          leftBlocks += rightBlocks - ((this.pages - 1) - selectedPage)
          rightBlocks -= rightBlocks - ((this.pages - 1) - selectedPage)
        }
        for (let pageId = selectedPage - leftBlocks; pageId < selectedPage + rightBlocks + 1; pageId++) {
          this.arrayPages.push(pageId)
        }
      } else {
        for (let pageId = 0; pageId < this.pages; pageId++) {
          this.arrayPages.push(pageId)
        }
      }
    },
  }
}
</script>

<style lang="scss" scoped>
.module {
  display: flex;
  justify-content: center;
  align-items: center;
  &__button {
    font-size: 16px;
    font-weight: 500;
    display: flex;
    justify-content: center;
    align-items: center;
    width: 35px;
    max-width: 35px;
    height: 35px;
    margin: 0 2.5px;
    border-radius: 5px;
    color: #fff;
    background-color: var(--MainPurpleColor);
    user-select: none;
    cursor: pointer;
    transition: .3s;
    &:hover {
      background-color: var(--MainHoverPurpleColor);
    }
    &:active {
      transform: scale(0.95);
    }
    &--active {
      background-color: var(--MainHoverPurpleColor);
      pointer-events: none;
    }
    &--small {
      width: 27px;
      height: 27px;
    }
  }
}
.fade-pro {
  &-enter-active, &-leave-active {
    transition: margin .1s, max-width .3s, opacity .3s;
    overflow: hidden;
  }
  &-enter-to, &-leave {
    opacity: 1;
  }
  &-enter, &-leave-to {
    opacity: 0;
    max-width: 0;
    margin: 0;
  }
}
</style>
