<template>
  <div class="spider">
    <div class="spider-main">
      <p>please go this website, and pick a noval</p>
      <el-form :inline="true" :model="formInline" class="demo-form-inline">
        <el-form-item label="URL Address">
          <el-input
            v-model="formInline.titleUrl"
            placeholder="审批人"
          ></el-input>
        </el-form-item>
        <el-form-item label="Noval Title">
          <el-input v-model="formInline.title" placeholder="审批人"></el-input>
        </el-form-item>
        <el-button @click="getNovel">submit</el-button>
        <el-button @click="getNovel"><a download="http://127.0.0.1:3000/uploads/开天录.txt">download</a></el-button>
      </el-form>
    </div>
  </div>
</template>

<script>
export default {
  data() {
    return {
      formInline: {
        titleUrl: "",
        title: ""
      }
    };
  },
  methods: {
    getNovel() {
      this.$axios.post("/api/spider/spider", this.formInline);
    }
  }
};
</script>

<style lang="scss" scoped>
</style>