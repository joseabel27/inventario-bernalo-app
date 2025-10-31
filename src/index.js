/* IMPORTAR EL INVENTARIO EN INDEX */

import {listarProductos, agregarProductos,buscarProductoNombre,buscarProductoPorId, actualizarProducto,eliminarProducto,obtenerInventario, verificarStockMinimo} from "./modules/inventario.js";

import {validarNombreProducto} from "./modules/validaciones.js";

import {registrarVenta,listarVentas} from "./modules/ventas.js";


const inventario = obtenerInventario();

//Solo agregar producto si el inventario esta vacio

if (!inventario || inventario.length === 0){

    console.log("Inventario vacio, cargando producto de prueba");



/* AGREGAMOS LOS PRODUCTOS DE PRUEBA */
const productosPrueba = [
    ["Bascula 150kg bernalo pedestal", "Basculas", 392.700, 500, "Estante A1",200],
    ["Bascula 150kg bernalo wifi", "Basculas", 400.000, 1000, "Estante A2",450],
    ["Bascula 150kg bernalito pedestal", "Basculas", 250.700, 100, "Estante A3",45],
    ["Bascula 150kg bernalito wifi", "Basculas", 300.700, 500, "Estante B1",245],
    ["Balanza Precision 3000g", "Balanzas", 600.700, 500, "Estante B2",245],
    ["Balanza Precision 600g", "Balanzas", 300.000, 500, "Estante B3",200],
    ["Barra Ganadera", "Ganaderia", 1.000000, 40, "Estante D1",15],
    ["Balanza Css 15kg", "Balanzas", 450.000, 90, "Estante E1",40],
    ["Bascula 300kg bernalo pedestal", "Bascula", 600.000, 400, "Estanteria F1",150],
    ["Dinamometro 1 Tonelada", "Balanzas", 1000.000, 10, "Estanteria G1",4],
    ["Celda de carga 400kg", "Celdas", 85.000, 400, "Estanteria H1",150],
    ["Pelas papas", "Horeca", 150.000, 100, "Estante H2",45],
    ["Tarjeta wifi Par", "Repuestos", 60.000, 200, "Estanteria I1",95],
    ["Display KL1R", "Repuestos", 45.000, 200, "Estanteria I2",95],
    ["Celda de carga 200kg", "Celdas", 40.000, 200, "Estanteria H1",95],
    ["Adaptador 9 voltios", "Adaptadores", 25.000, 20, "Estante J1",8],
    ["Adaptador Super SS", "Adaptadores", 50.000, 100, "Estante J2",45],
    ["Balanza KTB 15kg", "Balanzas", 150.000, 150, "Estante K1",100],  
  ];

  productosPrueba.forEach(p =>
    agregarProductos(...p)
  );
} else {
  console.log("Inventario cargado desde archivo existente.");
}
/* LISTAMOS EL INVENTARIO */
console.log("==== INVENTARIO ACTUAL ====");
listarProductos();


/* VALIDAD PRODUCTO POR NOMBRE */
validarNombreProducto(); 


/* BUSCACMOS POR ID */

console.log("\n--- Buscar por ID ---");
buscarProductoPorId();

/* BUSCAMOS POR NOMBRE DEL PRODUCTO */

console.log("\n--- Buscar por Nombre --- ");
buscarProductoNombre("");


/* ACTUALIZAMOS EL PRODUCTO */
actualizarProducto(15, {stockMinimo:100});

/* Volvemos a listar para ver el cambio */
listarProductos();


/* ELIMINAMOS UN PRODUCTO */
console.log("\n--- Eliminar Producto ---");
eliminarProducto();
listarProductos();


/* Registrar una Venta */

registrarVenta(4,246,"Jose");
listarVentas();
listarProductos();





