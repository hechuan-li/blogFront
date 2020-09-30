<template>
  <div class="comment-box">
    <div class="signInText" v-if="isSignIn === 0">
      <p class="signIn" @click="jumpToSign">
        Please Signing In Leave Comment！
      </p>
    </div>
    <div v-else class="ipt-box" >
      <div class="ipt-box-left">
        <img class="avatar" :src="userInfo.head_img!==null?userInfo.head_img:defaultImg" alt="" />
        <p class="username">{{userInfo.nickname}}</p>
      </div>
      <div class="ipt-box-right">
        <textarea class="comment-content" v-model="comment_content"></textarea>
      </div>
      <button class="submit" @click="postComment">submit</button>
    </div>
    

    <div class="allComments">
      <p class="allComments-title">All Comments: <span>{{commentList.length}}</span></p>

      <div class="allComments-list">
        <div class="allComments-list-item" v-for="item in commentList" :key="item.id">
          <div class="allComments-list-item-left">
            <img :src="item.head_img!==null?item.head_img:defaultImg" alt="" />
            <p>{{item.nickname}}</p>
          </div>
          <div class="allComments-list-item-right">
            <div class="item-content">
              <div class="text">{{item.cm_content}}</div>
              <div class="time">
                <span class="date">{{item.publish_time}}</span>
              </div>
            </div>
          </div>
        </div>
      </div>
    </div>
  </div>
</template>

<script>
import defaultImg from '../assets/img/defaultImg.jpg'
import Cookie from 'js-cookie'
export default {
  data() {
    return { 
      singedIn: 1,
      comment_content: "",
      article_id:'',
      defaultImg:defaultImg,
      userInfo:{
        nickname:'',
        head_img:'',
        id:''
      },
      commentList:[]
    };
  },
  methods: {
    jumpToSign() {
      this.$router.push('/login')
    },
    async getUserInfo(){
      let currentUser = Cookie.get('username')
      let result = await this.$axios.get('/api/users/info',{params:{username:currentUser}})
      this.userInfo = result.data.msg
    },
    getCommentList(){
      this.$axios.get('/api/comment/list',{
        params:{
          id:this.article_id
        }
      }).then(res=>{
        if(res.data.code === 0 ){
          this.commentList = res.data.list
         
        }
      })
    },
    postComment(){
      this.$axios.post('/api/comment/public',{
        params:{
          article_id:this.article_id,
          content: this.comment_content,
          user_id: this.userInfo.id,
          head_img:this.userInfo.head_img,
          nickname: this.userInfo.nickname
        }
      }).then(res=>{
        if(res.data.code === 0){
          this.$message({
          message:res.data.msg,
          type:'success'
        })
        this.comment_content = ''
         this.getCommentList()
        }
      })
    },
    checkStatus(){
      let token = this.$Cookie.get('token')
      if(token){
        this.getUserInfo()
      }
    }
  },
  computed:{
    //获取登陆状态
    isSignIn(){
      return this.$store.state.isSignIn
    }
  },
  created(){
    let token = Cookie.get('token')
    // let headImg = Cookie.get('head_img')
    if(token){
      this.singedIn = 1
      
    }
    this.article_id = this.$route.params.id
    this.getCommentList()
    this.checkStatus()
  }
};
</script>

<style lang="less" scoped>
.comment-box {
  margin-top: 10px;
  padding: 50px 30px;
  box-shadow: 0 0px 3px rgba(0, 0, 0, 0.157), 0 0 3px rgba(0, 10, 0, 0.227);
  background-color: #fafafa;
  .signIn {
    color: #3b99fc;
    font-size: 18px;
    cursor: pointer;
  }
  .ipt-box {
    display: flex;
    &-left {
      // width: 20%;
      display: flex;
      flex-flow: column nowrap;
      img {
        display: inline-block;
        width: 60px;
        height: 60px;
        border-radius: 50%;
        border: 1px solid #ddd;
      }
      p {
        color: #3b99fc;
        cursor: pointer;
        word-break: break-all;
      }
    }
    &-right {
      flex: 1;
      min-height: 150px;
      padding: 0 20px;

      textarea {
        width: 100%;
        height: 100%;
        border: 1px solid #ddd;
        border-radius: 5px;
        padding: 20px;
        font-size: 18px;
        box-sizing: border-box;
      }
    }
  }
  .submit {
    display: inline-block;
    width: 120px;
    height: 50px;
    border: none;
    border-radius: 5px;
    background-color: #999;
    color: #fff;
    margin-top: 10px;
    &:hover{
      background: rgba(0,129,255,0.7);
    }
    outline: none;
  }
  .allComments {
    border-top: 1px solid #ddd;
    padding: 30px 0;
    margin: 30px 0 0 0;
    &-title {
      width: 100%;
      text-align: left;
      font-size: 20px;
      font-weight: bold;
      margin-bottom: 50px;
      border-left: 4px solid #3b99fc;
      padding-left: 20px;
    }
    &-list {
      &-item {
        min-height: 170px;
        border-top: 1px solid #ddd;
        padding: 20px 0;
        display: flex;
        flex-flow: row nowrap;
        &-left {
          width: 100px;
          text-align: center;
          img {
            display: inline-block;
            width: 60px;
            height: 60px;
            border-radius: 50%;
            border: 1px solid #ddd;
          }
          p {
            color: #3b99fc;
            cursor: pointer;
            word-break: break-all;
          }
        }
        &-right {
          width: 98%;
          margin-left: 2%;
          padding: 10px;
          box-sizing: border-box;
          font-size: 14px;
          color: #666;
          .item-content {
            position: relative;
            width: 100%;
            height: 100%;
            .text {
              text-align-last: left;
            }
            .date {
              position: absolute;
              right: 0;
              bottom: 0;
            }
          }
        }
      }
    }
  }
}
</style>