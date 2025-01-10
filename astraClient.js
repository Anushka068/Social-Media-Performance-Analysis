// src/db/astraClient.js
import { Client } from 'cassandra-driver';
import dotenv from 'dotenv';

dotenv.config();

const client = new Client({
  cloud: { secureConnectBundle: process.env.ASTRA_SECURE_CONNECT_BUNDLE },
  credentials: {
    username: process.env.ASTRA_CLIENT_ID,
    password: process.env.ASTRA_CLIENT_SECRET,
  },
  keyspace: process.env.ASTRA_KEYSPACE,
});

(async () => {
  try {
    await client.connect();
    console.log('Connected to Astra DB');
  } catch (error) {
    console.error('Failed to connect to Astra DB:', error);
    process.exit(1);
  }
})();

export default client;
