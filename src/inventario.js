let inventario = [
    {
        id: 1, nombre: "Bascula Bernalo 150kg", categoria:"Basculas", precio: 392700, cantidad:500}
];



function listarProductos(){

    console.log("Inventario Actual:");

    /* SI NO HAY PRODUCTOS, MOSTRAMOS UN MSJ */
    if (inventario.legth === 0){
    console.log("No hay productos en el inventario.");
    return;
}


/* SI HAY PRODUCTOS, LO RECORREMOS UNO POR UNO */

inventario.forEach((producto)=>{
    console.log(`ID: ${producto.id} | Nombre: ${producto.nombre} | Categoria: ${producto.categoria} | Precio: ${producto.precio}| Cantidad: ${producto.cantidad}`
    );
});
}



module.exports = {listarProductos};
