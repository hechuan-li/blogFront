<template>
  <div class="login-box">
    <div class="login-box-main">
      <h2>Create Your Account</h2>
      <el-form
        :model="ruleForm"
        status-icon
        :rules="rules"
        ref="ruleForm"
        label-width="100px"
        class="demo-ruleForm"
        label-position="top"
      >
        <el-form-item label="User Name: ">
          <el-input
            v-model="ruleForm.username"
            autocomplete="off"
            placeholder="please input your user name"
          ></el-input>
        </el-form-item>
        <el-form-item label="Nick Name: ">
          <el-input
            v-model="ruleForm.nickname"
            autocomplete="off"
            placeholder="please type your nickname"
          ></el-input>
        </el-form-item>
        <el-form-item label="Password: " prop="pass">
          <el-input
            type="password"
            v-model="ruleForm.password"
            autocomplete="off"
          ></el-input>
        </el-form-item>
        <el-form-item label="Comfirm Your Password" prop="checkPass">
          <el-input
            type="password"
            v-model="ruleForm.checkPass"
            autocomplete="off"
          ></el-input>
        </el-form-item>

        <el-form-item>
          <el-button
            type="primary"
            @click="submitForm('ruleForm')"
            size="medium"
            >Submit</el-button
          >
          <el-button @click="resetForm('ruleForm')">Reset</el-button>
        </el-form-item>
      </el-form>
    </div>
  </div>
</template>

<script>
export default {
  data() {
    var validatePass = (rule, value, callback) => {
      if (value === "") {
        callback(new Error("Please Enter Password"));
      } else {
        if (this.ruleForm.checkPass !== "") {
          this.$refs.ruleForm.validateField("checkPass");
        }
        callback();
      }
    };
    var validatePass2 = (rule, value, callback) => {
      if (value === "") {
        callback(new Error("请再次输入密码"));
      } else if (value !== this.ruleForm.password) {
        callback(new Error("Not Match, Please Type Again!"));
      } else {
        callback();
      }
    };
    return {
      ruleForm: {
        username: "",
        password: "",
        checkPass: "",
        nickname: ""
      },
      rules: {
        pass: [{ validator: validatePass, trigger: "blur" }],
        checkPass: [{ validator: validatePass2, trigger: "blur" }]
      }
    };
  },
  methods: {
    submitForm(formName) {
      this.$refs[formName].validate(valid => {
        if (valid) {
          this.$axios
            .post("/api/users/register", this.ruleForm)
            .then(res => { 
              console.log(res);
              let status = res.data.code;
              if (status === "0") {
                alert("submit!");
                this.$router.push("/login");
              } else if (status === "-1") {
                alert("This username has been registed");
              }
            });
        } else {
          console.log("error submit!!");
          return false;
        }
      });
    },
    resetForm(formName) {
      this.$refs[formName].resetFields();
      // formName.username = "";
      // formName.password = "";
      // formName.nickname = "";
    }
  }
};
</script>

<style lang="less" scoped>
.login-box {
  height: 500px;
  margin: 0px auto;
  width: 30%;
  padding-top: 50px;
  &-main {
    padding: 20px;
  }
}
</style>