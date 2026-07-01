const contenedorDetalle = document.getElementById('detalle-producto');

const parametrosURL = new URLSearchParams(window.location.search);
const idProducto = parametrosURL.get('id');

class Producto {
  #precio;
  #stock;
  constructor(nombre, marca, precio, stock, imagen) {
    this.nombre = nombre; this.marca = marca; this.precio = precio; this.stock = stock; this.imagen = imagen;
  }
  set precio(v) { this.#precio = v <= 0 ? 0 : v; }
  get precio() { return this.#precio; }
  set stock(v) { this.#stock = v <= 0 ? 0 : v; }
  get stock() { return this.#stock; }
  get estaDisponible() { return this.stock > 0; }
  get precioFormateado() { return `$${this.precio.toLocaleString('es-AR')}`; }
  fichaTecnica() { return `${this.nombre} — ${this.marca}`; }
}

class Notebook extends Producto {
  constructor(n, m, p, s, i, procesador, ramGB, almacenamientoGB, pantallaPulgadas) {
    super(n, m, p, s, i); this.procesador = procesador; this.ramGB = ramGB; this.almacenamientoGB = almacenamientoGB; this.pantallaPulgadas = pantallaPulgadas;
  }
  fichaTecnica() { return `Procesador: ${this.procesador} | RAM: ${this.ramGB}GB | Almacenamiento: ${this.almacenamientoGB}GB | Pantalla: ${this.pantallaPulgadas}"`; }
}

class Celular extends Producto {
  constructor(n, m, p, s, i, pantallaPulgadas, bateriaMah, camaraMp, almacenamientoGB) {
    super(n, m, p, s, i); this.pantallaPulgadas = pantallaPulgadas; this.bateriaMah = bateriaMah; this.camaraMp = camaraMp; this.almacenamientoGB = almacenamientoGB;
  }
  fichaTecnica() { return `Pantalla: ${this.pantallaPulgadas}" | Batería: ${this.bateriaMah} mAh | Cámara: ${this.camaraMp}MP | Almacenamiento: ${this.almacenamientoGB}GB`; }
}

class Auricular extends Producto {
  constructor(n, m, p, s, i, tipo, wireless, cancelacionRuido) {
    super(n, m, p, s, i); this.tipo = tipo; this.wireless = wireless; this.cancelacionRuido = cancelacionRuido;
  }
  fichaTecnica() { return `Tipo: ${this.tipo} | Conexión: ${this.wireless ? 'Inalámbrico' : 'Cable'} | Cancelación de Ruido: ${this.cancelacionRuido ? 'Sí' : 'No'}`; }
}

class Monitor extends Producto {
  constructor(n, m, p, s, i, pulgadas, resolucion, panelTipo, hz) {
    super(n, m, p, s, i); this.pulgadas = pulgadas; this.resolucion = resolucion; this.panelTipo = panelTipo; this.hz = hz;
  }
  fichaTecnica() { return `Pulgadas: ${this.pulgadas}" | Resolución: ${this.resolucion} | Panel: ${this.panelTipo} | Frecuencia: ${this.hz}Hz`; }
}

class PCEscritorio extends Producto {
  constructor(n, m, p, s, i, procesador, ramGB, almacenamientoGB, placaVideo, fuenteW) {
    super(n, m, p, s, i); this.procesador = procesador; this.ramGB = ramGB; this.almacenamientoGB = almacenamientoGB; this.placaVideo = placaVideo; this.fuenteW = fuenteW;
  }
  fichaTecnica() { return `Procesador: ${this.procesador} | RAM: ${this.ramGB}GB | Almacenamiento: ${this.almacenamientoGB}GB | Gráfica: ${this.placaVideo} | Fuente: ${this.fuenteW}W`; }
}

function crearProducto(d) {
  const base = [d.nombre, d.marca, d.precio, d.stock, d.imagen];
  let producto;
  switch (d.categoria) {
    case 'notebook': producto = new Notebook(...base, d.procesador, d.ramGB, d.almacenamientoGB, d.pantallaPulgadas); break;
    case 'celular': producto = new Celular(...base, d.pantallaPulgadas, d.bateriaMah, d.camaraMp, d.almacenamientoGB); break;
    case 'auricular': producto = new Auricular(...base, d.tipo, d.wireless, d.cancelacionRuido); break;
    case 'monitor': producto = new Monitor(...base, d.pulgadas, d.resolucion, d.panelTipo, d.hz); break;
    case 'pc_escritorio': producto = new PCEscritorio(...base, d.procesador, d.ramGB, d.almacenamientoGB, d.placaVideo, d.fuenteW); break;
    default: producto = new Producto(...base);
  }
  producto.id = d.id;
  return producto;
}

function renderizarDetalle(producto) {
  if (!contenedorDetalle) return;
  contenedorDetalle.innerHTML = '';

  const article = document.createElement('article');
  article.className = 'detalle-principal';

  const img = document.createElement('img');
  img.src = producto.imagen;
  img.alt = producto.nombre;
  img.className = 'detalle-imagen';

  const info = document.createElement('div');
  info.className = 'detalle-info-col';

  const h2 = document.createElement('h2');
  h2.textContent = producto.nombre;

  const pPrecio = document.createElement('p');
  pPrecio.className = 'detalle-precio';
  pPrecio.textContent = producto.precioFormateado;

  const pFicha = document.createElement('p');
  pFicha.className = 'detalle-ficha-texto';
  pFicha.innerHTML = `<strong>Especificaciones:</strong> ${producto.fichaTecnica()}`;

  const pStock = document.createElement('p');
  pStock.textContent = producto.estaDisponible ? `Stock disponible: ${producto.stock} unidades` : 'Sin Stock';

  const btn = document.createElement('button');
  btn.className = 'btn-compra-principal';
  btn.textContent = producto.estaDisponible ? 'Agregar al carrito' : 'Sin Stock';
  btn.disabled = !producto.estaDisponible;

  const volver = document.createElement('a');
  volver.href = 'index.html';
  volver.className = 'btn-volver';
  volver.textContent = '← Volver al Catálogo';

  info.appendChild(h2);
  info.appendChild(pPrecio);
  info.appendChild(pFicha);
  info.appendChild(pStock);
  info.appendChild(btn);
  info.appendChild(volver);

  article.appendChild(img);
  article.appendChild(info);

  contenedorDetalle.appendChild(article);
}

async function obtenerProductoPorId() {
  if (!idProducto) {
    mostrarError('No se especificó ningún ID de producto.');
    return;
  }

  try {
    const respuesta = await fetch(`http://localhost:8080/productos/${idProducto}`);

    if (!respuesta.ok) {
      throw new Error('El producto solicitado no existe en el servidor.');
    }

    const datosProducto = await respuesta.json();
    
    const instancia = crearProducto(datosProducto);
    
    renderizarDetalle(instancia);

  } catch (error) {
    console.error(error);
    mostrarError(error.message);
  }
}

function mostrarError(mensaje) {
  if (!contenedorDetalle) return;
  contenedorDetalle.innerHTML = `
    <div class="error-detalle">
      <h3>¡Ups! Hubo un problema</h3>
      <p>${mensaje}</p>
      <a href="index.html" style="color: red; font-weight: bold;">Volver al Catálogo</a>
    </div>
  `;
}

// Ejecutamos al cargar la página
obtenerProductoPorId();

// ── localStorage ──────────────────────────────────────────────
function guardarFiltro(categoria) {
  if (categoria && categoria !== 'todos') {
    localStorage.setItem('filtroActivo', categoria);
  } else {
    localStorage.removeItem('filtroActivo');
  }
}

window.addEventListener('beforeunload', () => {
localStorage.removeItem('filtroActivo');
});

// En cada link del nav que NO sea productos.html
// agregar un listener que limpie al hacer clic
document.querySelectorAll('nav a').forEach(link => {
  link.addEventListener('click', () => {
    // if (!link.href.includes('productos.html')) {
      localStorage.removeItem('filtroActivo');
    // }
  });
});

// ── Sincronizar botones ───────────────────────────────────────
function sincronizarBotones(categoria) {
  botones.forEach(b => {
    b.classList.toggle('activo', b.dataset.categoria === categoria);
  });
}

// ── Filtrado ──────────────────────────────────────────────────
function aplicarFiltros() {
  let resultado = catalogo_completo;

  if (categoriaActiva !== 'todos') {
    resultado = resultado.filter(p => {
      const tipo = p.constructor.name.toLowerCase();
      if (categoriaActiva === 'pc_escritorio') return tipo === 'pcescritorio';
      return tipo === categoriaActiva;
    });
  }

  if (textoBusqueda) {
    resultado = resultado.filter(p =>
      p.nombre.toLowerCase().includes(textoBusqueda) ||
      p.marca.toLowerCase().includes(textoBusqueda)
    );
  }

  renderizar(resultado);
  contador.textContent = `${resultado.length} producto${resultado.length !== 1 ? 's' : ''}`;
}

// ── Eventos ───────────────────────────────────────────────────

// Botones de categoría
botones.forEach(btn => {
  btn.addEventListener('click', () => {
    categoriaActiva = btn.dataset.categoria;
    sincronizarBotones(categoriaActiva);
    guardarFiltro(categoriaActiva);
    aplicarFiltros();
  });
});

// Buscador
buscador.addEventListener('input', () => {
  console.log('puto')
  textoBusqueda = buscador.value.toLowerCase().trim();
  aplicarFiltros();
});

// Limpiar búsqueda
btnLimpiarBusqueda.addEventListener('click', () => {
  buscador.value = '';
  textoBusqueda  = '';
  aplicarFiltros();
});

// Limpiar todos los filtros
btnLimpiarFiltros.addEventListener('click', () => {
  categoriaActiva = 'todos';
  textoBusqueda   = '';
  buscador.value  = '';
  guardarFiltro('todos');
  sincronizarBotones('todos');
  aplicarFiltros();
});