<template>
  <div class="container-fluid h-100">
    <div class="row h-100">
      <the-sidebar class="col-2 border-end" />
      <main class="col-10">
        Lorem, ipsum dolor sit amet consectetur adipisicing elit. Ullam
        doloremque voluptas ut, rem amet ipsam in quasi aspernatur totam
        reprehenderit. Iste, voluptatum. Impedit, molestiae excepturi!
      </main>
    </div>
  </div>
</template>

<script>
// import TablePage from './pages/TablePage.vue';
import TheSidebar from './components/TheSidebar.vue';

export default {
  name: 'App',
  components: { TheSidebar },
  data() {
    return {
      dataset: [],
    };
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
