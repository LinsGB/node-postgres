import { DataTypes } from 'sequelize';
import { sequelize } from '../config/sequelize.js';

const Produto = sequelize.define('Produto', {
  nome: {
    type: DataTypes.STRING,
    allowNull: false
  },
  categoriaId: {
    type: DataTypes.INTEGER,
    allowNull: false
  }
}, {
    underscored: true
});

export{Produto}