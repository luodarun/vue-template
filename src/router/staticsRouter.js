import Layout from "@/page/layout/index";
export default [
  {
    path: "/redirect",
    component: Layout,
    hidden: true,
    children: [
      {
        path: "/redirect/:path*",
        component: () =>
          import(/* webpackChunkName: "page" */ "@/page/redirect")
      }
    ]
  },
  {
    path: "/login",
    name: "登录页",
    component: () => import(/* webpackChunkName: "page" */ "@/page/login")
  },
  {
    path: "/",
    name: "主页",
    redirect: "/wel"
  },
  {
    path: "/403",
    component: () =>
      import(/* webpackChunkName: "page" */ "@/page/error-page/403"),
    name: "403"
  },
  {
    path: "/500",
    component: () =>
      import(/* webpackChunkName: "page" */ "@/page/error-page/500"),
    name: "500"
  },
  {
    path: "/404",
    component: () =>
      import(/* webpackChunkName: "page" */ "@/page/error-page/404"),
    name: "404"
  }
];
