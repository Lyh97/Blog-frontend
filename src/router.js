import Vue from 'vue'
import Router from 'vue-router'
import Home from './views/Home/Home.vue'
import BlogManage from './views/BlogManage.vue'
import CategaryManage from './views/CategaryManage.vue'
import ViewArticle from './views/ViewArticle.vue'
import SearchInfo from './views/SearchInfo/SearchInfo.vue'
import CommentDetail from './views/Comment/CommentDetail.vue'
import CommentManage from './views/Comment/CommentManage.vue'
import UserManage from './views/UserManage.vue'
import CategaryArticle from './views/CategaryArticle.vue'
import Timeline from './views/Timeline.vue'

Vue.use(Router)

export default new Router({
  routes: [
    {
      path: '/',
      name: 'home',
      component: Home
    },
    {
      path: '/home',
      name: 'Home',
      component: Home
    },
    {
      path: '/blogmanage',
      name: 'BlogManage',
      component: BlogManage
    },
    {
      path: '/commentmanage',
      name: 'CommentManage',
      component: CommentManage
    },
    {
      path: '/categarymanage',
      name: 'CategaryManage',
      component: CategaryManage
    },
    {
      path: '/viewarticle',
      name: 'ViewArticle',
      component: ViewArticle
    },
    {
      path: '/searchinfo/:keyword',
      name: 'SearchInfo',
      component: SearchInfo
    },
    {
      path: '/commentDetail/:articleId',
      name: 'CommentDetail',
      component: CommentDetail
    },
    {
      path: '/userManage',
      name: 'UserManage',
      component: UserManage
    },
    {
      path: '/categaryArticle',
      name: 'CategaryArticle',
      component: CategaryArticle
    },
    {
      path: '/Timeline',
      name: 'Timeline',
      component: Timeline
    }
  ]
})