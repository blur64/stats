<template>
  <div>
    <page-header :title="'Фильтры'" />
    <base-select
      :label="'Выберите таблицу'"
      :id="'table-select'"
      :optionsData="tablesNamesAndIds"
      v-model="activeTableId"
      class="px-3 mb-4"
    />
    <the-filter
      v-if="activeTableId"
      :table="activeTable"
      class="px-3"
      @tableChangedOrSavedAsNew="restoreInitialDataValues"
    />
  </div>
</template>

<script>
import PageHeader from '../components/PageHeader.vue';
import BaseSelect from '../components/BaseSelect.vue';
import TheFilter from '@/components/TheFilter.vue';

import {
  getTable,
  getTablesNamesAndIds,
  areTablesLoaded,
  subscribeToTablesLoadedState,
} from '../tables/tablesList.js';

export default {
  components: {
    PageHeader,
    BaseSelect,
    TheFilter,
  },

  data() {
    return {
      tablesNamesAndIds: [],
      activeTableId: null,
    };
  },

  computed: {
    activeTable() {
      return getTable(this.activeTableId);
    },
  },

  methods: {
    restoreInitialDataValues() {
      this.tablesNamesAndIds = getTablesNamesAndIds().map((tableData) => {
        return { value: tableData.id, title: tableData.name };
      });

      this.activeTableId = null;
    },

    setTablesData() {
      this.tablesNamesAndIds = getTablesNamesAndIds().map((tableData) => {
        return { value: tableData.id, title: tableData.name };
      });
    },
  },

  created() {
    if (areTablesLoaded) {
      this.setTablesData();
    } else {
      subscribeToTablesLoadedState(this.setTablesData);
    }
  },
};
</script>
