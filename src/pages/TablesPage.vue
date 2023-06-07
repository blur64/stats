<template>
  <div>
    <!-- <input type="file" @input="readFile" />
    <base-table :headers="headers" :rows="rows" />
    <vector-summary-statistics :vector="some" /> -->
    <page-header :title="'Таблицы'" />
    <the-tables-list :tablesData="tablesData" @click="changeOpenedTable" />
    <div class="px-3 mt-3 mb-3">
      <label for="fileInput" class="form-label">Добавить таблицу</label>
      <input
        @input="readFile"
        class="form-control"
        type="file"
        id="fileInput"
      />
    </div>
    <base-table
      :headers="headers"
      :rows="rows"
      @columnClicked="columnClickHandle"
      class="ms-3"
    />
  </div>
</template>

<script>
import PageHeader from '../components/PageHeader.vue';
import TheTablesList from '../components/TheTablesList.vue';
import BaseTable from '@/components/BaseTable.vue';

import TablesManager from '../tablesManager.js';
import CSVParser from '@/CSVParser.js';
// import VectorSummaryStatistics from '@/components/VectorSummaryStatistics.vue';
// ColumnStatistics

export default {
  components: {
    PageHeader,
    TheTablesList,
    BaseTable,
    // BaseTable,
    // VectorSummaryStatistics,
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
      openedTable: {},
      tablesData: [],
      headers: [
        '',
        'head 1',
        'head long header 2',
        'head 3',
        'veryhead 4',
        'gohead 5',
      ],
      rows: [
        [
          '0',
          'adjaskdjaklsdjlaksdjlkasjdkltd 11',
          'td 12',
          'td 13',
          'td 14',
          'td 15',
        ],
        ['1', 'td 21', 'td 22', 'td 23', 'td 24', 'td 25'],
        ['2', 'td 31', 'td 32', 'td 33', 'td 34', 'td 35'],
        ['...', '...', '...', '...', '...', '...'],
        ['40212', 'td 31', 'td 32', 'td 33', 'td 34', 'td 35'],
        ['40213', 'td 31', 'td 32', 'td 33', 'td 34', 'td 35'],
      ],
    };
  },

  // computed: {
  //   headers() {
  //     return this.dataset[0];
  //   },
  //   rows() {
  //     return this.dataset.slice(1, this.dataset.length);
  //   },
  // },

  methods: {
    readFile(e) {
      const file = e.target.files[0];
      const reader = new FileReader();

      reader.readAsText(file);

      reader.onload = () => {
        const result = CSVParser.toArrays(reader.result);
        const headers = result[0];
        const rows = result.slice(1);
        TablesManager.createTable({ headers, rows, name: 'test', id: 3 });
        this.tablesData = TablesManager.getTablesData();
      };
    },

    changeOpenedTable(tableId) {
      this.openedTable = TablesManager.getTableByID(tableId);
      console.log(this.openedTable.id);
    },

    columnClickHandle(columnIndex) {
      if (!columnIndex) {
        return;
      }
      console.log(columnIndex);
    },
  },

  created() {
    this.tablesData = TablesManager.getTablesData();
  },
};
</script>
