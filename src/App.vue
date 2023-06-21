<template>
  <div class="container-fluid h-100">
    <div class="row h-100">
      <the-sidebar
        v-if="!($route.path === '/login' || $route.path === '/registration')"
        class="col-2 border-end px-3"
      />
      <router-view
        class="px-3"
        :class="{
          'col-10': !(
            $route.path === '/login' || $route.path === '/registration'
          ),
        }"
      />
    </div>
  </div>
</template>

<script>
import TheSidebar from './components/TheSidebar.vue';

import { fetchUserTables } from './api.js';
import { addTables, notifyTablesLoadedStateSubs } from './tables/tablesList.js';

export default {
  name: 'App',
  components: { TheSidebar },
  data() {
    return { tablesAreLoaded: false };
  },
  created() {
    const userId = localStorage.getItem('userId');

    if (!userId) {
      this.$router.push('/login');
    } else {
      fetchUserTables(userId).then((tables) => {
        addTables(tables);
        notifyTablesLoadedStateSubs();
      });
    }
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
