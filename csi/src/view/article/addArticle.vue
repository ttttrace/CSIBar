<template>
    <div>
        <el-row>
            <el-col :span="3"><div>&nbsp;</div></el-col>
            <el-col :span='2'><span style="line-height:40.4px">文章标题:</span></el-col>
            <el-col :span='16'><el-input v-model="articleTitle"></el-input></el-col>
            <el-col :span="3"><div>&nbsp;</div></el-col>
        </el-row><br><br>
        <el-row>
            <el-col :span="3"><div>&nbsp;</div></el-col>
            <el-col :span='2'><span style="line-height:40.4px">文章内容:</span></el-col>
            <el-col :span='16'> <editor-bar v-on:url="getImgs" v-model="detail" :isClear="isClear"></editor-bar></el-col>
            <el-col :span="3"><div>&nbsp;</div></el-col>
        </el-row><br><br>
       <el-row>
          <el-col :span="5"><div>&nbsp;</div></el-col>
            <el-col :span='6' style="text-align:center"><el-button type="primary" @click="submit">提交</el-button></el-col>
            <el-col :span="2"><div>&nbsp;</div></el-col>
            <el-col :span='6' style="text-align:center"><el-button @click="back">返回</el-button></el-col>
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
import {mapState} from "vuex";
export default {
    name: "addArticle",
    data() {
        return {
            getImgs: "",
            detail: "",
            isClear: "",
            articleTitle:"",
            article:{
              userId: "",
              postTitle: "",
              postText: "",
            },
            user:{},
        };
    },
    components: {
        EditorBar,
    },
    mounted(){
        let user=JSON.parse(sessionStorage.getItem("user"));
        this.user=user;

    },
  computed:{
    ...mapState(["breadcumb"]),
  },
    methods:{
        back(){
            let list= this.$store.state.breadcumb.list
            this.$router.push(list[list.length-2].path)
        },
        submit(){
            if(this.articleTitle!=""&&this.detail!=""){
                this.article.userId=this.user.userId;
              this.article.postTitle=this.articleTitle;
              this.article.postText=this.detail;
                this.$axios.post("api/article/addArticle",this.article)
                .then(res=>{
                    if(res.data.state=='success'){
                     let list= this.$store.state.breadcumb.list
                     this.$router.push(list[list.length-2].path)
                    }
                    else{
                        alert(res.data.message)
                    }
                }).catch()
            }else{
                alert("文章标题与文章内容不能为空！")
            }
        }
    }
};
</script>

