<template>
  <div id="app">
    <router-view />
  </div>
</template>

<style lang="less">
#app {
  width: 100%;
  height: 100%;
  color: #fff;
  font-family: Avenir, Helvetica, Arial, sans-serif;
  -webkit-font-smoothing: antialiased;
  -moz-osx-font-smoothing: grayscale;
  text-align: center;
  overflow: hidden;
  overflow: -moz-scrollbars-none;
  background-image: url(./assets/img/bg.gif);
}
::-webkit-scrollbar {
  width: 0 !important;
  
}
</style>
