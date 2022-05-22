import {idValidator} from './categoria.js'
import {checkSchema} from 'express-validator'
import validator from 'is-my-json-valid'

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
    }
})

const validateJson = validator({
    required: true,
    type: 'object',
    properties: {
        produtos: {
        required: true,
        type: 'array',
        items: {
            additionalProperties: false,
            properties: {
                nome: {
                    required: true,
                    type: 'string',
                },
                categoriaId: {
                    required: true,
                    type: 'number',
                }
            }
        }
        }
    }
})

export {idValidator, categoriaIdValidator, nameValidator, validateJson}