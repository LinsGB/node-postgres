import {idValidator} from './categoria.js'
import {checkSchema} from 'express-validator'

const nameValidator = checkSchema({nome: {
    in: ['params', 'body'],
    errorMessage: 'Nome invalido',
    isString: true,
}})

const categoriaIdValidator = checkSchema({
categoriaId: {
    in: ['categoriaId', 'body'],
    errorMessage: 'Categoria invalida',
    isInt: true,
    toInt: true,
}})

export {idValidator, categoriaIdValidator, nameValidator}