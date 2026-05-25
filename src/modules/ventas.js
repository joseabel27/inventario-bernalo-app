import fs from "fs";
import path from "path";

const RUTA_VENTAS = path.resolve("./src/data/ventas.json");

// Crea el archivo si no existe

if (!fs.existsSync(RUTA_VENTAS)){
 fs.writeFileSync(RUTA_VENTAS,JSON.stringify([],null,2));
 console.log("Archivo ventas.json creado automaticamente ✔");

}


// CARGAR Y GUARDAR AUTOMATICO

function cargarVentasDesdeArchivo(){

    try{
        if (fs.existsSync(RUTA_VENTAS)){

            const data = fs.readFileSync(RUTA_VENTAS, "utf-8");
            return data ? JSON.parse(data) : [];
        } else {
            return [];
        }
    } catch (error){

        console.error("Error a cargar las ventas:",error.message);
        return[];
    }
}


function guardarVentasDesdeArchivo (){

    try{

        fs.writeFileSync(RUTA_VENTAS, JSON.stringify(ventas, null ,2));
        console.log("Ventas guardada correctamente.");
    } catch (error){

        console.error("Error al  guardar las ventas:",error.message);
    }
}

let ventas = cargarVentasDesdeArchivo();


/**
 * Módulo de gestión de ventas
 * Permite registrar una venta y actualizar el inventario automáticamente.
 */

import { buscarProductoPorId, actualizarProducto} from "./inventario.js";
import {validarVentas} from "./validaciones.js";




/**  
* @typedef {Object} Venta
* @property {number} id - ID del producto vendido
* @property {number} cantidad - cantidad de unidades vendidas
* @property {string} vendedor - Nombre del vendedor que realizo la venta
* @property {string} fecha - fecha de la venta
*/

/* Creamo un arreglo vacio para ventas */

//let ventas =[];

/**
 * Registra una nueva venta en el sistema.
 * @param {number}  id - ID del producto vendido
 * @param {number}  cantidad - Cantidad de Unidades Vendidas
 * @param {string}  vendedor - Nombre del vendedor
 */

export function registrarVenta(datosVenta) {

    const {
        vendedor,
        ciudad,
        cliente,
        tipoDocumento,
        factura,
        carrito
    } = datosVenta;

    // =========================
    // VALIDAR CARRITO
    // =========================
    if (!carrito || carrito.length === 0) {

        console.log("Carrito vacío");
        return {
            exito: false,
            mensaje: "No hay productos en el carrito"
        };
    }

    let subtotal = 0;

    // =========================
    // RECORRER PRODUCTOS
    // =========================
    for (const item of carrito) {

        const producto = buscarProductoPorId(item.id);

        if (!producto) {

            return {
                exito: false,
                mensaje: `Producto no encontrado: ${item.nombre}`
            };
        }

        // VALIDAR STOCK
        if (producto.cantidad < item.cantidad) {

            return {
                exito: false,
                mensaje: `Stock insuficiente para ${producto.nombre}`
            };
        }

        // DESCONTAR STOCK
        producto.cantidad -= item.cantidad;

        actualizarProducto(producto.id, producto);

        // SUMAR SUBTOTAL
        subtotal += item.precio * item.cantidad;
    }

    // =========================
    // IVA Y TOTAL
    // =========================
    const iva = subtotal * 0.19;

    const total = subtotal + iva;

    // =========================
    // CREAR VENTA
    // =========================
    const venta = {

        idVenta:
            ventas.length > 0
                ? Math.max(...ventas.map(v => v.idVenta)) + 1
                : 1,

        vendedor,
        ciudad,
        cliente,
        tipoDocumento,
        factura,

        carrito,

        subtotal,
        iva,
        total,

        fecha: new Date().toISOString()
    };

    // =========================
    // GUARDAR
    // =========================
    ventas.push(venta);

    guardarVentasDesdeArchivo();

    console.log("Venta registrada correctamente");

    return {
        exito: true,
        mensaje: "Venta registrada correctamente",
        venta
    };
}

/** 
 * Muestra todas las ventas registradas
*/

export function obtenerVentas() {

  return ventas;

}

export function guardarVentas(nuevasVentas) {

  ventas = nuevasVentas;

  guardarVentasDesdeArchivo();

}


export function listarVentas() {

    return ventas;
}