// ===================
// CLASE BASE
// ===================
abstract class Material {
  constructor(
    public title: string,
    public author: string,
    public year: number
  ) {}

  abstract obtenerDescripcion(): string;
}

// ===================
// INTERFAZ PRESTABLE
// ===================
interface Prestable {
  prestar(usuario: string): void;
  devolver(): void;
  estaDisponible(): boolean;
}

// ===================
// LIBRO
// ===================
class Libro extends Material implements Prestable {
  private disponible: boolean = true;

  constructor(
    title: string,
    author: string,
    year: number,
    public isbn: string
  ) {
    super(title, author, year);
  }

  obtenerDescripcion(): string {
    return `Libro: ${this.title} - ${this.author}`;
  }

  prestar(usuario: string): void {
    if (this.disponible) {
      this.disponible = false;
      console.log(`Libro prestado a ${usuario}`);
    } else {
      console.log("El libro ya está prestado");
    }
  }

  devolver(): void {
    this.disponible = true;
    console.log("Libro devuelto");
  }

  estaDisponible(): boolean {
    return this.disponible;
  }
}

// ===================
// REVISTA
// ===================
class Revista extends Material implements Prestable {
  private disponible: boolean = true;

  constructor(
    title: string,
    author: string,
    year: number,
    public edicion: number
  ) {
    super(title, author, year);
  }

  obtenerDescripcion(): string {
    return `Revista: ${this.title} - Edición ${this.edicion}`;
  }

  prestar(usuario: string): void {
    if (this.disponible) {
      this.disponible = false;
      console.log(`Revista prestada a ${usuario}`);
    } else {
      console.log("La revista ya está prestada");
    }
  }

  devolver(): void {
    this.disponible = true;
    console.log("Revista devuelta");
  }

  estaDisponible(): boolean {
    return this.disponible;
  }
}

// ===================
// BIBLIOTECA
// ===================
class Biblioteca {
  private materiales: Material[] = [];

  agregar(material: Material): void {
    this.materiales.push(material);
  }

  mostrarDisponibles(): void {
    console.log("Disponibles:");
    this.materiales.forEach(m => {
      if ("estaDisponible" in m && (m as any).estaDisponible()) {
        console.log(m.obtenerDescripcion());
      }
    });
  }

  prestar(titulo: string, usuario: string): void {
    const mat = this.materiales.find(m => m.title === titulo);
    if (mat && "prestar" in mat) {
      (mat as any).prestar(usuario);
    } else {
      console.log("No se puede prestar");
    }
  }

  devolver(titulo: string): void {
    const mat = this.materiales.find(m => m.title === titulo);
    if (mat && "devolver" in mat) {
      (mat as any).devolver();
    }
  }
}

// ===================
// PRUEBA FINAL
// ===================
const biblio = new Biblioteca();

const libro1 = new Libro("Libro1", "Autor1", 2020, "123");
const libro2 = new Libro("Libro2", "Autor2", 2021, "456");
const revista = new Revista("Revista1", "Editor", 2023, 10);

biblio.agregar(libro1);
biblio.agregar(libro2);
biblio.agregar(revista);

biblio.mostrarDisponibles();

biblio.prestar("Libro1", "Juan");
biblio.prestar("Libro1", "Pedro"); // error controlado

biblio.devolver("Libro1");

biblio.mostrarDisponibles();

// ===================
// INTERFAZ METODO PAGO
// ===================
interface MetodoPago {
  procesarPago(monto: number): boolean;
}

class TarjetaCredito implements MetodoPago {
  procesarPago(monto: number): boolean {
    console.log(`Pagando $${monto} con Tarjeta de Crédito`);
    return true;
  }
}

class TransferenciaBancaria implements MetodoPago {
  procesarPago(monto: number): boolean {
    console.log(`Pagando $${monto} con Transferencia Bancaria`);
    return true;
  }
}

class BilleteraDigital implements MetodoPago {
  procesarPago(monto: number): boolean {
    console.log(`Pagando $${monto} con Billetera Digital`);
    return true;
  }
}

class Orden {
  private pagada: boolean = false;
  private metodo: string = "";

  constructor(
    public id: number,
    public cliente: string,
    public monto: number
  ) {}

  estaPagada(): boolean {
    return this.pagada;
  }

  marcarPagada(metodo: string): void {
    this.pagada = true;
    this.metodo = metodo;
  }

  mostrar(): void {
    console.log(
      `Orden ${this.id} - Cliente: ${this.cliente} - $${this.monto} - Estado: ${this.pagada ? "Pagada" : "Pendiente"} - Metodo: ${this.metodo}`
    );
  }
}

class ProcesadorPago {
  procesarPago(orden: Orden, metodo: MetodoPago, nombreMetodo: string): void {
    if (orden.estaPagada()) {
      console.log("Esta orden ya fue pagada");
      return;
    }

    if (metodo.procesarPago(orden.monto)) {
      orden.marcarPagada(nombreMetodo);
      console.log("Pago realizado con éxito");
    }
  }
}

// ===================
// PRUEBA SISTEMA PAGOS
// ===================
const orden1 = new Orden(1, "Carlos", 500);
const orden2 = new Orden(2, "Ana", 300);
const orden3 = new Orden(3, "Luis", 800);

const procesador = new ProcesadorPago();

procesador.procesarPago(orden1, new TarjetaCredito(), "Tarjeta");
procesador.procesarPago(orden2, new TransferenciaBancaria(), "Transferencia");
procesador.procesarPago(orden3, new BilleteraDigital(), "Billetera");

// Intentar pagar otra vez
procesador.procesarPago(orden1, new TarjetaCredito(), "Tarjeta");

// Mostrar resumen
orden1.mostrar();
orden2.mostrar();
orden3.mostrar();