import { Router } from 'express'
import {validationResult} from 'express-validator'
const routes = Router()
import {listCategorias, createCategoria, deleteCategorias, findCategorias, updateCategorias, createCategoriasWithProduto} from '../controller/Categoria.js'
import {idValidator, bodyValidator, validateJson} from '../validators/categoria.js'

routes.get('/categorias', async (req, res) =>{
    await listCategorias().then(categorias => {
        res.json({categorias})
    }).catch(error => {
        return res.status(500).json( error );
    })
})

routes.get('/categoria/:id', idValidator, async (req, res) =>{
    const errors = validationResult(req);
    if (!errors.isEmpty()) return res.status(400).json({ errors: errors.array() });
    findCategorias(req.params.id).then(categorias => {
        res.json({categorias})
    }).catch(error => {
        return res.status(500).json( error );
    })
})

routes.post('/categoria', bodyValidator, async (req, res) =>{
    const errors = validationResult(req);
    if (!errors.isEmpty()) return res.status(400).json({ errors: errors.array() });
    createCategoria(req.body.nome).then(categorias => {
        res.json({categorias})
    }).catch(error => {
        return res.status(500).json( error );
    })
    
})

routes.delete('/categoria/:id', idValidator, async (req, res) => {
    const errors = validationResult(req);
    if (!errors.isEmpty()) return res.status(400).json({ errors: errors.array() });
    deleteCategorias(req.params.id).then(categorias => {
        res.json({categorias})
    }).catch(error => {
        return res.status(500).json( error );
    })
})

routes.put('/categoria/:id', idValidator, bodyValidator, async (req, res) =>{
    const errors = validationResult(req);
    if (!errors.isEmpty()) return res.status(400).json({ errors: errors.array() });
    updateCategorias(req.body.nome, req.params.id).then(categorias => {
        res.json({categorias})
    }).catch(error => {
        return res.status(500).json( error );
    })
})

routes.post('/categorias/upload', async (req, res) =>{
    validateJson(req.body)
    const errors = validateJson.errors
    if (errors) return res.status(400).json({ errors: errors });
    const categorias = []
    for (const categoria of req.body.categorias) {
        console.log('catgoria => ', categoria)
        try {
            const {produtos, nome} = categoria
            const produtosNames = produtos ? produtos.map(produto => produto.nome) : []
            const data = await createCategoriasWithProduto(nome, produtosNames)
            categorias.push({data, success: true})
        } catch (error) {
            console.log('error => ', error)
            categorias.push({data: error, success: false})
        }
    }
    return res.json({categorias})
})

routes.get('/categorias/download', async (req, res) => {
    listCategorias().then(categorias => {
        res.contentType('text/plain');
        return res.attachment('categorias.json').send(JSON.stringify({categorias}))
    }).catch(error => {
        return res.status(500).json( error );
    })
})

export default routes