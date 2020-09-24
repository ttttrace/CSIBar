<template>
    <div>
        <el-main>
            <el-row>
                <el-col :span="2">
                    <span style="font-weight:bold;line-height:40.4px">文章标题：</span>
                </el-col>
                <el-col :span="7">
                    <el-input v-model="keyWord" placeholder="请输入文章标题"></el-input>
                </el-col>
                <el-col :span="14">
                    <el-button icon="el-icon-search" @click="search()">搜索</el-button>
                    <el-button v-if="show" @click="back()">重置</el-button>
                </el-col>
            </el-row>
            <br />
            <el-row>
                <el-col :span="6">
                    <el-button icon="el-icon-plus" type="primary" @click="jumpToAddPage()">增加</el-button>
                    <el-button icon="el-icon-delete" type="danger" @click="deleteArticles()">删除</el-button>
                </el-col>
            </el-row>
            <br />
            <el-table :data="showList" stripe style="width:100%" @selection-change="changed">
                <el-table-column align="center" type="selection"></el-table-column>
                <el-table-column align="center" prop="count" label="评论人数"></el-table-column>
                <el-table-column align="center" prop="postTitle" label="文章标题">
                    <template slot-scope="scope">
                        <router-link
                            :to="{path:'/myArticle/articleDetail',query:{articleId:scope.row.articleId}}"
                        >{{scope.row.postTitle}}</router-link>
                    </template>
                </el-table-column>
                <el-table-column align="center" prop="author" label="文章作者"></el-table-column>
                <el-table-column align="center" prop="postTime" label="发表日期"></el-table-column>
                <el-table-column align="center" prop="cmTime" label="最后评论"></el-table-column>
            </el-table>
        </el-main>
        <el-footer style="height:39px;text-align: center;">
            <el-pagination
                @size-change="handleSizeChange"
                @current-change="handleCurrentChange"
                :current-page="currentPage"
                :page-sizes="[5,10,15]"
                :page-size="10"
                layout="total, sizes, prev, pager, next, jumper"
                :total="total"
            ></el-pagination>
        </el-footer>
    </div>
</template>
<style scoped>
a {
    color: #1890ff;
    text-decoration: none;
}
</style>
<script>
export default {
    name: "myArticle",
    data() {
        return {
            show: false,
            keyWord: "",
            articles: [],
            checkList: [],
            currentPage: 1,
            total: 1,
            showList: [],
            pageSize: 10,
            labelPosition: "left",
            user: {},
        };
    },
    mounted() {
        let user = JSON.parse(sessionStorage.getItem("user"));
        this.user = user;
        this.getArticles();
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
        search() {
            let list = [];
            for (let item of this.articles) {
                if (item.postTitle == this.keyWord) {
                    list.push(item);
                }
            }
            this.show=true;
            this.articles = [];
            this.articles = list;
            this.goPage();
        },
        back() {
            this.show=false;
            this.getArticles();
        },
        deleteArticles() {
            if (this.checkList.length > 0) {
                if (confirm("确认删除？")) {
                    for (var i = 0; i < this.checkList.length; ++i) {
                        this.$axios
                            .post("/api/article/deleteArticleById", {
                                articleId: this.checkList[i],
                            })
                            .then((res) => {
                                if (res.data.state == "success") {
                                    this.checkList = [];
                                    this.$message.success("删除成功");
                                    this.getArticles();
                                }
                            })
                            .catch((err) => {
                                alert("删除失败");
                                console.log(err);
                            });
                    }
                    this.getArticles();
                }
            } else {
                alert("未选中任何选项！");
            }
          this.getArticles();
        },
        changed(selection) {
            this.checkList = [];
            console.log(selection);
            for (var i = 0; i < selection.length; ++i) {
                this.checkList.push(selection[i].articleId);
            }
        },
        jumpToAddPage() {
            this.$router.push("/myArticle/addArt");
        },
        goPage() {
            let start = (this.currentPage - 1) * this.pageSize;
            let last = this.currentPage * this.pageSize;
            let end = 0;
            if (last <= this.articles.length) {
                end = last;
            } else {
                end = this.articles.length;
            }
            this.showList = this.articles.slice(start, end);
        },
        getArticles() {
            this.$axios
                .post("/api/article/findUserArticleComments", {
                    userId: this.user.userId,
                })
                .then((response) => {
                    if (response.data.data.length > 0) {
                        this.articles = response.data.data;
                        this.total = response.data.data.length;
                        this.goPage();
                    }
                })
                .catch((error) => {
                    console.error(error);
                });
        },
    },
};
</script>
