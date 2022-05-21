import { DataTypes } from 'sequelize';
import { sequelize } from '../config/sequelize.js';

const Categoria = sequelize.define('Categoria', {
  nome: {
    type: DataTypes.STRING,
    allowNull: false
  }
}, {
    underscored: true
});

export{Categoria}
