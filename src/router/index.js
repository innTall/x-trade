import { createRouter, createWebHistory } from "vue-router";
import WatchList from "../views/WatchList.vue";
const router = createRouter({
  history: createWebHistory(import.meta.env.BASE_URL),
  routes: [
    {
      path: "/",
      name: "Watchlist",
      component: WatchList,
      children: [
        {
          path: "/watch/:arrayName",
          name: "WatchTemplate",
          component: () => import("../components/WatchTemplate.vue"),
          props: true,
        },
      ],
    },
    {
      path: "/chart",
      name: "Chartpage",
      component: () => import("../views/ChartPage.vue"),
    },
    {
      path: "/math",
      name: "Mathpage",
      component: () => import("../views/MathPage.vue"),
    }
  ],
});
export default router;
