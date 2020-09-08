<template>
  <div class="container">
    <CommonHeader></CommonHeader>
    <router-view></router-view>
    <CommonFooter></CommonFooter>
  </div>
</template>

<script>
import CommonHeader from './CommonHeader'
import CommonFooter from './commonFooter'
export default {
  components:{
    CommonHeader,
    CommonFooter
  }
}
</script>

<!-- Add "scoped" attribute to limit CSS to this component only -->
<style scoped lang="less">
.container{
  margin-top: 80px;
  position: relative;
  overflow: hidden;
}

footer{
  position: fixed;
  bottom: 0;
  left: 0;
  z-index: 99;
  margin-top: 80px;
  padding: 15px 0;
  width: 100%;
  color: #bbb;
  background-color: rgba(10, 8, 8,0.1);
  box-shadow: 0 -2px 4px 1px rgba(0, 0, 0, 0,0.5);
}
</style>
