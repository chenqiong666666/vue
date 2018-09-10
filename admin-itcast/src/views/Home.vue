<template>
  <div class="home">
    <el-container>
      <el-aside width="auto">
        <div class="logo"></div>
        <el-menu  :collapse='collapse' :unique-opened="true" class="el-menu-admin" @open="handleOpen" @close="handleClose" background-color="#545c64" text-color="#fff" active-text-color="#ffd04b" :router='true'>
          <el-submenu :index="item.id+''" v-for="item in leftlist" :key="item.id">
            <template slot="title"  >
              <i class="el-icon-location"></i>
              <span>{{item.authName}}</span>
            </template>
            <el-menu-item :index="subitem.path" v-for="subitem in item.children" :key="subitem.id" >
              <i class="el-icon-menu"></i>
              <span slot="title">{{subitem.authName}}</span>
            </el-menu-item>
          </el-submenu>
        </el-menu>
      </el-aside>
      <el-container>
        <el-header>
          <span class=" myicon myicon-menu toggle-btn" @click="collapse=!collapse"></span>
          <span class="system-title ">电商后台管理系统</span>
          <div class="welcome">
            <span>你好:{{username}}</span>
            <el-button type="text" @click="loginout">退出</el-button>
          </div>
        </el-header>
        <el-main>

          <router-view></router-view>
        </el-main>
      </el-container>
    </el-container>

  </div>
</template>

<script>
import {getleftmenu} from '@/api/index.js'
export default {
  data () {
    return {
      collapse: false,
      leftlist: [],
      username: ''
    }
  },
  mounted () {
    getleftmenu().then(res => {
      console.log(res)
      this.leftlist = res.data
      console.log(this.leftlist)
      this.username = localStorage.getItem('myusername')
    })
  },
  methods: {
    // 退出登录
    loginout () {
      // 清除token
      localStorage.removeItem('mytoken')
      // 重定向
      this.$router.push({ name: 'login' })
    },
    handleOpen (key, keyPath) {
      console.log(key, keyPath)
    },
    handleClose (key, keyPath) {
      console.log(key, keyPath)
    }
  }
}
</script>

<style lang="scss" scoped>
.home {
  height: 100%;
  .el-menu-admin:not(.el-menu--collapse) {
    width: 200px;
    min-height: 400px;
  }
  .el-container {
    height: 100%;
  }
  .el-aside {
    background-color: #545c64;
  }
  .el-header {
    display: flex;
    justify-content: space-between;
    align-items: center;
    background-color: #545c64;
  }
  .logo {
    height: 60px;
    background: url(../assets/logo.png);
    background-size: cover;
    background-color: #fff;
  }
  .toggle-btn {
    padding: 0 15px;
    margin-left: -20px;
    font-size: 36px;
    color: white;
    cursor: pointer;
    line-height: 60px;
    &:hover {
      background-color: #4292cf;
    }
  }
  .system-title {
    font-size: 28px;
    color: white;
  }
  .welcome {
    color: white;
  }
}
</style>
