const express = require("express");
const routerSearch = express.Router();
const { SearchValidators, validate } = require('../Validators/searchValidators');
const { solveSearch } = require('../Controllers/searchController');

/**
 * @swagger
 * components:
 *   schemas:
 *     SearchResult:
 *       type: object
 *       properties:
 *         word:
 *           type: string
 *           description: La palabra que se buscó.
 *           example: "LEON"
 *         found:
 *           type: boolean
 *           description: True si la palabra fue encontrada, de lo contrario false.
 *           example: true
 *     ValidationError:
 *       type: object
 *       properties:
 *         type:
 *           type: string
 *           example: "field"
 *         value:
 *           type: string
 *           example: []
 *         msg:
 *           type: string
 *           description: El mensaje de error de la validación.
 *           example: "El campo 'words' debe ser un arreglo con al menos una palabra."
 *         path:
 *           type: string
 *           example: "words"
 *         location:
 *           type: string
 *           example: "body"
 */

/**
 * @swagger
 * /search:
 *   post:
 *     summary: Resuelve una sopa de letras.
 *     tags: [Search]
 *     description: Recibe una lista de palabras y una matriz, y devuelve cuáles palabras fueron encontradas.
 *     requestBody:
 *       required: true
 *       content:
 *         application/json:
 *           schema:
 *             type: object
 *             properties:
 *               words:
 *                 type: array
 *                 items:
 *                   type: string
 *                 example: ["LEON", "PERRO", "NADA"]
 *               matrix:
 *                 type: array
 *                 items:
 *                   type: array
 *                   items:
 *                     type: string
 *                 example: [["L", "E", "O", "N"], ["X", "Y", "Z", "A"]]
 *     responses:
 *       '200':
 *         description: Búsqueda completada exitosamente.
 *         content:
 *           application/json:
 *             schema:
 *               type: object
 *               properties:
 *                 results:
 *                   type: array
 *                   items:
 *                     $ref: '#/components/schemas/SearchResult'
 *       '400':
 *         description: Datos de entrada inválidos.
 *         content:
 *           application/json:
 *             schema:
 *               type: object
 *               properties:
 *                 errors:
 *                   type: array
 *                   items:
 *                     $ref: '#/components/schemas/ValidationError'
 *       '500':
 *         description: Error interno del servidor.
 */
routerSearch.post('/search', SearchValidators(), validate, solveSearch);

module.exports = routerSearch;