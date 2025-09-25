let inventario = [];


/* FUNCION PARA LISTAR TODOS LOS PRODUCTOS */

function listarProductos(){

    console.log("Inventario Actual:");

    /* SI NO HAY PRODUCTOS, MOSTRAMOS UN MSJ */
    if (inventario.length === 0){
    console.log("No hay productos en el inventario.");
    return;
}


/* SI HAY PRODUCTOS, LO RECORREMOS UNO POR UNO */

inventario.forEach((producto)=>{
    console.log(`ID: ${producto.id} | Nombre: ${producto.nombre} | Categoria: ${producto.categoria} | Precio: ${producto.precio}| Cantidad: ${producto.cantidad} | Ubicacion: ${producto.ubicacion}`
    );
});
}


/* FUNCION PARA AGREGAR UN PRODUCTO */

function agregarProductos(nombre, cantidad, categoria, ubicacion, precio){

    /* CREAMOS UN OBEJTO CON LOS DATOS DEL PRODUCTO */

    const producto = {

        id: inventario.lenght + 1, // ID AUTOMATICO
        nombre : nombre,
        cantidad : cantidad,
        categoria : categoria,
        ubicacion: ubicacion,
        precio:precio
    };

    /* LO AGREGAMOS AL INVENTARIO */

    inventario.push(producto);
    console.log(`Producto agregado : ${nombre}`);
}



module.exports = {listarProductos};


