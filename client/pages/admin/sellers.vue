<template>
  <div class="sellers">
    <div class="sellers__box box">
      <h1>Панель управления продавцами</h1>
      <div class="sellers__box__table">
        <l-table>
          <l-thead>
            <l-tr :hover="false">
              <l-th
                v-for="column in tableColumns"
                :key="column.id"
                :text-align="column.align"
                :width="column.width"
              >
                {{ column.name }}
              </l-th>
            </l-tr>
          </l-thead>
          <l-tbody>
            <l-tr
              v-if="tableData.length"
              v-for="row in tableData"
              :key="row.id"
            >
              <l-td
                v-for="column in tableColumns"
                :key="column.id"
                :text-align="column.align"
              >
                <template v-if="column.type === 'n'">
                  {{ row.n }}
                </template>
                <template v-else-if="typeof row[column.id] !== 'undefined'">
                  {{ row[column.id] }}
                </template>
              </l-td>
            </l-tr>
            <l-tr v-if="!tableData.length">
              <l-td text-align="center" colspan="100%">Нет Данных</l-td>
            </l-tr>
          </l-tbody>
          <l-tloader/>
          <l-tpag url="api/test/pagination" v-model="tableData" :visible-buttons="5"/>
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
      page: 1,
      tableData: [],
      tableColumns: [
        {
          id: 'N',
          name: '№ п/п',
          type: 'n',
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
          type: 'text'
        },
        {
          id: 'status',
          name: 'Активирован',
          type: 'svg-boolean',
          align: 'center',
          width: '130px'
        }
      ]
    }
  }
}
</script>

<style lang="scss" scoped>
.sellers {
  &__box {
    max-width: 1100px;
    margin: 40px auto;
    &__table {
      margin-top: 20px;
    }
  }
}
</style>
