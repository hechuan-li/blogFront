<template>
  <div id="app">
    <router-view v-if="isRouterAlive"/>
  </div>
</template>

<script>
export default {
  provide () {
    return {
      reload: this.reload
    }
  },
   data () {
    return {
      isRouterAlive: true
    }
  },
  methods: {
    _isMobile() {
      let flag = navigator.userAgent.match(
        /(phone|pad|pod|iPhone|iPod|ios|iPad|Android|Mobile|BlackBerry|IEMobile|MQQBrowser|JUC|Fennec|wOSBrowser|BrowserNG|WebOS|Symbian|Windows Phone)/i
      );
      return flag;
    },
    getDevice(currentWidth) {
      if (currentWidth >= 750) {
        this.screen = "pc";
        this.$store.commit("setScreen", "pc");
      } else if (currentWidth < 750) {
        this.screen = "mobile";
        this.$store.commit("setScreen", "mobile");
      }
    },
    getWidth() {
      this.getDevice(document.body.clientWidth);
    },
    getResize() {
      window.addEventListener("resize", e => {
        this.getDevice(e.target.document.body.clientWidth);
      });
    },
    reload () {
      this.isRouterAlive = false
      this.$nextTick(function () {
        this.isRouterAlive = true
      })
    }
  },
  created() {
    this.screen = document.body.clientWidth;
    this.getWidth();
    this.getResize();
    this.$store.commit("setScreen", this.screen);
  }
};
</script>

<style lang="less">
#app {
  position: fixed;
  top: 0;
  left: 0;
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
