import express from "express";
import {
  listarProductos,
  agregarProductos,
  buscarProductoPorId,
  actualizarProducto,
  eliminarProducto
} from "../modules/inventario.js";

const router = express.Router();

/* =========================
   OBTENER TODO EL INVENTARIO
========================= */
router.get("/", (req, res) => {
  try {
    listarProductos();
    res.status(200).json({ mensaje: "Inventario listado en consola" });
  } catch (error) {
    res.status(500).json({ error: "Error al listar inventario" });
  }
});

/* =========================
   AGREGAR PRODUCTO
========================= */
router.post("/", (req, res) => {
  const { nombre, categoria, precio, cantidad, ubicacion, stockMinimo } = req.body;

  try {
    agregarProductos(nombre, categoria, precio, cantidad, ubicacion, stockMinimo);
    res.status(201).json({ mensaje: "Producto agregado correctamente" });
  } catch (error) {
    res.status(500).json({ error: "Error al agregar producto" });
  }
});

/* =========================
   BUSCAR POR ID
========================= */
router.get("/:id", (req, res) => {
  const id = Number(req.params.id);
  const producto = buscarProductoPorId(id);

  if (!producto) {
    return res.status(404).json({ error: "Producto no encontrado" });
  }

  res.status(200).json(producto);
});

/* =========================
   ACTUALIZAR PRODUCTO
========================= */
router.put("/:id", (req, res) => {
  const id = Number(req.params.id);
  const nuevosDatos = req.body;

  try {
    actualizarProducto(id, nuevosDatos);
    res.json({ mensaje: "Producto actualizado correctamente" });
  } catch (error) {
    res.status(500).json({ error: "Error al actualizar producto" });
  }
});

/* =========================
   ELIMINAR PRODUCTO
========================= */
router.delete("/:id", (req, res) => {
  const id = Number(req.params.id);

  try {
    eliminarProducto(id);
    res.json({ mensaje: "Producto eliminado correctamente" });
  } catch (error) {
    res.status(500).json({ error: "Error al eliminar producto" });
  }
});

export default router;
