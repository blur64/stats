<template>
  <div>
    <base-table :rows="table.rows" :headers="table.headers" class="mb-5" />
    <base-select
      :optionsData="columnsNamesForSelect"
      :label="'Группировать по'"
      :id="'column-select'"
      v-model="activeGroupByColumnName"
    />
    <base-select
      :optionsData="aggregateFunctionsNamesForSelect"
      :label="'Функция агрегирования'"
      :id="'function-select'"
      v-model="activeAggregateFunctionName"
    />
    <base-select
      :optionsData="columnsNamesForSelect"
      :label="'Параметр функции'"
      :id="'column-aggregate-select'"
      v-model="activeAggregateFunctionColumnName"
    />
    <two-axis-headers-table
      :sideHeaders="uniqueColumnItems"
      :topHeaders="topHeader"
    />
  </div>
</template>

<script>
import BaseTable from './BaseTable.vue';
import BaseSelect from './BaseSelect.vue';
import TwoAxisHeadersTable from './TwoAxisHeadersTable.vue';

export default {
  components: {
    BaseTable,
    BaseSelect,
    TwoAxisHeadersTable,
  },

  props: {
    table: {
      type: Object,
      required: true,
    },
  },

  data() {
    return {
      activeGroupByColumnName: '',
      aggregateFunctionsNames: ['count', 'max', 'min', 'sum', 'avg'],
      activeAggregateFunctionName: '',
      activeAggregateFunctionColumnName: '',
    };
  },

  computed: {
    activeGroupByColumn() {
      if (!this.activeGroupByColumnName) {
        return [];
      }
      return this.table.getColumn(this.activeGroupByColumnName).value;
    },

    columnsNamesForSelect() {
      return this.table.columns.map((column) => {
        return { value: column.name, title: column.name };
      });
    },

    aggregateFunctionsNamesForSelect() {
      return this.aggregateFunctionsNames.map((name) => {
        return { value: name, title: name };
      });
    },

    uniqueColumnItems() {
      const columnUniqueItems = [];

      this.activeGroupByColumn.forEach((item) => {
        if (!columnUniqueItems.includes(item)) {
          columnUniqueItems.push(item);
        }
      });

      return columnUniqueItems;
    },

    topHeader() {
      if (
        !this.activeAggregateFunctionName ||
        this.activeAggregateFunctionColumnName
      ) {
        return [];
      }
      return [
        `${this.activeAggregateFunctionName}(${this.activeAggregateFunctionColumnName})`,
      ];
    },
  },
};
</script>
