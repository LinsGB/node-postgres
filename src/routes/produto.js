import { Router } from 'express'
import {validationResult} from 'express-validator'
const routes = Router()
import {createProdutos, deleteProdutos, findProdutos, listProdutos, updateProdutos} from '../controller/Produto.js'
import {idValidator, categoriaIdValidator, nameValidator} from '../validators/produto.js'

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

export default routes