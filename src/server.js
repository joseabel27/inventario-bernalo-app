import  express from "express";
import cors  from "cors";
import path from "path";
import { fileURLToPath } from "url";

import {
  
  obtenerInventario,
  agregarProductos,
  eliminarProducto,
  listarProductos
  
} from "./modules/inventario.js";

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


// Servidor Corriendo en el puerto 3000

const PORT = 3000;
app.listen(PORT,()=>{

    console.log(`Servidor Backend Funcionando en http://localhost:${PORT}`);
});