import { Router } from 'express'
import {validationResult} from 'express-validator'
const routes = Router()
import {listCategorias, createCategorias, deleteCategorias, findCategorias, updateCategorias} from '../controller/Categoria.js'
import {idValidator} from '../validators/categoria.js'

routes.get('/categorias', async (req, res) =>{
    const categorias = await listCategorias()
    res.json({categorias})
})

routes.get('/categoria/:id', idValidator, async (req, res) =>{
    const errors = validationResult(req);
    if (!errors.isEmpty()) return res.status(400).json({ errors: errors.array() });
    const categorias = await findCategorias(req.params.id)
    res.json({categorias})
})

routes.post('/categoria', async (req, res) =>{
    const body = req.body
    if (body.nome) {
        const categorias = await createCategorias(body)
        res.json({categorias})
    } else {
        throw new Error("Uma categoria deve conter o campo 'nome'").statusCode = 400
    }
})

routes.delete('/categoria/:id', idValidator, async (req, res) => {
    const errors = validationResult(req);
    if (!errors.isEmpty()) return res.status(400).json({ errors: errors.array() });
    const categorias = await deleteCategorias(req.params.id)
    res.json({categorias})
})

routes.put('/categoria/:id', idValidator, async (req, res) =>{
    const errors = validationResult(req);
    if (!errors.isEmpty()) return res.status(400).json({ errors: errors.array() });
    const categorias = await updateCategorias(req.body, req.params.id)
    res.json({categorias})
})

export default routes