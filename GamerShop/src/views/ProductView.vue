<template>
  <div class="container mt-4">
    <!-- Header -->
    <div class="d-flex justify-content-between align-items-center mb-4">
      <h3 class="text-primary">
        <i class="bi bi-controller me-2"></i>
        Gestión de Productos Gamer
      </h3>
      <button class="btn btn-success" @click="abrirModalCrear">
        <i class="bi bi-plus-circle me-2"></i>
        Nuevo Producto
      </button>
    </div>

    <!-- Alertas -->
    <div v-if="alerta.mostrar" :class="`alert alert-${alerta.tipo} alert-dismissible fade show`" role="alert">
      <i :class="`bi ${alerta.icono} me-2`"></i>
      {{ alerta.mensaje }}
      <button type="button" class="btn-close" @click="cerrarAlerta"></button>
    </div>

    <!-- Tabla de Productos -->
    <div v-if="cargando" class="text-center my-5">
      <div class="spinner-border text-primary" role="status"></div>
      <p class="mt-2">Cargando productos...</p>
    </div>

    <div v-else-if="error" class="alert alert-danger text-center">
      <i class="bi bi-exclamation-triangle me-2"></i>
      Error al cargar productos
    </div>

    <div v-else class="table-responsive">
      <table class="table table-striped table-hover">
        <thead class="table-dark">
          <tr>
            <th>ID</th>
            <th>Imagen</th>
            <th>Nombre</th>
            <th>Precio</th>
            <th>Stock</th>
            <th>Categoría</th>
            <th>Acciones</th>
          </tr>
        </thead>
        <tbody>
          <tr v-for="producto in productos" :key="producto.id">
            <td>{{ producto.id }}</td>
            <td>
              <img :src="producto.imagen" :alt="producto.nombre" class="img-thumbnail" width="60">
            </td>
            <td>{{ producto.nombre }}</td>
            <td>
              <span class="badge bg-success">{{ producto.precio }}</span>
            </td>
            <td>
              <span :class="`badge ${producto.stock > 10 ? 'bg-success' : 'bg-warning'}`">
                {{ producto.stock }}
              </span>
            </td>
            <td>
              <span class="badge bg-info">{{ producto.categoria }}</span>
            </td>
            <td>
              <button class="btn btn-warning btn-sm me-2" @click="abrirModalEditar(producto)">
                <i class="bi bi-pencil-square"></i>
              </button>
              <button class="btn btn-danger btn-sm" @click="confirmarEliminar(producto)">
                <i class="bi bi-trash"></i>
              </button>
            </td>
          </tr>
        </tbody>
      </table>
    </div>

    <!-- Modal Crear/Editar Producto -->
    <div class="modal fade" :class="{ 'show d-block': modal.abierto }" v-if="modal.abierto" tabindex="-1">
      <div class="modal-dialog modal-lg">
        <div class="modal-content">
          <div class="modal-header">
            <h5 class="modal-title">
              <i class="bi" :class="modal.esEdicion ? 'bi-pencil-square' : 'bi-plus-circle'"></i>
              {{ modal.esEdicion ? 'Editar Producto' : 'Nuevo Producto' }}
            </h5>
            <button type="button" class="btn-close" @click="cerrarModal"></button>
          </div>
          <div class="modal-body">
            <form @submit.prevent="guardarProducto">
              <div class="row">
                <div class="col-md-6 mb-3">
                  <label class="form-label">Nombre del producto</label>
                  <input v-model="form.nombre" class="form-control" required>
                </div>
                <div class="col-md-6 mb-3">
                  <label class="form-label">Precio (COP)</label>
                  <input v-model="form.precio" type="number" class="form-control" required>
                </div>
                <div class="col-md-6 mb-3">
                  <label class="form-label">Stock</label>
                  <input v-model="form.stock" type="number" class="form-control" required>
                </div>
                <div class="col-md-6 mb-3">
                  <label class="form-label">Categoría</label>
                  <select v-model="form.categoria" class="form-select" required>
                    <option value="audifonos">Audífonos</option>
                    <option value="teclados">Teclados</option>
                    <option value="mouse">Mouse</option>
                    <option value="monitores">Monitores</option>
                    <option value="sillas">Sillas Gamer</option>
                    <option value="consolas">Consolas</option>
                  </select>
                </div>
                <div class="col-12 mb-3">
                  <label class="form-label">URL de la imagen</label>
                  <input v-model="form.imagen" class="form-control" required>
                  <small class="text-muted">Ejemplo: https://ejemplo.com/imagen.jpg</small>
                </div>
                <div class="col-12 mb-3">
                  <label class="form-label">Descripción</label>
                  <textarea v-model="form.descripcion" class="form-control" rows="3"></textarea>
                </div>
              </div>
            </form>
          </div>
          <div class="modal-footer">
            <button type="button" class="btn btn-secondary" @click="cerrarModal">
              Cancelar
            </button>
            <button type="button" class="btn btn-primary" @click="guardarProducto" :disabled="guardando">
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
            ¿Estás seguro de eliminar el producto <strong>{{ confirmacion.producto?.nombre }}</strong>?
            Esta acción no se puede deshacer.
          </div>
          <div class="modal-footer">
            <button type="button" class="btn btn-secondary" @click="cancelarEliminar">
              Cancelar
            </button>
            <button type="button" class="btn btn-danger" @click="eliminarProducto" :disabled="eliminando">
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
import { productosAPI } from "../services/mockapi.js";

