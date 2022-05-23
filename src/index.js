import express from 'express'
import categoriaRoutes from './routes/categoria.js'
import produtoRoutes from './routes/produto.js'

const app = express()
app.use(express.json())
app.use(categoriaRoutes)
app.use(produtoRoutes) 

app.listen(3333, () => console.log("API SEQUELIZE NODE on port 3333"));