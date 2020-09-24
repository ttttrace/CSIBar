<template>
    <div>
        <div class="article">
            <div class="header">文章</div>
            <el-row>
                <el-col :span="2" style="height:100px">
                    <el-avatar :src="article.avatar" shape="square" :size="100" style="cursor: pointer;"></el-avatar>
                </el-col>
                <el-col :span="15" style="font-size:14px">
                    <div>主题：{{article.postTitle}}</div>
                    <div>发帖人：{{article.username}}</div>
                    <div>发帖人注册时间：{{article.regTime}}</div>
                    <div>发帖时间：{{article.postTime}}</div>
                </el-col>
                <el-col :span="7" style="display:flex;justify-content:flex-end;align-items:center">
                      <audio id="audio" autoplay="autoplay" ref="audioArticle" controls="controls">
                      </audio>
                    <i class="el-icon-microphone" size="small" @click="readArticle"></i>
                </el-col>
            </el-row>
            <el-row style="padding-left:130px" v-html="article.postText"></el-row>

            <el-row>
                <el-col style="text-align:right">
                    <el-button type="success" size="small" @click="toAddComment(article.articleId)">发表评论</el-button>
                    <el-button type="danger" size="small" v-if="isAdmin||isMine" @click="deleteArticle">删除文章</el-button>
                    <el-button type="warning" size="small" v-if="isAdmin||isMine" @click="deleteAllComments">删除所有评论</el-button>
                </el-col>
            </el-row>
        </div>
        <br />
        <br />
        <div class="conment">
            <div class="header">评论</div>
            <div style="height:50px;text-align: center;line-height: 50px" v-if="this.comments.length===0">暂无评论</div>
            <div class="mentContent" v-for="comment in showList" :key="comment.commentId" >
                <el-row>
                    <el-col :span="2" style="height:100px">
                        <el-avatar :src="comment.regPhoto" shape="square" :size="100" style="cursor: pointer;"></el-avatar>
                    </el-col>
                    <el-col :span="15" style="font-size:14px">
                        <div>主题：{{article.postTitle}}</div>
                        <div>发帖人：{{comment.username}}</div>
                        <div>发帖人注册时间：{{comment.regTime}}</div>
                        <div>发帖时间：{{comment.cmTime}}</div>
                    </el-col>
                    <el-col :span="7" style="display:flex;justify-content:flex-end;align-items:center">
                      <audio :id="'audio'+comment.commentId" controls="controls"></audio>
                    <i class="el-icon-microphone" size="small" @click="readComment(comment.commentId,comment.cmText)"></i></el-col>

                </el-row>
                <el-row style="padding-left:130px" v-html="comment.cmText"></el-row>
                <el-row>
                    <el-col style="text-align:right">
                        <el-button type="danger" size="small" v-show="isAdmin||comment.userId==userId" @click="deleteComment(comment.commentId)">删除</el-button>
                    </el-col>
                </el-row>
            </div>
        </div>
      <el-footer style="height:39px;text-align: center;">
        <el-pagination
          @size-change="handleSizeChange"
          @current-change="handleCurrentChange"
          :current-page="currentPage"
          :page-sizes="[5,10,15]"
          :page-size="10"
          :total="total"
          layout="total,sizes, prev, pager, next, jumper"

        ></el-pagination>
      </el-footer>
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
.mentContent{
    border: 1px solid #e2e6ed;
}
.el-icon-microphone{
    cursor: pointer;
}
audio{
    width:280px;
    height:30px;
}
  .el-avatar>>>img{
    width:100%
  }
</style>

