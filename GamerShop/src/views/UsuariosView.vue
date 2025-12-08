<template>
  <div class="container mt-4">
    <!-- Header -->
    <div class="d-flex justify-content-between align-items-center mb-4">
      <h3 class="text-primary">
        <i class="bi bi-people me-2"></i>
        Gestión de Usuarios
      </h3>
      <button class="btn btn-success" @click="abrirModalCrear">
        <i class="bi bi-plus-circle me-2"></i>
        Nuevo Usuario
      </button>
    </div>

    <!-- Alertas -->
    <div v-if="alerta.mostrar" :class="`alert alert-${alerta.tipo} alert-dismissible fade show`" role="alert">
      <i :class="`bi ${alerta.icono} me-2`"></i>
      {{ alerta.mensaje }}
      <button type="button" class="btn-close" @click="cerrarAlerta"></button>
    </div>

    <!-- Tabla de Usuarios -->
    <div v-if="cargando" class="text-center my-5">
      <div class="spinner-border text-primary" role="status"></div>
      <p class="mt-2">Cargando usuarios...</p>
    </div>

    <div v-else-if="error" class="alert alert-danger text-center">
      <i class="bi bi-exclamation-triangle me-2"></i>
      Error al cargar usuarios
    </div>

    <div v-else class="table-responsive">
      <table class="table table-striped table-hover">
        <thead class="table-dark">
          <tr>
            <th>ID</th>
            <th>Nombre</th>
            <th>Usuario</th>
            <th>Email</th>
            <th>Acciones</th>
          </tr>
        </thead>
        <tbody>
          <tr v-for="usuario in usuarios" :key="usuario.id">
            <td>{{ usuario.id }}</td>
            <td>{{ usuario.nombre }}</td>
            <td>
              <span class="badge bg-secondary">{{ usuario.usuario }}</span>
            </td>
            <td>{{ usuario.email }}</td>
            <td>
              <button class="btn btn-warning btn-sm me-2" @click="abrirModalEditar(usuario)">
                <i class="bi bi-pencil-square"></i>
              </button>
              <button class="btn btn-danger btn-sm" @click="confirmarEliminar(usuario)">
                <i class="bi bi-trash"></i>
              </button>
            </td>
          </tr>
        </tbody>
      </table>
    </div>

    <!-- Modal Crear/Editar Usuario -->
    <div class="modal fade" :class="{ 'show d-block': modal.abierto }" v-if="modal.abierto" tabindex="-1">
      <div class="modal-dialog">
        <div class="modal-content">
          <div class="modal-header">
            <h5 class="modal-title">
              <i class="bi" :class="modal.esEdicion ? 'bi-pencil-square' : 'bi-plus-circle'"></i>
              {{ modal.esEdicion ? 'Editar Usuario' : 'Nuevo Usuario' }}
            </h5>
            <button type="button" class="btn-close" @click="cerrarModal"></button>
          </div>
          <div class="modal-body">
            <form @submit.prevent="guardarUsuario">
              <div class="mb-3">
                <label class="form-label">Nombre completo</label>
                <input v-model="form.nombre" class="form-control" required>
              </div>
              <div class="mb-3">
                <label class="form-label">Nombre de usuario</label>
                <input v-model="form.usuario" class="form-control" required>
              </div>
              <div class="mb-3">
                <label class="form-label">Email</label>
                <input v-model="form.email" type="email" class="form-control" required>
              </div>
              <div class="mb-3">
                <label class="form-label">
                  {{ modal.esEdicion ? 'Nueva contraseña (dejar vacío para no cambiar)' : 'Contraseña' }}
                </label>
                <input v-model="form.contrasena" type="password" class="form-control" :required="!modal.esEdicion">
              </div>
            </form>
          </div>
          <div class="modal-footer">
            <button type="button" class="btn btn-secondary" @click="cerrarModal">
              Cancelar
            </button>
            <button type="button" class="btn btn-primary" @click="guardarUsuario" :disabled="guardando">
              <i class="bi" :class="guardando ? 'bi-hourglass-split' : (modal.esEdicion ? 'bi-check-circle' : 'bi-plus-circle')"></i>
              {{ guardando ? 'Guardando...' : (modal.esEdicion ? 'Actualizar' : 'Crear') }}
            </button>
          </div>
        </div>
      </div>
    </div>

    <!-- Modal de Confirmación Eliminación -->
    <div class="modal fade" :class="{ 'show d-block': confirmacion.abierto }" v-if="confirmacion.abierto" tabindex="-1">
      <div class="modal-dialog">
        <div class="modal-content">
          <div class="modal-header">
            <h5 class="modal-title text-danger">
              <i class="bi bi-exclamation-triangle me-2"></i>
              Confirmar Eliminación
            </h5>
            <button type="button" class="btn-close" @click="cancelarEliminar"></button>
          </div>
          <div class="modal-body">
            ¿Estás seguro de eliminar el usuario <strong>{{ confirmacion.usuario?.nombre }}</strong>?
          </div>
          <div class="modal-footer">
            <button type="button" class="btn btn-secondary" @click="cancelarEliminar">
              Cancelar
            </button>
            <button type="button" class="btn btn-danger" @click="eliminarUsuario" :disabled="eliminando">
              <i class="bi bi-trash me-2"></i>
              {{ eliminando ? 'Eliminando...' : 'Eliminar' }}
            </button>
          </div>
        </div>
      </div>
    </div>
  </div>
