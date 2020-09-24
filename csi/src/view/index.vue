<template>
    <div class="wrap">
        <div class="menu">
            <!-- <el-radio-group v-model="isCollapse" style="margin-bottom: 20px;">
            <el-radio-button :label="false">展开</el-radio-button>
            <el-radio-button :label="true">收起</el-radio-button>
            </el-radio-group>-->
            <div class="logo">
                <img src="../assets/image/u192.png" />CSI语音
                <span style="color:#F59A23">技术吧</span>
            </div>
            <el-menu
                :default-active="menuPath"
                class="el-menu-vertical-demo"
                @open="handleOpen"
                @close="handleClose"
                background-color="#304156"
                text-color="#bfcbd9"
                active-text-color="#1890ff"
                router
            >
                <el-menu-item :index="menuItem.id" v-for="menuItem in menuItems" :key="menuItem.id" >
                    <i class="el-icon-star-on"></i>
                    <span slot="title">{{menuItem.name}}</span>
                </el-menu-item>
            </el-menu>
        </div>
        <div style="position: relative;padding-left: 200px;">
            <div class="headBar " >
                <el-breadcrumb class="breadcumb" separator="/" style="padding-left: 30px;">
                    <el-breadcrumb-item
                        v-for="(item, i) in breadcumb.list"
                        :key="i"
                        class="breadcumb-link"
                        :class="{last: i == breadcumb.list.length -1}"
                        :to="{path: item.path}"
                    >{{item.name}}</el-breadcrumb-item>
                </el-breadcrumb>
                <el-dropdown trigger="click" class="avatar" style="padding-right: 30px;">
                    <el-avatar shape="square" :size="50" style="cursor: pointer;" :src="avatar"></el-avatar>
                    <el-dropdown-menu slot="dropdown" class="avatar-s">
                        <el-dropdown-item @click.native="toSetting">个人设置</el-dropdown-item>
                        <el-dropdown-item @click.native="exit">退出登录</el-dropdown-item>
                    </el-dropdown-menu>
                </el-dropdown>
            </div>
            <div class="content">
                <router-view></router-view>
            </div>
        </div>
    </div>
</template>
<style scoped>
.el-menu-vertical-demo:not(.el-menu--collapse) {
    width: 200px;
    min-height: 30px;
    height: 100%;
}
.wrap {
    position: absolute;
    height: 100%;
    width: 100%;
}
.menu {
    height: inherit;
    width: 200px;
    position: fixed;
    left: 0;
    top: 0%;
    z-index: 999;
}
.headBar {
    height: 56px;
    border-bottom: 1px solid #f0f2f5;
    display: flex;
    align-items: center;
    justify-content: space-between;
}
.content{
    padding: 20px;
}
.logo {
    background-color: #2b2f3a;
    height: 56px;
    display: flex;
    align-items: center;
    justify-content: center;
    color: #fff;
    font-size: 14px;
    font-weight: bold;
}
.logo img {
    height: 32px;
    width: 32px;
}
  .el-avatar >>> img{
    width:100%;
  }
</style>

<script>
import { mapState } from "vuex";
export default {
    name: "Menu",
    data() {
        return {
            isCollapse: true,
            menuItems: [
                { id: "/art", name: "所有文章" },
                { id: "/myArticle", name: "我的文章" },
                { id: "/myComment", name: "我的评论" },
                { id: "/audioSetting", name: "语音设置" },
                { id: "/setting", name: "个人设置" },
            ],
            menuPath:'',
            avatar:'',
        };
    },
    computed: {
        ...mapState(["breadcumb"]),
    },
    methods: {
        handleOpen(key, keyPath) {
            console.log(key, keyPath);
        },
        handleClose(key, keyPath) {
            console.log(key, keyPath);
        },
        toSetting(){
            this.$router.push({path:"/setting"})
        },
        getMenuPath(){
            let l=this.$route.path;
            let list=l.split('/');
            let res=list[1];
            let str='/'+res;
            this.menuPath=str;
        },
        exit(){
            let user=JSON.parse(sessionStorage.getItem("user"));
            this.$axios.post("api/user/logout",{userId:user.userId})
            .then(
                res=>{
                    sessionStorage.clear();
                    this.$router.push("/")
                }
            ).catch()
        }
    },
    mounted(){
      // console.log(sessionStorage.getItem("user"))
        this.getMenuPath();
        let user=JSON.parse(sessionStorage.getItem("user"));
        this.avatar=user.regPhoto;

    }
};
</script>
