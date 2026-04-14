
import fs from "fs";
import path from "path";
import { 
  validarNombreProducto,
  validarCategoria,
  validarPrecio,
  validarCantidad,
  validarUbicacion,
  validarStockMinimo
} from "./validaciones.js";


const RUTA_ARCHIVO = path.resolve("./src/data/inventario.json");

//======CARGADO Y GUARDADO AUTOMATICO=======

function cargarInventarioDesdeArchivo() {
  try {

    if (fs.existsSync(RUTA_ARCHIVO)) {
      const data = fs.readFileSync(RUTA_ARCHIVO, "utf8");
      return JSON.parse(data);
    } else {

      return [];
    }

  } catch (error) {

    console.log("Error al cargar el inventario:", error.message);
    return [];
  }

}

function guardarInventarioEnArchivo(){

  try{
    console.log("Guardando Inventario en :",RUTA_ARCHIVO);
    fs.writeFileSync(RUTA_ARCHIVO, JSON.stringify(inventario, null, 2));
    console.log("Inventario guardado correctamente");
  
  } catch (error){

    console.error("Error a guardar el inventario:",error.message);
  }
}

let inventario = cargarInventarioDesdeArchivo();




/* FUNCION PARA LISTAR TODOS LOS PRODUCTOS */

export function listarProductos() {
  console.log("Inventario Actual:");

  /* SI NO HAY PRODUCTOS, MOSTRAMOS UN MSJ */
  if (inventario.length === 0) {
    console.log("No hay productos en el inventario.");
    return;
  }

  /* SI HAY PRODUCTOS, LO RECORREMOS UNO POR UNO */

  inventario.forEach((producto) => {
    console.log(
      `ID: ${producto.id} | Nombre: ${producto.nombre} | Categoria: ${producto.categoria} | Precio: ${producto.precio}| Cantidad: ${producto.cantidad} | Ubicacion: ${producto.ubicacion}|Stock Minimo:${producto.stockMinimo}`
    );
  });
}

/* FUNCION PARA AGREGAR UN PRODUCTO */

export function agregarProductos(nombre, categoria, precio, cantidad, ubicacion, stockMinimo) {
  /*  VALIDAMOS TODOS LOS DATOS DE ENTRADA */

  const validacionNombre = validarNombreProducto(nombre);
  if (!validacionNombre.valido) {
    return { exito: false, mensaje: validacionNombre.mensaje };
  }

  const validacionCategoria = validarCategoria(categoria);
  if (!validacionCategoria.valido) {
    return { exito: false, mensaje: validacionCategoria.mensaje };
  }

  const validacionPrecio = validarPrecio(precio);
  if (!validacionPrecio.valido) {
    return { exito: false, mensaje: validacionPrecio.mensaje };
  }

  const validacionCantidad = validarCantidad(cantidad);
  if (!validacionCantidad.valido) {
    return { exito: false, mensaje: validacionCantidad.mensaje };
  }

  const validacionUbicacion = validarUbicacion(ubicacion);
  if (!validacionUbicacion.valido) {
    return { exito: false, mensaje: validacionUbicacion.mensaje };
  }

  const validacionStockMinimo = validarStockMinimo(stockMinimo);
  if (!validacionStockMinimo.valido) {
    return { exito: false, mensaje: validacionStockMinimo.mensaje };
  }

  /* BUSCAMOS SI EL PRODUCTO YA EXISTE EN EL INVENTARIO */

  const productoExistente = inventario.find(
    (p) => p.nombre.toLowerCase() === nombre.toLowerCase()
  );

  if (productoExistente) {
    /* Si existe, rechazamos la operación */
    return { 
      exito: false, 
      mensaje: `El producto "${nombre}" ya existe en el inventario. Use actualización para modificar la cantidad.` 
    };
  }

  /* Si no existe, creamos un nuevo producto */

  const producto = {
    id: inventario.length > 0 ? Math.max(...inventario.map(p => p.id)) + 1 : 1,
    nombre: nombre,
    categoria: categoria,
    precio: precio,
    cantidad: cantidad,
    ubicacion: ubicacion,
    stockMinimo: stockMinimo
  };

  inventario.push(producto);
  guardarInventarioEnArchivo();

  return {
    exito: true,
    mensaje: `Producto agregado correctamente. ID: ${producto.id} | Nombre: ${producto.nombre}`,
    producto: producto
  };
}


/*  FUNCION PARA BUSCAR PRODCUTOS EN EL INVENTARIO  POR NOMBRE Y POR ID */

/* BUSCAR POR NOMBRE */

export function buscarProductoNombre(nombre) {
  if (inventario.length === 0) {
    console.log("No hay producto en el inventario.");
    return;
  }

  /* VALIDAR ANTES DE BUSCAR */

  if (!validarNombreProducto(nombre)) {

    return; /*  No sigue si la validacion falla */
  }


  const producto = inventario.find(
    (item) => item.nombre.toLowerCase() === nombre.toLowerCase()
  );




  if (producto) {
    console.log(
      `Producto encontrado: ID: ${producto.id} | Nombre: ${producto.nombre} | Cantidad: ${producto.cantidad} | Precio: ${producto.precio} | Categoria: ${producto.categoria} | Ubicacion: ${producto.ubicacion}|Stock Minimo:${producto.stockMinimo}`
    );
  } else {
    console.log(`Producto Nombre " ${nombre}" no encontrado.`);
  }
}

/* BUSCAR POR ID */

export function buscarProductoPorId(id) {
  if (inventario.length === 0) {
    console.log("No hay producto en el inventario.");
    return null;
  }

  const producto = inventario.find((item) => item.id === id);

  if (producto) {
    console.log(
      `Producto encontrado: ID: ${producto.id} | Nombre: ${producto.nombre} | Cantidad: ${producto.cantidad} | Precio: ${producto.precio} | Categoria: ${producto.categoria}| Ubicacion: ${producto.ubicacion}|Stock Minimo:${producto.stockMinimo}`
    );

    return producto;

  } else {
    console.log(`Producto con ID ${id} no encontrado.`);
  }
}

export function verificarStockMinimo(producto) {
  if (producto.cantidad <= producto.stockMinimo) {
    console.log(
      `⚠️ Atención: El producto "${producto.nombre}" ha alcanzado o bajado su stock mínimo (${producto.cantidad}/${producto.stockMinimo}).`
    );
  }
}

/* FUNCION PARA ACTUALIZAR UN PRODUCTO */

export function actualizarProducto(id, nuevosDatos) {
  if (inventario.length === 0) {
    console.log("No hay productos en el inventario.");
    return;
  }

  /* Buscar el producto por el ID */

  const producto = inventario.find((item) => item.id === id);

  if (producto) {
    /* Actualizamos los datos que nos pase en nuevosDatos */

    Object.assign(producto, nuevosDatos);
    console.log(`Producto Actualizado:`, producto);


    verificarStockMinimo(producto);
    guardarInventarioEnArchivo();
  } else {
    console.log(`Producto con ID: ${id} no encontrado.`);
  }
}

/* VERIFICAR EL STOCK MINIMO */


/* FUNCION PARA ELIMINAR PRODUCTO */

export function eliminarProducto(id) {
  const index = inventario.findIndex((p) => p.id === id);

  if (index !== -1) {
    const eliminado = inventario.splice(index, 1)[0];
    console.log(
      `Producto Eliminado : ID: ${eliminado.id} | Nombre : ${eliminado.nombre}`
    );
  } else {
    console.log(`No se encontro el producto con el ID: ${id}`);
  }
}

export function obtenerInventario () {
return inventario;

}

