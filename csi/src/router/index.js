import Vue from 'vue'
import Router from 'vue-router'
import { routerBreadcrumb } from '@/utils/local-data'
import HelloWorld from '@/components/HelloWorld'
import index from '@/view/index'
import Login from '@/view/Login'
import allArticle from '@/view/article/allArticle'
import addArticle from '@/view/article/addArticle'
import audioSetting from '@/view/audio/audioSetting'
import articleDetail from '@/view/article/articleDetail'
import myArticle from '@/view/article/myArticle'
import myComment from '@/view/comment/commentList'
import commentDetail from '@/view/comment/commentDetail'
import setting from '@/view/profile/index'
import store from '@/store'
Vue.use(Router)
const router = new Router({
    routes: [
        {
            path: '/',
            name: 'Login',
            component: Login
        },
        {
            path: '/me',
            name: 'index',
            component: index,
            redirect: "/art",
            children: [
                {
                    path:'/setting',
                    name:'setting',
                    component:setting,
                    meta:{
                        list:routerBreadcrumb.setting.list
                    }
                },
                {
                    path: '/art',
                    name: 'allArticle',
                    component: allArticle,
                    meta: {
                        list: routerBreadcrumb.allArticle.list
                    }
                },
                {
                    path: '/art/addArt',
                    name: 'addArticle',
                    component: addArticle,
                    meta: {
                        list: routerBreadcrumb.addArticle.list
                    }
                },
                {
                    path: '/myArticle/addArt',
                    name: 'addMyArticle',
                    component: addArticle,
                    meta: {
                        list: routerBreadcrumb.addMyArticle.list
                    }
                },
                {

                    path: '/audioSetting',
                    name: 'audioSetting',
                    component: audioSetting,
                    meta: {
                        list: routerBreadcrumb.audioSetting.list
                    }

                },
                {
                    path: '/art/articleDetail',
                    name: '文章详情',
                    component: articleDetail,
                    meta: {
                        list: routerBreadcrumb.articleDetail.list
                    }
                },
                {
                    path: '/myArticle/articleDetail',
                    name: 'myArticleDetail',
                    component: articleDetail,
                    meta: {
                        list: routerBreadcrumb.myArticleDetail.list
                    }
                },
                {
                    path:'/myArticle',
                    name:'myArticle',
                    component:myArticle,
                    meta:{
                        list:routerBreadcrumb.myArticle.list
                    }
                },
                {
                  path:'/myArticle/addComment',
                  name:'myArticleAddComment',
                  component:commentDetail,
                  meta:{
                    list:routerBreadcrumb.myArticleAddComment.list
                  }
                },
                {
                    path:'/myComment',
                    name:'myComment',
                    component:myComment,
                    meta:{
                        list:routerBreadcrumb.myComment.list
                    }
                },
                {
                    path:'/art/addComment',
                    name:'addComment',
                    component:commentDetail,
                    meta:{
                        list:routerBreadcrumb.addComment.list
                    }
                },
                {
                    path:'/myComment/article',
                    name:'articleInComment',
                    component:articleDetail,
                    meta:{
                        list:routerBreadcrumb.articleDetailInComment.list
                    }
                },
                {
                    path:'/myComment/addComment',
                    name:'addCommentInComment',
                    component:commentDetail,
                    meta:{
                        list:routerBreadcrumb.addCommentInComment.list
                    }
                },
                {
                    path: '/myComment/editComment',
                    name: 'editComment',
                    component:commentDetail,
                    meta:{
                      list:routerBreadcrumb.editComment.list
                  }
                }
            ]
        },
    ]
})
router.beforeEach((to, from, next) => {
    if (to.meta.list) {
        let list = to.meta.list
        store.commit('changeBreadcumb', { list })
    }
    next()
})

export default router


