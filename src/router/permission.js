/* eslint-disable no-unused-vars */
import router, { resetRouter } from "../router";
import store from "../store";
import { Message } from "lr-vue-components";
import NProgress from "nprogress"; // progress bar
import "nprogress/nprogress.css"; // progress bar style
import { getToken, getPageTitle } from "@/utils/system"; // get token from cookie
import aysncRouterFn from "@/router/renderRouter";

NProgress.configure({ showSpinner: false }); // NProgress Configuration

const whiteList = ["/login", "/auth-redirect"]; // no redirect whitelist

router.beforeEach(async (to, from, next) => {
  // start progress bar
  NProgress.start();

  // set page title
  document.title = getPageTitle(to.meta.title);

  // determine whether the user has logged in
  const hasToken = getToken();
  if (hasToken) {
    if (to.path === "/login") {
      next({ path: "/" });
      NProgress.done();
    } else {
      const hasRoles = store.getters.roles && store.getters.roles.length > 0;
      if (!hasRoles) {
        try {
          await store.dispatch("getInfo");
          let aysncRouter = aysncRouterFn(store.state.system.menu);
          router.addRoutes(aysncRouter);
          next({ ...to, replace: true });
        } catch (error) {
          await store.dispatch("resetToken");
          Message.error(error || "Has Error");
          next(`/login?redirect=${to.path}`);
          NProgress.done();
        }
      } else {
        next();
      }
    }
  } else {
    if (whiteList.indexOf(to.path) !== -1) {
      next();
    } else {
      next(`/login?redirect=${to.path}`);
      NProgress.done();
    }
  }
});

router.afterEach(() => {
  NProgress.done();
});
