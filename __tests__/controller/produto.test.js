import {jest} from '@jest/globals';
import {createProduto, deleteProdutos, 
findProdutos, listProdutos, updateProdutos} from '../../src/controller/Produto.js'
import {Produto} from '../../src/model/Produto.js'

describe('Produto', () => {
    jest.spyOn(Produto, 'init').mockReturnValue('mocked');
    describe('listProdutos', () => {
        it('should return valid object', async () => {
            jest.spyOn(Produto, 'findAll').mockReturnValue({Produtos:[]});
            expect(await listProdutos()).toStrictEqual({Produtos:[]})
        })
        it('should throw error', async () => {
            jest.spyOn(Produto, 'findAll').mockRejectedValue(new Error('mock Error'));
            listProdutos().catch(error => expect(error).toStrictEqual(new Error('mock Error')))
        })
    })
    describe('createProduto', () => {
        it('should return valid object', async () => {
            jest.spyOn(Produto, 'create').mockReturnValue({Produtos:[]});
            expect(await createProduto('test')).toStrictEqual({Produtos:[]})
        })
        it('should throw error', async () => {
            jest.spyOn(Produto, 'create').mockRejectedValue(new Error('mock Error'));
            createProduto('test').catch(error => expect(error).toStrictEqual(new Error('mock Error')))
        })
    })
    describe('deleteProdutos', () => {
        it('should return valid object', async () => {
            jest.spyOn(Produto, 'destroy').mockReturnValue([]);
            expect(await deleteProdutos(1)).toStrictEqual([])
        })
        it('should throw error', async () => {
            jest.spyOn(Produto, 'destroy').mockRejectedValue(new Error('mock Error'));
            deleteProdutos(1).catch(error => expect(error).toStrictEqual(new Error('mock Error')))
        })
    })
    describe('findProdutos', () => {
        it('should return valid object', async () => {
            jest.spyOn(Produto, 'findOne').mockReturnValue({});
            expect(await findProdutos(1)).toStrictEqual({})
        })
        it('should throw error', async () => {
            jest.spyOn(Produto, 'findOne').mockRejectedValue(new Error('mock Error'));
            findProdutos(1).catch(error => expect(error).toStrictEqual(new Error('mock Error')))
        })
    })
    describe('updateProdutos', () => {
        it('should return valid object', async () => {
            jest.spyOn(Produto, 'update').mockReturnValue({});
            expect(await updateProdutos('test', 1)).toStrictEqual({})
        })
        it('should throw error', async () => {
            jest.spyOn(Produto, 'update').mockRejectedValue(new Error('mock Error'));
            updateProdutos('test', 1).catch(error => expect(error).toStrictEqual(new Error('mock Error')))
        })
    })
})