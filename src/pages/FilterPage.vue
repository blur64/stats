<template>
  <div>
    <page-header :title="'Фильтры'" />
    <base-select
      :label="'Выберите таблицу'"
      :id="'table-select'"
      :optionsData="tablesNamesAndIds"
      v-model="activeTableId"
    />
    <the-filter :table="activeTable" />
  </div>
</template>

<script>
import PageHeader from '../components/PageHeader.vue';
import BaseSelect from '../components/BaseSelect.vue';
import TheFilter from '@/components/TheFilter.vue';

import { getTable, getTablesNamesAndIds } from '../tables/tablesList.js';

export default {
  components: {
    PageHeader,
    BaseSelect,
    TheFilter,
  },

  data() {
    return {
      tablesNamesAndIds: [],
      activeTableId: 0,
    };
  },

  computed: {
    activeTable() {
      return getTable(+this.activeTableId);
    },
  },

  created() {
    this.tablesNamesAndIds = getTablesNamesAndIds().map((tableData) => {
      return { value: tableData.id, title: tableData.name };
    });
    this.activeTableId = this.tablesNamesAndIds[0].value;
  },
};
</script>
