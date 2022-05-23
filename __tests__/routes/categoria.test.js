import {jest} from '@jest/globals';
import request from 'supertest'
import categoriaRoutes from '../../src/routes/categoria'
import {Categoria} from '../../src/model/Categoria.js'
import express from 'express'
import {Produto} from '../../src/model/Produto.js'
import {sequelize} from '../../src/config/sequelize'
describe('routes categoria', () => {
    const app = express()
    app.use(express.json())
    app.use(categoriaRoutes)
    jest.spyOn(Categoria, 'init').mockReturnValue('mocked');
    describe('list /categorias', () => {
        it('should get valid response', async() => {
            jest.spyOn(Categoria, 'findAll').mockReturnValue([]);
            const resp = await request(app).get('/categorias')
            expect(resp.status).toEqual(200);
        })
        it('should get error', async() => {
            jest.spyOn(Categoria, 'findAll').mockRejectedValue(new Error('mock Error'));
            const resp = await request(app).get('/categorias')
            expect(resp.status).toEqual(500);
        })
    })
    describe('find /categoria/:id',() => {
        it('should get valid response', async() => {
            jest.spyOn(Categoria, 'findOne').mockReturnValue([]);
            const resp = await request(app).get('/categoria/1')
            expect(resp.status).toEqual(200);
        })
        it('should get error', async() => {
            jest.spyOn(Categoria, 'findOne').mockRejectedValue(new Error('mock Error'));
            const resp = await request(app).get('/categoria/1')
            expect(resp.status).toEqual(500);
        })
        it('should get error by invalid parama', async() => {
            jest.spyOn(Categoria, 'findOne').mockRejectedValue(new Error('mock Error'));
            const resp = await request(app).get('/categoria/a')
            expect(resp.status).toEqual(400);
        })
    })
    describe('delete /categoria/:id', () => {
        it('should get valid response', async() => {
            jest.spyOn(Categoria, 'destroy').mockReturnValue([]);
            const resp = await request(app).delete('/categoria/1')
            expect(resp.status).toEqual(200);
        })
        it('should get error', async() => {
            jest.spyOn(Categoria, 'destroy').mockRejectedValue(new Error('mock Error'));
            const resp = await request(app).delete('/categoria/1')
            expect(resp.status).toEqual(500);
        })
        it('should get error by invalid parama', async() => {
            jest.spyOn(Categoria, 'create').mockRejectedValue(new Error('mock Error'));
            const resp = await request(app).delete('/categoria/a')
            expect(resp.status).toEqual(400);
        })
    })
    describe('update /categoria/:id', () => {
        it('should get valid response', async() => {
            jest.spyOn(Categoria, 'update').mockReturnValue([]);
            const resp = await request(app).put('/categoria/1').send({nome: 'modk'})
            expect(resp.status).toEqual(200);
        })
        it('should get error', async() => {
            jest.spyOn(Categoria, 'update').mockRejectedValue(new Error('mock Error'));
            const resp = await request(app).put('/categoria/1').send({nome: 'modk'})
            expect(resp.status).toEqual(500);
        })
        it('should get error by invalid body', async() => {
            jest.spyOn(Categoria, 'update').mockRejectedValue(new Error('mock Error'));
            const resp = await request(app).put('/categoria/1').send({nome: 1})
            expect(resp.status).toEqual(400);
        })
        it('should get error by invalid param', async() => {
            jest.spyOn(Categoria, 'update').mockRejectedValue(new Error('mock Error'));
            const resp = await request(app).put('/categoria/a').send({nome: 1})
            expect(resp.status).toEqual(400);
        })
    })
    describe('create /categoria', () => {
        it('should get valid response', async() => {
            jest.spyOn(Categoria, 'create').mockReturnValue([]);
            const resp = await request(app).post('/categoria').send({nome: 'modk'})
            expect(resp.status).toEqual(200);
        })
        it('should get error', async() => {
            jest.spyOn(Categoria, 'create').mockRejectedValue(new Error('mock Error'));
            const resp = await request(app).post('/categoria').send({nome: 'modk'})
            expect(resp.status).toEqual(500);
        })
        it('should get error by invalid body', async() => {
            jest.spyOn(Categoria, 'create').mockRejectedValue(new Error('mock Error'));
            const resp = await request(app).post('/categoria').send({nome: 1})
            expect(resp.status).toEqual(400);
        })
    })
    describe('upload /categorias/upload', () => {
        jest.spyOn(Produto, 'init').mockReturnValue('mocked');
        jest.spyOn(sequelize, 'transaction').mockReturnValue({commit: jest.fn(), rollback: jest.fn()});
        it('should get valid response', async() => {
            jest.spyOn(Categoria, 'create').mockReturnValue({dataValues:{categorias:[]}});
            jest.spyOn(Produto, 'create').mockReturnValue({});
            const resp = await request(app).post('/categorias/upload').send({
                "categorias":[{
                    "nome":"categoriaUpload2",
                    "produtos":[{
                        "nome": "produtoUpload1"
                    },
                    {
                        "nome": "produtoUpload2"
                    },
                    {
                        "nome": "produtoUpload3"
                    }]
                }]
            })
            expect(resp.status).toEqual(200);
        })
        it('should get empty object', async() => {
            jest.spyOn(Categoria, 'create').mockRejectedValue(new Error('mock Error'));
            jest.spyOn(Produto, 'create').mockReturnValue(new Error('mock Error'));
            const resp = await request(app).post('/categorias/upload').send({
                "categorias":[{
                    "nome":"categoriaUpload2"
                }]
            })
            expect(resp.status).toEqual(200);
            expect(resp.body).toEqual({ categorias: [ { data: {}, success: false } ] });
        })
        it('should get error by invalid payload', async() => {
            const resp = await request(app).post('/categorias/upload').send({})
            expect(resp.status).toEqual(400);
        })
    })
    describe('download /categorias/download', () => {
        it('should return valid object', async () => {
            jest.spyOn(Categoria, 'findAll').mockReturnValue([]);
            const resp = await request(app).get('/categorias/download')
            expect(resp.status).toEqual(200);
        })
        it('should get error', async() => {
            jest.spyOn(Categoria, 'findAll').mockRejectedValue(new Error('mock Error'));
            const resp = await request(app).get('/categorias/download')
            expect(resp.status).toEqual(500);
        })
    })
})