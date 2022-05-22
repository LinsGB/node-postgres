import {Produto} from '../model/Produto.js'

const listProdutos = async () => {
    try {
        return await Produto.findAll()
    } catch (error) {
        throw error
    }
}

const findProdutos = async (id) => {
    try {
        return await Produto.findOne({where:{id}})
    } catch (error) {
        throw error
    }
}

const createProdutos = async (payload, id) => {
    try {
        return await Produto.create(
            {nome: payload.nome, categoriaId: payload.categoriaId},
            {where:{id}}
        )
    } catch (error) {
        throw error
    }
}

const updateProdutos = async (nome, id) => {
    try {
        return await Produto.update(
            {nome},
            {where:{id}}
        )
    } catch (error) {
        throw error
    }
}

const deleteProdutos = async (id) => {
    try {
        return await Produto.destroy({where:{id}})
    } catch (error) {
        throw error
    }
}

export {listProdutos, findProdutos, createProdutos,
    updateProdutos, deleteProdutos}