import { createRouter, createWebHistory, Router, RouteLocationNormalized, NavigationGuardNext } from 'vue-router';
import { type Store } from '~/types/store';

// Components:
import Page from '~/views/Page.vue';
import Page404 from '~/views/Page404.vue';
import PageRegistration from '~/views/User/PageRegistration.vue';
import PageChangePassword from '~/views/User/PageChangePassword.vue';
import PageLogin from '~/views/User/PageLogin.vue';
import PageProfile from '~/views/User/PageProfile.vue';
import routes from '~/routes';
import { RouteRecordRaw } from 'vue-router';
import PageMap from '~/views/PageMap.vue';
import PageGuild from '~/views/PageGuild.vue';
import PageSkills from '~/views/PageSkills.vue';
import PageFight from '~/views/PageFight.vue';
import PageQRScanner from '~/views/PageQRScanner.vue';
import PageTrade from '~/views/PageTrade.vue';
import PageQRGeneration from '~/views/PageQRGeneration.vue';
import PageProfileGuild from '~/views/User/PageProfileGuild.vue';
import PageProfileQR from '~/views/User/PageProfileQR.vue';

type MyRoute = RouteRecordRaw & {
  path: keyof typeof routes,
  meta?: {
    noLoginRequired?: boolean
    loginRequired?: boolean
  }
}

export default function createVueRouter(Store: Store): Router {
  const routesList: MyRoute[] = [
    { path: '/', name: 'default', component: Page },

    { path: '/profile', name: 'profile', component: PageProfile, meta: {loginRequired: true}},
    { path: '/login', name: 'login', component: PageLogin, meta: {noLoginRequired: true}},
    { path: '/signup', name: 'signup', component: PageRegistration, meta: {noLoginRequired: true} },
    { path: '/password/change', name: 'changePassword', component: PageChangePassword, meta: {loginRequired: true} },

    { path: '/profile/qr', name: 'profileQR', component: PageProfileQR, meta: {loginRequired: true} },
    { path: '/fight', name: 'fight', component: PageFight, meta: {loginRequired: true} },
    { path: '/skills', name: 'skillsTree', component: PageSkills, meta: {loginRequired: true} },
    { path: '/map', name: 'map', component: PageMap, meta: {loginRequired: true} },
    { path: '/qr-scanner', name: 'qrScanner', component: PageQRScanner, meta: {loginRequired: true} },
    { path: '/guild', name: 'guild', component: PageGuild, meta: {loginRequired: true} },
    { path: '/trade', name: 'trade', component: PageTrade, meta: {loginRequired: true} },

    { path: '/profile-guild', name: 'guildProfile', component: PageProfileGuild, meta: {loginRequired: true} },

    { path: '/qr-generation-i2819jd98jsiaodm12asd1', name: 'qrGeneration', component: PageQRGeneration },

    { path: '/:pathMatch(.*)*', name: 'page404', component: Page404 },
  ];

  const Router = createRouter({
    history: createWebHistory(),
    routes: routesList,
  });

  let router_got_user = false;
  Router.beforeEach(async (to: RouteLocationNormalized, _, next: NavigationGuardNext) => {
    if (!router_got_user) {
      await Store.dispatch('GET_USER_OR_LOAD');
      router_got_user = true;
    }

    const notLoginedRedirect = {
      name: 'login',
    };
    const loginedRedirect = {
      name: 'profile',
    };
    const isInFightRedirect = {
      name: 'fight',
    };
    const deathRedirect = {
      name: 'qrScanner',
    };
    if (to.name !== deathRedirect.name && to.name !== isInFightRedirect.name && Store.state.user && Store.state.user.stats.hp <= 0) {
      next(deathRedirect);
      return;
    } else if (to.name !== isInFightRedirect.name && Store.state.user.isInFight && !(Store.state.user.stats.hp <= 0)) {
      next(isInFightRedirect);
      return;
    }

    if (to.path === '/' || to.path === '') {
      if (Store.state.user.isSignedIn) {
        next(loginedRedirect);
        return;
      }
      next(notLoginedRedirect);
      return;
    }

    // Login required redirects
    if (to.matched.some(record => record.meta.loginRequired === true || record.meta.adminRequired === true)) {
      if (Store.state.user.isSignedIn) {
        next();
        return;
      }
      next(notLoginedRedirect);
      return;
    } else if (to.matched.some(record => record.meta.noLoginRequired === true)) {
      if (!Store.state.user.isSignedIn) {
        next();
        return;
      }
      next(loginedRedirect);
      return;
    }
    if (to.matched.some(record => record.meta.adminRequired === true)) {
      if (Store.state.user.isAdmin) {
        next();
        return;
      }
      next(loginedRedirect);
      return;
    }
    next();
  });

  Router.beforeResolve(async () => {
    if (window?.onbeforeunload) {
      if (confirm('Изменения не сохранены. Вы уверены, что хотите покинуть страницу?')) {
        window.onbeforeunload = null;
      } else {
        return false;
      }
    }
  });

  return Router;
}
