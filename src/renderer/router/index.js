import Vue from 'vue'
import Router from 'vue-router'
import Card from '../components/card/card'
import Index from '../components/index/index'
import LoginCard from '../components/login-card/login-card'
import LoginClass from '../components/login-class/login-class'
import Class from '../components/class/class'
import LoginLibrary from '../components/library/pages/login-library'
import LoginSuc from '../components/library/LoginSuc'
import LibraryIndex from '../components/library/components/library-index'
import LibraryHotRecommend from '../components/library/components/library-hot-recommend'
import LibraryCategoryOne from '../components/library/components/library-category-one'
import LibraryContent from '../components/library/components/library-content'
import LibraryFindBook from '../components/library/components/library-find-book'
import rbck from '../components/rbck/rbck.vue'

Vue.use(Router);

export default new Router({
  routes: [
    {
      path: '/',
      name: 'Index',
      component: Index
    },
    {
      path: '/card',
      name: 'Card',
      component: Card
    },
    {
      path: '/login-card',
      name: 'LoginCard',
      component: LoginCard
    },
    {
      path: '/login-class',
      name: 'LoginClass',
      component: LoginClass
    },
    {
      path: '/rbck',
      meta: {
        title: '跳转页',
        scrollToTop: true
      },
      component: rbck,
    },
    {
      path: '/class',
      name: 'Class',
      component: Class
    },
    {
      path: '/login-library',
      name: 'LoginLibrary',
      component: LoginLibrary
    },
    {
      path: '/login-suc',
      name: 'LoginSuc',
      component: LoginSuc
    },
    {
      path: '/library-index',
      redirect: '/library-hot-recommend/1',
      name: 'index',
      component: LibraryIndex,
      children: [
        {
          path: '/library-category-one/:page/:flh',
          component: LibraryCategoryOne,
          meta: {
            keepAlive: true
          }
        },
        {
          path: '/library-hot-recommend/:page',
          component: LibraryHotRecommend,
          meta: {
            keepAlive: true
          }
        }
      ],
      meta: {
        keepAlive: true
      }
    },
    {
      path: '/library-content',
      component: LibraryContent,
      name: 'content',
      meta: {
        keepAlive: false
      }
    },
    {
      path: '/library-find-book',
      name: 'book',
      component: LibraryFindBook,
      meta: {
        keepAlive: false
      }
    }
  ]
})
