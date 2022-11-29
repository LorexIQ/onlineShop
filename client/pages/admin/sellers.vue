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
              :key="'row-' + row.id"
              :modal="true"
            >
              <l-td
                v-for="column in tableColumns"
                :key="`field-${row.id}-${column.id}`"
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
            <div slot="header">Title</div>
            <div slot="body">body</div>
            <div slot="footer">footer</div>
          </l-tmodal-module>
          <l-tpag-module url="api/test/pagination" v-model="tableData" :visible-buttons="5"/>
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
          id: 'role',
          name: 'Роль',
          type: 'text',
          filter: true,
          sort: true
        },
        {
          id: 'status',
          name: 'Активирован',
          type: 'svg-boolean',
          align: 'center',
          width: '130px',
          sort: true
        }
      ]
    }
  },
  mounted() {
  }
}
</script>

<style lang="scss" scoped>
.sellers {
  &__box {
    &__table {
      margin-top: 20px;
    }
  }
}
</style>
