<template>
  <div>
    <page-header :title="'Таблицы'" />
    <the-tables-list
      :tablesData="tablesData"
      :activeTableId="activeTable?.id"
      @tableSelected="changeActiveTable"
      @newTableAdded="refreshTableList"
      @tableIsAboutToDelete="askUserBeforeDelete"
      @tableIsAboutToRename="askUserToWriteNewName"
      @tableIsAboutToDownload="prepareTableTodownload"
    />
    <the-table-info v-if="activeTable" :table="activeTable" />
    <confirm-modal
      v-if="userQuestionBeforeDeleteTable"
      :confirmText="userQuestionBeforeDeleteTable"
      @userAnswered="checkUserAnswerAboutTableDeleting"
      class="confirm-modal-position position-fixed top-50 start-50 translate-middle"
    />
    <div
      v-if="userQuestionBeforeDeleteTable || userTextBeforeRenamingTable"
      class="shadow bg-black bg-opacity-90 position-fixed top-50 start-50 translate-middle"
    ></div>
    <confirm-modal
      v-if="userTextBeforeRenamingTable"
      :confirmText="userTextBeforeRenamingTable"
      class="confirm-modal-position position-fixed top-50 start-50 translate-middle"
      @userAnswered="checkUserAnswerAboutTableRenaming"
    >
      <input
        v-model="newNameForTable"
        class="form-control mt-4"
        type="text"
        placeholder="Название..."
      />
    </confirm-modal>
  </div>
</template>

<script>
import PageHeader from '../components/PageHeader.vue';
import TheTablesList from '../components/TheTablesList.vue';
import TheTableInfo from '../components/TheTableInfo.vue';
import ConfirmModal from '../components/ConfirmModal.vue';

import CSVParser from '../CSVParser.js';
import { deleteTableRequest, renameTableRequest } from '../api.js';

import {
  getTablesNamesAndIds,
  getTable,
  areTablesLoaded,
  subscribeToTablesLoadedState,
  deleteTableFromList,
} from '../tables/tablesList.js';

export default {
  components: {
    PageHeader,
    TheTablesList,
    TheTableInfo,
    ConfirmModal,
  },

  data() {
    return {
      tablesData: [],
      activeTable: null,
      userQuestionBeforeDeleteTable: '',
      deletingTableId: '',
      userTextBeforeRenamingTable: '',
      renamingTableId: '',
      newNameForTable: '',
    };
  },

  methods: {
    prepareTableTodownload(tableId) {
      const activeTableNoProxy = getTable(tableId);
      const tableDataForFormatToCsv = [
        activeTableNoProxy.headers,
        ...activeTableNoProxy.rows,
      ];

      const csvFormattedTableText = CSVParser.fromArrays(
        tableDataForFormatToCsv
      );

      const fileName = activeTableNoProxy.name.endsWith('.csv')
        ? activeTableNoProxy.name
        : `${activeTableNoProxy.name}.csv`;

      this.download(fileName, csvFormattedTableText);
    },

    download(filename, text) {
      const pom = document.createElement('a');
      pom.setAttribute(
        'href',
        'data:text/plain;charset=utf-8,' + encodeURIComponent(text)
      );
      pom.setAttribute('download', filename);

      if (document.createEvent) {
        const event = document.createEvent('MouseEvents');
        event.initEvent('click', true, true);
        pom.dispatchEvent(event);
      } else {
        pom.click();
      }
    },

    renameTable(tableId, newName) {
      renameTableRequest(tableId, newName).then((renamedTableData) => {
        getTable(renamedTableData.id).name = renamedTableData.name;
        this.setTablesData();
      });
    },

    askUserToWriteNewName(tableId) {
      const renamingTableName = this.getTableName(tableId);
      this.userTextBeforeRenamingTable = `Введите новое название для таблицы ${renamingTableName}`;
      this.renamingTableId = tableId;
    },

    checkUserAnswerAboutTableRenaming(isRenameApproved) {
      if (isRenameApproved) {
        this.renameTable(this.renamingTableId, this.newNameForTable);
      }

      this.userTextBeforeRenamingTable = '';
      this.renamingTableId = '';
    },

    checkUserAnswerAboutTableDeleting(isDeleteApproved) {
      if (isDeleteApproved) {
        this.deleteTable(this.deletingTableId);
      }

      this.userQuestionBeforeDeleteTable = '';
      this.deletingTableId = '';
    },

    askUserBeforeDelete(tableId) {
      const deletingTableName = this.getTableName(tableId);
      this.userQuestionBeforeDeleteTable = `Вы действительно хотите удалить таблицу ${deletingTableName}?`;
      this.deletingTableId = tableId;
    },

    getTableName(tableId) {
      return this.tablesData.find((tableData) => tableData.id === tableId).name;
    },

    deleteTable(tableId) {
      deleteTableRequest(tableId).then((deletedFromServerTable) => {
        const deletedFromServerTableId = deletedFromServerTable._id;
        deleteTableFromList(deletedFromServerTableId);
        this.setTablesData();
        this.changeActiveTable(null);
      });
    },

    changeActiveTable(tableId) {
      if (!tableId) {
        this.activeTable = null;
      } else {
        this.activeTable = getTable(tableId);
      }
    },

    refreshTableList() {
      this.tablesData = getTablesNamesAndIds();
    },

    setTablesData() {
      const tablesNamesAndIds = getTablesNamesAndIds();
      tablesNamesAndIds.forEach(
        (tableNameAndIdEntry) => (tableNameAndIdEntry.isActive = false)
      );
      this.tablesData = tablesNamesAndIds;
    },
  },

  created() {
    if (areTablesLoaded) {
      this.setTablesData();
    } else {
      subscribeToTablesLoadedState(this.setTablesData);
    }
  },
};
</script>

<style scoped>
.shadow {
  width: 100vw;
  height: 100vh;
  z-index: 1;
}

.bg-opacity-90 {
  opacity: 0.9;
}

.confirm-modal-position {
  z-index: 2;
}
</style>
