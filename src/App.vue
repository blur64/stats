<template>
  <div class="container-fluid h-100">
    <div v-if="tablesAreLoaded" class="row h-100">
      <the-sidebar class="col-2 border-end px-3" />
      <router-view class="col-10 px-3" />
    </div>
    <div v-else>Загрузка...</div>
  </div>
</template>

<script>
import TheSidebar from './components/TheSidebar.vue';

import { fetchTables } from './api.js';
import { addTable } from './tables/tablesList.js';

export default {
  name: 'App',
  components: { TheSidebar },
  data() {
    return { tablesAreLoaded: false };
  },
  created() {
    fetchTables().then((tables) => {
      tables.forEach((table) =>
        addTable({
          name: table.name,
          headers: table.headers,
          rows: table.rows,
          id: table.id,
        })
      );

      this.tablesAreLoaded = true;
    });
  },
};
</script>

<style>
@font-face {
  font-family: 'Zen Maru Gothic';
  src: local('Zen Maru Gothic'),
    url('@/assets/fonts/ZenMaruGothic-Light.ttf') format('ttf'),
    url('@/assets/fonts/ZenMaruGothic-Light.woff') format('woff');
  font-weight: 300;
}

@font-face {
  font-family: 'Zen Maru Gothic';
  src: local('Zen Maru Gothic'),
    url('@/assets/fonts/ZenMaruGothic-Regular.ttf') format('ttf'),
    url('@/assets/fonts/ZenMaruGothic-Regular.woff') format('woff');
  font-weight: 400;
}

@font-face {
  font-family: 'Zen Maru Gothic';
  src: local('Zen Maru Gothic'),
    url('@/assets/fonts/ZenMaruGothic-Medium.ttf') format('ttf'),
    url('@/assets/fonts/ZenMaruGothic-Medium.woff') format('woff');
  font-weight: 500;
}

@font-face {
  font-family: 'Zen Maru Gothic';
  src: local('Zen Maru Gothic'),
    url('@/assets/fonts/ZenMaruGothic-Bold.ttf') format('ttf'),
    url('@/assets/fonts/ZenMaruGothic-Bold.woff') format('woff');
  font-weight: 700;
}

@font-face {
  font-family: 'Zen Maru Gothic';
  src: local('Zen Maru Gothic'),
    url('@/assets/fonts/ZenMaruGothic-Black.ttf') format('ttf'),
    url('@/assets/fonts/ZenMaruGothic-Black.woff') format('woff');
  font-weight: 900;
}

body {
  font-family: 'Zen Maru Gothic', sans-serif;
  height: 100vh;
}

#app {
  height: 100%;
}
</style>
