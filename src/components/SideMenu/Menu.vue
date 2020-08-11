<template>
    <div>
        <el-menu default-active="1-4-1"  class="el-menu-vertical-demo side_menu" @open="handleOpen" @close="handleClose" :collapse="isCollapse">
            <el-menu-item index="1" @click="toOtherPage('Home')">
                <i class="menu_icon iconfont icon-icon_homepage"></i>
                <span slot="title">首页</span>
            </el-menu-item>
            <el-menu-item index="2" @click="toOtherPage('BlogManage')">
                <i class="menu_icon iconfont icon-icon_addresslist"></i>
                <span slot="title">博客管理</span>
            </el-menu-item>
            <!-- <el-menu-item index="3" @click="toOtherPage('CommentManage')">
                <i class="menu_icon iconfont icon-pinglun"></i>
                <span slot="title">评论管理</span>
            </el-menu-item> -->
            <el-menu-item index="4" @click="toOtherPage('CategaryManage')">
                <i class="menu_icon iconfont icon-icon_threeline_fill"></i>
                <span slot="title">分类管理</span>
            </el-menu-item>
            <el-menu-item index="5" v-if="this.$store.state.userInfo.role === 0" @click="toOtherPage('UserManage')">
                <i class="menu_icon iconfont icon-icon_meeting"></i>
                <span slot="title">用户管理</span>
            </el-menu-item>
            <el-menu-item @click="openMenu()" index="5">
                <i :class='isCollapse===true ? "el-icon-d-arrow-right":"el-icon-d-arrow-left" '></i>
            </el-menu-item>
        </el-menu>
    </div>
</template>
<script>
export default {
  name: 'home',
  data() {
      return {
        isCollapse: false
      };
  },
  methods: {
    handleOpen(key, keyPath) {
      console.log(key, keyPath);
    },
    handleClose(key, keyPath) {
      console.log(key, keyPath);
    },
    openMenu() {
        this.isCollapse = !this.isCollapse;
    },
    toOtherPage(page) {
      this.$router.push({ name: page })
    }
  }
}
</script>
<style>
  .el-menu-vertical-demo:not(.el-menu--collapse) {
    width: 145px;
  }
  .side_menu {
      width: 150px;
      float: left;
      position: fixed;
      background-color: #545c64 !important;
      top: 100px;
  }
  .side_menu .el-menu-item {
      color: #fff !important;
      font-size: 15px;
      font-weight: 500;
  }
  .side_menu .menu_icon {
    color: #fff;
    font-size: 18px;
    margin-right: 5px;
  }
</style>
