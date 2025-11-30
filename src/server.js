import  express from "express";
import cors  from "cors";

const app = express();
app.use(cors());
app.use(express.json());

// Servidor Corriendo en el puerto 3000

const PORT = 3000;
app.listen(PORT,()=>{

    console.log(`Servidor Backend Funcionando en http://localhost:${PORT}`);
});