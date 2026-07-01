const contenedor = document.getElementById('productos');

class Producto {
  #precio;
  #stock;

  constructor(nombre, marca, precio, stock, imagen) {
    this.nombre = nombre;
    this.marca  = marca;
    this.precio = precio;
    this.stock  = stock;
    this.imagen = imagen;
  }
 
  descripcion() {
    return `${this.nombre} — ${this.marca}`;
  }

  set precio(valor){
    if (valor <= 0 ) {
      console.log (`Precio Inválido: ${valor}`);
    }
    this.#precio = valor;
  }

  get precio(){
    return this.#precio
  }

  set stock (valor){
    if (valor <= 0) {
      console.log (`Stock Inválido: ${valor}`);
    }
    this.#stock = valor;
  }

  get stock(){
    return this.#stock
  }

  get estaDisponible() {
    return this.stock > 0;
  }
 
  get precioFormateado() {
    return `$${this.precio.toLocaleString('es-AR')}`;
  }
 
  resumen() {
    const disponible = this.estaDisponible ? `${this.stock} en stock` : 'Sin stock';
    return `${this.descripcion()} | ${this.precioFormateado} | ${disponible}`;
  }

  fichaTecnica(){
    return `${this.nombre} - ${this.marca}`
  }
}
 

class Notebook extends Producto {
  constructor (nombre, marca, precio, stock, imagen, procesador, ramGB, almacenamientoGB, pantallaPulgadas){
    super(nombre, marca, precio, stock, imagen,)
    this.procesador = procesador;
    this.ramGB = ramGB;
    this.almacenamientoGB = almacenamientoGB;
    this.pantallaPulgadas = pantallaPulgadas;
  };

  fichaTecnica () {
  return `${this.nombre} | ${this.marca} | ${this.procesador} | ${this.ramGB} | ${this.almacenamientoGB} | ${this.pantallaPulgadas}`
  }
}



class Celular extends Producto {
  constructor (nombre, marca, precio, stock, imagen, pantallaPulgadas, bateriaMah, camaraMp, almacenamientoGB) {
    super(nombre, marca, precio, stock, imagen,)
    this.pantallaPulgadas = pantallaPulgadas;
    this.bateriaMah = bateriaMah;
    this.camaraMp = camaraMp;
    this. almacenamientoGB = almacenamientoGB;
  }

  fichaTecnica () {
  return `${this.nombre} | ${this.marca} | ${this.pantallaPulgadas} | ${this.bateriaMah} | ${this.camaraMp} | ${this.almacenamientoGB}`
  }
}

class Auricular extends Producto {
  constructor(nombre, marca, precio, stock, imagen, tipo, wireless, cancelacionRuido){
    super(nombre, marca, precio, stock, imagen,)
    this.tipo = tipo;
    this.wireless = wireless;
    this.cancelacionRuido = cancelacionRuido;
  }

  fichaTecnica () {
  return `${this.nombre} | ${this.marca} | ${this.tipo} | ${this.wireless} | ${this.cancelacionRuido}`
  }
}

class Monitor extends Producto {
  constructor(nombre, marca, precio, stock, imagen, pulgadas, resolucion, panelTipo, hz){
    super(nombre, marca, precio, stock, imagen,)
    this.pulgadas = pulgadas;
    this.resolucion = resolucion;
    this.panelTipo = panelTipo;
    this.hz = hz;
  }

  fichaTecnica () {
  return `${this.nombre} | ${this.marca} | ${this.pulgadas} | ${this.resolucion} | ${this.panelTipo} | ${this.hz}`
  }
}

class PCEscritorio extends Producto {
  constructor(nombre, marca, precio, stock, imagen, procesador, ramGB, almacenamientoGB, placaVideo, fuenteW){
    super (nombre, marca, precio, stock, imagen,)
    this.procesador = procesador;
    this.ramGB = ramGB;
    this.almacenamientoGB = almacenamientoGB;
    this.placaVideo = placaVideo;
    this.fuenteW = fuenteW;
  }

  fichaTecnica () {
  return `${this.nombre} | ${this.marca} | ${this.procesador} | ${this.ramGB} | ${this.almacenamientoGB} | ${this.placaVideo} | ${this.fuenteW}`
  }
}

