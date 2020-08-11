<template>
  <div id="app">
    <Head />
    <router-view/>
  </div>
</template>

<script>
import Head from '@/components/Head/Head.vue'

export default {
  components: {
    Head
  }
}
</script>

<style>
html {
  height: 100%;
}
body {
  margin: 0px;
  padding: 0px;
  height: 100%;
  width: 100%;
}
#app {
  font-family: 'Avenir', Helvetica, Arial, sans-serif;
  -webkit-font-smoothing: antialiased;
  -moz-osx-font-smoothing: grayscale;
  /* text-align: center; */
  color: #2c3e50;
  background-color: #f2eff0;
  min-height: 100%;
}
</style>
