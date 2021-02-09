import ModuleComponent from "./module.vue";

export default {
  id: "analytics",
  name: "Analytics",
  icon: "insert_chart_outlined",
  routes: [
    {
      path: "/",
      component: ModuleComponent,
    },
  ],
  order: 2,
};
