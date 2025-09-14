
const { check, validationResult } = require('express-validator');
const SearchValidators = () => {
    return [
        check('words')
            .isArray({ min: 1 })
            .withMessage('El campo "words" debe ser un arreglo y no puede estar vacío.'),
        check('matrix')
            .isArray({ min: 1 })
            .withMessage('El campo "matrix" debe ser un arreglo y no puede estar vacío.'),
    ];
};

const validate = (req, res, next) => {
    const errors = validationResult(req);
    if (errors.isEmpty()) {
        return next();
    }
    return res.status(400).json({ errors: errors.array() });
};

module.exports = {
    SearchValidators,
    validate,
};