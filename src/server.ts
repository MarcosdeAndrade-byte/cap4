import 'reflect-metadata';
import './shared/container';
import express from 'express';
import { databaseConnect } from './modules/db/Database';
import { routes } from './shared/routes';

const PORT = 3000;

databaseConnect();

const app = express();

app.use(express.json());

app.use(routes);

app.listen(PORT, () => {
  console.log(`Server started on port ${PORT}!`);
});
