/* eslint-disable no-unused-vars */
import Vue from "vue";
import VueRouter from "vue-router";
import store from "@/store/index.js";
import staticsRouter from "./staticsRouter.js";
import renderRouterFn from "./renderRouter";
Vue.use(VueRouter);
const createRouter = () =>
  new VueRouter({
    scrollBehavior: () => ({ y: 0 }),
    routes: staticsRouter
  });

const router = createRouter();
// const aysncRouter = renderRouterFn(store.state.system.menu);
// router.addRoutes(aysncRouter);
export function resetRouter() {
  const newRouter = createRouter();
  router.matcher = newRouter.matcher; // reset router
}

export default router;
