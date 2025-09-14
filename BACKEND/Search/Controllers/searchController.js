
const { response } = require('express');
const { solveWordSearch } = require('../../services/wordSearchService');

const solveSearch = (req, res) => {
    try {
        const { words, matrix } = req.body;
        const results = solveWordSearch(words, matrix);

        res.status(200).json({ results });
    } catch (error) {
        res.status(500).json({ error: 'Ocurrió un error en el servidor.' });
    }
};

module.exports = {
    solveSearch,
};