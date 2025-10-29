/**
 * Módulo de gestión de ventas
 * Permite registrar una venta y actualizar el inventario automáticamente.
 */

import { buscarProductoPorId, actualizarProducto,verificarStockMinimo } from "./inventario.js";
import {validarVentas} from "./validaciones.js";




/**  
* @typedef {Object} Venta
* @property {number} id - ID del producto vendido
* @property {number} cantidad - cantidad de unidades vendidas
* @property {string} vendedor - Nombre del vendedor que realizo la venta
* @property {string} fecha - fecha de la venta
*/

/* Creamo un arreglo vacio para ventas */

let ventas =[];

/**
 * Registra una nueva venta en el sistema.
 * @param {number}  id - ID del producto vendido
 * @param {number}  cantidad - Cantidad de Unidades Vendidas
 * @param {string}  vendedor - Nombre del vendedor
 */

export function registrarVenta(id,cantidad,vendedor){

    // Validacion de los datos de la venta

    if(!validarVentas(id, cantidad, vendedor)){

    console.log("Datos de venta no validos.");
    return false;
    }

    //Buscar el producto

    const producto = buscarProductoPorId (id);
    if(!producto){

        console.log("Producto no encontrado");
        return false;
        
    }

    // Verificar Stock disponible

    if(producto.cantidad < cantidad){
        console.log("Stock Insuficiente, Venta no se puede realizar");
        return false;

    }

    // Actualizar inventario ( restar las unidades vendidas)

    producto.cantidad -= cantidad;
    actualizarProducto(producto.id, producto);

    // Crear Objeto Venta   

    const venta = {

        id,
        cantidad,
        vendedor: vendedor.trim(),
        fecha: new Date().toISOString(),
    };

    ventas.push(venta);
    console.log("Venta registrada con EXITO");

}



/** 
 * Muestra todas las ventas registradas
*/

export function listarVentas(){

    console.table(ventas);
}
