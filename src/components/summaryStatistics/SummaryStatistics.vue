<template>
  <div>
    <header class="border-bottom px-3 mt-4 pb-2">
      <span class="fw-bold">{{ columnName }}</span>
    </header>
    <slot></slot>
    <side-headers-table :records="columnCounts" />
    <component :is="currentComponent" :column="columnEmptyStringFiltered" />
  </div>
</template>

<script>
import SideHeadersTable from '../SideHeadersTable.vue';
import NumberSummaryStatistics from './NumberSummaryStatistics.vue';
import FactorSummaryStatistics from './FactorSummaryStatistics.vue';
import StringSummaryStatistics from './StringSummaryStatistics.vue';
import BaseSelect from '../BaseSelect.vue';

export default {
  components: {
    NumberSummaryStatistics,
    FactorSummaryStatistics,
    StringSummaryStatistics,
    SideHeadersTable,
    BaseSelect,
  },

  props: {
    columnName: {
      type: String,
      required: false,
    },
    columnType: {
      type: String,
      required: false,
    },
    column: {
      type: Array,
      required: false,
    },
  },

  data() {
    return {
      componentByType: {
        number: 'NumberSummaryStatistics',
        factor: 'FactorSummaryStatistics',
        string: 'StringSummaryStatistics',
      },
      typesForSelect: [],
    };
  },

  computed: {
    currentComponent() {
      return this.componentByType[this.columnType];
    },

    columnEmptyStringFiltered() {
      return this.column.filter((val) => val !== '');
    },

    columnCounts() {
      const counts = {};
      counts.count = this.column.filter((val) => val !== '').length;
      counts.NaNs = this.column.filter((val) => val === '').length;
      return Object.entries(counts);
    },
  },
};
</script>
