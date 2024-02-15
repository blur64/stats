<template>
  <div>
    <div v-if="tablesData.length" class="d-flex">
      <tables-list-item
        v-for="tableData of tablesData"
        :key="tableData.id"
        :tableId="tableData.id"
        :tableName="tableData.name"
        :isActive="activeTableId === tableData.id ? true : false"
        @click="(tableId) => $emit('tableSelected', tableId)"
        class="me-2"
      />
    </div>
    <div v-else class="ms-3 mb-5 pt-5">Пусто :с</div>
    <label for="fileInput" class="form-label d-inline-block ms-3 mt-4"
      >Добавить таблицу:</label
    >
    <div class="px-3 mb-4 d-flex align-items-center">
      <input
        class="form-control w-25"
        type="file"
        id="fileInput"
        @input="readFile"
      />
      <button
        v-if="activeTableId"
        class="delete-table-btn btn border bg-danger ms-3"
        @click="$emit('tableIsAboutToDelete', activeTableId)"
      >
        <i class="bi bi-trash3"></i> Удалить таблицу
      </button>
      <button
        v-if="activeTableId"
        class="rename-table-btn btn border bg-info ms-3"
        @click="$emit('tableIsAboutToRename', activeTableId)"
      >
        <i class="bi bi-pencil"></i> Переименовать таблицу
      </button>
      <button
        v-if="activeTableId"
        class="download-table-btn btn border bg-teal ms-3"
        @click="$emit('tableIsAboutToDownload', activeTableId)"
      >
        <i class="bi bi-download"></i> Скачать таблицу
      </button>
    </div>
  </div>
</template>

<script>
// Пользователь добавил таблицу -> отправляем её на сервер ->
// после её успешного добавления в бд отправляем её обратно на фронт с генерированным id ->
// добавляем эту таблицу в память на фронте -> эмитим событие "newTableAdded"
import TablesListItem from "./TablesListItem.vue";

import CSVParser from "../CSVParser.js";
import { addTable } from "../tables/tablesList.js";
import { getTypeOfColumn } from "../tables/columnTypeDefiner.js";
import { postNewTable } from "../api.js";

export default {
  components: {
    TablesListItem,
  },

  emits: {
    tableSelected: null,
    newTableAdded: null,
    tableIsAboutToDelete: null,
    tableIsAboutToRename: null,
    tableIsAboutToDownload: null,
  },

  props: {
    tablesData: {
      type: Array,
      required: true,
    },
    activeTableId: {
      type: String,
      required: false,
    },
  },

  methods: {
    readFile(e) {
      const file = e.target.files[0];
      const reader = new FileReader();
      reader.readAsText(file);

      reader.onload = () => {
        const result = CSVParser.toArrays(reader.result);

        const addedTableData = {
          name: file.name,
          headers: result[0],
          rows: result.slice(1),
          columnTypes: result[1].map((rowItem, index) => {
            if (rowItem === "") {
              let i = 2;
              let rowItemNotNaN;

              do {
                rowItemNotNaN = result[i][index];
              } while (rowItemNotNaN === "");

              return getTypeOfColumn(rowItemNotNaN);
            }

            return getTypeOfColumn(rowItem);
          }),
        };

        postNewTable(addedTableData).then((addedTableDataFromServer) => {
          addTable(addedTableDataFromServer);
          this.$emit("newTableAdded");
        });
      };
    },
  },
};
</script>

<style scoped>
.delete-table-btn,
.rename-table-btn {
  --bs-bg-opacity: 0.5;
}

.rename-table-btn:hover,
.delete-table-btn:hover {
  --bs-bg-opacity: 0.75;
}

.download-table-btn {
  background-color: rgba(32, 201, 151, 0.6);
}

.download-table-btn:hover {
  background-color: rgba(32, 201, 151, 0.9);
}
</style>
