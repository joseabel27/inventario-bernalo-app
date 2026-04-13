import  express from "express";
import cors  from "cors";

import {
  
  obtenerInventario,
  agregarProductos,
  listarProductos
  
} from "./modules/inventario.js";


const app = express();
app.use(cors());
app.use(express.json());

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

    // Importamos función
    agregarProductos(nombre, categoria, precio, cantidad, ubicacion, stockMinimo);

    res.json({ mensaje: "Producto agregado correctamente" });
  } catch (error) {
    res.status(500).json({ mensaje: "Error al agregar producto" });
  }
});


// Servidor Corriendo en el puerto 3000

const PORT = 3000;
app.listen(PORT,()=>{

    console.log(`Servidor Backend Funcionando en http://localhost:${PORT}`);
});