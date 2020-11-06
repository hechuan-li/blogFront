<template>
  <div class="edit_wrap wrapper">
    <div class="backBtn">
      <el-button type="success" @click="goBack" size="mini">Back</el-button>
    </div>
    <div class="edit_title">title:</div>
    <el-input
      v-model="article_title"
      placeholder="please edit the article title"
    ></el-input>
    <div class="edit_title">article content:</div>
    <div class="markdown">
      <mavon-editor v-model="article_content" />
    </div>
    <div class="save_btn">
      <el-button type="success" size="small" @click="save">save</el-button>
    </div>
  </div>
</template>

<script>
export default {
  data() {
    return {
      article_title: "",
      article_content: ""
    };
  },
  methods: {
    goBack() {
      this.$router.go(-1);
    },
    save() {
      if (this.$route.params.id === "0") {
        this.$axios
          .post("/api/article/add", {
            title: this.article_title,
            content: this.article_content,
            user: sessionStorage.getItem("username")
          })
          .then(value => {
            if (value.data.code === 0) {
              this.$message({
                message: "update success",
                type: "success"
              });
            }
            setTimeout(() => {
              this.$router.push("/blog");
            }, 1000);
          });
      }else {
        this.$axios.post('/api/article/update',{
          params:{
            article_id:this.$route.params.id,
            title: this.article_title,
            content: this.article_content
          }
        }).then(res=>{
          console.error(res);
        })
      }
    },
    getDetail() {
      this.$axios
        .get("/api/article/detail", {
          params: { article_id: this.$route.params.id }
        })
        .then(res => {
          this.article_title = res.data.article.title;
          this.article_content = res.data.article.content;
        });
    }
  },
  created() {
    if (this.$route.params.id !== "0") {
      this.getDetail();
    }
  }
};
</script>

<style lang="less" scoped>
.edit_wrap {
  margin: 30px auto;
  background: #fff;
  font-size: 16px;
  padding: 40px;
  .backBtn {
    text-align: right;
    margin-bottom: 40px;
  }
  .edit_title {
    text-align: left;
    font-weight: 700;
    margin: 30px 0;
  }
  .save_btn {
    text-align: right;
    margin: 40px 0;
  }
}
</style>