// ── Renderizado ───────────────────────────────────────────────
function crearTarjeta(producto) {
  const article = document.createElement('article');
  article.className = producto.estaDisponible ? 'tarjeta' : 'tarjeta sin-stock';

  const img = document.createElement('img');
  img.src = producto.imagen; img.alt = producto.nombre; img.loading = 'lazy';

  const info = document.createElement('div');
  info.className = 'tarjeta-info';

  const h3 = document.createElement('h3');
  h3.textContent = producto.nombre;

  const precio = document.createElement('p');
  precio.className = 'precio';
  precio.textContent = producto.precioFormateado;

  const ficha = document.createElement('p');
  ficha.className = 'ficha';
  ficha.textContent = producto.fichaTecnica();

  const btn = document.createElement('button');
  btn.textContent = producto.estaDisponible ? 'Agregar al carrito' : 'Sin stock';
  btn.disabled    = !producto.estaDisponible;

  const btnDetalle = document.createElement('button');
  btnDetalle.textContent = 'Ver detalle';
  btnDetalle.className   = 'btn-detalle';

  // el window.location.href se refiere a la ventana actual. si le asigno un valor distinto,
  // me redirige a ese nuevo valor
  btnDetalle.addEventListener('click', () => {
    window.location.href = `producto.html?id=${producto.id}`;
  });

  info.appendChild(h3);
  info.appendChild(precio);
  info.appendChild(ficha);
  info.appendChild(btn);
  info.appendChild(btnDetalle);

  article.appendChild(img);
  article.appendChild(info);
  return article;
}


// PARA VISTA DE TODOS LOS PRODUCTOS

// esta id debe corresponder a un id en el html para mostrar las tarjetas
// ej. <div id="productos-filtrados"></div>
// aca se van a cargar los datos que vengan del back
let catalogo = [];

// ── Armar objeto ───────────────────────────────────────────────────
function crearProducto(d) {
  // definimos atributos base que no cambian por subclase de producto
  const base = [d.nombre, d.marca, d.precio, d.stock, d.imagen];
  let producto;
  switch (d.categoria) {
    case 'notebook':
      producto = new Notebook(...base, d.procesador, d.ramGB, d.almacenamientoGB, d.pantallaPulgadas);
      break;
    case 'celular':
      producto = new Celular(...base, d.pantallaPulgadas, d.bateriaMah, d.camaraMp, d.almacenamientoGB);
      break;
    case 'auricular':
      producto = new Auricular(...base, d.tipo, d.wireless, d.cancelacionRuido);
      break;
    case 'monitor':
      producto = new Monitor(...base, d.pulgadas, d.resolucion, d.panelTipo, d.hz);
      break;
    case 'pc_escritorio':
      producto = new PCEscritorio(...base, d.procesador, d.ramGB, d.almacenamientoGB, d.placaVideo, d.fuenteW);
      break;
    default:
      producto = new Producto(...base);
  }
  // aca definimos que tome el id del producto que viene del back
  producto.id = d.id;
  return producto;
}

// ── Fetch ─────────────────────────────────────────────────────
// async porque va a ser una funcion asincrona
async function cargarProductos() {
  try {
    // la funcion fetch nos permite realizar peticiones al backend
    // await porque al ser cargarProductos una funcion asincrona, debemos esperar
    // a que la respuesta venga
    const respuesta = await fetch('http://localhost:8080/productos');
    if (!respuesta.ok) throw new Error(`Error: ${respuesta.status}`);

    // convertimos datos a json para poder utilizarlos
    const datos = await respuesta.json();

    console.log(datos)

    catalogo = datos.map(d => crearProducto(d));

    renderizar(catalogo)

  } catch (error) {
    console.error('No se pudo cargar:', error.message);
  }
}


// funcion para mostrar los productos
function renderizar(lista) {
  contenedor.innerHTML = '';
  if (lista.length === 0) {
    contenedor.innerHTML = '<p style="color:#888;padding:16px">No se encontraron productos.</p>';
    return;
  }
  // utilizamos un forEach porque viene una lista de productos, y por cada producto
  // creamos una tarjeta
  lista.forEach(p => contenedor.appendChild(crearTarjeta(p)));
}

cargarProductos()