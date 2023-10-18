<template>
  <div>
    <div :id="graphId"></div>
  </div>
</template>

<script>
import Plotly from 'plotly.js-dist';

export default {
  props: {
    x: {
      type: Array,
      required: true,
    },
    y: {
      type: Array,
      required: false,
    },
    graphType: {
      type: String,
      required: true,
    },
    graphId: {
      type: String,
      required: false,
    },
    yaxisTitle: {
      type: String,
      required: false,
    },
    xaxisTitle: {
      type: String,
      required: false,
    },
    color: {
      type: String,
      required: false,
    },
  },

  computed: {
    graphData() {
      if (this.graphType === 'pie') {
        return [
          {
            values: this.y,
            labels: this.x,
            type: 'pie',
          },
        ];
      }

      return [
        {
          x: this.x,
          y: this.y,
          type: this.graphType,
          marker: {
            color: this.color,
          },
        },
      ];
    },
  },

  methods: {
    rePlot(graphData) {
      Plotly.newPlot(
        this.graphId,
        graphData,
        {
          margin: { t: 40 },
          yaxis: { title: { text: this.yaxisTitle } },
          xaxis: { title: { text: this.xaxisTitle } },
        },
        { editable: true }
      );
    },
  },

  watch: {
    graphData() {
      this.rePlot(this.graphData);
      console.log(this.color);
    },
  },

  mounted() {
    this.rePlot(this.graphData);
  },
};
</script>
