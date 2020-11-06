<template>
  <div>
    <div class="wrapper">
      <div class="content">
        <h2>Article List</h2>
        <el-button
          type="primary"
          icon="el-icon-plus"
          size="small"
          @click="editArticle(0)"
          class="add_button"
          >New Add</el-button
        >
        <el-table
          :data="tableData"
          border
          style="width: 100%"
          stripe
          :row-key="tableData.id"
          class="table"
          @row-click='reviewDetail'
        >
          <el-table-column label="No" prop="id" width="50"></el-table-column>
          <el-table-column prop="publish_date" label="Date" width="200">
          </el-table-column>
          <el-table-column prop="title" label="Title" width="200">
          </el-table-column>
          <el-table-column
            prop="content"
            label="Articles"
            show-overflow-tooltip
          >
          </el-table-column>
          <el-table-column
            label="manage"
            width="150"
            min-width="120"
            align="left"
            class="manage_box"
          >
            <template slot-scope="scope">
              <el-button
                type="primary"
                icon="el-icon-edit"
                circle
                @click="editArticle(scope.row.id)"
              ></el-button>
              <el-button
                type="danger"
                icon="el-icon-delete"
                circle
                @click="delArticle(scope.row.id)"
              ></el-button>
            </template>
          </el-table-column>
        </el-table>
      </div>
    </div>
  </div>
</template>

<script>
export default {
  data() {
    return {
      tableData: []
    };
  },
  methods: {
    editArticle(id) {
      if (id === 0) {
        this.$router.push("/blog/addArticle/0");
      } else {
        this.$router.push("/blog/addArticle/" + id);
      }
    },
    delArticle(id) {
      this.$confirm("Are you sure delete this article?", "Tips", {
        confirmButtonText: "YES",
        cancelButtonText: "NO",
        type: "warning"
      })
        .then(() => {
          this.$axios
            .post("/api/article/delete", {
              article_id: id
            })
            .then(res => {
              this.$message({
                type: "success",
                message: res.data.msg
              });
              location.reload();
            });
        })
        .catch(() => {
          this.$message({
            type: "info",
            message: "已取消删除"
          });
        });
    },
    getMyArticle() {
      let user = sessionStorage.getItem("username");
      this.$axios
        .get("/api/article/myArticle", { params: { username: user } })
        .then(value => {
          this.tableData = value.data.list;
        });
    },
    reviewDetail(row){
      let id = row.id
      this.$router.push('/detail/'+id)
    }
  },
  created() {
    this.getMyArticle();
  }
};
</script>

<style lang="less" scoped>
.wrapper {
  min-height: 500px;
  .content {
    margin: 20px;
    h2 {
      font-size: 30px;
    }
    .add_button {
      float: right;
      margin: 10px 0;
    }
    .el-table {
      background-color: #ddd;
    }
  }
}
</style>