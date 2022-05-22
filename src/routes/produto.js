import { Router } from 'express'
import {validationResult} from 'express-validator'
import {createProdutos, deleteProdutos, findProdutos, listProdutos, updateProdutos} from '../controller/Produto.js'
import {idValidator, categoriaIdValidator, nameValidator, validateJson} from '../validators/produto.js'
const routes = Router()

routes.get('/produtos', async (req, res) =>{
    await listProdutos().then(categorias => {
        res.json({categorias})
    }).catch(error => {
        return res.status(500).json( error );
    })
})

routes.get('/produto/:id', idValidator, async (req, res) =>{
    const errors = validationResult(req);
    if (!errors.isEmpty()) return res.status(400).json({ errors: errors.array() });
    findProdutos(req.params.id).then(categorias => {
        res.json({categorias})
    }).catch(error => {
        return res.status(500).json( error );
    })
})

routes.post('/produto', categoriaIdValidator, nameValidator, async (req, res) =>{
    const errors = validationResult(req);
    if (!errors.isEmpty()) return res.status(400).json({ errors: errors.array() });
    createProdutos(req.body).then(categorias => {
        res.json({categorias})
    }).catch(error => {
        return res.status(500).json( error );
    })
    
})

routes.delete('/produto/:id', idValidator, async (req, res) => {
    const errors = validationResult(req);
    if (!errors.isEmpty()) return res.status(400).json({ errors: errors.array() });
    deleteProdutos(req.params.id).then(categorias => {
        res.json({categorias})
    }).catch(error => {
        return res.status(500).json( error );
    })
})

routes.put('/produto/:id', idValidator, nameValidator, async (req, res) =>{
    const errors = validationResult(req);
    if (!errors.isEmpty()) return res.status(400).json({ errors: errors.array() });
    updateProdutos(req.body.nome, req.params.id).then(categorias => {
        return res.json({categorias})
    }).catch(error => {
        return res.status(500).json( error );
    })
})

routes.post('/produto/upload', async (req, res) =>{
    validateJson(req.body)
    const errors = validateJson.errors
    if (errors) return res.status(400).json({ errors: errors });
    let produtos = []
    for (const data of req.body.produtos) {
        try {
            produtos.push({data: await createProdutos(data), success: true})
        } catch (error) {
            produtos.push({data: error, success: false})
        }
    }
    return res.json({produtos})
})



export default routes