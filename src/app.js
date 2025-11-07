import express from 'express';
import router from './routes/banca.routes.js';
import cors from 'cors';

const app = express();

app.set('port', 3000); // Define el puerto en el que corre express
app.use(express.json()); // Nos permite trabajar con JSON
app.use(cors());
app.use(router); // Importa las rutas creadas
export default app;
