const API_BASE = 'https://691cffcbd58e64bf0d34a9d7.mockapi.io/api/v1';

export const authService = {
  async login(usuario, contrasena) {
    try {
      const response = await fetch(`${API_BASE}/usuarios`);
      const usuarios = await response.json();
      
      const usuarioValido = usuarios.find(
        u => u.usuario === usuario && u.contrasena === contrasena
      );
      
      if (usuarioValido) {
        sessionStorage.setItem('authToken', 'token-' + Date.now());
        sessionStorage.setItem('userData', JSON.stringify(usuarioValido));
        return true;
      }
      return false;
    } catch (error) {
      console.error('Error en login:', error);
      return false;
    }
  },

  isAuthenticated() {
    return !!sessionStorage.getItem('authToken');
  },

  logout() {
    sessionStorage.removeItem('authToken');
    sessionStorage.removeItem('userData');
  },

  getUserData() {
    const data = sessionStorage.getItem('userData');
    return data ? JSON.parse(data) : null;
  }
};

export const usuariosAPI = {
  async obtenerUsuarios() {
    const response = await fetch(`${API_BASE}/usuarios`);
    if (!response.ok) throw new Error('Error al obtener usuarios');
    return await response.json();
  },

  async crearUsuario(usuario) {
    const response = await fetch(`${API_BASE}/usuarios`, {
      method: 'POST',
      headers: { 'Content-Type': 'application/json' },
      body: JSON.stringify(usuario)
    });
    if (!response.ok) throw new Error('Error al crear usuario');
    return await response.json();
  },

  async actualizarUsuario(id, usuario) {
    const response = await fetch(`${API_BASE}/usuarios/${id}`, {
      method: 'PUT',
      headers: { 'Content-Type': 'application/json' },
      body: JSON.stringify(usuario)
    });
    if (!response.ok) throw new Error('Error al actualizar usuario');
    return await response.json();
  },

  async eliminarUsuario(id) {
    const response = await fetch(`${API_BASE}/usuarios/${id}`, {
      method: 'DELETE'
    });
    if (!response.ok) throw new Error('Error al eliminar usuario');
    return await response.json();
  }
};

export const productosAPI = {
  async obtenerProductos() {
    const response = await fetch(`${API_BASE}/products`);
    if (!response.ok) throw new Error('Error al obtener productos');
    return await response.json();
  },

  async crearProducto(producto) {
    const response = await fetch(`${API_BASE}/products`, {
      method: 'POST',
      headers: { 'Content-Type': 'application/json' },
      body: JSON.stringify(producto)
    });
    if (!response.ok) throw new Error('Error al crear producto');
    return await response.json();
  },

  async actualizarProducto(id, producto) {
    const response = await fetch(`${API_BASE}/products/${id}`, {
      method: 'PUT',
      headers: { 'Content-Type': 'application/json' },
      body: JSON.stringify(producto)
    });
    if (!response.ok) throw new Error('Error al actualizar producto');
    return await response.json();
  },

  async eliminarProducto(id) {
    const response = await fetch(`${API_BASE}/products/${id}`, {
      method: 'DELETE'
    });
    if (!response.ok) throw new Error('Error al eliminar producto');
    return await response.json();
  }
};