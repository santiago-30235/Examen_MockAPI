<template>
  <div class="about container text-center py-5">
    <img 
      src="https://cdn-icons-png.flaticon.com/512/1055/1055646.png" 
      alt="Logo GamerShop" 
      class="logo mb-4"
    />
    <h1 class="fw-bold text-primary">Acerca de GamerShop</h1>
    <p class="lead mt-3 text-secondary">
      En <strong>GamerShop</strong> somos una tienda especializada en productos gamer:
      audífonos, teclados, sillas, consolas y mucho más. 
      Nuestro objetivo es ofrecerte la mejor calidad y precios competitivos 
      para que vivas la mejor experiencia de juego.
    </p>

    <div class="row mt-5">
      <div class="col-md-4">
        <h5 class="fw-semibold">🎮 Variedad</h5>
        <p>Encuentra todo tipo de productos gamer en un solo lugar.</p>
      </div>
      <div class="col-md-4">
        <h5 class="fw-semibold">⚡ Envíos rápidos</h5>
        <p>Recibe tus pedidos en cualquier parte del país en pocos días.</p>
      </div>
      <div class="col-md-4">
        <h5 class="fw-semibold">💬 Atención 24/7</h5>
        <p>Siempre estamos disponibles para ayudarte con tus compras.</p>
      </div>
    </div>
  </div>
</template>

<style scoped>
.about {
  min-height: 100vh;
  display: flex;
  flex-direction: column;
  justify-content: center;
}
.logo {
  width: 120px;
}
@media (min-width: 1024px) {
  .about {
    align-items: center;
  }
}
</style>
