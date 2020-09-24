<template>
    <div>
        <div class="article">
            <div class="header">我的评论</div>
            <div style="height:50px;text-align: center;line-height: 50px" v-if="this.comments.length===0">暂无数据</div>
            <div class="mentContent" v-for="item in showList" :key="item.commentId" >
                <el-row>
                    <el-col v-html="item.cmText"></el-col>
                </el-row>
                <el-row style="font-size:13px;color:#999aaa">
                    评论时间: {{item.cmTime}} | 评论文章:<router-link :to="{path:'/myComment/article',query:{articleId:item.articleId}}">{{item.postTitle}}</router-link> |
                    <router-link :to="{path:'/myComment/editComment',query:{commentId:item.commentId}}">评论编辑</router-link> |
                    <i
                        class="el-icon-microphone"
                        size="small"
                        @click="readComment(item.commentId,item.cmText)"
                    ></i>
                    <audio :id="'audio'+item.commentId" autoplay controls="controls"></audio>
                    <el-button type="danger" size="mini" @click="deleteComment(item.commentId)">删除</el-button>
                </el-row>
            </div>
        </div>
        <el-row style="justify-content:center">
            <el-pagination
                @size-change="handleSizeChange"
                @current-change="handleCurrentChange"
                :current-page="currentPage"
                :page-sizes="[5,10,15]"
                :page-size="10"
                layout="total, sizes, prev, pager, next, jumper"
                :total="total"
            ></el-pagination>
        </el-row>
    </div>
</template>

<style scoped>
.article,
.conment {
    border: 1px solid #e2e6ed;
    border-radius: 8px;
    background: #fff;
}
.article:hover {
    box-shadow: 0 1px 1px rgba(0, 0, 0, 0.08);
}

.conment:hover {
    box-shadow: 0 1px 1px rgba(0, 0, 0, 0.08);
}
.article .header,
.conment .header {
    padding: 10px 20px;
    background-color: #1890ff;
    border-radius: 8px 8px 0px 0px;
    color: #fff;
}
.el-row {
    padding: 10px 30px;
    display: flex;
    align-items: center;
}
.mentContent {
    border-bottom: 1px solid #e2e6ed;
    border-radius: 0px 0px 8px 8px;
}
.el-icon-microphone {
    cursor: pointer;
}
audio {
    width: 280px;
    height: 20px;
}
a {
    text-decoration: none;
}
</style>

<script>
export default {
    data() {
        return {
            currentPage: 1,
            total: 0,
            pageSize: 10,
            comments: [],
            showList: [],
        };
    },
    mounted() {
        this.getComments();
    },
    methods: {
        handleSizeChange(val) {
            this.pageSize = val;
            this.goPage();
        },
        handleCurrentChange(val) {
            this.currentPage = val;
            this.goPage();
        },
        deleteComment(commentId){
            this.$axios.post("api/comment/deleteCommentById",{commentId:commentId})
            .then(res=>{
              if(res.data.state==='success'){
                this.$message.success("删除成功")
              }else{
                this.$message.error("删除失败")
              }
            }).catch()
            this.getComments()
        },
        readComment(id, text) {
            let str=text.replace(/<[^>]+>/g,'');
            let x = document.getElementById("audio" + id);
            let user = JSON.parse(sessionStorage.getItem("user"));
            let data = {
                userId: user.userId,
                audioText: str,
            };
            this.$axios
                .post("api/utils/textToAudio", data, {
                    responseType: "blob",
                })
                .then((res) => {
                    let data = res.data;
                    let audio = new Blob([data], { type: "audio/mp3" });
                    x.src = window.URL.createObjectURL(audio);
                })
                .catch();
        },
        goPage() {
            let start = (this.currentPage - 1) * this.pageSize;
            let last = this.currentPage * this.pageSize;
            let end = 0;
            if (last <= this.comments.length) {
                end = last;
            } else {
                end = this.comments.length;
            }
            this.showList = this.comments.slice(start, end);
        },
        getComments() {
            let user = JSON.parse(sessionStorage.getItem("user"));
            //console.log(user)
            this.$axios
                .post("api/user/findAllCommentByUserId", {
                    userId: user.userId,
                })
                .then((res) => {
                    if (res.data.data.length > 0) {
                        this.comments = res.data.data;
                        this.total = res.data.data.length;
                        this.goPage()
                    }
                })
                .catch();
        },
    },
};
</script>
