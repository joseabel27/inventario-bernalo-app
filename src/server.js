import  express from "express";
import cors  from "cors";

import {
  
  obtenerInventario,
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
    const productos = listarProductos();
    res.json(productos);
  } catch (error) {
    res.status(500).json({ mensaje: "Error al obtener inventario" });
  }
});


// Servidor Corriendo en el puerto 3000

const PORT = 3000;
app.listen(PORT,()=>{

    console.log(`Servidor Backend Funcionando en http://localhost:${PORT}`);
});