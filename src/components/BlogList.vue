<template>
  <div class="list ">
    <div class="container-pc" v-if="this.screen === 'pc'">
      <div
        class="card"
        v-for="item in article"
        :key="item.id"
        @click="handleClick(item.id)"
      >
        <p class="title">{{ item.title }}</p>
        <p class="date">{{ item.publish_date }}</p>
        <p class="content">{{ item.content }}</p>
      </div>
    </div>
    <div class="container-mobile" v-else>
      <ul class="infinite-list" v-infinite-scroll="load" style="overflow:auto">
        <li
          v-for="item in article"
          class="infinite-list-item "
          :key="item.id"
          @click="handleClick(item.id)"
        >
          <el-card class="box-card">
            <div slot="header" class="clearfix">
              <p class="box-card-title">{{ item.title }}</p>
              <span>{{ item.publish_date }}</span>
            </div>
            <div class="text item">
              <p>{{ item.content }}</p>
            </div>
          </el-card>
        </li>
      </ul>
    </div>
  </div>
</template>

<script>
export default {
  data: function() {
    return {
      article: [],
      count: 0,
      screen: ""
    };
  },
  methods: {
    handleClick(id) {
      this.$router.push("/detail/" + id);
    },
    getAllArticle() {
      this.$axios.get("/api/article/allArticle").then(value => {
        if (value.data.code === 0) {
          this.article = value.data.list;
          console.log(this.article);
        }
      });
    },
    load() {
      this.count += 2;
    }
  },
  computed: {
    getCurrentScreen() {
      return this.$store.state.screen;
    }
  },
  watch: {
    getCurrentScreen(val) {
      this.screen = val;
    }
  },
  created() {
    this.getAllArticle();
    this.screen = this.$store.state.screen;
  }
};
</script>

<style lang="less" scoped>
.list {
  .card {
    padding-bottom: 20px;
    margin-top: 15px;
    text-align: left;
    border-bottom: 1px solid #eee;

    .title {
      font-size: 26px;
      color: #0085a1;
      font-weight: 600;
    }
    .date {
      font-style: italic;
      font-family: Lora, "Times New Roman", serif;
      color: #808080;
      margin-top: 10px;
    }
    .content {
      width: 90%;
      display: inline-block;
      height: 60px;
      overflow: hidden;
      white-space: normal;
      text-overflow: ellipsis;
    }
  }
}
.container-mobile {
  .infinite-list-item {
    width: 100%;
    height: 100%;
    z-index: 99;
    margin-bottom: 15px;
    .box-card {
      height: 60%;
      overflow: hidden;
      white-space: nowrap;
      text-overflow: ellipsis;

      &-title {
        font-size: 16px;
        color: #0085a1;
        font-weight: 600;
      }
      .text {
        height: 100px;
        p {
          width: 80%;
          height: 85%;
          font-size: 12px;
          margin: 0px auto;
          overflow: hidden;
          white-space: break-spaces;
          text-overflow: ellipsis;
        }
      }
    }
  }
}
@media (max-width: 480px) {
  .box-card-title {
    font-size: 12px;
  }
}
</style>