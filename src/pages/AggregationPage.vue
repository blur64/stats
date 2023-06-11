<template>
  <div>
    <page-header :title="'Агрегация'" />
    <base-select
      :label="'Выберите таблицу'"
      :id="'table-select'"
      :optionsData="tablesNamesAndIds"
      v-model="activeTableId"
      class="px-3 mb-4"
    />
    <the-aggregator :table="activeTable" class="px-3" />
  </div>
</template>

<script>
import TheAggregator from '@/components/TheAggregator.vue';
import PageHeader from '../components/PageHeader.vue';
import BaseSelect from '@/components/BaseSelect.vue';

import { getTable, getTablesNamesAndIds } from '../tables/tablesList.js';

export default {
  components: {
    PageHeader,
    TheAggregator,
    BaseSelect,
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
