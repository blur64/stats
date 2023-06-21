<template>
  <div class="d-flex align-items-center">
    <side-headers-table :records="numbersStatisticsRounded" class="col-1" />
    <div class="col-1"></div>
    <div id="histogram-wrapper" class="col-5"></div>
    <div id="box-plot-wrapper" class="col-5"></div>
  </div>
</template>

<script>
import SideHeadersTable from '../SideHeadersTable.vue';

import { jStat } from 'jstat';
import Plotly from 'plotly.js-dist';

export default {
  components: { SideHeadersTable },

  props: {
    column: {
      type: Array,
      required: true,
    },
  },

  computed: {
    numbersStatistics() {
      const numStats = {};

      numStats.mean = jStat.mean(this.column);
      const mode = jStat.mode(this.column);
      numStats.median = jStat.median(this.column);

      if (!Array.isArray(mode)) {
        numStats.mode = mode;
      } else {
        numStats.mode = '-';
      }
      numStats.std = jStat.stdev(this.column);
      numStats.min = jStat.min(this.column);

      let [perc25, perc50, perc75] = jStat.quartiles(this.column);
      numStats['25%'] = perc25;
      numStats['50%'] = perc50;
      numStats['75%'] = perc75;

      numStats.max = jStat.max(this.column);

      return Object.entries(numStats);
    },

    numbersStatisticsRounded() {
      return this.numbersStatistics.map(([_, statistic]) => {
        const isMoreThanTwoSignsAfterComa = !(
          parseInt(statistic * 100) ===
          statistic * 100
        );

        if (isMoreThanTwoSignsAfterComa && statistic !== '-') {
          return [_, +(+statistic).toFixed(2)];
        }

        return [_, statistic];
      });
    },
  },

  mounted() {
    const histData = [
      {
        x: this.column,
        type: 'histogram',
        marker: {
          color: 'grey',
        },
      },
    ];

    const boxData = [
      {
        x: this.column,
        type: 'box',
        marker: {
          color: 'green',
        },
      },
    ];

    Plotly.newPlot('histogram-wrapper', histData);
    Plotly.newPlot('box-plot-wrapper', boxData);
  },
};
</script>
