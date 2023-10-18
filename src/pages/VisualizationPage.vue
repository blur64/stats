<template>
  <div>
    <page-header :title="'Визуализация'" />
    <base-select
      :label="'Выберите таблицу'"
      :id="'table-select'"
      :optionsData="tablesNamesAndIds"
      v-model="activeTableId"
      class="px-3 mb-4"
    />
    <the-visualisator :dataToVisualise="dataToVisualise" />
    <the-aggregator
      v-if="activeTableId"
      :table="activeTable"
      class="px-3"
      @aggregationTableChanged="prepareDataToVisualise"
    />
  </div>
</template>

<script>
import PageHeader from '../components/PageHeader.vue';
import BaseSelect from '../components/BaseSelect.vue';
import TheAggregator from '../components/TheAggregator.vue';
import TheVisualisator from '../components/TheVisualisator.vue';

import {
  getTable,
  getTablesNamesAndIds,
  areTablesLoaded,
  subscribeToTablesLoadedState,
} from '../tables/tablesList.js';
import Plotly from 'plotly.js-dist';

export default {
  components: {
    PageHeader,
    BaseSelect,
    TheAggregator,
    TheVisualisator,
  },

  data() {
    return {
      tablesNamesAndIds: [],
      activeTableId: null,
      dataToVisualise: null,
    };
  },

  computed: {
    activeTable() {
      return getTable(this.activeTableId);
    },
  },

  methods: {
    changeGraphValues(x, y) {
      const plotData = [{ x: x, y: y, type: 'bar' }];
      Plotly.newPlot('myDiv', plotData);
    },

    setTablesData() {
      this.tablesNamesAndIds = getTablesNamesAndIds().map((tableData) => {
        return { value: tableData.id, title: tableData.name };
      });
    },

    prepareDataToVisualise(categories, rows, headers, xaxis) {
      const data = [];

      headers.forEach((_, index) =>
        data.push({
          x: categories,
          y: rows.map((row) => row[index]),
          yaxis: headers[index],
          xaxis,
        })
      );

      this.dataToVisualise = data;
    },
  },

  created() {
    if (areTablesLoaded) {
      this.setTablesData();
    } else {
      subscribeToTablesLoadedState(this.setTablesData);
    }
  },
};
</script>
