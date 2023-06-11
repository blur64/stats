<template>
  <div>
    <side-headers-table :records="numbersStatisticsRounded" />
  </div>
</template>

<script>
import SideHeadersTable from '../SideHeadersTable.vue';

import { jStat } from 'jstat';

export default {
  components: { SideHeadersTable },

  props: {
    column: {
      type: Array,
      required: true,
    },
  },

  computed: {
    columnFiltered() {
      return this.column.filter((value) => value !== '' && !isNaN(value));
    },

    numbersStatistics() {
      const numStats = {};
      console.log(this.columnFiltered);
      numStats.count = this.columnFiltered.length;
      // numStats.NaN;
      numStats.mean = jStat.mean(this.columnFiltered);
      const mode = jStat.mode(this.columnFiltered);

      if (!Array.isArray(mode)) {
        numStats.mode = mode;
      } else {
        numStats.mode = '-';
      }
      numStats.std = jStat.stdev(this.columnFiltered);
      numStats.min = jStat.min(this.columnFiltered);

      let [perc25, perc50, perc75] = jStat.quartiles(this.columnFiltered);
      numStats['25%'] = perc25;
      numStats['50%'] = perc50;
      numStats['75%'] = perc75;

      numStats.max = jStat.max(this.columnFiltered);

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
};
</script>
