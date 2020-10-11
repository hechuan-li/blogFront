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
import BlogList from "../components/BlogList";
export default {
  components: {
    BlogList
  }
};
</script>

<style lang="less" scoped>
.home {
  @media (max-width: 750px) {
    .wrapper {
      height: 80%;
      position: fixed;
      left: 50%;
      transform: translateX(-50%);
      width: 85%;
      margin: 0px auto;
      padding: 10px 0;
      color: #2d2d2d;
      border-radius: 10px;
      box-shadow: 0px 0px 30px #02ddff, 0 0 0px rgba(10, 10, 0, 0.1) inset;
      box-sizing: border-box;
      // background-color: rgba(117, 114, 114, 0.815);
      background: linear-gradient(
        90deg,
        #03a9f4,
        #f441a5,
        #ffeb3b,
        #03a9f4,
        #f441a5,
        #ffeb3b,
        #03a9f4,
        #03a9f4,
        #03a9f4
      );
      background-size: 800%;
      overflow-x: hidden;
      overflow-y: scroll;
      scrollbar-width: none;
      animation: animate 25s linear infinite normal;
    }
    @keyframes animate {
      0% {
        background-position: 0%; /*修改背景定位，实现渐变色炫光*/
      }
      30% {
        background-position: 30%;
      }
      50% {
        background-position: 50%;
      }
      75% {
        background-position: 30%;
      }
      100% {
        background-position: 0%;
      }
    }
  }
}

.main {
  margin: 0 20px;
  padding: 20px;
  position: relative;
}
</style>