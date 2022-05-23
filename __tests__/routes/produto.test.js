import {jest} from '@jest/globals';
import request from 'supertest'
import categoriaRoutes from '../../src/routes/produto'
import express from 'express'
import {Produto} from '../../src/model/Produto.js'
import {sequelize} from '../../src/config/sequelize'
describe('routes produto', () => {
    const app = express()
    app.use(express.json())
    app.use(categoriaRoutes)
    jest.spyOn(Produto, 'init').mockReturnValue('mocked');
    describe('list /produtos', () => {
        it('should get valid response', async() => {
            jest.spyOn(Produto, 'findAll').mockReturnValue([]);
            const resp = await request(app).get('/produtos')
            expect(resp.status).toEqual(200);
        })
        it('should get error', async() => {
            jest.spyOn(Produto, 'findAll').mockRejectedValue(new Error('mock Error'));
            const resp = await request(app).get('/produtos')
            expect(resp.status).toEqual(500);
        })
    })
    describe('find /produto/:id',() => {
        it('should get valid response', async() => {
            jest.spyOn(Produto, 'findOne').mockReturnValue([]);
            const resp = await request(app).get('/produto/1')
            expect(resp.status).toEqual(200);
        })
        it('should get error', async() => {
            jest.spyOn(Produto, 'findOne').mockRejectedValue(new Error('mock Error'));
            const resp = await request(app).get('/produto/1')
            expect(resp.status).toEqual(500);
        })
        it('should get error by invalid params', async() => {
            const resp = await request(app).get('/produto/a')
            expect(resp.status).toEqual(400);
        })
    })
    describe('delete /produto/:id', () => {
        it('should get valid response', async() => {
            jest.spyOn(Produto, 'destroy').mockReturnValue([]);
            const resp = await request(app).delete('/produto/1')
            expect(resp.status).toEqual(200);
        })
        it('should get error', async() => {
            jest.spyOn(Produto, 'destroy').mockRejectedValue(new Error('mock Error'));
            const resp = await request(app).delete('/produto/1')
            expect(resp.status).toEqual(500);
        })
        it('should get error by invalid params', async() => {
            const resp = await request(app).delete('/produto/a')
            expect(resp.status).toEqual(400);
        })
    })
    describe('update /produto/:id', () => {
        it('should get valid response', async() => {
            jest.spyOn(Produto, 'update').mockReturnValue([]);
            const resp = await request(app).put('/produto/1').send({nome: 'modk'})
            expect(resp.status).toEqual(200);
        })
        it('should get error', async() => {
            jest.spyOn(Produto, 'update').mockRejectedValue(new Error('mock Error'));
            const resp = await request(app).put('/produto/1').send({nome: 'modk'})
            expect(resp.status).toEqual(500);
        })
        it('should get error by invalid body', async() => {
            const resp = await request(app).put('/produto/1').send({nome: 1})
            expect(resp.status).toEqual(400);
        })
        it('should get error by invalid params', async() => {
            const resp = await request(app).put('/produto/a').send({nome: 'a'})
            expect(resp.status).toEqual(400);
        })
    })
    describe('create /produto', () => {
        it('should get valid response', async() => {
            jest.spyOn(Produto, 'create').mockReturnValue([]);
            const resp = await request(app).post('/produto').send({nome: 'modk', categoriaId: 1})
            expect(resp.status).toEqual(200);
        })
        it('should get error', async() => {
            jest.spyOn(Produto, 'create').mockRejectedValue(new Error('mock Error'));
            const resp = await request(app).post('/produto').send({nome: 'modk', categoriaId: 1})
            expect(resp.status).toEqual(500);
        })
        it('should get error by invalid body', async() => {
            const resp = await request(app).post('/produto').send({nome: 1})
            expect(resp.status).toEqual(400);
        })
    })
    describe('upload /produtos/upload', () => {
        jest.spyOn(Produto, 'init').mockReturnValue('mocked');
        it('should get valid response', async() => {
            jest.spyOn(Produto, 'create').mockReturnValue({});
            const resp = await request(app).post('/produtos/upload').send({
                "produtos":[{
                    "nome":"produtoUpload",
                    "categoriaId":1
                },
                {
                    "nome":"produtoUpload2",
                    "categoriaId":1
                }]
            })
            expect(resp.status).toEqual(200);
        })
        it('should get empty object', async() => {
            jest.spyOn(Produto, 'create').mockRejectedValue(new Error('mock Error'));
            const resp = await request(app).post('/produtos/upload').send({
                "produtos":[{
                    "nome":"produtoUpload",
                    "categoriaId":1
                },
                {
                    "nome":"produtoUpload2",
                    "categoriaId":1
                }]
            })
            expect(resp.status).toEqual(200);
        })
        it('should get error by invalid body', async() => {
            const resp = await request(app).post('/produtos/upload').send({nome: 1})
            expect(resp.status).toEqual(400);
        })
        it('should get empty object', async() => {
            jest.spyOn(Produto, 'create').mockRejectedValue(new Error('mock Error'));
            const resp = await request(app).post('/produtos/upload').send({
                "produtos":[{
                    "nome":"produtoUpload",
                    "categoriaId":1
                },
                {
                    "nome":"produtoUpload2",
                    "categoriaId":1
                }]
            })
            expect(resp.status).toEqual(200);
        })
    })
    describe('download /produtos/download', () => {
        it('should return valid object', async () => {
            jest.spyOn(Produto, 'findAll').mockReturnValue([]);
            const resp = await request(app).get('/produtos/download')
            expect(resp.status).toEqual(200);
        })
        it('should get error', async() => {
            jest.spyOn(Produto, 'findAll').mockRejectedValue(new Error('mock Error'));
            const resp = await request(app).get('/produtos/download')
            expect(resp.status).toEqual(500);
        })
    })
})