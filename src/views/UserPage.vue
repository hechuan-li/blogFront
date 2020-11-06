<template>
  <div class="wrapper">
    <div class="content">
      <h2>Modify Your Infomation</h2>
      <el-form ref="form" :model="form" label-width="80px">
        <el-form-item label="NickName: ">
          <el-input
            v-model="form.nickname"
            placeholder="please type your new nickname."
          ></el-input>
        </el-form-item>

        <el-form-item>
          <!-- <img v-if="form.imgUrl" :src="imgUrl" alt="" /> -->
          
          <el-upload
            class="upload-demo"
            drag
            action="http://3.23.127.60:3001/api/users/upload"
            multiple
            :on-success="handleAvatarSuccess"
            :before-upload="beforeAvatarUpload"
            name='header_img'
          >
          <img v-if="form.imgUrl!= null" :src="form.imgUrl" class="avatar">
          
          <!-- <img :src="defaultImg" class="avatar"> -->
            <i class="el-icon-upload"></i>
            <div class="el-upload__text">
              drag file here to upload，or<em> click upload</em>
            </div>
            <div class="el-upload__tip" slot="tip">
              file type required jpg/png，no more than 500kb
            </div>
          </el-upload>
        </el-form-item>
        <el-form-item>
          <el-button type="primary" @click="submit">Save</el-button>
          <el-button type="warning" @click="cancel">Cancel</el-button>
        </el-form-item>
      </el-form>
    </div>
  </div>
</template>

<script>
import defaultImg from '../assets/img/logo.png'
import Cookie from 'js-cookie'
export default {
  data() {
    return {
      defaultImg:defaultImg,
      form: {
        nickname: "",
        imgUrl: '',
        username:''
      }
    };
  },
  created: function() {
    this.getUerInfo()
  },
  methods: {
    handleAvatarSuccess(res) {
      console.log(res);
      this.form.imgUrl = res.data
    },
    beforeAvatarUpload(file) {
      // const isJPG = file.type === "image/jpeg";
      const isLt2M = file.size / 1024 / 1024 < 2;

      // if (!isJPG) {
      //   this.$message.error("上传头像图片只能是 JPG 格式!");
      // }
      if (!isLt2M) {
        this.$message.error("上传头像图片大小不能超过 2MB!");
      }
      // return isJPG && isLt2M;
      return isLt2M;
    },
    submit() {
       
      this.form.username = Cookie.get('username')
      this.$axios.post('/api/users/updateUserInfo',this.form).then(res=>{
        if(res.data.code === 0){
          this.$message({
            message:'update success',
            type:'success'
          })
        }
        // setTimeout(()=>{location.reload()},1000)
      })
    },
    cancel() {
      this.$router.push("/");
    },
    getUerInfo(){
      let user = Cookie.get('username')
      this.form.username = user
      this.$axios.get('/api/users/info',{params:{username:user}}).then(res=>{
        if(res.data.code === 0){
          this.form.nickname = res.data.msg.nickname
          this.form.imgUrl = res.data.msg.head_img
          this.form.username = res.data.msg.username
           
        }
      })
    }
  }
};
</script>

<style lang="less" scoped>
.content {
  width: 40%;
  margin: 20px auto;
  h2 {
    margin: 20px 0 60px 0;
  }
}
.avatar{
  float: left;
  height: 160px;
  width: 160px;
  border-radius: 8px;
  margin: 10px 0 10px 10px ;
}
</style>