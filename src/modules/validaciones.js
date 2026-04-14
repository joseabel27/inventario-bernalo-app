export function validarNombreProducto(nombre){

  if (!nombre || nombre.trim() === ""){

    return { valido: false, mensaje: "El nombre no puede estar vacío." };
  }

  const regex = /^[A-Za-z0-9\s]+$/;

  if (!regex.test(nombre)){

    return { valido: false, mensaje: "El nombre solo puede contener letras, números y espacios." };
  }

  return { valido: true, mensaje: "Nombre válido" };
}

/**
 * Valida la categoría del producto
 * @param {string} categoria - Categoría del producto
 * @returns {object} { valido: boolean, mensaje: string }
 */
export function validarCategoria(categoria) {
  if (!categoria || categoria.trim() === "") {
    return { valido: false, mensaje: "La categoría no puede estar vacía." };
  }

  if (categoria.trim().length < 2) {
    return { valido: false, mensaje: "La categoría debe tener al menos 2 caracteres." };
  }

  return { valido: true, mensaje: "Categoría válida" };
}

/**
 * Valida el precio del producto
 * @param {number} precio - Precio del producto
 * @returns {object} { valido: boolean, mensaje: string }
 */
export function validarPrecio(precio) {
  if (typeof precio !== "number" || precio < 0) {
    return { valido: false, mensaje: "El precio debe ser un número positivo." };
  }

  if (precio === 0) {
    return { valido: false, mensaje: "El precio no puede ser cero." };
  }

  return { valido: true, mensaje: "Precio válido" };
}

/**
 * Valida la cantidad del producto
 * @param {number} cantidad - Cantidad del producto
 * @returns {object} { valido: boolean, mensaje: string }
 */
export function validarCantidad(cantidad) {
  if (typeof cantidad !== "number" || cantidad <= 0 || !Number.isInteger(cantidad)) {
    return { valido: false, mensaje: "La cantidad debe ser un número entero positivo." };
  }

  return { valido: true, mensaje: "Cantidad válida" };
}

/**
 * Valida la ubicación del producto
 * @param {string} ubicacion - Ubicación del producto
 * @returns {object} { valido: boolean, mensaje: string }
 */
export function validarUbicacion(ubicacion) {
  if (!ubicacion || ubicacion.trim() === "") {
    return { valido: false, mensaje: "La ubicación no puede estar vacía." };
  }

  if (ubicacion.trim().length < 2) {
    return { valido: false, mensaje: "La ubicación debe tener al menos 2 caracteres." };
  }

  return { valido: true, mensaje: "Ubicación válida" };
}

/**
 * Valida el stock mínimo del producto
 * @param {number} stockMinimo - Stock mínimo del producto
 * @returns {object} { valido: boolean, mensaje: string }
 */
export function validarStockMinimo(stockMinimo) {
  if (typeof stockMinimo !== "number" || stockMinimo < 0 || !Number.isInteger(stockMinimo)) {
    return { valido: false, mensaje: "El stock mínimo debe ser un número entero no negativo." };
  }

  return { valido: true, mensaje: "Stock mínimo válido" };
}


/** 
 * Valida los datos de una venta
 * @param {number} id - ID del producto vendido
 * @param {number} cantidad - Cantidad de Unidades vendidas
 * @param {string} vendedor - Nombre del vendedor
 * @returns {boolean} true si la venta es validad, false si no
*/

export function validarVentas(id, cantidad, vendedor){

  if(typeof id !== "number" || id <= 0 ){
  console.log("ID del producto no valido.");
  return false;
  }

  if(typeof cantidad !== "number" || cantidad <=0){

    console.log("La cantidad debe ser un numero positivo.");
    return false;
  }

  if (!vendedor || typeof vendedor !== "string" || vendedor.trim() === "" ){
  console.log("Debes de indicar el nombre del vendedor.");
  return false;
}

return true;

}


