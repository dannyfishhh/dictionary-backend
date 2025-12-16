import 'dotenv/config';

import app from "./app.js";
import { testConnection } from "./database/helpers.js";

const PORT = process.env.PORT || 3000;

// tests the database connection and starts the server

const startServer = async () => {
    try {
        await testConnection();
        app.listen(PORT, () => {
            console.log(`Server is running on port ${PORT}`);
        });
    } catch (error) {
        console.error('Error starting server:', error);
    }
};

startServer();