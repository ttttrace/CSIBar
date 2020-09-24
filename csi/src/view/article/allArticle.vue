<template>
    <div>
        <el-main>
            <el-row>
                <el-col :span="2">
                    <span style="font-weight:bold;line-height:40px">文章标题：</span>
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
                    <el-button
                        icon="el-icon-delete"
                        type="danger"
                        @click="deleteArticle()"
                        v-if="isAdmin"
                    >删除</el-button>
                </el-col>
            </el-row>
            <br />
            <el-table :data="showInfos" style="width:100%" @selection-change="changed">
                <el-table-column align="center" type="selection"></el-table-column>
                <el-table-column align="center" prop="count" label="评论人数"></el-table-column>
                <el-table-column align="center" prop="postTitle" label="文章标题">
                    <template slot-scope="scope">
                        <router-link
                            :to="{path:'/art/articleDetail',query:{articleId:scope.row.articleId}}"
                        >{{scope.row.postTitle}}</router-link>
                    </template>
                </el-table-column>
                <el-table-column align="center" prop="username" label="文章作者"></el-table-column>
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
    name: "allArticle",
    data() {
        return {
            user: {},
            show: false,
            keyWord: "",
            articles: [],
            checkList: [],
            currentPage: 1,
            total: 1,
            showInfos: [],
            pageSize: 10,
            labelPosition: "left",
            isAdmin: false,
        };
    },
    mounted() {
        this.user = JSON.parse(sessionStorage.getItem("user"));
        this.isAdmin = this.user.admin != "normal";
        this.getAllArticles();
    },
    methods: {
        deleteArticle() {
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
                                    this.getAllArticles();
                                }
                            })
                            .catch((err) => {
                                alert("删除失败");
                                console.log(err);
                            });
                    }
                    this.getAllArticles();
                }
            } else {
                alert("未选中任何选项！");
            }
            this.getAllArticles();
        },
        handleSizeChange(val) {
            this.pageSize = val;
            this.goPage();
        },
        handleCurrentChange(val) {
            this.currentPage = val;
            this.goPage();
        },
        changed(selection) {
            this.checkList = [];
            console.log(selection);
            for (var i = 0; i < selection.length; ++i) {
                this.checkList.push(selection[i].articleId);
            }
        },
        jumpToAddPage() {
            this.$router.push("/art/addArt");
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
            this.getAllArticles();
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
            this.showInfos = this.articles.slice(start, end);
        },
        getAllArticles() {
            this.$axios
                .post("/api/article/findAllArticleInfos")
                .then((response) => {
                    if (response.data.data.length > 0) {
                        this.articles = response.data.data;
                        this.goPage();
                        this.total = response.data.data.length;
                    }
                })
                .catch((error) => {
                    console.error(error);
                });

        },
    },
};
</script>
