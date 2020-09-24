<template>
    <el-form ref="form" :model="user" :rules="rules" label-width="80px">
        <el-form-item label="邮箱" prop="regEmail">
            <el-input v-model="user.regEmail" maxlength="50" />
        </el-form-item>
        <el-form-item label="年龄">
            <el-input v-model="user.regAge" maxlength="11" />
        </el-form-item>
        <el-form-item label="性别">
            <el-radio-group v-model="user.regSex">
                <el-radio label="男">男</el-radio>
                <el-radio label="女">女</el-radio>
            </el-radio-group>
        </el-form-item>
        <el-form-item>
            <el-button type="primary" size="mini" @click.native.prevent="updateUser">保存</el-button>
        </el-form-item>
    </el-form>

</template>

<script>
export default {
    props: {
        user: {
            type: Object,
        },
    },
    data() {
        return {
            // 表单校验
            rules: {
                regEmail: [
                    {
                        required: true,
                        message: "邮箱地址不能为空",
                        trigger: "blur",
                    },
                    {
                        type: "email",
                        message: "'请输入正确的邮箱地址",
                        trigger: ["blur", "change"],
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
                            userId:this.user.userId,
                            regAge: this.user.regAge,
                            regEmail: this.user.regEmail,
                            regSex: this.user.regSex,
                        },
                    };
                    this.$axios
                        .post("api/user/updateUser", data)
                        .then((response) => {
                            if (response.data.state === "success") {
                              this.$message({
                                message: '修改成功',
                                type: 'success'
                              });
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
