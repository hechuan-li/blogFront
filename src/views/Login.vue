<template>
  <div class="login-box">
    <div class="login-box-main">
      <h2>Login Your Account</h2>
      <el-form
        :model="ruleForm"
        status-icon
        :rules="rules"
        ref="ruleForm"
        label-width="100px"
        class="demo-ruleForm"
        label-position="top"
      >
        <el-form-item label="Account" class="formItem">
          <el-input
            v-model="ruleForm.acc"
            autocomplete="off"
            prefix-icon="el-icon-s-custom"
          ></el-input>
        </el-form-item>
        <el-form-item label="Password" prop="pass" class="formItem">
          <el-input
            type="password"
            v-model="ruleForm.pass"
            autocomplete="off"
            prefix-icon="el-icon-warning"
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
          <el-button @click="signUp" type="warning">Sign Up</el-button>
        </el-form-item>
      </el-form>
    </div>
    <div v-loading.fullscreen.lock="loading"></div>
  </div>
</template>

<script>
import Cookie from "js-cookie";
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
    return {
      loading: false,
      status: 1,
      ruleForm: {
        acc: "",
        pass: ""
      },
      rules: {
        pass: [{ validator: validatePass, trigger: "blur" }]
      }
    };
  },
  methods: {
    submitForm(formName) {
      this.$refs[formName].validate(valid => {
        if (valid) {
          this.loading = true;
          this.$axios.post("/api/users/login", this.ruleForm).then(res => {
            let status = res.data;
            if (status.code === "-1") {
              this.$message({
                message: status.msg,
                type: "warning"
              });
              this.loading = false;
              this.$router.push("/signup");
            } else if (status.code === 0) {
              //登陆成功时
              this.$message(status.msg);
              Cookie.set("token", status.token);
              Cookie.set("username", status.username);
              Cookie.set("head_img", status.head_img);
              this.$store.commit("setToken", status.token);
              sessionStorage.setItem("username", status.username);
              setTimeout(() => {
                this.loading = false;
                this.$store.commit("changeSignState", 1);
                this.$router.push("/");
              }, 1000);
            } else if (status.code === "-2") {
              this.loading = false;
              alert(status.msg);
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
    },
    signUp() {
      this.$router.push("/signup");
    }
  }
};
</script>

<style lang="less" scoped>
.login-box {
  height: 500px;
  margin: 150px auto;
  width: 30%;
  padding-top: 50px;
  &-main {
    padding: 20px;
    .formItem .el-form-item__label {
      color: #fff;
    }
  }
}
</style>