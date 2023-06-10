<template>
  <div>
    <page-header :title="'Таблицы'" />
    <the-tables-list
      :tablesData="tablesNamesAndIds"
      @tableSelected="changeActiveTable"
      @newTableAdded="refreshTableList"
    />
    <the-table-info v-if="activeTable" :table="activeTable" />
  </div>
</template>

<script>
// На будущее: базу данных можно использовать со структурой дерева. Такая БД тут идеально подходит
// потому, что у каждого пользователя несколько таблиц, у каждой таблицы несколько колонок. (колонки
// нужно хранить, чтобы хранить тип данных колонки на сервере). Пока что можно колонки в БД не хранить,
// но пользователю придётся постоянно менять тип данных колонок.

import PageHeader from '../components/PageHeader.vue';
import TheTablesList from '../components/TheTablesList.vue';
import TheTableInfo from '../components/TheTableInfo.vue';

import { getTablesNamesAndIds, getTable } from '../tables/tablesList.js';

export default {
  components: {
    PageHeader,
    TheTablesList,
    TheTableInfo,
  },

  data() {
    return {
      tablesNamesAndIds: [],
      activeTable: null,
    };
  },

  methods: {
    changeActiveTable(tableId) {
      this.activeTable = getTable(tableId);
    },
    refreshTableList() {
      this.tablesNamesAndIds = getTablesNamesAndIds();
    },
  },

  created() {
    this.tablesNamesAndIds = getTablesNamesAndIds();
  },
};
</script>
