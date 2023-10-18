<template>
  <div class="d-flex align-items-center">
    <two-axis-headers-table
      :rows="counts"
      :topHeaders="['count']"
      :sideHeaders="uniqueColumnItems"
      class="col-2"
    />
    <div
      class="col-8 ms-5"
      :style="{ height: uniqueColumnItems.length > 10 ? '500px' : '300px' }"
    >
      <div id="myDiv"></div>
    </div>
  </div>
</template>

<script>
import TwoAxisHeadersTable from '../TwoAxisHeadersTable.vue';
import Plotly from 'plotly.js-dist';
export default {
  components: {
    TwoAxisHeadersTable,
  },

  props: {
    column: {
      type: Array,
      required: true,
    },
    columnName: {
      type: String,
      required: false,
    },
  },

  data() {
    return {
      chartOptions: {
        responsive: true,
        color: true,
      },
    };
  },

  computed: {
    uniqueColumnItems() {
      const columnUniqueItems = [];

      this.column.forEach((item) => {
        if (!columnUniqueItems.includes(item)) {
          columnUniqueItems.push(item);
        }
      });

      return columnUniqueItems;
    },

    counts() {
      const counts = [];
      const columnItemsJoined = this.column.join();

      this.uniqueColumnItems.forEach((item) => {
        const regExp = new RegExp(item, 'g');
        const count = columnItemsJoined.match(regExp).length;
        counts.push([count]);
      });

      return counts;
    },
  },

  watch: {
    counts() {
      const y = this.counts.map((item) => item[0]);
      const plotlyData = [
        {
          x: this.uniqueColumnItems,
          y: y,
          type: 'bar',
        },
      ];

      Plotly.newPlot('myDiv', plotlyData, {
        margin: { t: 40 },
        yaxis: { title: { text: 'count' } },
        xaxis: { title: { text: this.columnName } },
      });
    },
  },

  mounted() {
    const y = this.counts.map((item) => item[0]);
    const plotlyData = [
      {
        x: this.uniqueColumnItems,
        y: y,
        type: 'bar',
      },
    ];

    Plotly.newPlot('myDiv', plotlyData, {
      margin: { t: 40 },
      yaxis: { title: { text: 'count' } },
      xaxis: { title: { text: this.columnName } },
    });
  },
};
</script>
