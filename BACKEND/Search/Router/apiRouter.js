const express = require("express");
const routerSearch = express.Router();
const { SearchValidators } = require('../Validators/searchValidators');
const { validationResult } = require('express-validator');
const { searchWords } = require('../Controllers/searchController');

/**
 * @swagger
 * /api/search:
 * post:
 * summary: Resuelve una sopa de letras.
 * description: Recibe una lista de palabras y una matriz, y devuelve cuáles palabras fueron encontradas.
 * requestBody:
 * required: true
 * content:
 * application/json:
 * schema:
 * type: object
 * properties:
 * words:
 * type: array
 * items:
 * type: string
 * example: ["LEON", "PERRO"]
 * matrix:
 * type: array
 * items:
 * type: array
 * items:
 * type: string
 * example: [["P", "X", "L", "E", "O"], ["E", "R", "R", "O", "N"]]
 * responses:
 * 200:
 * description: Búsqueda completada exitosamente.
 * 400:
 * description: Datos de entrada inválidos.
 */
routerSearch.post('/search', SearchValidators, (req, res, next) => {
    const errors = validationResult(req);
    if (!errors.isEmpty()) {
        return res.status(400).json({ errors: errors.array() });
    }
    searchWords(req, res, next);
});

module.exports = routerSearch;