<script>
export default {
  data(){
    return{
      isAdmin:false,
      isMine:false,
      currentPage:1,
      comments:[],
      showList:[],
      user:{},
      userId:"",
      article:{
        avatar:'',
        articleId:"",
        postTitle:"",
        username:"",
        postTime:"",
        regTime:"",
        postText:""
      },
      total:1,
      pageSize:10,
    }
  },
    methods:{
      handleSizeChange(val) {
        this.pageSize = val;
        this.goPage();
      },
      handleCurrentChange(val) {
        this.currentPage = val;
        this.goPage();
      },
      toAddComment(articleId){
        let list= this.$store.state.breadcumb.list
        this.$router.push({path:list[list.length-2].path+"/addComment",query:{articleId:articleId}})
      },
      deleteAllComments(){
           this.$axios
          .post(
            "/api/comment/deleteAllCommentsByArticleId",
            {articleId: this.article.articleId}
          )
          .then(res=>{
            if(res.data.state==='success'){
                this.$message.success("删除成功");
                this.getComments();
            }else{
                this.$message.error("删除失败");
            }
          }).catch()
          this.getComments();
      },
      deleteComment(commentId){
            this.$axios.post("api/comment/deleteCommentById",{commentId:commentId})
            .then(res=>{
              if(res.data.state==='success'){
                this.$message.success("删除成功")
                this.getComments();
              }else{
                this.$message.error("删除失败")
              }
            }).catch()
        this.getComments()
      },
      deleteArticle(){
        this.$axios
          .post(
            "/api/article/deleteArticleById",
            {articleId: this.article.articleId}
          )
          .then(res=>{
            let list= this.$store.state.breadcumb.list
            this.$router.push(list[list.length-2].path)
          }).catch()
      },
      readComment(commentId,text){
        let str=text.replace(/<[^<>]+>/g,'');
        str = str.replace(/&nbsp;/ig, '');
        let data={
          userId: this.user.userId,
          audioText: str
        }
        let audioComment=document.getElementById('audio'+commentId);
        this.$axios.post("api/utils/textToAudio",data, {
          responseType: 'blob'
        })
          .then(res=>{
            let data = res.data;
            let audio = new Blob([data], {type: 'audio/mp3'});
            audioComment.src = window.URL.createObjectURL(audio);

          }).catch()
      },
        readArticle(){
            let str=this.article.postText.replace(/<[^>]+>/g,'');
            str = str.replace(/&nbsp;/g, '')
            let data={
              userId: this.user.userId,
              audioText: str
            }
            this.$axios.post("api/utils/textToAudio",data, {
              responseType: 'blob'
            })
          .then(res=>{
            let data = res.data;
            let audio = new Blob([data], {type: 'audio/mp3'});
            this.$refs.audioArticle.src = window.URL.createObjectURL(audio);
          }).catch()
        },
        getComments(){
          let data={
            articleId:this.$route.query.articleId,
          }
          this.$axios.post("api/comment/queryUserCommentsInfo",data)
          .then(
            res=>{
              this.comments=res.data.data;
              this.total=res.data.data.length;
              this.goPage();
            }
          ).catch()


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
        getArticle(){
          this.$axios.post("api/article/queryByArticleId",{articleId:this.article.articleId})
          .then(res=>{
              if(res.data.data!='null'){
                let result=res.data.data;
                this.article.postTitle=result.postTitle;
                this.article.postTime=result.postTime;
                this.article.postText=result.postText;
                  this.$axios.post("api/user/queryUserById",{userId:result.userId})
                  .then(res=>{
                    if(res.data.data!=null){
                      this.article.username=res.data.data.username;
                      this.article.regTime=res.data.data.regTime;
                      this.article.avatar=res.data.data.regPhoto;
                      if(res.data.data.admin==="admin"){
                        this.isAdmin=true;
                      }
                      if(res.data.data.userId===this.user.userId){
                        this.isMine=true;
                      }
                    }else{
                      alert(res.data.message)
                    }
                  })
                  .catch()

              }else{
                alert(res.data.message)
              }
          })
          .catch()
        }
    },
  created() {
    this.user=JSON.parse(sessionStorage.getItem("user"));
    this.userId=this.user.userId;
    this.article.articleId=this.$route.query.articleId;
    this.getArticle();
    this.getComments();
  }
}
</script>
