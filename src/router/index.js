import { createRouter, createWebHistory } from "vue-router";
import HomeView from "@/views/User/HomeView.vue";
import ErrorView from "@/views/ErrorView.vue";
import LegalView from "@/views/LegalView.vue";
import BlogView from "@/views/User/BlogView.vue";
import ArticleView from "@/views/User/ArticleView.vue";
import NewArticleView from "@/views/Admin/NewArticleView.vue";
import ConnexionView from "@/views/User/ConnexionView.vue";
import AccountView from "@/views/User/AccountView.vue";
import ContactView from "@/views/User/ContactView.vue";
import RessourcesView from "@/views/User/RessourcesView.vue";
import GameView from "@/views/User/GameView.vue";
import ProfessionnalView from "@/views/User/ProfessionnalView.vue";
import SiteMapView from "@/views/User/SitemapView.vue";

const routes = [
  {
    path: "/",
    name: "HomeView",
    component: HomeView,
    meta: {
      breadcrumb: [
        {
          text: "Accueil",
          link: "/",
        },
      ],
    },
  },

  {
    path: "/test",
    name: "GameView",
    component: GameView,
  },

  {
    path: "/ressources",
    name: "RessourcesView",
    component: RessourcesView,
    meta: {
      breadcrumb: [
        {
          text: "Accueil",
          link: "/",
        },
        {
          text: "Ressources",
          link: "/ressources",
        },
      ],
    }
  },
  {
    path: "/ressources/professionnals/:id",
    name: "ProfessionnalView",
    component: ProfessionnalView,
    meta: {
      breadcrumb: [
        {
          text: "Accueil",
          link: "/",
        },
        {
          text: "Ressources",
          link: "/ressources",
        },
        {
          text: "Professionnal",
          link: "/ressources/professionnals/:id",
        }
      ]
    }
  },

  {
    path: "/blog",
    name: "BlogView",
    redirect: (to) => {
      return { name: "BlogPageView", params: { page: 1 } };
    },
    meta: {
      breadcrumb: [
        {
          text: "Accueil",
          link: "/",
        },
        {
          text: "Blog",
          link: "/blog",
        },
      ],
    },
  },
  {
    path: "/blog/page/:page",
    name: "BlogPageView",
    component: BlogView,
    meta: {
      breadcrumb: [
        {
          text: "Accueil",
          link: "/",
        },
        {
          text: "Blog",
          link: "/blog",
        },
      ],
    },
  },
  {
    path: "/blog/article/:id",
    name: "ArticleView",
    component: ArticleView,
    meta: {
      breadcrumb: [
        {
          text: "Accueil",
          link: "/",
        },
        {
          text: "Blog",
          link: "/blog",
        },
        {
          text: "Article",
          link: "/blog/article/:id",
        },
      ],
    },
  },
  {
    path: "/blog/new",
    name: "NewArticleView",
    component: NewArticleView,
  },

  {
    path: "/connexion",
    name: "ConnexionView",
    component: ConnexionView,
  },
  {
    path: "/my-account",
    name: "AccountView",
    component: AccountView,
  },

  {
    path: "/contact-us",
    name: "ContactView",
    component: ContactView,
    meta: {
      breadcrumb: [
        {
          text: "Accueil",
          link: "/",
        },
        {
          text: "Contact",
          link: "/contact-us",
        },
      ],
    },
  },

  {
    path: "/legal",
    name: "LegalView",
    component: LegalView,
    meta: {
      breadcrumb: [
        {
          text: "Accueil",
          link: "/",
        },
        {
          text: "Mentions légales",
          link: "/legal",
        }
      ]
    }
  },
  {
    path: "/plan-du-site",
    name: "SiteMapView",
    component: SiteMapView,
    meta: {
      breadcrumb: [
        {
          text: "Accueil",
          link: "/",
        },
        {
          text: "Plan du site",
          link: "/plan-du-site",
        },
      ],
    },
  },

  {
    path: "/:pathMatch(.*)*",
    name: "ErrorView",
    component: ErrorView,
    meta: {
      breadcrumb: [
        {
          text: "Accueil",
          link: "/",
        },
        {
          text: "Erreur",
          link: "/:pathMatch(.*)*",
        },
      ],
    },
  },
];

const router = createRouter({
  history: createWebHistory(),
  routes,
});

export default router;
