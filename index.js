import express from "express";
import dotenv from "dotenv";
import cors from "cors";
import productoRoutes from "./routes/productRoutes.js";
import typesRoutes from "./routes/typeRoutes.js";
import sizeRoutes from "./routes/sizeRoutes.js";
import userRoutes from "./routes/userRoutes.js";
import buyRoutes from "./routes/buyRoutes.js";
import articlesRoutes from './routes/ArticleRoutes.js';

const app = express();
app.use(express.json());

dotenv.config();

// Configurar Cors
const whiteList = [
    process.env.FRONTEND_URL
];

const corsOptions = {
    origin: function(origin, callback) {
        if(whiteList.includes(origin)) {
            // Esta permitido consultar la API
            callback(null, true);
        } else {
            // No esta permitido a consultar la API
            callback(new Error('Error de cors'));
        }
    }
}

app.use(cors(corsOptions));


// Routing 
app.use('/api/products', productoRoutes);
app.use('/api/types', typesRoutes);
app.use('/api/sizes', sizeRoutes);
app.use('/api/users', userRoutes);
app.use('/api/buy', buyRoutes);
app.use('/api/articles', articlesRoutes);

const PORT = process.env.PORT || 4000

app.listen(PORT, () => {
    console.log(`El servidor esta corriendo en el puerto ${PORT}`);
})