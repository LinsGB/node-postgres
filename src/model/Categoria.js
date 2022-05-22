import { DataTypes, Model } from 'sequelize';
import { sequelize } from '../config/sequelize.js';
import { Produto } from './Produto.js';

class Categoria extends Model{}
Categoria.init({
    nome: {
      type: DataTypes.STRING,
      allowNull: false
    }
  }, {
    tableName:'categoria',
    timestamps: false,
    sequelize,
    modelName:'categoria'
  }
)
Categoria.hasMany(Produto, {foreignKey:'categoriaId'})
Produto.belongsTo(Categoria, {foreignKey:'categoriaId'})
export{Categoria}
