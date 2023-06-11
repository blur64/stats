<template>
  <div>
    <base-table :rows="rowsFiltered" :headers="headers" class="mb-5" />
    <filter-field
      v-for="(column, index) of table.columns"
      :key="index"
      :columnName="column.name"
      :columnType="column.type"
      :columnValue="column.value"
      @filterValueChanged="changeFilterArg"
      class="border-bottom py-3"
    />
  </div>
</template>

<script>
import BaseTable from './BaseTable.vue';
import FilterField from './filterFields/FilterField.vue';

export default {
  components: {
    BaseTable,
    FilterField,
  },

  props: {
    table: {
      type: Object,
      required: true,
    },
  },

  data() {
    return {
      columnsData: [],
      filtersArgs: [],
      columnTypeToFilter: {
        string: 'stringTypeFilter',
        number: 'numberTypeFilter',
        factor: 'factorTypeFilter',
      },
    };
  },

  computed: {
    rows() {
      return this.table.rows;
    },

    headers() {
      return this.table.headers;
    },

    rowsFiltered() {
      let rowsFiltered = this.rows;
      let columnIndex = 0;

      for (let [columnName, filter] of this.columnToFilter) {
        columnIndex = this.headers.indexOf(columnName, 0);
        rowsFiltered = this[filter]({
          rows: rowsFiltered,
          arg: this.filtersArgs[columnName],
          columnIndex,
        });
      }

      return rowsFiltered;
    },

    columnToFilter() {
      const columnToFilter = {};

      this.table.columns.forEach(
        (column) =>
          (columnToFilter[column.name] = this.columnTypeToFilter[column.type])
      );

      return Object.entries(columnToFilter);
    },
  },

  methods: {
    // Вызывается при эмите одного из filterField
    changeFilterArg(columnName, filterArg) {
      this.filtersArgs[columnName] = filterArg;
    },

    stringTypeFilter({ rows, arg: subString, columnIndex }) {
      if (!subString) {
        return rows;
      }
      return rows.filter((row) => row[columnIndex].includes(subString));
    },

    numberTypeFilter({ rows, arg: interval, columnIndex }) {
      if (!interval) {
        return rows;
      }

      return rows.filter(
        (row) =>
          interval[0] <= row[columnIndex] && row[columnIndex] <= interval[1]
      );
    },

    factorTypeFilter({ rows, arg: factorsToLeave, columnIndex }) {
      if (!factorsToLeave) {
        return rows;
      }
      return rows.filter((row) => factorsToLeave.includes(row[columnIndex]));
    },
  },

  watch: {
    table() {
      for (let column of this.table.columns) {
        this.filtersArgs[column.name] = null;
      }
    },
  },

  created() {
    for (let column of this.table.columns) {
      this.filtersArgs[column.name] = null;
    }
  },
};
</script>
