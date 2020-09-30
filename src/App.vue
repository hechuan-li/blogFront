<template>
  <div id="app">
    <router-view />
  </div>
</template>

<script>
export default {
  methods: {
    _isMobile() {
      let flag = navigator.userAgent.match(
        /(phone|pad|pod|iPhone|iPod|ios|iPad|Android|Mobile|BlackBerry|IEMobile|MQQBrowser|JUC|Fennec|wOSBrowser|BrowserNG|WebOS|Symbian|Windows Phone)/i
      );
      return flag;
    }
  },
  mounted() {
    if (this._isMobile()) {
      this.$router.replace("/mobile");
    } else {
      this.$router.replace("/");
    }
  }
};
</script>

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
