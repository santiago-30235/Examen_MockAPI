<template>
  <div class="login-container">
    <div class="login-card">
      <h3 class="text-center mb-4">🎮 GamerShop</h3>
      
      <div v-if="error" class="alert alert-danger">
        {{ error }}
      </div>
      
      <div class="mb-3">
        <label class="form-label">Usuario</label>
        <input 
          v-model="usuario" 
          class="form-control" 
          placeholder="Ingresa tu usuario"
          @keyup.enter="login">
      </div>
      
      <div class="mb-3">
        <label class="form-label">Contraseña</label>
        <input 
          v-model="contrasena" 
          type="password" 
          class="form-control" 
          placeholder="Ingresa tu contraseña"
          @keyup.enter="login">
      </div>
      
      <button @click="login" class="btn btn-primary w-100" :disabled="cargando">
        <span v-if="cargando" class="spinner-border spinner-border-sm me-2"></span>
        {{ cargando ? 'Verificando...' : 'Ingresar' }}
      </button>
    </div>
  </div>
</template>

<script>
export default {
  name: 'LoginView',
  data() {
    return {
      usuario: '',
      contrasena: '',
      error: '',
      cargando: false
    }
  },
  methods: {
    async login() {
      if (!this.usuario || !this.contrasena) {
        this.error = 'Por favor completa todos los campos';
        return;
      }
      
      this.cargando = true;
      this.error = '';
      
      try {
        const response = await fetch('https://691cffcbd58e64bf0d34a9d7.mockapi.io/api/v1/usuarios');
        const usuarios = await response.json();
        
        const usuarioValido = usuarios.find(
          u => u.usuario === this.usuario && u.contrasena === this.contrasena
        );
        
        if (usuarioValido) {
          sessionStorage.setItem('authToken', 'token-' + Date.now());
          sessionStorage.setItem('userData', JSON.stringify(usuarioValido));
          this.$router.push('/dashboard/productos');
        } else {
          this.error = 'Usuario o contraseña incorrectos';
        }
      } catch (error) {
        this.error = 'Error de conexión: ' + error.message;
      } finally {
        this.cargando = false;
      }
    }
  },
  mounted() {
    if (sessionStorage.getItem('authToken')) {
      this.$router.push('/dashboard/productos');
    }
  }
}
</script>

<style scoped>
.login-container {
  min-height: 100vh;
  display: flex;
  align-items: center;
  justify-content: center;
  background: linear-gradient(135deg, #667eea 0%, #764ba2 100%);
}

.login-card {
  width: 100%;
  max-width: 400px;
  padding: 2rem;
  background: white;
  border-radius: 10px;
  box-shadow: 0 10px 30px rgba(0,0,0,0.2);
}
</style>