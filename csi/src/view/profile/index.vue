<template>
    <div class="app-container">
        <el-row :gutter="20">
            <el-col :span="6" :xs="24">
                <el-card class="box-card">
                    <div slot="header" class="clearfix">
                        <span>个人信息</span>
                    </div>
                    <div>
                        <div class="text-center">
                            <el-upload
                                class="avatar-uploader"
                                action
                                :before-upload="checkFile"
                                :show-file-list="false"
                                :limit="1"
                                :http-request="uploadAvatar"
                            >
                                <img :src="this.user.regPhoto" class="avatar" alt="读取失败" />
                            </el-upload>
                        </div>
                        <ul class="list-group list-group-striped">
                            <li class="list-group-item">
                                <svg-icon
                                    icon-class="user"
                                    class="iconfont icon-user-solid el-input__icon input-icon"
                                />用户名称
                                <div class="pull-right">{{ user.username }}</div>
                            </li>
                            <li class="list-group-item">
                                <svg-icon
                                    icon-class="user"
                                    class="iconfont icon-nianling el-input__icon input-icon"
                                />用户年龄
                                <div class="pull-right">{{ user.regAge }}</div>
                            </li>
                            <li class="list-group-item">
                                <svg-icon
                                    icon-class="user"
                                    class="iconfont icon-xingbiecopy el-input__icon input-icon"
                                />用户性别
                                <div class="pull-right">{{ user.regSex }}</div>
                            </li>
                            <li class="list-group-item">
                                <svg-icon
                                    icon-class="user"
                                    class="iconfont icon-message el-input__icon input-icon"
                                />用户邮箱
                                <div class="pull-right">{{user.regEmail}}</div>
                            </li>
                            <li class="list-group-item">
                                <svg-icon
                                    icon-class="user"
                                    class="iconfont icon-nianling el-input__icon input-icon"
                                />用户角色
                                <div class="pull-right">{{user.admin}}</div>
                            </li>
                            <li class="list-group-item">
                                <svg-icon
                                    icon-class="user"
                                    class="iconfont icon-date el-input__icon input-icon"
                                />注册时间
                                <div class="pull-right">{{user.regTime}}</div>
                            </li>
                        </ul>
                    </div>
                </el-card>
            </el-col>
            <el-col :span="18" :xs="24">
                <el-card>
                    <div slot="header" class="clearfix">
                        <span>基本资料</span>
                    </div>
                    <el-tabs v-model="activeTab">
                        <el-tab-pane label="基本资料" name="userinfo">
                            <userInfo :user="user" />
                        </el-tab-pane>
                        <el-tab-pane label="修改密码" name="resetPwd">
                            <resetPwd :user="user" />
                        </el-tab-pane>
                    </el-tabs>
                </el-card>
            </el-col>
        </el-row>
    </div>
</template>

<style scoped>
li {
    font-size: 13px;
    text-decoration: none;
    list-style: none;
    border-bottom: solid 1px #c0c4cc;
    height: 42px;
}
ul {
    padding-inline-start: 0px;
}
.pull-right {
    float: right;
    line-height: 42px;
}

.text-center {
    text-align: center;
}
.avatar-uploader .el-upload {
    border: 1px dashed #d9d9d9;
    border-radius: 6px;
    cursor: pointer;
    overflow: hidden;
}
.avatar-uploader .el-upload:hover {
    border-color: #409eff;
}
.avatar {
    width: 100px;
    height: 100px;
    display: block;
}
.el-avatar >>> img {
    width: 100%;
}
</style>

<script>
import userInfo from "./userInfo";
import resetPwd from "./resetPwd";
const axios = require("axios");
export default {

    name: "Profile",
    components: { userInfo, resetPwd },
    data() {
        return {
            fileList: [],
            user: {},
            roleGroup: {},
            postGroup: {},
            activeTab: "userinfo",
        };
    },
    created() {
        this.getUser();
    },
    methods: {
        checkFile(file){
            const isJPG = file.type === 'image/jpeg'||'image/png';
            const isLt2M = file.size / 1024 / 1024 < 4;
            if (!isJPG) {
                this.$message.error('上传头像图片只能是 JPG或png 格式!');
            }
            if (!isLt2M) {
                this.$message.error('上传头像图片大小不能超过4MB!');
            }
            return isJPG && isLt2M;
        },
        uploadAvatar(file){
          let that = this;
          let myFile=file.file;
          let reader = new FileReader();
          reader.readAsDataURL(myFile)
          reader.onload = function (e) {
            let result = e.target.result;
            axios.create().post("/api/utils/uploadUserPhoto", {
              userId: that.user.userId,
              baseUrl: result
            })
              .then(response => {
                that.getUser();
              })
              .catch(error => {
                console.log(error)
              })
          }
        },
        getUser() {
            let user = JSON.parse(sessionStorage.getItem("user"));
            this.$axios.post("api/user/queryUserById",{userId:user.userId})
            .then(res=>{
              if(res.data.data!=null){
                this.user=res.data.data;
                sessionStorage.setItem("user",JSON.stringify(res.data.data));
              }
            }).catch(error => {
              console.log(error)
            })
        },
    },
};
</script>
