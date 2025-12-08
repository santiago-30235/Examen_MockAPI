<template>
  <div class="d-flex">
    <SidebarComponent />
    <div class="flex-grow-1 d-flex flex-column min-vh-100">
      <NavbarComponent />
      <div class="flex-grow-1 p-3">
        <router-view />
      </div>
      <FooterComponent />
    </div>
  </div>
</template>

<script>
import SidebarComponent from "../components/SidebarComponent.vue";
import NavbarComponent from "../components/NavbarComponent.vue";
import FooterComponent from "../components/FooterComponent.vue";

export default {
  name: "DashboardView",
  components: {
    SidebarComponent,
    NavbarComponent,
    FooterComponent,
  },
};
</script>


