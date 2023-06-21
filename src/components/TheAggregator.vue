<template>
  <!-- <div>
    <base-select
      :optionsData="columnsNamesForSelect"
      :label="'Группировать по'"
      :id="'column-select'"
      v-model="activeGroupByColumnName"
      class="mb-3"
    />
    <base-select
      :optionsData="aggregateFunctionsNamesForSelect"
      :label="'Функция агрегирования'"
      :id="'function-select'"
      class="mb-3"
      v-model="activeAggregateFunctionName"
    />
    <base-select
      v-if="activeAggregateFunctionName !== 'count'"
      :optionsData="columnsNamesForSelect"
      :label="'Параметр функции'"
      :id="'column-aggregate-select'"
      class="mb-3"
      v-model="activeAggregateFunctionColumnName"
    />
    <two-axis-headers-table
      :sideHeaders="uniqueColumnItems"
      :topHeaders="topHeader"
      :rows="rows"
    />
    <base-table :rows="table.rows" :headers="table.headers" class="mb-5" />
  </div> -->
  <div>
    <base-select
      :optionsData="columnsNamesForSelect"
      :label="'Группировать по'"
      :id="'column-select'"
      v-model="groupingColumnName"
      class="mb-3"
    />
    <div>
      <aggregation-elem
        v-for="(_, index) of aggregationsRules"
        :key="index"
        :aggregationElemIndex="index"
        :functionParams="table.headers"
        @aggregationRuleChanged="changeAggregationRule"
      />
      <button>Добавить</button>
    </div>
    <two-axis-headers-table />
  </div>
</template>

<script>
import BaseSelect from './BaseSelect.vue';
import AggregationElem from './AggregationElem.vue';
import TwoAxisHeadersTable from './TwoAxisHeadersTable.vue';

export default {
  components: {
    BaseSelect,
    AggregationElem,
    TwoAxisHeadersTable,
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
      return this.table.getColumn(this.groupingColumnName);
    },
    // uniqueGroupingColumnItems() {},
  },

  methods: {
    changeAggregationRule(func, param, index) {
      // Реактивность мб тут не сработает
      this.aggregationsRules[index] = { func, param };
    },
  },
};
// import BaseTable from './BaseTable.vue';
// import BaseSelect from './BaseSelect.vue';
// import TwoAxisHeadersTable from './TwoAxisHeadersTable.vue';
// import { jStat } from 'jstat';

// export default {
//   components: {
//     BaseTable,
//     BaseSelect,
//     TwoAxisHeadersTable,
//   },

//   emits: {
//     graphValuesChanged: null,
//   },

//   props: {
//     table: {
//       type: Object,
//       required: true,
//     },
//   },

//   data() {
//     return {
//       activeGroupByColumnName: '',
//       activeAggregateFunctionName: '',
//       activeAggregateFunctionColumnName: '',

//       aggregations: [],

//       aggregateFunctionsNames: ['count', 'max', 'min', 'sum', 'avg'],
//     };
//   },

//   computed: {
//     activeGroupByColumn() {
//       if (!this.activeGroupByColumnName) {
//         return [];
//       }
//       return this.table.getColumn(this.activeGroupByColumnName).value;
//     },

//     columnsNamesForSelect() {
//       return this.table.columns.map((column) => {
//         return { value: column.name, title: column.name };
//       });
//     },

//     aggregateFunctionsNamesForSelect() {
//       return this.aggregateFunctionsNames.map((name) => {
//         return { value: name, title: name };
//       });
//     },

//     uniqueColumnItems() {
//       const columnUniqueItems = [];

//       // -----
//       if (
//         this.activeGroupByColumnName &&
//         this.activeAggregateFunctionName === 'count'
//       ) {
//         this.activeGroupByColumn.forEach((item) => {
//           if (!columnUniqueItems.includes(item)) {
//             columnUniqueItems.push(item);
//           }
//         });

//         return columnUniqueItems;
//       }

//       if (
//         !this.activeGroupByColumnName ||
//         !this.activeAggregateFunctionColumnName
//       ) {
//         return columnUniqueItems;
//       }
//       // -----

//       this.activeGroupByColumn.forEach((item) => {
//         if (!columnUniqueItems.includes(item) && item !== '') {
//           columnUniqueItems.push(item);
//         }
//       });

//       return columnUniqueItems;
//     },

//     topHeader() {
//       // -----
//       if (!this.activeGroupByColumnName) {
//         return [];
//       }

//       if (this.activeAggregateFunctionName === 'count') {
//         return [`${this.activeAggregateFunctionName}`];
//       }

//       if (
//         !this.activeAggregateFunctionName ||
//         !this.activeAggregateFunctionColumnName
//       ) {
//         return [];
//       }
//       // -----

//       return [
//         `${this.activeAggregateFunctionName}(${this.activeAggregateFunctionColumnName})`,
//       ];
//     },

//     rows() {
//       const rows = [];

//       // -----
//       if (
//         this.activeGroupByColumnName &&
//         this.activeAggregateFunctionName === 'count'
//       ) {
//         this.uniqueColumnItems.forEach((category) =>
//           rows.push([this.aggregateFunc(category)])
//         );
//         return rows;
//       }

//       if (
//         !this.activeGroupByColumnName ||
//         !this.activeAggregateFunctionName ||
//         !this.activeAggregateFunctionColumnName
//       ) {
//         return [];
//       }
//       // -----

//       this.uniqueColumnItems.forEach((category) =>
//         rows.push([this.aggregateFunc(category)])
//       );

//       this.$emit(
//         'graphValuesChanged',
//         this.uniqueColumnItems,
//         rows.map((row) => row[0])
//       );

//       return rows;
//     },
//   },

//   methods: {
//     aggregateFunc(category) {
//       const activeGroupByColumnIndex = this.table.headers.indexOf(
//         this.activeGroupByColumnName
//       );

//       const filteredRows = this.table.rows.filter(
//         (row) => row[activeGroupByColumnIndex] === category
//       );

//       if (this.activeAggregateFunctionName === 'count') {
//         return filteredRows.length;
//       }

//       const activeAggregateFunctionColumnIndex = this.table.headers.indexOf(
//         this.activeAggregateFunctionColumnName
//       );

//       let valuesToAggreate = filteredRows.map(
//         (row) => row[activeAggregateFunctionColumnIndex]
//       );

//       let valuesToAggreateNaNFiltered = valuesToAggreate
//         .filter((value) => value !== '' && !isNaN(+value))
//         .map((value) => +value);

//       let result;
//       switch (this.activeAggregateFunctionName) {
//         case 'max':
//           result = jStat.max(valuesToAggreateNaNFiltered);
//           break;
//         case 'min':
//           result = jStat.min(valuesToAggreateNaNFiltered);
//           break;
//         case 'avg':
//           result = jStat.mean(valuesToAggreateNaNFiltered);
//           break;
//         case 'sum':
//           result = jStat.sum(valuesToAggreateNaNFiltered);
//           break;
//       }

//       return isNaN(result) ? '-' : this.roundNumber(result);
//     },

//     roundNumber(number) {
//       const isMoreThanTwoSignsAfterComa = !(
//         parseInt(number * 100) ===
//         number * 100
//       );

//       if (isMoreThanTwoSignsAfterComa && number !== '-') {
//         return +(+number).toFixed(2);
//       }

//       return number;
//     },
//   },
// };
//
</script>
