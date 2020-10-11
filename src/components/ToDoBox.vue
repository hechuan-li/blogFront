<template>
  <div class="level-box">
    <p class="level-box-title"><slot></slot></p>
    <div class="level-box-wrapper">
      <div v-for="item in listInfo" :key="item.id" class="level-box-content">
        <el-collapse v-model="activeName" accordion>
          <el-collapse-item :title="item.content">
            <el-row justify="center" align="middle">
              <el-col :span="16" justify="center">
                <div class="grid-content bg-purple">
                  <el-progress
                    :text-inside="true"
                    :stroke-width="26"
                    :percentage="item.progress"
                    v-if="item.dashboard === 0"
                  ></el-progress>

                  <el-progress
                    type="dashboard"
                    :percentage="item.progress"
                    :width="80"
                    v-if="item.dashboard === 1"
                  ></el-progress>

                  <el-progress
                    type="circle"
                    :percentage="item.progress"
                    :width="80"
                    v-if="item.dashboard === 2"
                  ></el-progress>
                </div>
              </el-col>

              <!-- <el-col :span='3'></el-col> -->

              <el-col :span="5" :push="2"
                ><div class="grid-content ">
                  <el-button-group>
                    <el-button
                      icon="el-icon-minus"
                      @click="decrease(item)"
                    ></el-button>
                    <el-button
                      icon="el-icon-plus"
                      @click="increase(item)"
                    ></el-button>
                  </el-button-group></div
              ></el-col>
            </el-row>

            <!-- second row -->
            <el-row>
              <el-col :span="12"
                ><p style="font-size:18px">
                  Deadline:
                  <input
                    type="text"
                    v-model="item.deadline"
                    style="text-align:center;border:none;"
                  /></p
              ></el-col>
              <el-col :span="12">
                <el-button-group>
                  <el-button
                    icon="el-icon-edit"
                    @click="modifyItem(item)"
                    size="mini"
                    >Modify</el-button
                  >
                  <el-button
                    icon="el-icon-circle-check"
                    @click="DoneJob(item)"
                    size="mini"
                    >Done</el-button
                  >
                  <el-button
                    icon="el-icon-circle-check"
                    @click="DoneJob(item)"
                    size="mini"
                    >Delete</el-button
                  >
                </el-button-group>
              </el-col>
            </el-row>
          </el-collapse-item>
        </el-collapse>
      </div>
    </div>
    <!-- <p>{{message}}</p> -->
  </div>
</template>

<script>
export default {
  props: ["message"],
  inject:['reload'],
  data: function() {
    return {
      activeName: "1",
      listInfo: this.message
    };
  },
  methods: {
    decrease(item) {
      item.progress -= 10;
      if (item.progress < 0) {
        item.progress = 0;
      }
    },
    increase(item) {
      item.progress += 10;
      if (item.progress > 100) {
        item.progress = 100;
      }
    },
    modifyItem(item) {
      console.log(item);

      this.$axios
        .post("/api/todo/update", {
          deadline: item.deadline,
          progress: item.progress,
          id: item.id
        })
        .then(val => {
          console.log(val);
          this.$message({
            message: val.data.msg,
            type: "success"
          });
        });
    },
    DoneJob(item) {
      console.log(item);
      this.$axios
        .post("/api/todo/update", {
          id: item.id,
          level: 3
        })
        .then(val => {
          console.log(val);

          if (val.data.code === 0) {
            // for (let i in this.listInfo) {
            //   if (this.listInfo[i].id === item.id) {
            //     this.$set(this.listInfo[i], "level", 3);
            //   }
            // }
            // this.$forceUpdate();
            // location.reload();
            this.reload()
          }
        });
    }
  }
};
</script>

<style lang="less" scope>
.level-box {
  width: 100%;
  height: 100%;
  padding: 10px;
  box-sizing: border-box;
  text-align: left;
  &-title {
    text-align: center;
    font-weight: bold;
  }
  &-wrapper {
    width: 100%;
    height: 90%;
    overflow-x: hidden;
    overflow-y: scroll;
    scrollbar-width: none;
    box-sizing: border-box;
    background-color: #fff;
    padding-left: 10px;
    border-radius: 10px;
    &-content {
      padding-left: 5px;
    }
  }
}
.el-row {
  margin: 10px auto;
}
.el-progress--dashboard {
  margin: 0 auto;
}
// .el-collapse-item__header {
//   background-color: #0b090d;
//   opacity: 0.5;
//   color: #fff;
// }
</style>