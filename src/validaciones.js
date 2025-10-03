


function validarNombreProducto(nombre){

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

module.exports = {validarNombreProducto};