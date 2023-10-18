<template>
  <div>
    <base-select
      :optionsData="columnsNamesForSelect"
      :label="'Группировать по'"
      :id="'column-select'"
      v-model="groupingColumnName"
      class="mb-3 py-4 border-bottom border-top"
    />
    <div class="d-flex align-items-center mb-4">
      <div class="align-self-stretch d-flex flex-column justify-content-around">
        <div>Функции агрегирования:</div>
        <div>Параметры функций:</div>
      </div>
      <aggregation-elem
        v-for="(_, index) of aggregationsRules"
        :key="index"
        :aggregationElemIndex="index"
        :functionParams="table.headers"
        @aggregationRuleChanged="changeAggregationRule"
        :class="{ 'border-start': index !== 0 }"
        class="px-3 py-2"
      />
      <button @click="addAggregationRule" class="ms-2 btn add-aggregation-btn">
        <i class="bi bi-plus-lg fs-4 plus-btn-icon"></i>
      </button>
    </div>
    <two-axis-headers-table
      :sideHeaders="groupingColumnCategories"
      :topHeaders="topHeadersForTwoAxisTable"
      :rows="rows"
      class="mb-5"
    />
    <base-table :rows="table.rows" :headers="table.headers" class="mb-5" />
  </div>
</template>

<script>
import BaseSelect from './BaseSelect.vue';
import BaseTable from './BaseTable.vue';
import AggregationElem from './AggregationElem.vue';
import TwoAxisHeadersTable from './TwoAxisHeadersTable.vue';

import { jStat } from 'jstat';

export default {
  components: {
    BaseSelect,
    AggregationElem,
    TwoAxisHeadersTable,
    BaseTable,
  },

  emits: {
    aggregationTableChanged: null,
  },

  props: {
    table: {
      type: Object,
      required: true,
    },
  },

  data() {
    return {
      groupingColumnName: '',
      aggregationsRules: [{ func: '', param: '' }],
    };
  },

  computed: {
    columnsNamesForSelect() {
      return this.table.headers.map((header) => {
        return { value: header, title: header };
      });
    },
    groupingColumn() {
      if (!this.groupingColumnName) {
        return [];
      }
      return this.table.getColumn(this.groupingColumnName).value;
    },
    groupingColumnCategories() {
      const uniqueItems = [];

      this.groupingColumn.forEach((item) => {
        if (!uniqueItems.includes(item) && item !== '') {
          uniqueItems.push(item);
        }
      });

      return uniqueItems;
    },
    topHeadersForTwoAxisTable() {
      return this.aggregationsRules.map((rule) => {
        if ((!rule.func || !rule.param) && rule.func !== 'count') {
          return '';
        }
        return `${rule.func}(${rule.param})`;
      });
    },
    rows() {
      const rows = [];

      this.groupingColumnCategories.forEach((category) => {
        const categoryAggregationResults = [];

        this.aggregationsRules.forEach((rule) => {
          categoryAggregationResults.push(
            this.roundNum(this.aggregate(category, rule.func, rule.param))
          );
        });

        rows.push(categoryAggregationResults);
      });

      return rows;
    },
  },

  methods: {
    roundNum(number) {
      const isMoreThanTwoSignsAfterComa = !(
        parseInt(number * 100) ===
        number * 100
      );

      if (isMoreThanTwoSignsAfterComa && number !== '-') {
        return +(+number).toFixed(2);
      }

      return number;
    },
    addAggregationRule() {
      this.aggregationsRules.push({ func: '', param: '' });
    },
    changeAggregationRule({ func, param, index }) {
      this.aggregationsRules[index] = { func, param };
    },
    getColumnIndex(columnName) {
      return this.table.headers.indexOf(columnName);
    },
    aggregate(category, aggFunc, param) {
      const categoryColumnIndex = this.getColumnIndex(this.groupingColumnName);
      const filteredRowsByCategory = this.table.rows.filter(
        (row) => row[categoryColumnIndex] === category
      );
      if (aggFunc === 'count') {
        return filteredRowsByCategory.length;
      }
      const paramIndex = this.getColumnIndex(param);
      const paramValuesOfCategory = filteredRowsByCategory
        .map((row) => row[paramIndex])
        .filter((value) => value !== '')
        .map((value) => +value);

      if (!paramValuesOfCategory.length) {
        return '-';
      }

      switch (aggFunc) {
        case 'max':
          return jStat.max(paramValuesOfCategory);
        case 'min':
          return jStat.min(paramValuesOfCategory);
        case 'avg':
          return jStat.mean(paramValuesOfCategory);
        case 'sum':
          return jStat.sum(paramValuesOfCategory);
      }
    },
  },

  watch: {
    rows() {
      this.$emit(
        'aggregationTableChanged',
        this.groupingColumnCategories,
        this.rows,
        this.topHeadersForTwoAxisTable,
        this.groupingColumnName
      );
    },
  },
};
</script>

<style scoped>
.add-aggregation-btn {
  opacity: 0.5;
}

.add-aggregation-btn:hover {
  opacity: 0.9;
}
</style>
