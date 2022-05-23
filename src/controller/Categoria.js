import {Categoria} from '../model/Categoria.js'
import { Produto } from '../model/Produto.js'
import {sequelize} from '../config/sequelize.js'


const listCategorias = async () => {
    try {
        return await Categoria.findAll( {include: [{
            model: Produto
          }]})
    } catch (error) {
        throw error
    }
}

const findCategorias = async (id) => {
    try {
        return await Categoria.findOne( {where:{id}, include: [{
            model: Produto
          }]})
    } catch (error) {
        throw error
    }
}

const createCategoria = async (nome) => {
    try {
        return await Categoria.create( {nome} )
    } catch (error) {
        throw error
    }
}

const createCategoriasWithProduto = async (nomeCategoria, nomesProdutos) => {
    const t = await sequelize.transaction()
    try {
        const categoria = await Categoria.create( {nome: nomeCategoria}, { transaction: t } )
        const produto = await Promise.all(nomesProdutos.map(async nome => {
            return await Produto.create({nome, categoriaId: categoria.id}, { transaction: t  })
        }))
        await t.commit()
        return {produtos:produto, ...categoria.dataValues}
    } catch (error) {
        await t.rollback()
        throw error
    }
}

const updateCategorias = async (nome, id) => {
    try {
        return await Categoria.update( {nome},{where:{id}})
    } catch (error) {
        throw error
    }
}

const deleteCategorias = async (id) => {
    try {
        return await Categoria.destroy( {where:{id}})
    } catch (error) {
        throw error
    }
}

export {listCategorias, findCategorias, createCategoria,
    updateCategorias, deleteCategorias, createCategoriasWithProduto}