import {checkSchema} from 'express-validator'
import validator from 'is-my-json-valid'

const idValidator = checkSchema({id: {
    in: ['params', 'query'],
    errorMessage: 'ID invalido',
    isInt: true,
    toInt: true,
}})

const bodyValidator = checkSchema({nome: {
    in: ['params', 'body'],
    errorMessage: 'Nome invalido',
    isString: true,
}})

const validateJson = validator({
    required: true,
    type: 'object',
    properties: {
        categorias: {
            required: true,
            type: 'array',
            items:{
                additionalProperties: false,
                properties: {
                    nome: {
                        required: true,
                        type: 'string',
                    },
                    produtos: {
                        type: 'array',
                        items: {
                            additionalProperties: false,
                            properties: {
                                nome: {
                                    required: true,
                                    type: 'string',
                                }
                            }
                        }
                    }
                }
            },
        }
    }
})

export {idValidator, bodyValidator, validateJson}