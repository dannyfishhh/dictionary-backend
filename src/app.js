import express from "express";
import cors from "cors";

// create express app

const app = express();

app.use(express.json());
app.use(cors());

// routes

import popularWordsRoutes from './routes/popularWords.route.js';
import searchRoutes from './routes/search.route.js'

app.use("/api/v1/popular-words", popularWordsRoutes);
app.use("/api/v1/search", searchRoutes);

export default app;