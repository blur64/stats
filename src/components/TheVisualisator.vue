<template>
  <div class="mb-4">
    <div>
      <button
        v-if="dataToVisualise"
        @click="isChained = !isChained"
        class="btn border ms-3 mb-4 bg-warning chain-graphs-btn"
      >
        {{ isChained ? 'Разьединить графики' : 'Объединить графики' }}
      </button>
    </div>
    <div
      v-if="!isChained"
      class="d-flex graphs-wrapper ps-2"
      ref="graphWrapper"
    >
      <!-- <div v-for="(data, index) of dataForGraph" :key="index"> -->
      <base-graph-with-type-change
        v-for="(data, index) of dataForGraph"
        :key="index"
        :graphData="data"
        :graphIndex="index"
        :minWidth="minWidth"
      />
      <!-- </div> -->
    </div>
    <div v-else>
      <multiple-graph :graphDatas="dataForMultipleGraph" />
    </div>
  </div>
</template>

<script>
import MultipleGraph from './MultipleGraph.vue';
import BaseGraphWithTypeChange from './BaseGraphWithTypeChange.vue';

export default {
  components: {
    MultipleGraph,
    BaseGraphWithTypeChange,
  },

  props: {
    dataToVisualise: {
      type: Array,
      required: false,
    },
  },

  data() {
    return {
      colors: ['#37AFFF', '#FFCE5D', '#FF6687', '#4ED9D9'],
      isChained: false,
      graphType: '',
    };
  },

  computed: {
    dataForGraph() {
      if (!this.dataToVisualise) {
        return [];
      }
      return this.dataToVisualise.map((data, index) => {
        let colorIndex = index;
        while (!(0 <= colorIndex && colorIndex < this.colors.length)) {
          colorIndex -= this.colors.length;
        }
        data.color = this.colors[colorIndex];
        return data;
      });
    },
    dataForMultipleGraph() {
      return this.dataToVisualise.map((data) => {
        return {
          x: data.x,
          y: data.y,
          type: 'bar',
          name: data.yaxis,
        };
      });
    },
  },

  mounted() {
    this.minWidth = this.$refs.graphWrapper.clientWidth / 2;
  },
};
</script>

<style scoped>
.graphs-wrapper {
  overflow-x: auto;
}

.chain-graphs-btn {
  --bs-bg-opacity: 0.5;
}

.chain-graphs-btn:hover {
  --bs-bg-opacity: 0.75;
}
</style>
