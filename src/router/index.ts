import { createRouter, createWebHistory, RouteRecordRaw } from "vue-router";
import Players from "@/views/Players.vue";

const routes: Array<RouteRecordRaw> = [
  {
    path: "/",
    name: "Players",
    component: Players,
  },
  {
    path: "/player/:id",
    name: "Player",
    component: () => import("@/views/PlayerStats.vue"),
  },
];

const router = createRouter({
  history: createWebHistory(process.env.BASE_URL),
  routes,
});

export default router;
