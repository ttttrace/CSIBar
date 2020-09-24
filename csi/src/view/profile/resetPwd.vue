<template>
    <el-form ref="form" :model="userPassword" :rules="rules" label-width="80px">
        <el-form-item label="新密码" prop="newPassword">
            <el-input v-model="userPassword.newPassword" placeholder="请输入新密码" type="password" />
        </el-form-item>
        <el-form-item label="确认密码" prop="confirmPassword">
            <el-input v-model="userPassword.confirmPassword" placeholder="请确认密码" type="password" />
        </el-form-item>
        <el-form-item>
            <el-button type="primary" size="mini" @click="updateUser">保存</el-button>
        </el-form-item>
    </el-form>
</template>

<script>
//import { updateUserPwd } from "@/api/system/user";

export default {
  props: {
    user: {
      type: Object,
    },
  },
    data() {
        const equalToPassword = (rule, value, callback) => {
            if (this.userPassword.newPassword !== value) {
                callback(new Error("两次输入的密码不一致"));
            } else {
                callback();
            }
        };
        return {
            test: "1test",
          userPassword:{
            newPassword:'',
            confirmPassword:''
          },
            // 表单校验
            rules: {
                newPassword: [
                    {
                        required: true,
                        message: "新密码不能为空",
                        trigger: "blur",
                    },
                    {
                        pattern: /^(?![A-Za-z]+$)(?![A-Z0-9]+$)(?![a-z0-9]+$)(?![a-z\W_!@#$%^&*`~()-+=]+$)(?![A-Z\W_!@#$%^&*`~()-+=+$)(?![0-9\W_!@#$%^&*`~()-+=]+$)[a-zA-Z0-9\W_!@#$%^&*`~()-+=]{8,16}$/,
                        message:
                        "密码需8-16位(包含大小写字母、特殊符号、数字中的任意三项)",
                        trigger: "blur",
                    },
                ],
                confirmPassword: [
                    {
                        required: true,
                        message: "确认密码不能为空",
                        trigger: "blur",
                    },
                    {
                        required: true,
                        validator: equalToPassword,
                        trigger: "blur",
                    },
                ],
            },
        };
    },
    methods: {
        updateUser() {
            this.$refs["form"].validate((valid) => {
                if (valid) {
                    let data = {
                        user: {
                            password: this.userPassword.newPassword,
                            userId: this.user.userId

                        }}
                    this.$axios.post("api/user/updateUserPassword",data)
                    .then((response) => {
                        if (response.data.state == 'success') {
                          this.$message({
                            message: '修改成功',
                            type: 'success'
                          });
                          this.$axios.post("api/user/logout",{userId:this.user.userId})
                          .then(
                            res=>{
                              sessionStorage.clear();
                              this.$router.push("/")
                            }
                          ).catch()
                        } else {
                          this.$message.error( response.data.message)
                        }
                    });
                }
            });
        },
    },
};
</script>
