import { Router } from 'express'
import {validationResult} from 'express-validator'
const routes = Router()
import {listCategorias, createCategorias, deleteCategorias, findCategorias, updateCategorias} from '../controller/Categoria.js'
import {idValidator, bodyValidator} from '../validators/categoria.js'

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
    createCategorias(req.body.nome).then(categorias => {
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

export default routes