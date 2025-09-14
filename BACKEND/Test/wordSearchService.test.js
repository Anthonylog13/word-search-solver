const { solveWordSearch } = require("../services/wordSearchService");

describe("Pruebas para solveWordSearch", () => {
    const testMatrix = [
        ["H", "O", "L", "A", "X"],
        ["B", "S", "U", "N", "Y"],
        ["C", "A", "S", "A", "Z"],
        ["D", "M", "O", "T", "O"],
        ["E", "F", "G", "H", "J"],
    ];

    describe("Búsquedas direccionales", () => {
        test("Debe encontrar palabras escritas de izquierda a derecha (horizontal)", () => {
            const words = ["HOLA"];
            const results = solveWordSearch(words, testMatrix);
            expect(results).toHaveLength(1);
            expect(results[0]).toEqual({ word: "HOLA", found: true });
        });

        test("Debe encontrar palabras escritas de arriba a abajo (vertical)", () => {
            const words = ["HBCD"];
            const results = solveWordSearch(words, testMatrix);
            expect(results[0].found).toBe(true);
        });

        test("Debe encontrar palabras en diagonal (arriba-izquierda a abajo-derecha)", () => {
            const words = ["HSSTJ"];
            const results = solveWordSearch(words, testMatrix);
            expect(results[0].found).toBe(true);
        });

        test("Debe encontrar palabras escritas al revés (derecha a izquierda)", () => {
            const words = ["ALOH"];
            const results = solveWordSearch(words, testMatrix);
            expect(results[0].found).toBe(true);
        });

        test("Debe encontrar palabras de abajo a arriba (vertical inverso)", () => {
            const words = ["EDCB"];
            const results = solveWordSearch(words, testMatrix);
            expect(results[0].found).toBe(true);
        });

        test("Debe encontrar CASA horizontal en fila 2", () => {
            const words = ["CASA"];
            const results = solveWordSearch(words, testMatrix);
            expect(results[0].found).toBe(true);
        });

        test("Debe encontrar MOTO horizontal en fila 3", () => {
            const words = ["MOTO"];
            const results = solveWordSearch(words, testMatrix);
            expect(results[0].found).toBe(true);
        });
    });

    describe("Casos edge y validaciones", () => {
        test("No debe encontrar palabras que no existen", () => {
            const words = ["MUNDO"];
            const results = solveWordSearch(words, testMatrix);
            expect(results[0].found).toBe(false);
        });

        test("Debe manejar palabras vacías", () => {
            const words = [""];
            const results = solveWordSearch(words, testMatrix);
            expect(results).toHaveLength(0);
        });

        test("Debe manejar matriz vacía", () => {
            const words = ["HOLA"];
            const emptyMatrix = [];
            const results = solveWordSearch(words, emptyMatrix);
            expect(results[0].found).toBe(false);
        });

        test("Debe ser insensible a mayúsculas/minúsculas", () => {
            const words = ["hola", "HOLA", "HoLa"];
            const results = solveWordSearch(words, testMatrix);
            results.forEach((result) => {
                expect(result.found).toBe(true);
            });
        });

        test("Debe manejar espacios en blanco", () => {
            const words = [" HOLA ", "  CASA  "];
            const results = solveWordSearch(words, testMatrix);
            expect(results).toHaveLength(2);
            expect(results[0]).toEqual({ word: "HOLA", found: true });
            expect(results[1]).toEqual({ word: "CASA", found: true });
        });
    });

    describe("Múltiples palabras", () => {
        test("Debe manejar una lista de palabras y devolver el estado de cada una", () => {
            const words = ["HOLA", "CASA", "MUNDO", "MOTO"];
            const results = solveWordSearch(words, testMatrix);

            expect(results).toHaveLength(4);
            expect(results.find((r) => r.word === "HOLA").found).toBe(true);
            expect(results.find((r) => r.word === "CASA").found).toBe(true);
            expect(results.find((r) => r.word === "MOTO").found).toBe(true);
            expect(results.find((r) => r.word === "MUNDO").found).toBe(false);
        });

        test("Debe manejar palabras duplicadas", () => {
            const words = ["HOLA", "HOLA", "CASA"];
            const results = solveWordSearch(words, testMatrix);
            expect(results).toHaveLength(3);
        });
    });

    describe("Performance", () => {
        test("Debe procesar matrices grandes en tiempo razonable", () => {
            const largeMatrix = Array(50)
                .fill()
                .map(() =>
                    Array(50)
                        .fill()
                        .map(() => String.fromCharCode(65 + Math.floor(Math.random() * 26)))
                );
            const words = ["TEST", "PERFORMANCE"];

            const startTime = Date.now();
            const results = solveWordSearch(words, largeMatrix);
            const endTime = Date.now();

            expect(endTime - startTime).toBeLessThan(1000);
            expect(results).toHaveLength(2);
        });
    });
});
