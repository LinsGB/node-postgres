import { sequelize } from './config/sequelize.js';
import {Categoria} from './model/Categoria.js'

try {
    await sequelize.authenticate();
    console.log('Connection has been established successfully.');
  } catch (error) {
    console.error('Unable to connect to the database:', error);
  }