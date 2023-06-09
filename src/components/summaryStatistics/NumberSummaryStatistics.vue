<template>
  <div>
    <base-table :rows="numbersStatistics" />
  </div>
</template>

<script>
import BaseTable from '../BaseTable.vue';

import { jStat } from 'jstat';

export default {
  components: { BaseTable },

  props: {
    column: {
      type: Array,
      required: true,
    },
  },

  computed: {
    numbersStatistics() {
      const numStats = {};

      numStats.count = this.column.length;
      numStats.mean = jStat.mean(this.column);
      const mode = jStat.mode(this.column);

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
  },
};
</script>
