<template>
  <div>
    <div>Размах: {{ min }} - {{ max }}</div>
    <div>Среднее значение: {{ mean }}</div>
    <div>Медиана: {{ median }}</div>
    <div>Мода: {{ mode }}</div>
    <div>Дисперсия выборки: {{ variance }}</div>
  </div>
</template>

<script>
import { jStat } from 'jstat';

export default {
  props: {
    vector: {
      type: Array,
      required: true,
    },
  },

  computed: {
    min() {
      return jStat.min(this.vector);
    },
    max() {
      return jStat.max(this.vector);
    },
    mean() {
      return jStat.mean(this.vector);
    },
    median() {
      return jStat.median(this.vector);
    },
    mode() {
      const mode = jStat.mode(this.vector);
      return Array.isArray(mode) ? '-' : mode;
    },
    variance() {
      return jStat.variance(this.vector, true);
    },
  },
};
</script>
