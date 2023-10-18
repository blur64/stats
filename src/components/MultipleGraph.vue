<template>
  <div><div id="multiple-graph"></div></div>
</template>

<script>
import Plotly from 'plotly.js-dist';

export default {
  props: {
    graphDatas: {
      type: Array,
      required: true,
    },
  },

  methods: {
    rePlot(graphData) {
      Plotly.newPlot(
        'multiple-graph',
        graphData,
        {
          margin: { t: 40 },
        },
        { editable: true }
      );
    },
  },

  watch: {
    graphDatas() {
      this.rePlot(this.graphDatas);
    },
  },

  mounted() {
    this.rePlot(this.graphDatas);
  },
};
</script>
