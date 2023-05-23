import { createRouter, createWebHistory } from 'vue-router'
import HomeView from '../views/User/HomeView.vue'
import ErrorView from '../views/ErrorView.vue'
import BlogView from '../views/User/BlogView.vue'
import ArticleView from '../views/User/ArticleView.vue'
import NewArticleView from '../views/Admin/NewArticleView.vue'
import ConnexionView from '../views/User/ConnexionView.vue'
import AccountView from '../views/User/AccountView.vue'

const routes = [
  {
      path: '/',
      name: 'HomeView',
      component: HomeView,
      meta: {
          breadcrumb: [
              {
                  text: 'Accueil',
                  link: '/'
              }
          ]
      }
  },
  {
      path: '/blog',
      name: 'BlogView',
      component: BlogView,
      meta: {
          breadcrumb: [
              {
                  text: 'Accueil',
                  link: '/'
              },
              {
                  text: 'Blog',
                  link: '/blog'
              }
          ]
      }
  },
  {
      path: '/blog/:id',
      name: 'ArticleView',
      component: ArticleView,
      meta: {
          breadcrumb: [
              {
                  text: 'Accueil',
                  link: '/'
              },
              {
                  text: 'Blog',
                  link: '/blog'
              },
              {
                  text: 'Article',
                  link: '/blog/:id'
              }
          ]
      }
  },
  {
      path: '/blog/new',
      name: 'NewArticleView',
      component: NewArticleView,
  },

  {
      path: '/connexion',
      name: 'ConnexionView',
      component: ConnexionView,
  },
  {
      path: '/my-account',
      name: 'AccountView',
      component: AccountView,
  },

  {
      path: '/:pathMatch(.*)*',
      name: 'ErrorView',
      component: ErrorView,
      meta: {
          breadcrumb: [
              {
                  text: 'Accueil',
                  link: '/'
              },
              {
                  text: 'Erreur',
                  link: '/:pathMatch(.*)*'
              }
          ]
      }
  }
]

const router = createRouter({
  history: createWebHistory(),
  routes
})

export default router
