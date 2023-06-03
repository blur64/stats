<template>
  <div>
    <input type="file" @input="readFile" />
    <base-table :headers="headers" :rows="rows" />
  </div>
</template>

<script>
import BaseTable from '@/components/BaseTable.vue';
import CSVParser from '@/CSVParser.js';

export default {
  components: {
    BaseTable,
  },

  data() {
    return {
      headers: [],
      rows: [],
    };
  },

  methods: {
    readFile(e) {
      const file = e.target.files[0];
      const reader = new FileReader();

      reader.readAsText(file);

      reader.onload = () => {
        const result = CSVParser.toArrays(reader.result);
        this.headers = result[0];
        this.rows = result.slice(1, result.length);
      };
    },
  },
};
</script>
