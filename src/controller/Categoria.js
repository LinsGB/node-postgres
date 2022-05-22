import {Categoria} from '../model/Categoria.js'
import { Produto } from '../model/Produto.js'


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

const createCategorias = async (nome) => {
    try {
        return await Categoria.create( {nome} )
    } catch (error) {
        throw error
    }
}

const updateCategorias = async (nome, id) => {
    try {
        console.log('payload => ', payload, id)
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

export {listCategorias, findCategorias, createCategorias,
    updateCategorias, deleteCategorias}