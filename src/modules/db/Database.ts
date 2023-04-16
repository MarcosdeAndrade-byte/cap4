import dotenv from 'dotenv';
import { Db, MongoClient } from 'mongodb';

dotenv.config();

const uri = `mongodb+srv://${process.env.DB_USER}:${process.env.DB_PASSWORD}@${process.env.DB_NAME}.utc6g96.mongodb.net/?retryWrites=true&w=majority`;
const client = new MongoClient(uri);

async function databaseConnect(): Promise<Db> {
  try {
    client.connect();

    const database = client.db(process.env.DB_NAME);

    console.log('Conectado ao banco de dados🚀');

    return database;
  } catch (error) {
    return error;
  }
}

export { databaseConnect };
