import { createApp } from 'vue'
import App from './App.vue'
import router from './router'

// const routes = [
//     {
//         path: '/',
//         name: 'HomeView',
//         component: HomeView,
//         meta: {
//             breadcrumb: [
//                 {
//                     text: 'Accueil',
//                     link: '/'
//                 }
//             ]
//         }
//     },
//     {
//         path: '/blog',
//         name: 'BlogView',
//         component: BlogView,
//         meta: {
//             breadcrumb: [
//                 {
//                     text: 'Accueil',
//                     link: '/'
//                 },
//                 {
//                     text: 'Blog',
//                     link: '/blog'
//                 }
//             ]
//         }
//     },
//     {
//         path: '/blog/:id',
//         name: 'ArticleView',
//         component: ArticleView,
//         meta: {
//             breadcrumb: [
//                 {
//                     text: 'Accueil',
//                     link: '/'
//                 },
//                 {
//                     text: 'Blog',
//                     link: '/blog'
//                 },
//                 {
//                     text: 'Article',
//                     link: '/blog/:id'
//                 }
//             ]
//         }
//     },
//     {
//         path: '/blog/new',
//         name: 'NewArticleView',
//         component: NewArticleView,
//     },

//     {
//         path: '/connexion',
//         name: 'ConnexionView',
//         component: ConnexionView,
//     },
//     {
//         path: '/my-account',
//         name: 'AccountView',
//         component: AccountView,
//     },

//     {
//         path: '/:pathMatch(.*)*',
//         name: 'ErrorView',
//         component: ErrorView,
//         meta: {
//             breadcrumb: [
//                 {
//                     text: 'Accueil',
//                     link: '/'
//                 },
//                 {
//                     text: 'Erreur',
//                     link: '/:pathMatch(.*)*'
//                 }
//             ]
//         }
//     }
// ];

createApp(App)
    .use(router)
    .mount('#app')