export default {
  data() {
    return {
      productos: [],
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
        producto: null
      },
      form: {
        id: null,
        nombre: '',
        precio: '',
        stock: 0,
        categoria: 'audifonos',
        imagen: '',
        descripcion: ''
      }
    }
  },
  async mounted() {
    await this.cargarProductos()
  },
  methods: {
    async cargarProductos() {
      try {
        this.cargando = true
        this.productos = await productosAPI.obtenerProductos()
        this.error = false
      } catch (error) {
        console.error('Error cargando productos:', error)
        this.error = true
        this.mostrarAlerta('Error al cargar productos', 'danger', 'bi-exclamation-triangle')
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
        precio: '',
        stock: 0,
        categoria: 'audifonos',
        imagen: '',
        descripcion: ''
      }
      this.modal = {
        abierto: true,
        esEdicion: false
      }
    },
    
    abrirModalEditar(producto) {
      this.form = { ...producto }
      if (typeof producto.precio === 'string' && producto.precio.startsWith('COP ')) {
        this.form.precio = producto.precio.replace('COP ', '').replace(/\./g, '')
      }
      this.modal = {
        abierto: true,
        esEdicion: true
      }
    },
    
    cerrarModal() {
      this.modal.abierto = false
    },
    
    async guardarProducto() {
      try {
        this.guardando = true
        
        const productoData = {
          nombre: this.form.nombre,
          precio: `COP ${Number(this.form.precio).toLocaleString()}`,
          stock: Number(this.form.stock),
          categoria: this.form.categoria,
          imagen: this.form.imagen,
          descripcion: this.form.descripcion
        }
        
        if (this.modal.esEdicion) {
          await productosAPI.actualizarProducto(this.form.id, productoData)
          this.mostrarAlerta('Producto actualizado correctamente', 'success', 'bi-check-circle')
        } else {
          await productosAPI.crearProducto(productoData)
          this.mostrarAlerta('Producto creado correctamente', 'success', 'bi-check-circle')
        }
        
        await this.cargarProductos()
        this.cerrarModal()
      } catch (error) {
        console.error('Error guardando producto:', error)
        this.mostrarAlerta('Error al guardar producto', 'danger', 'bi-exclamation-triangle')
      } finally {
        this.guardando = false
      }
    },
    
    confirmarEliminar(producto) {
      this.confirmacion = {
        abierto: true,
        producto
      }
    },
    
    cancelarEliminar() {
      this.confirmacion.abierto = false
      this.confirmacion.producto = null
    },
    
    async eliminarProducto() {
      try {
        this.eliminando = true
        await productosAPI.eliminarProducto(this.confirmacion.producto.id)
        this.mostrarAlerta('Producto eliminado correctamente', 'success', 'bi-trash')
        await this.cargarProductos()
        this.cancelarEliminar()
      } catch (error) {
        console.error('Error eliminando producto:', error)
        this.mostrarAlerta('Error al eliminar producto', 'danger', 'bi-exclamation-triangle')
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

.img-thumbnail {
  border-radius: 8px;
  object-fit: cover;
}
</style>