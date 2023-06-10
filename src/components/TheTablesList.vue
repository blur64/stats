<template>
  <div>
    <div class="d-flex">
      <tables-list-item
        v-for="tableData of tablesData"
        :key="tableData.id"
        :tableId="tableData.id"
        :tableName="tableData.name"
        @click="(tableId) => $emit('tableSelected', tableId)"
        class="me-2"
      />
    </div>
    <div class="px-3 mt-3 mb-3">
      <label for="fileInput" class="form-label">Добавить таблицу</label>
      <input
        class="form-control"
        type="file"
        id="fileInput"
        @input="readFile"
      />
    </div>
  </div>
</template>

<script>
import TablesListItem from './TablesListItem.vue';

import CSVParser from '../CSVParser.js';
import { addTable } from '../tables/tablesList.js';

export default {
  components: {
    TablesListItem,
  },

  emits: {
    tableSelected: (id) => typeof id === 'number',
    newTableAdded: null,
  },

  props: {
    tablesData: {
      type: Array,
      required: true,
    },
  },

  methods: {
    readFile(e) {
      const file = e.target.files[0];
      const reader = new FileReader();

      reader.readAsText(file);

      reader.onload = () => {
        const result = CSVParser.toArrays(reader.result);
        const headers = result[0];
        const rows = result.slice(1);
        addTable({ headers, rows, name: 'test', id: 3 });
        this.$emit('newTableAdded');
      };
    },
  },
};
</script>
