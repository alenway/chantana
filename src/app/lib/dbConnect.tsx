// lib/dbConnect.ts
import mongoose from "mongoose";

// mogodb uri
const uri = process.env.MONGODB_URI;

// Track the connection status
interface ConnectionStatus {
    isConnected?: number;
}

const connection: ConnectionStatus = {};

async function dbConnect() {
    // Check if we have a connection to the database
    if (connection.isConnected) {
        return;
    }

    // Check if MongoDB URI is defined in your environment variables
    if (!uri) {
        throw new Error(
            "Please define the MONGODB_URI environment variable inside .env.local"
        );
    }

    try {
        // Use new database connection
        const db = await mongoose.connect(uri);

        // Set the connection status
        connection.isConnected = db.connections[0].readyState;
        console.log("Connected to MongoDB");
    } catch (error) {
        console.error("Error connecting to MongoDB:", error);
        throw error;
    }
}

export default dbConnect;
