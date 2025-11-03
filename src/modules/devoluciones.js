import fs from "fs";
import path from "path";
import { buscarProductoPorId, actualizarProducto } from "./inventario.js";

// Ruta del arcchivo donde se guardara las devoluciones.

const RUTA_DEVOLUCIONES = path.resolve("./src/data/devoluciones.json");


// ====== CARGADO Y GUADADO AUTOMATICO ======


function cargarDevolucionesDesdeArchivo() {

    try {

        if (fs.existsSync(RUTA_DEVOLUCIONES)) {

            const data = fs.readFileSync(RUTA_DEVOLUCIONES, "utf-8");
            return JSON.parse(data);
        } else {

            return [];
        }
    } catch (error) {

        console.log("Error a cargar devoluciones:", error.message);
        return [];
    }
}

function guardarDevolucionesEnArchivo() {


    try {

        fs.writeFileSync(RUTA_DEVOLUCIONES, JSON.stringify(devoluciones, null, 2));
        console.log("Devoluciones guardadas correctamente ✔");
    } catch (error) {

        console.log("Error a guardar devoluciones:", error.message);
    }
}


// Inicializamos el arreglo principal.

let devoluciones = cargarDevolucionesDesdeArchivo();


// ==== FUNCION PRINCIPAL ===

export function registrarDevoluciones(id, cantidad, motivo, vendedor) {

    // Validaciones basicas

    if (!id || cantidad <= 0 || !motivo || !vendedor) {

        console.log("❌ Datos de devolucion no validos.");
        return false;
    }

    const producto = buscarProductoPorId(id);

    if (!producto) {

        console.log("❌ Producto no encontrado");
        return false;
    }


    // Actualizar inventario, (sumar las unidades devueltas.)
    producto.cantidad += cantidad;
    actualizarProducto(producto.id, producto);


    // Crear objeto Devolucion

    const devolucion = {

        id,
        cantidad,
        motivo: motivo.trim(),
        vendedor: vendedor.trim(),
        fecha: new Date().toISOString(),
    };


    // Agregar al registro.

    devoluciones.push(devolucion);
    guardarDevolucionesEnArchivo();


    console.log(`✔ Devolucion registrada para "${producto.nombre}" , Cantidad:${cantidad}`);
    return true;



}