/* IMPORTAR EL INVENTARIO EN INDEX */

const {listarProductos, agregarProductos} = require ("./inventario");

console.log("==== SISTEMA DE INVENTARIO ====");

/* AGREGAMOS LOS PRODUCTOS DE PRUEBA */
agregarProductos("Bascula 150kg bernalo pedestal","Basculas", 392.700, 500, "Estante A1");
agregarProductos("Bascula 150kg bernalo wifi","Basculas",400.000, 1000, "Estante A2");
agregarProductos("Bascula 150kg bernalito pedestal","Basculas", 250.700, 100, "Estante A3");
agregarProductos("Bascula 150kg bernalito wifi","Basculas", 300.700, 500, "Estante B1");
agregarProductos("Balanza Precision 3000g","Balanzas", 600.700, 500, "Estante B2");
agregarProductos("Balanza Precision 600g","Balanzas", 300.000, 500, "Estante B3");


/* LISTAMOS EL INVENTARIO */
console.log("==== INVENTARIO ACTUAL ====");
listarProductos();


