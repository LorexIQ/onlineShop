<template>
  <div class="users">
    <div class="users__box main-box">
      <h1 v-if="$auth.user.role === 3">Управление пользователями</h1>
      <h1 v-else>Пользователи</h1>
      <div class="users__box__table">
        <l-table>
          <l-thead>
            <l-tr>
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
              v-for="row in tableData"
              :key="row.id"
              :hover="true"
              :modal="true"
            >
              <l-td
                v-for="column in tableColumns"
                :key="column.id"
                :text-align="column.align"
              >
                <template v-if="column.type === 'increment'">{{ row.n }}</template>
                <template v-else-if="column.type === 'text'">{{ row[column.id] }}</template>
                <template v-if="column.type === 'svg-boolean'">
                  <l-svg-boolean-status v-model="row[column.id]"/>
                </template>
              </l-td>
            </l-tr>
          </l-tbody>
          <l-tloader-module />
          <l-tmodal-module />
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
          id: 'username',
          name: 'Логин',
          type: 'text',
        },
        {
          id: 'email',
          name: 'Почта',
          type: 'text',
        },
        {
          id: 'emailVerify',
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
.users {
  &__box {
    &__table {
      margin-top: 20px;
    }
  }
}
</style>
