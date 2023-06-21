<template>
  <div>
    <base-table :rows="rowsFiltered" :headers="headers" class="mb-5" />
    <div class="mb-4">
      <button
        class="btn border me-3 rewrite-table-btn d-inline-flex align-items-center"
        @click="saveChanges"
      >
        <img
          src="../assets/imgs/floppy-disc.png"
          alt=""
          style="width: 20px"
          class="me-1"
        />
        <div>Сохранить изменения</div>
      </button>
      <button
        class="btn border bg-secondary save-table-btn"
        @click="askUserForNameOfNewTable"
      >
        <i class="bi bi-upload"></i>
        Сохранить таблицу как новую
      </button>
    </div>
    <filter-field
      v-for="(column, index) of table.columns"
      :key="index"
      :columnName="column.name"
      :columnType="column.type"
      :columnValue="column.value"
      @filterValueChanged="changeFilterArg"
      @NaNDeletingChecked="changeNaNDeleteArg"
      @NaNReplaceValueChanged="changeNaNReplaceValue"
      class="border-bottom py-3"
    />
    <div
      v-if="isModalActive"
      class="shadow bg-black bg-opacity-90 position-fixed top-50 start-50 translate-middle"
    ></div>
    <confirm-modal
      v-if="isModalActive"
      :confirmText="'Введите название для новой таблицы'"
      class="confirm-modal-position position-fixed top-50 start-50 translate-middle"
      @userAnswered="checkUserAnswerAboutNameOfNewTable"
    >
      <input
        v-model="nameForNewTable"
        class="form-control mt-4"
        type="text"
        placeholder="Название..."
      />
    </confirm-modal>
  </div>
</template>

<script>
import BaseTable from './BaseTable.vue';
import FilterField from './filterFields/FilterField.vue';
import confirmModal from './ConfirmModal.vue';

import { addTable } from '../tables/tablesList.js';
import { sendRequestToTableUpdate, postNewTable } from '../api.js';
import { updateTableRows } from '../tables/tablesList.js';

