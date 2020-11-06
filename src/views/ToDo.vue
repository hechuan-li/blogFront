<template>
  <div class="outside-box">
    <!-- add new box  -->
    <div class="addbox">
      <transition name="el-zoom-in-center">
        <div v-show="show2" class="transition-box">
          <p>New Add</p>
          <el-divider></el-divider>

          <el-form ref="form" :model="form">
            <el-form-item>
              <el-input v-model="form.content" type="textarea"></el-input>
            </el-form-item>

            <el-form-item label="Deadline:">
              <el-col :span="15">
                <el-date-picker
                  type="date"
                  placeholder="select date"
                  v-model="form.deadline"
                  style="width: 72%;"
                  editable
                  size="large"
                  format="dd / MM / yyyy"
                  value-format="dd-MM-yyyy"
                ></el-date-picker>
              </el-col>
            </el-form-item>

            <el-form-item label="Level: ">
              <el-radio-group v-model="form.level" size="large">
                <el-radio-button border label="0">Urgent</el-radio-button>
                <el-radio-button border label="1">Current</el-radio-button>
                <el-radio-button border label="2">Long-Term</el-radio-button>
              </el-radio-group>
            </el-form-item>

            <el-form-item label="Dashboard: " label-width="10px">
              <el-radio-group v-model="form.dashboard" size="large">
                <el-radio-button border label="0">line</el-radio-button>
                <el-radio-button border label="1">circle</el-radio-button>
                <el-radio-button border label="2">dashboard</el-radio-button>
              </el-radio-group>
            </el-form-item>

            <el-form-item label="Progress:" label-width="1px">
              <el-input-number
                size="small"
                v-model="form.progress"
                @change="handleChange"
                :step="10"
                :min="0"
                :max="100"
                label="progress"
              ></el-input-number>
            </el-form-item>
          </el-form>

          <el-button
            type="primary"
            icon="el-icon-circle-close"
            size="mini"
            @click="show2 = !show2"
            >cancel</el-button
          >
          <el-button
            type="success"
            icon="el-icon-check"
            size="mini"
            @click="postToDo"
            >Submit</el-button
          >
        </div>
      </transition>
    </div>

    <!-- todo list area -->
    <el-button type="primary" @click="show2 = !show2">add new</el-button>
    <div class="todo-container">
      <div class="urgent todo-container-item">
        <ToDoBox :message="this.level0">
          Urgent: {{ this.level0.length }} jobs</ToDoBox
        >
      </div>
      <div class="processing todo-container-item">
        <ToDoBox :message="this.level1"
          >Current Processing: {{ this.level1.length }} jobs</ToDoBox
        >
      </div>
      <div class="longTerm todo-container-item">
        <ToDoBox :message="this.level2"
          >Long-Term: {{ this.level2.length }} jobs</ToDoBox
        >
      </div>
      <div class="done todo-container-item">
        <ToDoBox :message="this.level3"
          >Done: {{ this.level3.length }} jobs</ToDoBox
        >
      </div>
    </div>
  </div>
</template>

<script>
import ToDoBox from "../components/ToDoBox";
export default {
  components: {
    ToDoBox
  },
  props: ["message"],
  inject: ["reload"],
  data: function() {
    return {
      show2: false,
      user_id: "",
      form: {
        content: "",
        deadline: "",
        level: "1",
        dashboard: "0",
        progress: 0
      },
      level0: [],
      level1: [],
      level2: [],
      level3: []
    };
  },
  methods: {
    addNewToDo() {
      this.show2 = false;
    },
    handleChange(value) {
      this.form.percentage = value;
    },
    postToDo() {
      this.$axios
        .post("/api/todo/add", {
          params: {
            form: this.form,
            user_id: this.user_id
          }
        })
        .then(val => {
          console.log(val.status);
          if (val.status === 200) {
            this.reload();
            this.$message({
              message: "added new task",
              type: "success"
            });
          }
        });

      this.show2 = false;
    },
    getList() {
      this.$axios
        .get("/api/todo/list", {
          params: {
            user_id: this.user_id
          }
        })
        .then(value => {
          let allList = value.data.list;
          for (let i in allList) {
            switch (allList[i].level){
              case 0:
                this.level0.push(allList[i]);
                break;
              case 1: 
                this.level1.push(allList[i]);
                break;
              case 2: 
                this.level2.push(allList[i]);
                break;
              case 3: 
                this.level3.push(allList[i]);
                break;
            }
          }
        });
    }
  },
  created() {
    this.user_id = this.$route.query.id;
    this.getList();
  },
  watch: {
    deadline(val, oldVal) {
      console.log(val);
      console.log(oldVal);
    }
  }
};
</script>

<style lang="less" scoped>
.outside-box {
  width: 100%;
  // height: 100%;
  position: relative;
  .addbox {
    width: 100%;
    position: absolute;
    display: flex;
    justify-content: center;
    z-index: 99;
  }
  .transition-box {
    width: 500px;
    height: 600px;
    border-radius: 4px;
    background-color: #fff;
    text-align: center;
    color: #000;
    padding: 40px 20px;
    box-sizing: border-box;
    margin-right: 20px;
  }
  .todo-container {
    width: 90%;
    height: 750px;
    display: flex;
    flex-flow: row wrap;
    justify-content: center;
    // border: 2px solid red;
    margin: 5px auto;
    overflow-x: hidden;
    overflow-y: scroll;
    scrollbar-width: none;
    box-sizing: border-box;
    &-item {
      width: 40%;
      height: 320px;
      margin: 20px 50px;
      // border: 2px solid green;
    }
  }
}
</style>