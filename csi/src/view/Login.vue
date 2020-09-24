<template>
    <div class="login">
        <el-form
            :model="loginForm"
            :rules="rules"
            class="login-form"
            ref="loginForm"
            v-show="isLoginForm"
        >
            <h3 class="title">
                CSI语音
                <span style="color:#F59A23">技术吧</span>
            </h3>
            <el-form-item prop="username">
                <el-input
                    v-model="loginForm.username"
                    type="text"
                    auto-complete="off"
                    placeholder="请输入您的用户名"
                >
                    <svg-icon
                        slot="prefix"
                        icon-class="user"
                        class="iconfont icon-user-solid el-input__icon input-icon"
                    />
                </el-input>
            </el-form-item>
            <el-form-item prop="password">
                <el-input
                    v-model="loginForm.password"
                    type="password"
                    auto-complete="off"
                    placeholder="请输入您的密码"
                    @keyup.enter.native="handleLogin"
                >
                    <svg-icon
                        slot="prefix"
                        icon-class="password"
                        class="iconfont icon-lock el-input__icon input-icon"
                    />
                </el-input>
            </el-form-item>
            <el-checkbox v-model="rememberMe" style="margin:0px 0px 25px 0px;">记住密码</el-checkbox>
            <el-form-item style="width:100%;" class="lands">
                <!-- :loading="loading" -->
                <el-button
                    size="medium"
                    type="primary"
                    style="width:40%;"
                    @click.native.prevent="handleLogin"
                >
                    <span v-if="!loading">登 录</span>
                    <span v-else>登 录 中...</span>
                </el-button>
                <el-button
                    size="medium"
                    type="primary"
                    style="width:40%;"
                    @click.native.prevent="toSign()"
                >
                    <span>注 册</span>
                </el-button>
            </el-form-item>
            <el-row style="text-align:right">
                <a style="font-size:12px;color:#1890ff;cursor: pointer;" @click="face()">人脸识别登录</a>
            </el-row>
        </el-form>

        <el-form
            :model="signForm"
            :rules="rules"
            class="login-form"
            v-show="isSignForm"
            ref="signForm"
        >
            <h3 class="title">
                用户
                <span style="color:#F59A23">注册</span>
            </h3>
            <el-form-item prop="username">
                <el-input v-model="signForm.username" type="text" placeholder="请输入您的用户名">
                    <svg-icon
                        slot="prefix"
                        icon-class="user"
                        class="iconfont icon-user-solid el-input__icon input-icon"
                    />
                </el-input>
            </el-form-item>
            <el-form-item prop="password">
                <el-input v-model="signForm.password" type="password" placeholder="请输入您的密码">
                    <svg-icon
                        slot="prefix"
                        icon-class="password"
                        class="iconfont icon-lock el-input__icon input-icon"
                    />
                </el-input>
            </el-form-item>
            <el-form-item prop="surePassword">
                <el-input v-model="signForm.surePassword" type="password" placeholder="请确认您的密码">
                    <svg-icon
                        slot="prefix"
                        icon-class="password"
                        class="iconfont icon-lock el-input__icon input-icon"
                    />
                </el-input>
            </el-form-item>

            <el-form-item prop="regSex">
                <el-select v-model="value" placeholder="请选择您的性别">
                    <el-option
                        v-for="item in options"
                        :key="item.value"
                        :label="item.label"
                        :value="item.value"
                    ></el-option>
                    <svg-icon
                        slot="prefix"
                        icon-class="user"
                        class="iconfont icon-xingbiecopy el-input__icon input-icon"
                    />
                </el-select>
            </el-form-item>
            <el-form-item prop="regAge">
                <el-input v-model="signForm.regAge" type="text" placeholder="请输入您的年龄">
                    <svg-icon
                        slot="prefix"
                        icon-class="user"
                        class="iconfont icon-nianling el-input__icon input-icon"
                    />
                </el-input>
            </el-form-item>
            <el-form-item prop="regMail">
                <el-input v-model="signForm.regMail" type="text" placeholder="请输入您的邮箱">
                    <svg-icon
                        slot="prefix"
                        icon-class="user"
                        class="iconfont icon-message el-input__icon input-icon"
                    />
                </el-input>
            </el-form-item>
            <el-form-item style="width:100%;" class="lands">
                <!-- :loading="loading" -->
                <el-button
                    size="medium"
                    type="primary"
                    style="width:40%;"
                    @click.native.prevent="handleSign"
                >
                    <span v-if="!loading">注 册</span>
                    <span v-else>注 册 中...</span>
                </el-button>
                <el-button
                    size="medium"
                    type="primary"
                    style="width:40%;"
                    @click.native.prevent="toLogin()"
                >
                    <span>返回</span>
                </el-button>
            </el-form-item>
        </el-form>
        <el-form :model="faceloginForm" class="facelogin-form" v-show="isFaceLoginForm">
            <h3 class="title">
                SCI语音
                <span style="color:#F59A23">技术吧</span>
            </h3>
            <takePhoto class="photo" ref="photo"></takePhoto>
            <el-form-item style="width:100%;" class="lands">
                <el-button
                    size="medium"
                    type="primary"
                    style="width:40%;"
                    @click.native.prevent="takePhototoLogin()"
                >
                    <span v-if="!loading">登 录</span>
                    <span v-else>登录中...</span>
                </el-button>
                <el-button
                    size="medium"
                    type="primary"
                    style="width:40%;"
                    @click.native.prevent="toLogin()"
                >
                    <span>返 回</span>
                </el-button>
            </el-form-item>
        </el-form>
        <div></div>
    </div>
