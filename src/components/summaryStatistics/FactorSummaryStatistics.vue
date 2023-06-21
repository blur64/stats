<template>
  <div class="d-flex align-items-center">
    <two-axis-headers-table
      :rows="counts"
      :topHeaders="['count']"
      :sideHeaders="uniqueColumnItems"
      class="col-1"
    />
    <div
      class="col-8 ms-5"
      :style="{ height: uniqueColumnItems.length > 10 ? '500px' : '300px' }"
    >
      <!-- <Pie id="my-chart-id" :options="chartOptions" :data="chartData" /> -->
      <div id="myDiv"></div>
    </div>
    <!-- <Bar id="my-chart-id" :options="chartOptions" :data="chartData" /> -->
  </div>
</template>

<script>
import TwoAxisHeadersTable from '../TwoAxisHeadersTable.vue';
// import { Chart as ChartJS, ArcElement, Tooltip, Legend } from 'chart.js';
// import { Pie } from 'vue-chartjs';

// ChartJS.register(ArcElement, Tooltip, Legend);
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
    // chartData() {
    //   return {
    //     labels: this.uniqueColumnItems,
    //     datasets: [
    //       {
    //         data: this.counts,
    //         backgroundColor: '#9BD0F5',
    //         color: true,
    //       },
    //     ],
    //   };
    // },

    // columnFiltered() {
    //   return this.column.filter((value) => value !== '');
    // },

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

  mounted() {
    const y = this.counts.map((item) => item[0]);
    const plotlyData = [
      {
        x: this.uniqueColumnItems,
        y: y,
        type: 'bar',
      },
    ];

    Plotly.newPlot('myDiv', plotlyData);
  },
};
</script>
