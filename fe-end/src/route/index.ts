/*
 * @Author: your name
 * @Date: 2022-04-08 17:57:51
 * @LastEditTime: 2022-04-09 11:36:03
 * @LastEditors: Please set LastEditors
 * @Description: 打开koroFileHeader查看配置 进行设置: https://github.com/OBKoro1/koro1FileHeader/wiki/%E9%85%8D%E7%BD%AE
 * @FilePath: /vue-nestjs-ci-cd/fe-end/src/route/index.ts
 */
import { createRouter, createWebHistory, createWebHashHistory } from "vue-router";

const Home = import("@/components/Home.vue");
const ErrorPage = import("@/components/Error.vue");
const About = import("@/components/HelloWorld.vue");

// 2. Define some routes
// Each route should map to a component.
// We'll talk about nested routes later.
const routes = [
  { path: "/", component: Home },
  { path: "/about", component: About },
  { path: "/:pathMatch(.*)*", component: ErrorPage },
];

// 3. Create the router instance and pass the `routes` option
// You can pass in additional options here, but let's
// keep it simple for now.

export const router = createRouter({
  history: createWebHistory('/'),
  routes,
});