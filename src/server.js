import express from "express";
import cors from "cors";
import path from "path";
import { fileURLToPath } from "url";

import {

  obtenerInventario,
  agregarProductos,
  eliminarProducto,
  listarProductos

} from "./modules/inventario.js";

import {
  registrarVenta,
  listarVentas,
  obtenerVentas,
  guardarVentas
} from "./modules/ventas.js";

const __filename = fileURLToPath(import.meta.url);
const __dirname = path.dirname(__filename);

const app = express();
app.use(cors());
app.use(express.json());

// Servir archivos estáticos (HTML, CSS, JS)
app.use(express.static(path.join(__dirname, '../public')));

// ENDPOINT

app.get("/productos", (req, res) => {
  const productos = obtenerInventario();
  res.json(productos);
});


app.get("/api/inventario", (req, res) => {
  try {
    const productos = obtenerInventario();
    res.json(productos);
  } catch (error) {
    res.status(500).json({ mensaje: "Error al obtener inventario" });
  }
});

app.post("/api/inventario", (req, res) => {
  try {
    const { nombre, categoria, precio, cantidad, ubicacion, stockMinimo } = req.body;

    // Verificamos que todos los datos estén presentes
    if (!nombre || !categoria || precio === undefined || cantidad === undefined || !ubicacion || stockMinimo === undefined) {
      return res.status(400).json({
        error: "Faltan datos requeridos. Se necesita: nombre, categoria, precio, cantidad, ubicacion, stockMinimo"
      });
    }

    // Llamamos la función y capturamos el resultado
    const resultado = agregarProductos(nombre, categoria, precio, cantidad, ubicacion, stockMinimo);

    if (resultado.exito) {
      res.status(201).json({
        mensaje: resultado.mensaje,
        producto: resultado.producto
      });
    } else {
      res.status(400).json({ error: resultado.mensaje });
    }
  } catch (error) {
    res.status(500).json({ error: "Error al agregar producto: " + error.message });
  }
});

app.delete("/api/inventario/:id", (req, res) => {
  try {
    const id = Number(req.params.id);

    eliminarProducto(id);

    res.json({ mensaje: "Producto eliminado correctamente" });
  } catch (error) {
    res.status(500).json({ mensaje: "Error al eliminar producto" });
  }
});

app.put("/api/inventario/:id", (req, res) => {
  try {
    const id = Number(req.params.id);
    const datos = req.body;

    const inventario = obtenerInventario();
    const index = inventario.findIndex(p => p.id === id);

    if (index === -1) {
      return res.status(404).json({ mensaje: "No encontrado" });
    }

    inventario[index] = { ...inventario[index], ...datos };

    res.json({ mensaje: "Actualizado" });
  } catch (error) {
    res.status(500).json({ mensaje: "Error" });
  }
});


// ======================================
// OBTENER VENTAS
// ======================================
app.get("/api/ventas", (req, res) => {

  try {

    const ventas = listarVentas();

    res.json(ventas);

  } catch (error) {

    res.status(500).json({
      mensaje: "Error al obtener ventas"
    });

  }

});


// ======================================
// REGISTRAR VENTA
// ======================================
app.post("/api/ventas", (req, res) => {

  try {

    const resultado = registrarVenta(req.body);

    if (!resultado.exito) {

      return res.status(400).json({
        mensaje: resultado.mensaje
      });

    }

    res.status(201).json(resultado);

  } catch (error) {

    res.status(500).json({
      mensaje: error.message
    });

  }

});


// Servidor Corriendo en el puerto 3000

const PORT = 3000;

// DESPACHAR VENTA

app.put("/api/ventas/:id/despachar", (req, res) => {

  try {

    const idVenta = Number(req.params.id);

    const {
      numeroGuia,
      transportadora
    } = req.body;

    const ventas = obtenerVentas();

    const index = ventas.findIndex(
      (v) => v.idVenta === idVenta
    );

    if (index === -1) {

      return res.status(404).json({
        mensaje: "Venta no encontrada"
      });

    }

    // ACTUALIZAR ESTADO
    ventas[index].estado = "Despachado";

    ventas[index].numeroGuia = numeroGuia;
    ventas[index].transportadora = transportadora;

    guardarVentas(ventas);

    res.json({
      mensaje: "Venta despachada correctamente 🚚"
    });

  } catch (error) {

    console.error(error);

    res.status(500).json({
      mensaje: "Error al despachar venta"
    });

  }

});

app.listen(PORT, () => {

  console.log(`Servidor Backend Funcionando en http://localhost:${PORT}`);
});