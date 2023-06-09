<template>
  <div>
    <base-table :headers="table.headers" :rows="table.rows" class="ms-3" />
    <base-select
      :id="'column-select'"
      :label="'Текущая колонка:'"
      :optionsData="columnsDataForSelect"
      v-model="activeColumnName"
    />
    <summary-statistics
      :columnName="activeColumnName"
      :columnType="activeColumn.type"
      :column="activeColumn.value"
      class="ms-3"
    >
      <base-select
        :optionsData="typesForSelect"
        :id="'type-select'"
        :label="'type'"
        v-model="activeColumnType"
        class="p-2"
      />
    </summary-statistics>
  </div>
</template>

<script>
import BaseTable from './BaseTable.vue';
import BaseSelect from './BaseSelect.vue';
import SummaryStatistics from './summaryStatistics/SummaryStatistics.vue';
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
      if (newValue === oldValue) return;
      this.activeColumn.type = this.activeColumnType;
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
