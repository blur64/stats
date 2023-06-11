<template>
  <div>
    <header class="border-bottom px-3 mt-4 pb-2">
      <span class="fw-bold">{{ columnName }}</span>
    </header>
    <slot></slot>
    <component :is="currentComponent" :column="column" />
  </div>
</template>

<script>
import NumberSummaryStatistics from './NumberSummaryStatistics.vue';
import FactorSummaryStatistics from './FactorSummaryStatistics.vue';
import StringSummaryStatistics from './StringSummaryStatistics.vue';
import BaseSelect from '../BaseSelect.vue';

export default {
  components: {
    NumberSummaryStatistics,
    FactorSummaryStatistics,
    StringSummaryStatistics,
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
  },
};
</script>
