import map from "lodash/map";
import Layout from "@/page/layout/index";
export default function renderRouterFn(menu) {
  let tempRoutes = map(menu, item => {
    if (item.children && item.children.length > 0) {
      // 存在子集
      let tempChildRoutes = renderRouterFn(item.children);
      return {
        path: item.path,
        component: Layout,
        children: tempChildRoutes
      };
    } else {
      let tempArray = item.path.split("/");
      if (tempArray.length > 2) {
        return {
          name: tempArray[tempArray.length - 1],
          path: item.path,
          component(resolve) {
            require([`../${item.component}.vue`], resolve);
          },
          meta: {
            title: item.name,
            needCache: item.isNeedCache
          }
        };
      } else {
        return {
          path: item.path,
          redirect: item.path + "/index",
          component: Layout,
          children: [
            {
              name: tempArray[tempArray.length - 1],
              path: item.path + "/index",
              component(resolve) {
                require([`../${item.component}.vue`], resolve);
              },
              meta: {
                title: item.name,
                needCache: item.isNeedCache
              }
            }
          ]
        };
      }
    }
  });
  return tempRoutes;
}

// import Layout from "@/page/layout/index";
// export const aysncRouter = [
//   {
//     path: "/wel",
//     component: Layout,
//     redirect: "/wel/index",
//     children: [
//       {
//         path: "/wel/index",
//         component: () => import("@/views/home/index"),
//         name: "wel",
//         meta: { title: "Create Article", icon: "edit" }
//       }
//     ]
//   },
//   {
//     path: "/search",
//     component: Layout,
//     children: [
//       {
//         path: "/search/colligate",
//         component: () => import("@/views/search/colligate"),
//         name: "CreateArticle",
//         meta: { title: "Create Article", icon: "edit" }
//       },
//       {
//         path: "/search/mulStatQuery",
//         component: () => import("@/views/search/mulStatQuery"),
//         name: "ArticleList",
//         meta: { title: "Article List", icon: "list" }
//       }
//     ]
//   }
// ];
