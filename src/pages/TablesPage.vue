<template>
  <div>
    <input type="file" @input="readFile" />
    <base-table :headers="headers" :rows="rows" />
    <vector-summary-statistics :vector="some" />
  </div>
</template>

<script>
import BaseTable from '@/components/BaseTable.vue';
import VectorSummaryStatistics from '@/components/VectorSummaryStatistics.vue';
// ColumnStatistics
// import CSVParser from '@/CSVParser.js';

export default {
  components: {
    BaseTable,
    VectorSummaryStatistics,
  },

  props: {
    dataset: {
      type: Array,
      required: false,
      default: () => [],
    },
  },

  data() {
    return {
      some: [123, 42, 23, 2],
    };
  },

  computed: {
    headers() {
      return this.dataset[0];
    },
    rows() {
      return this.dataset.slice(1, this.dataset.length);
    },
  },

  methods: {
    readFile(e) {
      const file = e.target.files[0];
      const reader = new FileReader();

      reader.readAsText(file);

      reader.onload = () => {
        // const result = CSVParser.toArrays(reader.result)
      };
    },
  },
};
</script>
