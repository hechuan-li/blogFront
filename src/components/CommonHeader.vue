<template>
  <div class="header">
    <header>
      <div class="wraper" v-show="this.screen === 'pc'">
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
                background-color="rgba(10, 8, 8, 0.6)"
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
          <el-col :span="2" class="logout" v-if="this.user">
            <el-button type="danger" size="mini" @click="logout">Log out</el-button>
          </el-col>
          <el-col :span="2" class="logout" v-else>
            <el-button type="primary" size="mini" @click="login"> Login </el-button>
          </el-col>
        </el-row>
      </div>
      <div class="mobileWrapper" v-show="this.screen === 'mobile'">
        <el-dropdown>
          <span class="el-dropdown-link"><i class="el-icon-s-fold"></i> </span>
          <el-dropdown-menu slot="dropdown">
            <el-dropdown-item
              ><router-link to="/"
                ><i class="el-icon-s-home"></i>Home</router-link
              ></el-dropdown-item
            >
            <el-dropdown-item
              ><router-link to="/blog"
                ><i class="el-icon-document-copy"></i>My Article</router-link
              ></el-dropdown-item
            >
            <el-dropdown-item
              ><router-link to="/login" v-if="isSignIn === 0"
                ><i class="el-icon-user-solid"></i>User</router-link
              >
              <router-link to="/user" v-else-if="isSignIn === 1"
                ><i class="el-icon-user-solid"></i>{{ user }}</router-link
              >
            </el-dropdown-item>
            <el-dropdown-item>
              <i class="el-icon-switch-button" @click="logout">Log out</i>
            </el-dropdown-item>
          </el-dropdown-menu>
        </el-dropdown>
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
      user: "",
      screen: ""
    };
  },
  methods: {
    handleSelect(index) {
      this.activeIndex = index + "";
    },
    logout() {
      this.$Cookie.remove("token");
      this.$Cookie.remove("username");
      this.$Cookie.remove("head_img");
      location.reload();
    },
    login(){
      this.$router.push('/login')
    },
    goSpider() {
      this.$router.push("/spider");
    },
    goToDo() {
      this.$router.push("/todo");
    },
    getDevice(currentWidth) {
      if (currentWidth >= 750) {
        this.screen = "pc";
      } else if (currentWidth < 750) {
        this.screen = "mobile";
      }
    },
    getWidth() {
      let currentWidth = document.body.clientWidth;
      this.getDevice(currentWidth);
    },
    getResize() {
      window.onresize = () => {
        let currentWidth = document.body.clientWidth;
        this.getDevice(currentWidth);
      };
    }
    
  },
  computed: {
    //获取登陆状态
    isSignIn() {
      return this.$store.state.isSignIn;
    }
  },
  created: function() {
    this.user = this.$Cookie.get("username");
    this.screen = document.body.clientWidth;
    this.getWidth();
    this.getResize();
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
      background-color: rgba(10, 8, 8, 0.1) !important;
      li {
        padding: 0;
        .el-menu-item {
          .is-active {
            background: #000 !important;
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
.el-dropdown-link {
  cursor: pointer;
  color: #409eff;
}
.el-icon-arrow-down {
  font-size: 12px;
}
.mobileWrapper {
  
  position: fixed;
  right: 6%;
  top: 3%;
  padding: 5px;
  .el-icon-s-fold {
    font-size: 30px;
  }
}
</style>