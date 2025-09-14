
const request = require('supertest');
const express = require('express');
const { solveSearch } = require('../Search/Controllers/searchController');
const { SearchValidators, validate } = require('../Search/Validators/searchValidators');

jest.mock('../services/wordSearchService', () => ({
    solveWordSearch: jest.fn()
}));

const { solveWordSearch } = require('../services/wordSearchService');


const app = express();
app.use(express.json());
app.post('/search', SearchValidators(), validate, solveSearch);

describe('Search Controller Tests', () => {

    beforeEach(() => {

        jest.clearAllMocks();
    });

    describe('POST /search - Casos exitosos', () => {
        test('Debe retornar resultados correctos cuando todo es válido', async () => {

            const mockResults = [
                { word: 'GATO', found: true },
                { word: 'PERRO', found: false }
            ];
            solveWordSearch.mockReturnValue(mockResults);

            const requestBody = {
                words: ['GATO', 'PERRO'],
                matrix: [
                    ['G', 'A', 'T', 'O'],
                    ['X', 'Y', 'Z', 'W']
                ]
            };

            const response = await request(app)
                .post('/search')
                .send(requestBody);

            expect(response.status).toBe(200);
            expect(response.body).toEqual({ results: mockResults });
            expect(solveWordSearch).toHaveBeenCalledWith(['GATO', 'PERRO'], [
                ['G', 'A', 'T', 'O'],
                ['X', 'Y', 'Z', 'W']
            ]);
            expect(solveWordSearch).toHaveBeenCalledTimes(1);
        });

        test('Debe manejar matrices grandes correctamente', async () => {
            const mockResults = [{ word: 'TEST', found: true }];
            solveWordSearch.mockReturnValue(mockResults);

            const largeMatrix = Array(10).fill().map(() =>
                Array(10).fill('X')
            );

            const response = await request(app)
                .post('/search')
                .send({
                    words: ['TEST'],
                    matrix: largeMatrix
                });

            expect(response.status).toBe(200);
            expect(response.body.results).toEqual(mockResults);
        });
    });

    describe('POST /search - Validación de entrada (400)', () => {
        test('Debe retornar 400 cuando falte el campo words', async () => {
            const response = await request(app)
                .post('/search')
                .send({
                    matrix: [['G', 'A', 'T', 'O']]
                });

            expect(response.status).toBe(400);
            expect(response.body.errors).toBeDefined();
            expect(response.body.errors[0].msg).toBe('El campo "words" debe ser un arreglo y no puede estar vacío.');
        });

        test('Debe retornar 400 cuando falte el campo matrix', async () => {
            const response = await request(app)
                .post('/search')
                .send({
                    words: ['GATO']
                });

            expect(response.status).toBe(400);
            expect(response.body.errors).toBeDefined();
            expect(response.body.errors[0].msg).toBe('El campo "matrix" debe ser un arreglo y no puede estar vacío.');
        });

        test('Debe retornar 400 cuando words sea un array vacío', async () => {
            const response = await request(app)
                .post('/search')
                .send({
                    words: [],
                    matrix: [['G', 'A', 'T', 'O']]
                });

            expect(response.status).toBe(400);
            expect(response.body.errors).toBeDefined();
            expect(response.body.errors[0].msg).toBe('El campo "words" debe ser un arreglo y no puede estar vacío.');
        });

        test('Debe retornar 400 cuando matrix sea un array vacío', async () => {
            const response = await request(app)
                .post('/search')
                .send({
                    words: ['GATO'],
                    matrix: []
                });

            expect(response.status).toBe(400);
            expect(response.body.errors).toBeDefined();
            expect(response.body.errors[0].msg).toBe('El campo "matrix" debe ser un arreglo y no puede estar vacío.');
        });

        test('Debe retornar múltiples errores cuando ambos campos sean inválidos', async () => {
            const response = await request(app)
                .post('/search')
                .send({
                    words: [],
                    matrix: []
                });

            expect(response.status).toBe(400);
            expect(response.body.errors).toBeDefined();
            expect(response.body.errors).toHaveLength(2);
        });
    });

    describe('POST /search - Manejo de errores del servidor (500)', () => {
        test('Debe retornar 500 cuando el service lanza una excepción', async () => {
            solveWordSearch.mockImplementation(() => {
                throw new Error('Error interno del service');
            });

            const response = await request(app)
                .post('/search')
                .send({
                    words: ['GATO'],
                    matrix: [['G', 'A', 'T', 'O']]
                });

            expect(response.status).toBe(500);
            expect(response.body.error).toBe('Ocurrió un error en el servidor.');
        });
    });

    describe('POST /search - Estructura de respuesta', () => {
        test('La respuesta exitosa debe tener la estructura correcta', async () => {
            const mockResults = [{ word: 'TEST', found: true }];
            solveWordSearch.mockReturnValue(mockResults);

            const response = await request(app)
                .post('/search')
                .send({
                    words: ['TEST'],
                    matrix: [['T', 'E', 'S', 'T']]
                });

            expect(response.status).toBe(200);
            expect(response.body).toHaveProperty('results');
            expect(Array.isArray(response.body.results)).toBe(true);
            expect(response.headers['content-type']).toMatch(/json/);
        });
    });
});