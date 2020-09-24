<template>
    <div>
        <el-row>
            <el-col :span="3">
                <div>&nbsp;</div>
            </el-col>
            <el-col :span="2">
                <span style="line-height:40.4px">发声人:</span>
            </el-col>
            <el-col :span="16">
                <el-select v-model="autoSetVoiPer" placeholder="发声人">
                    <el-option
                        v-for="item in VoiPers"
                        :key="item.value"
                        :label="item.label"
                        :value="item.value"
                    ></el-option>
                </el-select>
            </el-col>
            <el-col :span="3">
                <div>&nbsp;</div>
            </el-col>
        </el-row>
        <br />
        <br />
        <el-row>
            <el-col :span="3">
                <div>&nbsp;</div>
            </el-col>
            <el-col :span="2">
                <span style="line-height:40.4px">语速:</span>
            </el-col>
            <el-col :span="16">
                <el-select v-model="auSetSpd" placeholder="语速">
                    <el-option v-for="index in 15" :key="index" :label="index" :value="index"></el-option>
                </el-select>
            </el-col>
            <el-col :span="3">
                <div>&nbsp;</div>
            </el-col>
        </el-row>
        <br />
        <br />
        <el-row>
            <el-col :span="3">
                <div>&nbsp;</div>
            </el-col>
            <el-col :span="2">
                <span style="line-height:40.4px">音调:</span>
            </el-col>
            <el-col :span="16">
                <el-select v-model="auSetPit" placeholder="音调">
                    <el-option v-for="index in 15" :key="index" :label="index" :value="index"></el-option>
                </el-select>
            </el-col>
            <el-col :span="3">
                <div>&nbsp;</div>
            </el-col>
        </el-row>
        <br />
        <br />
        <el-row>
            <el-col :span="3">
                <div>&nbsp;</div>
            </el-col>
            <el-col :span="2">
                <span style="line-height:40.4px">音量:</span>
            </el-col>
            <el-col :span="16">
                <el-select v-model="auSetVol" placeholder="音量">
                    <el-option v-for="index in 15" :key="index" :label="index" :value="index"></el-option>
                </el-select>
            </el-col>
            <el-col :span="3">
                <div>&nbsp;</div>
            </el-col>
        </el-row>
        <br />
        <br />
        <el-row>
            <el-col style="text-align:center">
                <el-button type="primary" @click="updateAudio">提交</el-button>
            </el-col>
        </el-row>
    </div>
</template>

<style scoped>
.el-button {
    width: 250px;
}
.el-select {
    width: 100%;
}
</style>
<script>
export default {
    name: "audioSetting",
    data() {
        return {
            user: {},
            auSetVol: "",
            autoSetVoiPer: "",
            auSetSpd: "",
            auSetPit: "",
            VoiPers: [
                { label: "度小美", value: 0 },
                { label: "度小字", value: 1 },
                { label: "度逍遥", value: 3 },
                { label: "度丫丫", value: 4 },
            ],
        };
    },
    mounted() {
        this.user=JSON.parse(sessionStorage.getItem("user"));
        this.getAudioConfig();
    },
    methods: {
        getAudioConfig() {
            let data = {
                userId: this.user.userId,
            }
            this.$axios.post("api/audio/loadUserConfig", data)
                .then(res => {
                    if (res.data.data != null) {
                        this.auSetVol = res.data.data.auSetVol;
                        this.autoSetVoiPer = res.data.data.autoSetVoiPer;
                        this.auSetSpd = res.data.data.auSetSpd;
                        this.auSetPit = res.data.data.auSetPit;
                    }
                }).catch();
        },
        updateAudio() {
            let data = {
                audioConfig: {
                    userId: this.user.userId,
                    auSetVol: this.auSetVol,
                    autoSetVoiPer:this.autoSetVoiPer,
                    auSetSpd: this.auSetSpd,
                    auSetPit: this.auSetPit,
                },
            };
            this.$axios.post("api/audio/updateUserConfig",data)
            .then(res=>{
                if(res.data.state=="error"){
                    this.$message.error("修改失败");
                }else{
                    this.$message.success("修改成功")
                    this.$router.push("/audioSetting");
                }

            }).catch()
        },
    },
};
</script>
