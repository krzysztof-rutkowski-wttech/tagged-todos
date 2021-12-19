import { createWebHistory, createRouter } from "vue-router";
import Home from "@/views/Home.vue";
import Todos from "@/views/Todos.vue";
import History from "@/views/History.vue";
import Tags from "@/views/Tags.vue";
import EditTag from "@/views/EditTag.vue";

const routes = [
  {
    path: "/",
    name: "home",
    component: Home,
  },
  {
    path: "/todos",
    name: "todos",
    component: Todos,
  },
  {
    path: "/tags",
    name: "tags",
    component: Tags,
  },
  {
    path: "/history",
    name: "history",
    component: History,
  },
];

const router = createRouter({
  history: createWebHistory(),
  routes,
});

export default router;