</template>

<script>
import { usuariosAPI } from "../services/mockapi.js";

export default {
  name: 'UsuariosView',
  data() {
    return {
      usuarios: [],
      cargando: true,
      error: false,
      guardando: false,
      eliminando: false,
      alerta: {
        mostrar: false,
        tipo: 'success',
        mensaje: '',
        icono: 'bi-check-circle'
      },
      modal: {
        abierto: false,
        esEdicion: false
      },
      confirmacion: {
        abierto: false,
        usuario: null
      },
      form: {
        id: null,
        nombre: '',
        usuario: '',
        email: '',
        contrasena: ''
      }
    }
  },
  async mounted() {
    await this.cargarUsuarios()
  },
  methods: {
    async cargarUsuarios() {
      try {
        this.cargando = true
        this.usuarios = await usuariosAPI.obtenerUsuarios()
        this.error = false
      } catch (error) {
        console.error('Error cargando usuarios:', error)
        this.error = true
        this.mostrarAlerta('Error al cargar usuarios', 'danger', 'bi-exclamation-triangle')
      } finally {
        this.cargando = false
      }
    },
    
    mostrarAlerta(mensaje, tipo = 'success', icono = 'bi-check-circle') {
      this.alerta = {
        mostrar: true,
        mensaje,
        tipo,
        icono
      }
      setTimeout(() => {
        this.cerrarAlerta()
      }, 3000)
    },
    
    cerrarAlerta() {
      this.alerta.mostrar = false
    },
    
    abrirModalCrear() {
      this.form = {
        id: null,
        nombre: '',
        usuario: '',
        email: '',
        contrasena: ''
      }
      this.modal = {
        abierto: true,
        esEdicion: false
      }
    },
    
    abrirModalEditar(usuario) {
      this.form = { ...usuario, contrasena: '' }
      this.modal = {
        abierto: true,
        esEdicion: true
      }
    },
    
    cerrarModal() {
      this.modal.abierto = false
    },
    
    async guardarUsuario() {
      try {
        this.guardando = true
        
        const usuarioData = {
          nombre: this.form.nombre,
          usuario: this.form.usuario,
          email: this.form.email
        }
        
        if (this.form.contrasena) {
          usuarioData.contrasena = this.form.contrasena
        }
        
        if (this.modal.esEdicion) {
          await usuariosAPI.actualizarUsuario(this.form.id, usuarioData)
          this.mostrarAlerta('Usuario actualizado correctamente', 'success', 'bi-check-circle')
        } else {
          if (!usuarioData.contrasena) {
            this.mostrarAlerta('La contraseña es obligatoria para nuevos usuarios', 'warning', 'bi-exclamation-triangle')
            return
          }
          await usuariosAPI.crearUsuario(usuarioData)
          this.mostrarAlerta('Usuario creado correctamente', 'success', 'bi-check-circle')
        }
        
        await this.cargarUsuarios()
        this.cerrarModal()
      } catch (error) {
        console.error('Error guardando usuario:', error)
        this.mostrarAlerta('Error al guardar usuario', 'danger', 'bi-exclamation-triangle')
      } finally {
        this.guardando = false
      }
    },
    
    confirmarEliminar(usuario) {
      this.confirmacion = {
        abierto: true,
        usuario
      }
    },
    
    cancelarEliminar() {
      this.confirmacion.abierto = false
      this.confirmacion.usuario = null
    },
    
    async eliminarUsuario() {
      try {
        this.eliminando = true
        await usuariosAPI.eliminarUsuario(this.confirmacion.usuario.id)
        this.mostrarAlerta('Usuario eliminado correctamente', 'success', 'bi-trash')
        await this.cargarUsuarios()
        this.cancelarEliminar()
      } catch (error) {
        console.error('Error eliminando usuario:', error)
        this.mostrarAlerta('Error al eliminar usuario', 'danger', 'bi-exclamation-triangle')
      } finally {
        this.eliminando = false
      }
    }
  }
}
</script>

<style scoped>
.modal-backdrop {
  background-color: rgba(0, 0, 0, 0.5);
}
</style>