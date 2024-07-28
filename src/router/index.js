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
  ],
});
export default router;
