import {checkSchema} from 'express-validator'

const idValidator = checkSchema({id: {
    in: ['params', 'query'],
    errorMessage: 'ID is wrong',
    isInt: true,
    toInt: true,
}})

export {idValidator}