export default {
  components: {
    BaseTable,
    FilterField,
    confirmModal,
  },

  emits: {
    tableChangedOrSavedAsNew: null,
  },

  props: {
    table: {
      type: Object,
      required: true,
    },
  },

  data() {
    return {
      isModalActive: false,
      nameForNewTable: '',
      filtersArgs: {},
      NaNDeleteArgs: {},
      NaNReplaceArgs: {},
      columnTypeToFilter: {
        string: 'stringTypeFilter',
        number: 'numberTypeFilter',
        factor: 'factorTypeFilter',
      },
    };
  },

  computed: {
    rows() {
      return this.table.rows;
    },

    headers() {
      return this.table.headers;
    },

    rowsFiltered() {
      let rowsFiltered = [];

      this.rows.forEach((row) => rowsFiltered.push([...row]));

      let columnIndex = 0;

      for (let [columnName, replaceValue] of Object.entries(
        this.NaNReplaceArgs
      )) {
        columnIndex = this.headers.indexOf(columnName, 0);
        if (replaceValue !== '') {
          this.replaceNaNs({
            columnIndex,
            replaceValue,
            rows: rowsFiltered,
          });
        }
      }

      for (let [columnName, filter] of this.columnToFilter) {
        columnIndex = this.headers.indexOf(columnName, 0);
        rowsFiltered = this[filter]({
          rows: rowsFiltered,
          arg: this.filtersArgs[columnName],
          columnIndex,
        });
      }

      for (let [columnName, isDeleteNaN] of Object.entries(
        this.NaNDeleteArgs
      )) {
        columnIndex = this.headers.indexOf(columnName, 0);
        if (isDeleteNaN) {
          rowsFiltered = this.NaNFilter(rowsFiltered, columnIndex);
        }
      }

      return rowsFiltered;
    },

    columnToFilter() {
      const columnToFilter = {};

      this.table.columns.forEach(
        (column) =>
          (columnToFilter[column.name] = this.columnTypeToFilter[column.type])
      );

      return Object.entries(columnToFilter);
    },
  },

  methods: {
    checkUserAnswerAboutNameOfNewTable(isNameApproved) {
      if (isNameApproved) {
        this.saveAsNew();
      }

      this.isModalActive = false;
    },

    askUserForNameOfNewTable() {
      this.isModalActive = true;
    },

    saveChanges() {
      sendRequestToTableUpdate({
        tableId: this.table.id,
        newTableRows: this.rowsFiltered,
      }).then((updatedTableData) => {
        updateTableRows(updatedTableData._id, updatedTableData.rows);
        this.$emit('tableChangedOrSavedAsNew');
      });
    },

    saveAsNew() {
      const newTableData = {
        rows: this.rowsFiltered,
        columnTypes: this.table.getColumnTypes(),
        headers: this.table.headers,
        name: this.nameForNewTable,
        user: localStorage.getItem('userId'),
      };

      postNewTable(newTableData).then((addedTableDataFromServer) => {
        addTable(addedTableDataFromServer);
        this.$emit('tableChangedOrSavedAsNew');
      });
    },

    changeNaNReplaceValue(columnName, replaceValue) {
      this.NaNReplaceArgs[columnName] = replaceValue;
    },

    changeNaNDeleteArg(columnName, isDelete) {
      this.NaNDeleteArgs[columnName] = isDelete;
    },

    // Вызывается при эмите одного из filterField
    changeFilterArg(columnName, filterArg) {
      this.filtersArgs[columnName] = filterArg;
    },

    stringTypeFilter({ rows, arg: subString, columnIndex }) {
      if (!subString) {
        return rows;
      }
      return rows.filter((row) => row[columnIndex].includes(subString));
    },

    numberTypeFilter({ rows, arg: interval, columnIndex }) {
      if (!interval || (!interval[0] && !interval[1])) {
        return rows;
      }

      return rows.filter((row) => {
        if (row[columnIndex] === '') {
          return;
        }

        if (!interval[0] && interval[1]) {
          return row[columnIndex] <= interval[1];
        }

        if (!interval[1] && interval[0]) {
          return interval[0] <= row[columnIndex];
        }

        return (
          interval[0] <= row[columnIndex] && row[columnIndex] <= interval[1]
        );
      });
    },

    factorTypeFilter({ rows, arg: factorsToLeave, columnIndex }) {
      if (!factorsToLeave || !factorsToLeave.length) {
        return rows;
      }
      return rows.filter((row) => factorsToLeave.includes(row[columnIndex]));
    },

    NaNFilter(rows, columnIndex) {
      return rows.filter((row) => row[columnIndex] !== '');
    },

    replaceNaNs({ rows, columnIndex, replaceValue }) {
      rows.forEach((row) => {
        if (row[columnIndex] === '') {
          row[columnIndex] = replaceValue;
        }
      });
    },
  },

  watch: {
    table() {
      this.filtersArgs = {};
      this.NaNDeleteArgs = {};
      this.NaNReplaceArgs = {};

      for (let column of this.table.columns) {
        this.filtersArgs[column.name] = null;
      }

      for (let column of this.table.columns) {
        this.NaNDeleteArgs[column.name] = false;
      }

      for (let column of this.table.columns) {
        this.NaNReplaceArgs[column.name] = '';
      }
    },
  },

  created() {
    for (let column of this.table.columns) {
      this.filtersArgs[column.name] = null;
    }

    for (let column of this.table.columns) {
      this.NaNDeleteArgs[column.name] = false;
    }

    for (let column of this.table.columns) {
      this.NaNReplaceArgs[column.name] = '';
    }
  },
};
</script>

<style scoped>
.rewrite-table-btn {
  background-color: rgba(32, 201, 151, 0.6);
}

.rewrite-table-btn:hover {
  background-color: rgba(32, 201, 151, 0.9);
}

.save-table-btn {
  --bs-bg-opacity: 0.25;
}
.save-table-btn:hover {
  --bs-bg-opacity: 0.5;
}

.confirm-modal-position {
  z-index: 2;
}

.shadow {
  width: 100vw;
  height: 100vh;
  z-index: 1;
}

.bg-opacity-90 {
  opacity: 0.9;
}
</style>
