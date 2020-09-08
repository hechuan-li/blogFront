<template>
  <div class="home">
    <div class="wrapper">
      <div class="main">
        <blog-list></blog-list>
      </div>
    </div>

  </div>
</template>

<script>
import BlogList from '../components/BlogList'
  export default {
    components:{
      BlogList
    }
  }
</script>

<style lang="less" scoped>
.main {
  margin:0 20px;
  padding: 20px;
  
}
</style>