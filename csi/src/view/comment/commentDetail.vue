<template>
    <div>
        <el-row>
            <el-col :span="3"><div>&nbsp;</div></el-col>
            <el-col :span='2'><span style="line-height:40.4px">评论:</span></el-col>
            <el-col :span='16'> <editor-bar v-on:url="getImgs" v-model="detail" :isClear="isClear"></editor-bar></el-col>
            <el-col :span="3"><div>&nbsp;</div></el-col>
        </el-row><br><br>
       <el-row>
          <el-col :span="5"><div>&nbsp;</div></el-col>
            <el-col :span='6' style="text-align:center">
              <el-button type="primary" @click="update" v-if="isEdit">提交</el-button>
              <el-button type="primary" @click="addComment" v-if="isAdd">提交</el-button>
            </el-col>
            <el-col :span="2"><div>&nbsp;</div></el-col>
            <el-col :span='6' style="text-align:center"><el-button @click="back()">返回</el-button></el-col>
            <el-col :span="5"><div>&nbsp;</div></el-col>
       </el-row>
    </div>
</template>

<style scoped>
.el-button{
    width: 250px;
}
</style>

<script>
import EditorBar from "@/components/WangEditor.vue";
export default {
    name: "commentDetail",
    data() {
        return {
            getImgs: "",
            detail: "",
            isClear: "",
            comment:{
              commentId: '',
              articleId: '',
              userId: '',
              cmText: '',
              cmTime: ''
            },
            isAdd:false,
            isEdit:false,
            user:{}
        };
    },
    components: {
        EditorBar,
    },
    mounted() {
      let commentId = this.$route.query.commentId;
      let articleId = this.$route.query. articleId;
      this.user=JSON.parse(sessionStorage.getItem("user"))
      if(commentId){
        this.getComment(commentId)
        this.isEdit=true
      }
      if(articleId){
        this.isAdd=true
      }

    },
    methods:{
        back(){
            let list= this.$store.state.breadcumb.list
            this.$router.push({path:list[list.length-2].path,query:{articleId:this.$route.query.articleId}})
        },
      addComment(){
          this.comment.cmText=this.detail;
          this.comment.userId=this.user.userId;
          this.comment.articleId=this.$route.query.articleId;
          this.$axios.post("api/comment/addComment",this.comment)
          .then(res=>{
            if(res.data.state==='success'){
              let list= this.$store.state.breadcumb.list
              this.$router.push({path:list[list.length-2].path,query:{articleId:this.$route.query.articleId}})
            }
            else{
              this.$message.error("发表评论失败")
            }
          }).catch()

      },
      update(){
        this.comment.cmText=this.detail;
        this.$axios.post("api/comment/updateComment",this.comment)
        .then(res=>{
            if(res.data.state==='success'){
              let list= this.$store.state.breadcumb.list
              this.$router.push({path:list[list.length-2].path,query:{articleId:this.$route.query.articleId}})
            }
            else{
              this.$message.error("更新评论失败")
            }
          }

        ).post()
      },
      getComment(commentId){
        this.$axios.post("api/comment/queryCommentByCommentId",{commentId:commentId})
        .then(res=>{
          if(res.data.data!=null){
            this.comment=res.data.data;
            this.detail=res.data.data.cmText;
          }
        }).catch()
      }
    }
};
</script>

