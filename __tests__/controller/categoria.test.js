import {jest} from '@jest/globals';
import {createCategoria, createCategoriasWithProduto, deleteCategorias, 
findCategorias, listCategorias, updateCategorias} from '../../src/controller/Categoria.js'
import {Categoria} from '../../src/model/Categoria.js'
import {Produto} from '../../src/model/Produto.js'
import {sequelize} from '../../src/config/sequelize'

describe('Categoria', () => {
    jest.spyOn(Categoria, 'init').mockReturnValue('mocked');
    describe('listCategorias', () => {
        it('should return valid object', async () => {
            jest.spyOn(Categoria, 'findAll').mockReturnValue({categorias:[]});
            expect(await listCategorias()).toStrictEqual({categorias:[]})
        })
        it('should throw error', async () => {
            jest.spyOn(Categoria, 'findAll').mockRejectedValue(new Error('mock Error'));
            listCategorias().catch(error => expect(error).toStrictEqual(new Error('mock Error')))
        })
    })
    describe('createCategoria', () => {
        it('should return valid object', async () => {
            jest.spyOn(Categoria, 'create').mockReturnValue({categorias:[]});
            expect(await createCategoria('test')).toStrictEqual({categorias:[]})
        })
        it('should throw error', async () => {
            jest.spyOn(Categoria, 'create').mockRejectedValue(new Error('mock Error'));
            createCategoria('test').catch(error => expect(error).toStrictEqual(new Error('mock Error')))
        })
    })
    describe('createCategoriasWithProduto', () => {
        jest.spyOn(Produto, 'init').mockReturnValue('mocked');
        jest.spyOn(sequelize, 'transaction').mockReturnValue({commit: jest.fn(), rollback: jest.fn()});
        it('should return valid object', async () => {
            jest.spyOn(Categoria, 'create').mockReturnValue({dataValues:{categorias:[]}});
            jest.spyOn(Produto, 'create').mockReturnValue({});
            expect(await createCategoriasWithProduto('test', ['produto'])).toStrictEqual({produtos:[{}], categorias:[]})   
        })
        it('should throw error', async () => {
            jest.spyOn(Categoria, 'create').mockRejectedValue(new Error('mock Error'));
            createCategoriasWithProduto('test', ['testProduto']).catch(error => expect(error).toStrictEqual(new Error('mock Error')))
        })
    })
    describe('deleteCategorias', () => {
        it('should return valid object', async () => {
            jest.spyOn(Categoria, 'destroy').mockReturnValue([]);
            expect(await deleteCategorias(1)).toStrictEqual([])
        })
        it('should throw error', async () => {
            jest.spyOn(Categoria, 'destroy').mockRejectedValue(new Error('mock Error'));
            deleteCategorias(1).catch(error => expect(error).toStrictEqual(new Error('mock Error')))
        })
    })
    describe('findCategorias', () => {
        it('should return valid object', async () => {
            jest.spyOn(Categoria, 'findOne').mockReturnValue({});
            expect(await findCategorias(1)).toStrictEqual({})
        })
        it('should throw error', async () => {
            jest.spyOn(Categoria, 'findOne').mockRejectedValue(new Error('mock Error'));
            findCategorias(1).catch(error => expect(error).toStrictEqual(new Error('mock Error')))
        })
    })
    describe('updateCategorias', () => {
        it('should return valid object', async () => {
            jest.spyOn(Categoria, 'update').mockReturnValue({});
            expect(await updateCategorias('test', 1)).toStrictEqual({})
        })
        it('should throw error', async () => {
            jest.spyOn(Categoria, 'update').mockRejectedValue(new Error('mock Error'));
            updateCategorias('test', 1).catch(error => expect(error).toStrictEqual(new Error('mock Error')))
        })
    })
})