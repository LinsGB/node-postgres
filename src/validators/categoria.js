import {checkSchema} from 'express-validator'

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

export {idValidator, bodyValidator}