<template>
  <div class="bg-dark vh-100 p-3 border-end" style="width: 220px;">
    <div class="text-center mb-4">
      <i class="bi bi-controller fs-1 text-primary"></i>
      <h6 class="mt-2 fw-bold text-white">GamerShop</h6>
    </div>
    
    <div class="mb-4">
      <h6 class="text-secondary mb-3">
        <i class="bi bi-menu-button-wide me-2"></i>
        Menú Principal
      </h6>
      
      <router-link 
        to="/dashboard/productos" 
        class="btn btn-outline-primary w-100 mb-2 d-flex align-items-center justify-content-start text-white">
        <i class="bi bi-controller me-2"></i>
        Productos
      </router-link>
      
      <router-link 
        to="/dashboard/usuarios" 
        class="btn btn-outline-info w-100 mb-2 d-flex align-items-center justify-content-start text-white">
        <i class="bi bi-people me-2"></i>
        Usuarios
      </router-link>
    </div>
    
    <div class="mb-4">
      <h6 class="text-secondary mb-3">
        <i class="bi bi-info-circle me-2"></i>
        Información
      </h6>
      
      <router-link 
        to="/about" 
        class="btn btn-outline-secondary w-100 mb-2 d-flex align-items-center justify-content-start text-white">
        <i class="bi bi-info-circle me-2"></i>
        Acerca de
      </router-link>
    </div>
    
    <div class="mt-auto">
      <button 
        @click="cerrarSesion" 
        class="btn btn-outline-danger w-100 d-flex align-items-center justify-content-center">
        <i class="bi bi-box-arrow-right me-2"></i>
        Cerrar Sesión
      </button>
    </div>
  </div>
</template>

<script>
export default {
  name: "SidebarComponent",
  methods: {
    cerrarSesion() {
      // 1. Limpiar sessionStorage
      sessionStorage.removeItem('authToken');
      sessionStorage.removeItem('userData');
      
      // 2. Redirigir al login
      this.$router.push('/login');
      
      // 3. Recargar la página para limpiar estado
      setTimeout(() => {
        window.location.reload();
      }, 100);
    }
  }
}
</script>

<style scoped>
.router-link-active {
  background-color: #0d6efd !important;
  color: white !important;
  border-color: #0d6efd !important;
}

.btn {
  transition: all 0.3s;
}

.btn:hover {
  transform: translateX(5px);
  background-color: rgba(255, 255, 255, 0.1);
}

.text-white {
  color: white !important;
}
</style>