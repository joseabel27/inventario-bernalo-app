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

    // Calcular total de la venta

    const total = cantidad * producto.precio;

    // Crear Objeto Venta   

    const venta = {

        idVenta:ventas.length> 0 ? Math.max(...ventas.map( v => v.idVenta)) + 1 :1,
        producto:producto.nombre,
        idProducto : producto.id,
        cantidad,
        precioUnitario:producto.precio,
        total,
        vendedor: vendedor.trim(),
        fecha: new Date().toISOString(),
    };

    // Agregar y guardar venta

    ventas.push(venta);
    guardarVentasDesdeArchivo();
    console.log(`Vente registrada con exito: ${cantidad} x ${producto.nombre} = $${total}` );
    return true;

}



/** 
 * Muestra todas las ventas registradas
*/

export function listarVentas(){

    console.table(ventas);
}
