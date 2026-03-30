"use strict";
// ===================
// CLASE BASE
// ===================
class Material {
    constructor(title, author, year) {
        this.title = title;
        this.author = author;
        this.year = year;
    }
}
// ===================
// LIBRO
// ===================
class Libro extends Material {
    constructor(title, author, year, isbn) {
        super(title, author, year);
        this.isbn = isbn;
        this.disponible = true;
    }
    obtenerDescripcion() {
        return `Libro: ${this.title} - ${this.author}`;
    }
    prestar(usuario) {
        if (this.disponible) {
            this.disponible = false;
            console.log(`Libro prestado a ${usuario}`);
        }
        else {
            console.log("El libro ya está prestado");
        }
    }
    devolver() {
        this.disponible = true;
        console.log("Libro devuelto");
    }
    estaDisponible() {
        return this.disponible;
    }
}
// ===================
// REVISTA
// ===================
class Revista extends Material {
    constructor(title, author, year, edicion) {
        super(title, author, year);
        this.edicion = edicion;
        this.disponible = true;
    }
    obtenerDescripcion() {
        return `Revista: ${this.title} - Edición ${this.edicion}`;
    }
    prestar(usuario) {
        if (this.disponible) {
            this.disponible = false;
            console.log(`Revista prestada a ${usuario}`);
        }
        else {
            console.log("La revista ya está prestada");
        }
    }
    devolver() {
        this.disponible = true;
        console.log("Revista devuelta");
    }
    estaDisponible() {
        return this.disponible;
    }
}
// ===================
// BIBLIOTECA
// ===================
class Biblioteca {
    constructor() {
        this.materiales = [];
    }
    agregar(material) {
        this.materiales.push(material);
    }
    mostrarDisponibles() {
        console.log("Disponibles:");
        this.materiales.forEach(m => {
            if ("estaDisponible" in m && m.estaDisponible()) {
                console.log(m.obtenerDescripcion());
            }
        });
    }
    prestar(titulo, usuario) {
        const mat = this.materiales.find(m => m.title === titulo);
        if (mat && "prestar" in mat) {
            mat.prestar(usuario);
        }
        else {
            console.log("No se puede prestar");
        }
    }
    devolver(titulo) {
        const mat = this.materiales.find(m => m.title === titulo);
        if (mat && "devolver" in mat) {
            mat.devolver();
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
class TarjetaCredito {
    procesarPago(monto) {
        console.log(`Pagando $${monto} con Tarjeta de Crédito`);
        return true;
    }
}
class TransferenciaBancaria {
    procesarPago(monto) {
        console.log(`Pagando $${monto} con Transferencia Bancaria`);
        return true;
    }
}
class BilleteraDigital {
    procesarPago(monto) {
        console.log(`Pagando $${monto} con Billetera Digital`);
        return true;
    }
}
class Orden {
    constructor(id, cliente, monto) {
        this.id = id;
        this.cliente = cliente;
        this.monto = monto;
        this.pagada = false;
        this.metodo = "";
    }
    estaPagada() {
        return this.pagada;
    }
    marcarPagada(metodo) {
        this.pagada = true;
        this.metodo = metodo;
    }
    mostrar() {
        console.log(`Orden ${this.id} - Cliente: ${this.cliente} - $${this.monto} - Estado: ${this.pagada ? "Pagada" : "Pendiente"} - Metodo: ${this.metodo}`);
    }
}
class ProcesadorPago {
    procesarPago(orden, metodo, nombreMetodo) {
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
