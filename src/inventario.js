const {validarNombreProducto} = require("./validaciones");


let inventario = [];

/* FUNCION PARA LISTAR TODOS LOS PRODUCTOS */

function listarProductos() {
  console.log("Inventario Actual:");

  /* SI NO HAY PRODUCTOS, MOSTRAMOS UN MSJ */
  if (inventario.length === 0) {
    console.log("No hay productos en el inventario.");
    return;
  }

  /* SI HAY PRODUCTOS, LO RECORREMOS UNO POR UNO */

  inventario.forEach((producto) => {
    console.log(
      `ID: ${producto.id} | Nombre: ${producto.nombre} | Categoria: ${producto.categoria} | Precio: ${producto.precio}| Cantidad: ${producto.cantidad} | Ubicacion: ${producto.ubicacion}`
    );
  });
}

/* FUNCION PARA AGREGAR UN PRODUCTO */

function agregarProductos(nombre, categoria, precio, cantidad, ubicacion) {
  /*  BUSCAMOS SI EL PRODUCTO YA EXISTE EN EL INVENTARIO */

  const productoExistente = inventario.find(
    (p) => p.nombre.toLowerCase() === nombre.toLowerCase()
  );

  if (productoExistente) {
    /* Si existe sumamos la cantidad */

    productoExistente.cantidad += cantidad;
    console.log(
      `Se actualizo la Cantidad de "${productoExistente.nombre}". Nueva cantidad: ${productoExistente.cantidad}`
    );
  } else {
    /* Si no existe, creamos un nuevo producto */

    /* CREAMOS UN OBJETO CON LOS DATOS DEL PRODUCTO */

    const producto = {
      id: inventario.length + 1, // ID AUTOMATICO
      nombre: nombre,
      categoria: categoria,
      precio: precio,
      cantidad: cantidad,
      ubicacion: ubicacion,
    };

    /* LO AGREGAMOS AL INVENTARIO */

    inventario.push(producto);
    console.log(
      `Producto agregado : ID: ${producto.id} | Nombre: ${producto.nombre} | Categoria: ${producto.categoria} | Precio: ${producto.precio}| Cantidad: ${producto.cantidad} | Ubicacion: ${producto.ubicacion}`
    );
  }
}






  /*  FUNCION PARA BUSCAR PRODCUTOS EN EL INVENTARIO  POR NOMBRE Y POR ID */

/* BUSCAR POR NOMBRE */

function buscarProductoNombre(nombre) {
  if (inventario.length === 0) {
    console.log("No hay producto en el inventario.");
    return;
  }

    /* VALIDAR ANTES DE BUSCAR */

  if (!validarNombreProducto(nombre)){

    return; /*  No sigue si la validacion falla */
  }


  const producto = inventario.find(
    (item) => item.nombre.toLowerCase() === nombre.toLowerCase()
  );




  if (producto) {
    console.log(
      `Producto encontrado: ID: ${producto.id} | Nombre: ${producto.nombre} | Cantidad: ${producto.cantidad} | Precio: ${producto.precio} | Categoria: ${producto.categoria} | Ubicacion: ${producto.ubicacion}`
    );
  } else {
    console.log(`Producto Nombre " ${nombre}" no encontrado.`);
  }
}

/* BUSCAR POR ID */

function buscarProductoPorId(id) {
  if (inventario.length === 0) {
    console.log("No hay producto en el inventario.");
    return;
  }

  const producto = inventario.find((item) => item.id === id);

  if (producto) {
    console.log(
      `Producto encontrado: ID: ${producto.id} | Nombre: ${producto.nombre} | Cantidad: ${producto.cantidad} | Precio: ${producto.precio} | Categoria: ${producto.categoria}| Ubicacion: ${producto.ubicacion}`
    );
  } else {
    console.log(`Producto con ID ${id} no encontrado.`);
  }
}

/* FUNCION PARA ACTUALIZAR UN PRODUCTO */

function actualizarProducto(id, nuevosDatos) {
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
  } else {
    console.log(`Producto con ID: ${id} no encontrado.`);
  }
}

/* FUNCION PARA ELIMINAR PRODUCTO */

function eliminarProducto(id) {
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

module.exports = {
  listarProductos,
  agregarProductos,
  buscarProductoNombre,
  buscarProductoPorId,
  actualizarProducto,
  eliminarProducto,
  validarNombreProducto,
  inventario,
};
