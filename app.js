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


// ── Catálogo de productos ────────────────────────────────────
// Array global — definido fuera de cualquier función o clase
const catalogo = [
  // Notebooks
  new Notebook(
    'MacBook Air M2', 'Apple', 2100000, 4,
    'https://images.unsplash.com/photo-1611186871525-5a0c4f200c34?w=400',
    'Apple M2', 8, 256, 13.6
  ),
  new Notebook(
    'ZenBook 14 OLED', 'Asus', 1850000, 3,
    'https://images.unsplash.com/photo-1588872657578-7efd1f1555ed?w=400',
    'AMD Ryzen 7', 16, 512, 14.0
  ),

  // Celulares
  new Celular(
    'iPhone 15 Pro', 'Apple', 1650000, 12,
    'https://images.unsplash.com/photo-1695048133142-1a20484d2569?w=400',
    6.1, 3274, 48, 128
  ),
  new Celular(
    'Galaxy S24 Ultra', 'Samsung', 1900000, 8,
    'https://images.unsplash.com/photo-1610945265064-0e34e5519bbf?w=400',
    6.8, 5000, 200, 256
  ),

  // Auriculares
  new Auricular(
    'Sony WH-1000XM5', 'Sony', 420000, 5,
    'https://images.unsplash.com/photo-1618366712010-f4ae9c647dcb?w=400',
    'Over-Ear', true, true
  ),
  new Auricular(
    'AirPods Pro 2', 'Apple', 350000, 0, // Sin stock para probar la lógica
    'https://images.unsplash.com/photo-1588449668338-d1341a1165f2?w=400',
    'In-Ear', true, true
  ),

  // Monitores
  new Monitor(
    'LG UltraGear 27GP850', 'LG', 480000, 6,
    'https://images.unsplash.com/photo-1527443224154-c4a3942d3acf?w=400',
    27, '2560x1440', 'Nano IPS', 165
  ),
  new Monitor(
    'Samsung Odyssey G7', 'Samsung', 750000, 2,
    'https://images.unsplash.com/photo-1547119957-637f8679db1e?w=400',
    32, '2560x1440', 'VA Curvo', 240
  ),

  // PC Escritorio
  new PCEscritorio(
    'PC Gamer Entry Level', 'Armada', 1200000, 5,
    'https://images.unsplash.com/photo-1587202372634-32705e3bf49c?w=400',
    'Intel i5 12400F', 16, '1TB SSD', 'RTX 3060', 650
  ),
  new PCEscritorio(
    'PC Gamer Hardcore', 'Armada', 2800000, 2,
    'https://images.unsplash.com/photo-1542751371-adc38448a05e?w=400',
    'AMD Ryzen 7 7800X3D', 32, '2TB NVMe', 'RTX 4070 Ti Super', 850
  )
];

catalogo.forEach(prod => {
  console.log("=== RESUMEN ===");
  console.log(prod.resumen());
  console.log("=== FICHA TÉCNICA ===");
  console.log(prod.fichaTecnica());
  console.log("\n");
});