</template>

<script>
import takePhoto from "@/components/takePhoto.vue";
export default {
    components: { takePhoto },
    name: "Login",
    data() {
        return {
            isSignForm: false,
            loading: false,
            isLoginForm: true,
            isFaceLoginForm: false,
            faceloginForm: {},
            statusMsg: "kkkkk",
            status: 1,
            cookiePassword: "",
            loginForm: {
                username: "",
                password: "",
            },
            rememberMe: false,
            signForm: {
                username: "",
                password: "",
                surePassword: "",
                regSex: "",
                regAge: "",
                regMail: "",
            },
            options: [
                { label: "女", value: "女" },
                { label: "男", value: "男" },
            ],
            value: "",
            rules: {
                username: [
                    {
                        required: true,
                        trigger: "blur",
                        message: "用户名不能为空",
                    },
                ],
                password: [
                    {
                        required: true,
                        trigger: "blur",
                        message: "密码不能为空",
                    },
                    {
                        pattern: /^(?![A-Za-z]+$)(?![A-Z0-9]+$)(?![a-z0-9]+$)(?![a-z\W_!@#$%^&*`~()-+=]+$)(?![A-Z\W_!@#$%^&*`~()-+=+$)(?![0-9\W_!@#$%^&*`~()-+=]+$)[a-zA-Z0-9\W_!@#$%^&*`~()-+=]{8,16}$/,
                        message:
                            "密码需8-16位(包含大小写字母、特殊符号、数字中的任意三项)",
                        trigger: "blur",
                    },
                ],
                surePassword: [
                    {
                        validator: (rule, value, callback) => {
                            if (value != this.signForm.password) {
                                callback(new Error("两次输入的密码不一致"));
                            } else {
                                callback(); //必须要有回调，要不然表单无法提交
                            }
                        },
                        trigger: "blur",
                    },
                ],
                regMail: [
                    {
                        required: true,
                        message: "邮箱不能为空",
                        trigger: "blur",
                    },
                    {
                        type: "email",
                        message: "请输入正确的邮箱格式",
                        trigger: "blur",
                    },
                ],
            },
            redirect: undefined,
        };
    },
    watch: {
        rememberMe(newVal) {
            console.log(newVal);
            if (newVal == true) {
                localStorage.setItem("username", this.loginForm.username);
                localStorage.setItem("password", this.loginForm.password);
            } else {
                localStorage.clear();
            }
        },
        immediate: true,
    },
    mounted() {
        if (
            localStorage.getItem("username") &&
            localStorage.getItem("password")
        ) {
            this.loginForm.username = localStorage.getItem("username");
            this.loginForm.password = localStorage.getItem("password");
        }
    },
    methods: {
        handleSign() {
            this.$refs.signForm.validate((valid) => {
                if (valid) {
                    this.loading = true;
                    let un=this.signForm.username;
                    let pw=this.signForm.password;
                    let data = {
                        user: {
                            username: this.signForm.username,
                            password: this.signForm.password,
                            regAge: this.signForm.regAge,
                            regSex: this.value,
                            regEmail: this.signForm.regMail,
                        },
                    };
                    this.$axios
                        .post("api/user/register", data)
                        .then((res) => {
                            if (res.data.state == "success") {
                                this.$axios
                                    .post("api/user/login", {username:un,password:pw})
                                    .then((res) => {
                                        if (res.data.data!= null) {
                                            sessionStorage.setItem(
                                                "user",
                                                JSON.stringify(res.data.data)
                                            );
                                            this.$router.push("art");
                                        } else {
                                            alert(res.data.messgge);
                                            this.loading = false;
                                        }
                                    })
                                    .catch((err) => {
                                        console.log(err);
                                        this.loading = false;
                                    });
                            } else {
                                alert(res.data.messgge);
                                this.loading = false;
                            }
                        })
                        .catch((err) => {
                            console.log(err);
                            this.loading = false;
                        });
                }
            });
        },
        handleLogin() {
            this.$refs.loginForm.validate((valid) => {
                if (valid) {
                    this.loading = true;
                    let data = {
                        username: this.loginForm.username,
                        password: this.loginForm.password,
                    };
                    this.$axios
                        .post("api/user/login", data)
                        .then((res) => {
                            if (res.data.data!=null) {
                              console.log(res.data.data)
                                sessionStorage.setItem(
                                    "user",
                                    JSON.stringify(res.data.data)
                                );
                                this.$router.push("art");
                            } else {
                                alert(res.data.data.messgge);
                                this.loading = false;
                            }
                        })
                        .catch((err) => {
                            console.log(err);
                            this.loading = false;
                        });
                }
            });
        },
        toSign() {
            this.isLoginForm = false;
            this.isSignForm = true;
            this.$refs.loginForm.resetFields();
        },
        toLogin() {
            this.isSignForm = false;
            this.isLoginForm = true;
            this.$refs.photo.track.stop();
            this.status = 1;
            this.isFaceLoginForm = false;
            this.$refs.signForm.resetFields();
        },
        face() {
            this.isFaceLoginForm = true;
            this.isSignForm = false;
            this.isLoginForm = false;
            this.$refs.signForm.resetFields();
            this.$refs.loginForm.resetFields();
            this.handleTakePhoto();
        },
        takePhototoLogin() {
            this.$refs.photo.takePhoto((res, img) => {
                if (res) {
                    this.status = 3;
                    this.loading = true;
                    let data = {
                        baseUrl: img.src,
                    };
                    this.$axios
                        .post("api/utils/faceCompare", data)
                        .then((res) => {
                            if (res.data.data!=null) {
                                sessionStorage.setItem("user", JSON.stringify(res.data.data));
                                this.$router.push("art");
                            } else {
                                alert(res.data.messgge);
                                this.loading = false;
                            }
                        })
                        .catch((err) => {
                            console.log(err);
                            this.loading = false;
                        });
                } else {
                    alert("未发现设备");
                }
            });
        },
        handleTakePhoto() {
            let takePhototoLogin = this.takePhototoLogin;
            if (this.status === 1) {
                // 初始化摄像头
                this.$refs.photo.init((res) => {
                    if (res) {
                        this.status = 2;
                    }
                });
            }
        },
    },
};
</script>

<style rel="stylesheet/css">
.login {
    position: absolute;
    width: 100%;
    display: flex;
    justify-content: center;
    align-items: center;
    height: 100%;
    background-image: url("../assets/image/login-background.jpg");
    background-size: cover;
}
.title {
    margin: 0px auto 30px auto;
    text-align: center;
    color: #707070;
}
.facelogin-form {
    border-radius: 6px;
    background: #ffffff;
    width: 400px;
    padding: 25px 25px 25px 25px;
}
.login-form {
    border-radius: 6px;
    background: #ffffff;
    width: 400px;
    padding: 25px 25px 25px 25px;
}
.login-form .el-input {
    height: 38px;
}
.login-form .el-input input {
    height: 38px;
}
.login-form .input-icon {
    height: 39px;
    width: 14px;
    margin-left: 2px;
}
.el-select .el-input--suffix .el-input__inner {
    padding-left: 30px;
    width: 100%;
}
.el-select {
    width: 100%;
}
.login-tip {
    font-size: 13px;
    text-align: center;
    color: #bfbfbf;
}
.el-login-footer {
    height: 40px;
    line-height: 40px;
    position: fixed;
    bottom: 0;
    width: 100%;
    text-align: center;
    color: #fff;
    font-family: Arial;
    font-size: 12px;
    letter-spacing: 1px;
}
.lands {
    margin-bottom: 0px;
}
.lands .el-form-item__content {
    width: 100%;
}
.lands .el-form-item__content {
    display: flex;
    justify-content: space-between;
}
.facelogin-form {
    text-align: center;
}
</style>
