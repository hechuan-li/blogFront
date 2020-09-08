<template>
  <div class="detail">
    <div class="wrapper">
      <div class="title">
        <h1>{{ this.article.title }}</h1>
      </div>
      
        <span class="author"><i class="el-icon-user-solid">    Author: {{this.authInfo.nickname}}</i></span>
      
      <div class="currentDate">
        <span class="date"
          ><i class="el-icon-time">  {{   this.article.publish_date }}</i></span
        >
      </div>
      <div class="content">
        <mavon-editor
          v-model="article.content"
          defaultOpen="preview"
          :toolbarsFlag="false"
          :subfield="false"
        />

        <div class="comment">
          <Comment></Comment>
        </div>
      </div>
    </div>
  </div>
</template>

<script>
import Comment from "../components/Comment";

export default {
  components: {
    Comment
  },
  data() {
    return {
      article: {
        title:'',
        content:'',
        publish_date:'',
        user_id: Number
      },
      authInfo:{
        username:'',
        nickname:''
      }
    };
  },
  methods: {
    async getBlogDetail() {
      let detailInfo = await this.$axios.get("/api/article/detail", {
        params: {
          article_id: this.$route.params.id
        }
      })
      this.article = detailInfo.data.article
      let authInfo =  await this.$axios.get('/api/users/authorInfo',{params:{id:this.article.user_id}})
     
      this.authInfo = authInfo.data.list
    }
  },
  created() {
    this.getBlogDetail();
  }
};
</script>

<style lang="less" scoped>
.detail {
  color: #000;

  .title {
    h1 {
      font-size: 28px;
      font-weight: 500;
      margin-top: 20px;
    }
  }
  .author{
    padding-top: 30px;
    display: block;
    i{
      font-weight: bold;
    }
  }
  .currentDate {
    margin: 40px;
    color: #614e4e;
  }
  .content {
    margin: 10px 20px;
  }
}

</style>