/* IMPORTAR EL INVENTARIO EN INDEX */

const {listarProductos, agregarProductos,buscarProductoNombre,buscarProductoPorId, actualizarProducto,eliminarProducto,} = require ("./inventario");

const {validarNombreProducto}
 = require("./validaciones");


console.log("==== SISTEMA DE INVENTARIO ====");

/* AGREGAMOS LOS PRODUCTOS DE PRUEBA */
agregarProductos("Bascula 150kg bernalo pedestal","Basculas", 392.700, 500, "Estante A1");
agregarProductos("Bascula 150kg bernalo wifi","Basculas",400.000, 1000, "Estante A2");
agregarProductos("Bascula 150kg bernalito pedestal","Basculas", 250.700, 100, "Estante A3");
agregarProductos("Bascula 150kg bernalito wifi","Basculas", 300.700, 500, "Estante B1");
agregarProductos("Balanza Precision 3000g","Balanzas", 600.700, 500, "Estante B2");
agregarProductos("Balanza Precision 600g","Balanzas", 300.000, 500, "Estante B3");
agregarProductos("Barra Ganadera","Ganaderia",1.000000, 40,"Estante D1");
agregarProductos("Balanza Css 15kg","Balanzas",450.000,90,"Estante E1");
agregarProductos("Bascula 300kg bernalo pedestal","Bascula",600.000,400,"Estanteria F1");
agregarProductos("Dinamometro 1 Tonelada","Balanzas",1000.000,10,"Estanteria G1");
agregarProductos("Celda de carga 400kg","Celdas",85.000,400,"Estanteria H1");
agregarProductos("Pelas papas","Horeca",150.000, 100, "Estante H2");
agregarProductos("Tarjeta wifi Par","Repuestos",60.000,200,"Estanteria I1");
agregarProductos("Display KL1R","Repuestos",45.000,200,"Estanteria I2");

/* LISTAMOS EL INVENTARIO */
console.log("==== INVENTARIO ACTUAL ====");
listarProductos();

/* BUSCACMOS POR ID */

console.log("\n--- Buscar por ID ---");
buscarProductoPorId(4);

/* BUSCAMOS POR NOMBRE DEL PRODUCTO */

console.log("\n--- Buscar por Nombre --- ");
buscarProductoNombre("Dinamometro 1 Tonelada");

/* VALIDAD PRODUCTO POR NOMBRE */
validarNombreProducto(""); 


/* ACTUALIZAMOS EL PRODUCTO */
actualizarProducto(11, {cantidad:2, categoria:"Dinamometros", ubicacion:"Estanteria I2"});

/* Volvemos a listar para ver el cambio */
listarProductos();


/* ELIMINAMOS UN PRODUCTO */
console.log("\n--- Eliminar Producto ---");
eliminarProducto(5);
listarProductos();


