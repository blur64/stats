<template>
  <div>
    <base-table :headers="table.headers" :rows="table.rows" class="ms-3" />
    <base-select
      :id="'column-select'"
      :label="'Показывать описание для'"
      :optionsData="columnsDataForSelect"
      class="mx-3 py-3 mt-5"
      v-model="activeColumnName"
    />
    <summary-statistics
      :columnName="activeColumnName"
      :columnType="activeColumn.type"
      :column="activeColumn.value"
      class="mx-3 mb-4"
    >
      <base-select
        :optionsData="typesForSelect"
        :id="'type-select'"
        :label="'type'"
        v-model="activeColumnType"
        class="px-2 py-3"
      />
    </summary-statistics>
  </div>
</template>

<script>
import BaseTable from './BaseTable.vue';
import BaseSelect from './BaseSelect.vue';
import SummaryStatistics from './summaryStatistics/SummaryStatistics.vue';
import { sendRequestToChangeColumnTypes } from '../api.js';
import { columnTypes } from '../tables/tablesList.js';

export default {
  components: {
    BaseTable,
    SummaryStatistics,
    BaseSelect,
  },

  props: {
    table: {
      type: Object,
      required: true,
    },
  },

  data() {
    return {
      activeColumnName: '',
      activeColumnType: '',
      typesForSelect: [],
    };
  },

  computed: {
    columnsDataForSelect() {
      return this.table.columns.map((column) => {
        return { value: column.name, title: column.name };
      });
    },
    activeColumn() {
      return this.table.getColumn(this.activeColumnName);
    },
  },

  watch: {
    table() {
      this.activeColumnName = this.table.columns[0].name;
      this.activeColumnType = this.table.columns[0].type;
    },

    activeColumnName() {
      this.activeColumnType = this.activeColumn.type;
    },

    activeColumnType(newValue, oldValue) {
      if (newValue === oldValue) {
        return;
      }

      if (this.activeColumnType === this.activeColumn.type) {
        return;
      }

      const activeColumnIndex = this.table.columns.findIndex(
        (column) => column === this.activeColumn
      );
      const columnTypes = this.table.getColumnTypes();
      columnTypes[activeColumnIndex] = this.activeColumnType;

      sendRequestToChangeColumnTypes(this.table.id, columnTypes).then(
        (serverResponse) => {
          const columnTypesFromServer = serverResponse.columnTypes;
          this.activeColumn.setType(columnTypesFromServer[activeColumnIndex]);
        }
      );
    },
  },

  created() {
    this.activeColumnName = this.table.columns[0].name;
    this.activeColumnType = this.table.columns[0].type;
    this.typesForSelect = columnTypes.map((type) => {
      return { value: type, title: type };
    });
  },
};
</script>
