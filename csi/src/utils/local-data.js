/*-------------------------router面包屑-start---------------------------------------*/
const routerBreadcrumb = {
    // 内容管理-文章管理
    allArticle: {
        list: [
            { name: "所有文章", path: "/art" }
        ]
    },
    addArticle: {
        list: [
            { name: "所有文章", path: "/art" },
            { name: "新增文章", path: "/art/addArt" }
        ]
    },
    articleDetail: {
        list: [
            { name: "所有文章", path: "/art" },
            { name: "文章详情", path: "/art/articleDetail" }
        ]
    },
    myArticle: {
        list: [
            { name: "我的文章", path: "/myArticle" }
        ]
    },
    addMyArticle: {
        list: [
            { name: "我的文章", path: "/myArticle" },
            { name: "新增文章", path: "/myArticle/addArt" }
        ]
    },
    myArticleDetail: {
        list: [
            { name: "我的文章", path: "/myArticle" },
            { name: "文章详情", path: "/myArticle/articleDetail" }
        ]
    },
  myArticleAddComment: {
    list: [
      { name: "我的文章", path: "/myArticle" },
      { name: "文章详情", path: "/myArticle/articleDetail" },
      { name: "发表评论", path: "/myArticle/addComment" }
    ]
  },
    audioSetting: {
        list: [
            { name: '语音设置', path: '/audioSetting' }
        ]
    },
    myComment:{
        list:[
            {name:'我的评论', path:'/myComment'}
        ]
    },
    addComment:{
        list:[
            { name: "所有文章", path: "/art" },
            { name: "文章详情", path: "/art/articleDetail" },
            { name: "发表评论", path: "/art/addComment"},
        ]
    },
    editComment:{
        list:[
            {name:'我的评论', path:'/myComment'},
            {name:'评论编辑', path:'/myComment/editComment'}
        ]
    },
    articleDetailInComment: {
      list: [
        {name:'我的评论', path:'/myComment'},
        {name: "文章详情", path: "/myComment/article"},
      ]
    },
    addCommentInComment: {
        list: [
          {name:'我的评论', path:'/myComment'},
          {name: '文章详情', path: '/myComment/article'},
          {name:'发表评论', path:'/myComment/addComment'},
        ]
      },
    setting:{
        list:[
            {name:'个人设置', path:'/setting'},
        ]
    },
    // // 内容管理-首页管理
    // indexList: {
    //   list: [
    //     {name: "内容管理", path: ""},
    //     {name: "首页管理", path: "/indexList"}
    //   ]
    // },
}
/*-------------------------router面包屑-end---------------------------------*/
export {
    routerBreadcrumb,
    // ...
}
