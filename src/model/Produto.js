import { DataTypes, Model } from 'sequelize';
import { sequelize } from '../config/sequelize.js';

class Produto extends Model {}
Produto.init({
  nome: {
    type: DataTypes.STRING,
    allowNull: false
  },
  categoriaId: {
    type: DataTypes.INTEGER,
    allowNull: false
  },
}, {
    underscored: true,
    tableName:'produto',
    timestamps: false,
    sequelize,
    modelName:'produto'
}
)
export{Produto}