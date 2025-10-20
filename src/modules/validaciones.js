export function validarNombreProducto(nombre){

  if (!nombre || nombre.trim() === ""){

    console.log("Error : El nombre no puede estar vacio.");
    return false;
  }

  const regex = /^[A-zA-z0-9\s]+$/;

  if (!regex.test(nombre)){

    console.log("Error : El nombre solo puede contener letras y espacios.");
    return false;
  }

  return true;
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


