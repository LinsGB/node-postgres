import { Router } from 'express'
import {validationResult} from 'express-validator'
import {createProdutos, deleteProdutos, findProdutos, listProdutos, updateProdutos} from '../controller/Produto.js'
import {idValidator, categoriaIdValidator, nameValidator, validateJson} from '../validators/produto.js'
const routes = Router()

routes.get('/produtos', async (req, res) =>{
    await listProdutos().then(produtos => {
        res.json({produtos})
    }).catch(error => {
        return res.status(500).json( error );
    })
})

routes.get('/produto/:id', idValidator, async (req, res) =>{
    const errors = validationResult(req);
    if (!errors.isEmpty()) return res.status(400).json({ errors: errors.array() });
    findProdutos(req.params.id).then(produtos => {
        res.json({produtos})
    }).catch(error => {
        return res.status(500).json( error );
    })
})

routes.post('/produto', categoriaIdValidator, nameValidator, async (req, res) =>{
    const errors = validationResult(req);
    if (!errors.isEmpty()) return res.status(400).json({ errors: errors.array() });
    createProdutos(req.body).then(produtos => {
        res.json({produtos})
    }).catch(error => {
        return res.status(500).json( error );
    })
    
})

routes.delete('/produto/:id', idValidator, async (req, res) => {
    const errors = validationResult(req);
    if (!errors.isEmpty()) return res.status(400).json({ errors: errors.array() });
    deleteProdutos(req.params.id).then(produtos => {
        res.json({produtos})
    }).catch(error => {
        return res.status(500).json( error );
    })
})

routes.put('/produto/:id', idValidator, nameValidator, async (req, res) =>{
    const errors = validationResult(req);
    if (!errors.isEmpty()) return res.status(400).json({ errors: errors.array() });
    updateProdutos(req.body.nome, req.params.id).then(produtos => {
        return res.json({produtos})
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

routes.get('/produtos/download', async (req, res) => {
    listProdutos().then(produtos => {
        console.log({produtos})
        res.contentType('text/plain');
        return res.status(200).attachment(`produtos.json`).send(JSON.stringify({produtos}))
    }).catch(error => {
        return res.status(500).json( error );
    })
})



export default routes