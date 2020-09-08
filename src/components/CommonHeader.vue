<template>
  <div class="header">
    <header>
      <div class="wraper">
        <el-row>
          <el-col :span="4">
            <div class="logo">
              <span>Daniel's Blog</span>
            </div>
          </el-col>
          <el-col :span="16" class="nav">
            <div class="menu">
              <el-menu
                :default-active="activeIndex"
                class="el-menu-demo"
                mode="horizontal"
                @select="handleSelect"
                text-color="#fefefe"
                active-text-color="#fff"
                background-color='rgba(10, 8, 8, 0.6)'
              >
                <el-menu-item index="1">
                  <router-link to="/"
                    ><i class="el-icon-s-home"></i>Home</router-link
                  >
                </el-menu-item>
                <el-menu-item index="2">
                  <router-link to="/blog"
                    ><i class="el-icon-document-copy"></i>My
                    Article</router-link
                  >
                </el-menu-item>

                <el-submenu index="4">
                  <template slot="title">Tools</template>
                  <el-menu-item @click="goSpider">Spider</el-menu-item>
                  <el-menu-item @click="goToDo"> ToDo List</el-menu-item>
                </el-submenu>
                <el-menu-item index="3">
                  <!-- 通过判断计算属性里的返回值来显示不同页面 -->
                  <router-link to="/login" v-if="isSignIn === 0"
                    ><i class="el-icon-user-solid"></i>User</router-link
                  >
                  <router-link to="/user" v-else-if="isSignIn === 1"
                    ><i class="el-icon-user-solid"></i>{{ user }}</router-link
                  >
                </el-menu-item>
              </el-menu>
            </div>
          </el-col>
          <el-col :span="2" class="logout"
            ><el-button type="danger" size="mini" @click="logout"
              >Log out</el-button
            ></el-col
          >
        </el-row>
      </div>
    </header>
  </div>
</template>

<script>
// const Cookie = 'js-cookie'
export default {
  data() {
    return {
      activeIndex: "1",
      user: ""
    };
  },
  methods: {
    handleSelect(index) {
      this.activeIndex = index + "";
    },
    logout() {
      this.$Cookie.remove("token");
      location.reload();
    },
    goSpider() {
      this.$router.push("/spider");
    },
    goToDo() {
      this.$router.push("/todo");
    }
  },
  computed: {
    //获取登陆状态
    isSignIn() {
      return this.$store.state.isSignIn;
    }
  },
  created: function() {
    this.user = sessionStorage.getItem("username");
  }
};
</script>

<style lang="less" scoped>
.header {
  width: 100%;
  position: fixed;
  top: 0;
  left: 0;
  z-index: 99;
  background-color: rgba(10, 8, 8, 0.1);
}
header {
  // background-color: #2d2d2d;
  color: #eee;

  .logo {
    height: 60px;
    box-sizing: border-box;

    span {
      font-size: 20px;
      font-weight: bold;
      display: inline-block;
      height: 100%;
      line-height: 60px;
    }
  }
  .nav {
    display: flex;
    flex-flow: row nowrap;
    justify-content: flex-end;
    
    ul {
      border-bottom: none;
      background-color: rgba(10, 8, 8, 0.1)!important;
      li {
        padding: 0;
        .el-menu-item{
          .is-active{
            background: #000!important; 
          }
        }
        a {
          display: inline-block;
          padding: 15px 20px;
          background-color: rgba(10, 8, 8, 0.1);
          
        }
      }
    }
  }
  .logout {
    height: 60px;
    padding: 7px;
  }
}
</style>