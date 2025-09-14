
const express = require('express');
const request = require('supertest');
const { SearchValidators, validate } = require('../Search/Validators/searchValidators');

const createTestApp = () => {
    const app = express();
    app.use(express.json());

    app.post('/test-validation', SearchValidators(), validate, (req, res) => {
        res.status(200).json({ message: 'Validación exitosa', data: req.body });
    });

    return app;
};

describe('Search Validators Tests', () => {
    let app;

    beforeEach(() => {
        app = createTestApp();
    });

    describe('SearchValidators - Campo words', () => {
        test('Debe aceptar un array válido de palabras', async () => {
            const response = await request(app)
                .post('/test-validation')
                .send({
                    words: ['GATO', 'PERRO', 'LEON'],
                    matrix: [['G', 'A', 'T', 'O']]
                });

            expect(response.status).toBe(200);
            expect(response.body.message).toBe('Validación exitosa');
        });

        test('Debe rechazar cuando words no está presente', async () => {
            const response = await request(app)
                .post('/test-validation')
                .send({
                    matrix: [['G', 'A', 'T', 'O']]
                });

            expect(response.status).toBe(400);
            expect(response.body.errors).toBeDefined();
            expect(response.body.errors[0].msg).toBe('El campo "words" debe ser un arreglo y no puede estar vacío.');
            expect(response.body.errors[0].path).toBe('words');
        });

        test('Debe rechazar cuando words es un array vacío', async () => {
            const response = await request(app)
                .post('/test-validation')
                .send({
                    words: [],
                    matrix: [['G', 'A', 'T', 'O']]
                });

            expect(response.status).toBe(400);
            expect(response.body.errors[0].msg).toBe('El campo "words" debe ser un arreglo y no puede estar vacío.');
        });

        test('Debe rechazar cuando words no es un array (string)', async () => {
            const response = await request(app)
                .post('/test-validation')
                .send({
                    words: 'GATO',
                    matrix: [['G', 'A', 'T', 'O']]
                });

            expect(response.status).toBe(400);
            expect(response.body.errors[0].msg).toBe('El campo "words" debe ser un arreglo y no puede estar vacío.');
        });

        test('Debe rechazar cuando words no es un array (número)', async () => {
            const response = await request(app)
                .post('/test-validation')
                .send({
                    words: 123,
                    matrix: [['G', 'A', 'T', 'O']]
                });

            expect(response.status).toBe(400);
            expect(response.body.errors[0].msg).toBe('El campo "words" debe ser un arreglo y no puede estar vacío.');
        });

        test('Debe rechazar cuando words no es un array (objeto)', async () => {
            const response = await request(app)
                .post('/test-validation')
                .send({
                    words: { word: 'GATO' },
                    matrix: [['G', 'A', 'T', 'O']]
                });

            expect(response.status).toBe(400);
            expect(response.body.errors[0].msg).toBe('El campo "words" debe ser un arreglo y no puede estar vacío.');
        });

        test('Debe rechazar cuando words es null', async () => {
            const response = await request(app)
                .post('/test-validation')
                .send({
                    words: null,
                    matrix: [['G', 'A', 'T', 'O']]
                });

            expect(response.status).toBe(400);
            expect(response.body.errors[0].msg).toBe('El campo "words" debe ser un arreglo y no puede estar vacío.');
        });
    });

    describe('SearchValidators - Campo matrix', () => {
        test('Debe aceptar una matriz válida', async () => {
            const response = await request(app)
                .post('/test-validation')
                .send({
                    words: ['GATO'],
                    matrix: [
                        ['G', 'A', 'T', 'O'],
                        ['X', 'Y', 'Z', 'W']
                    ]
                });

            expect(response.status).toBe(200);
            expect(response.body.message).toBe('Validación exitosa');
        });

        test('Debe rechazar cuando matrix no está presente', async () => {
            const response = await request(app)
                .post('/test-validation')
                .send({
                    words: ['GATO']
                });

            expect(response.status).toBe(400);
            expect(response.body.errors[0].msg).toBe('El campo "matrix" debe ser un arreglo y no puede estar vacío.');
            expect(response.body.errors[0].path).toBe('matrix');
        });

        test('Debe rechazar cuando matrix es un array vacío', async () => {
            const response = await request(app)
                .post('/test-validation')
                .send({
                    words: ['GATO'],
                    matrix: []
                });

            expect(response.status).toBe(400);
            expect(response.body.errors[0].msg).toBe('El campo "matrix" debe ser un arreglo y no puede estar vacío.');
        });

        test('Debe rechazar cuando matrix no es un array (string)', async () => {
            const response = await request(app)
                .post('/test-validation')
                .send({
                    words: ['GATO'],
                    matrix: 'invalid matrix'
                });

            expect(response.status).toBe(400);
            expect(response.body.errors[0].msg).toBe('El campo "matrix" debe ser un arreglo y no puede estar vacío.');
        });

        test('Debe rechazar cuando matrix no es un array (objeto)', async () => {
            const response = await request(app)
                .post('/test-validation')
                .send({
                    words: ['GATO'],
                    matrix: { row1: ['G', 'A', 'T', 'O'] }
                });

            expect(response.status).toBe(400);
            expect(response.body.errors[0].msg).toBe('El campo "matrix" debe ser un arreglo y no puede estar vacío.');
        });

        test('Debe aceptar matriz con un solo elemento', async () => {
            const response = await request(app)
                .post('/test-validation')
                .send({
                    words: ['A'],
                    matrix: [['A']]
                });

            expect(response.status).toBe(200);
            expect(response.body.message).toBe('Validación exitosa');
        });
    });

    describe('SearchValidators - Validación combinada', () => {
        test('Debe rechazar cuando ambos campos son inválidos', async () => {
            const response = await request(app)
                .post('/test-validation')
                .send({
                    words: [],
                    matrix: []
                });

            expect(response.status).toBe(400);
            expect(response.body.errors).toHaveLength(2);

            const errorMessages = response.body.errors.map(error => error.msg);
            expect(errorMessages).toContain('El campo "words" debe ser un arreglo y no puede estar vacío.');
            expect(errorMessages).toContain('El campo "matrix" debe ser un arreglo y no puede estar vacío.');
        });

        test('Debe rechazar cuando faltan ambos campos', async () => {
            const response = await request(app)
                .post('/test-validation')
                .send({});

            expect(response.status).toBe(400);
            expect(response.body.errors).toHaveLength(2);
        });

        test('Debe aceptar datos completamente válidos', async () => {
            const validData = {
                words: ['GATO', 'PERRO', 'LEON'],
                matrix: [
                    ['G', 'A', 'T', 'O', 'X'],
                    ['P', 'E', 'R', 'R', 'O'],
                    ['L', 'E', 'O', 'N', 'Y'],
                    ['X', 'Y', 'Z', 'W', 'Q']
                ]
            };

            const response = await request(app)
                .post('/test-validation')
                .send(validData);

            expect(response.status).toBe(200);
            expect(response.body.message).toBe('Validación exitosa');
            expect(response.body.data).toEqual(validData);
        });
    });

    describe('validate middleware', () => {
        test('Debe pasar al siguiente middleware cuando no hay errores', async () => {
            const response = await request(app)
                .post('/test-validation')
                .send({
                    words: ['TEST'],
                    matrix: [['T', 'E', 'S', 'T']]
                });

            expect(response.status).toBe(200);
            expect(response.body.message).toBe('Validación exitosa');
        });

        test('Debe retornar errores con el formato correcto', async () => {
            const response = await request(app)
                .post('/test-validation')
                .send({
                    words: 'invalid',
                    matrix: 'invalid'
                });

            expect(response.status).toBe(400);
            expect(response.body).toHaveProperty('errors');
            expect(Array.isArray(response.body.errors)).toBe(true);

            response.body.errors.forEach(error => {
                expect(error).toHaveProperty('type');
                expect(error).toHaveProperty('msg');
                expect(error).toHaveProperty('path');
                expect(error).toHaveProperty('location');
            });
        });

        test('Debe incluir información detallada del error', async () => {
            const response = await request(app)
                .post('/test-validation')
                .send({
                    words: 'not an array'
                });

            expect(response.status).toBe(400);
            const wordError = response.body.errors.find(error => error.path === 'words');

            expect(wordError).toBeDefined();
            expect(wordError.msg).toBe('El campo "words" debe ser un arreglo y no puede estar vacío.');
            expect(wordError.location).toBe('body');
            expect(wordError.path).toBe('words');
        });
    });
});