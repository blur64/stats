<template>
  <div :style="{ minWidth: minWidth + 'px', width: '100%' }">
    <div class="d-flex align-items-center">
      <div>
        <base-select :optionsData="typesForSelect" v-model="graphType" />
      </div>
      <div>sort <input type="checkbox" v-model="isSort" /></div>
    </div>
    <div>
      <base-graph
        :x="sortedXY.x"
        :y="sortedXY.y"
        :graphId="`graph-${graphIndex}`"
        :graphType="this.graphType"
        :yaxisTitle="graphData.yaxis"
        :xaxisTitle="graphData.xaxis"
        :color="graphData.color"
      />
    </div>
  </div>
</template>

<script>
import BaseGraph from './BaseGraph.vue';
import BaseSelect from './BaseSelect.vue';

export default {
  components: {
    BaseSelect,
    BaseGraph,
  },

  props: {
    minWidth: {
      type: Number,
    },
    graphData: {
      type: Object,
      required: true,
    },
    graphIndex: {
      type: Number,
      required: true,
    },
  },

  data() {
    return {
      graphType: 'bar',
      isSort: false,
      typesForSelect: [
        { value: 'bar', title: 'bar' },
        { value: 'line', title: 'line' },
        { value: 'pie', title: 'pie' },
      ],
    };
  },

  computed: {
    sortedXY() {
      if (!this.isSort) {
        return {
          x: this.graphData.x,
          y: this.graphData.y,
        };
      } else {
        const arrayToSort = [];
        for (let i = 0; i < this.graphData.x.length; i++) {
          arrayToSort.push({ x: this.graphData.x[i], y: this.graphData.y[i] });
        }
        arrayToSort.sort((a, b) => a.y < b.y);

        return {
          x: arrayToSort.map((item) => item.x),
          y: arrayToSort.map((item) => item.y),
        };
      }
    },
  },
};
</script>
