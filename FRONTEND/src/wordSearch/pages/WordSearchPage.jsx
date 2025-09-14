"use client";

import { useState } from "react";
import WordGrid from "../components/WordGrid";
import WordList from "../components/WordList";
import SearchResults from "../components/SearchResults";
import { searchWords } from "../../services/api";
import { defaultGrid, defaultWordList } from "../helpers/Utils";

const WordSearchPage = () => {
  const [matrix, setMatrix] = useState(defaultGrid);
  const [words, setWords] = useState(defaultWordList);
  const [isSearching, setIsSearching] = useState(false);
  const [searchResults, setSearchResults] = useState(null);
  const [error, setError] = useState(null);

  const handleSearch = async () => {
    if (words.length === 0) return;

    setIsSearching(true);
    setError(null);
    try {
      const data = await searchWords(matrix, words);
      const formattedResults = {
        found: data.results.filter((r) => r.found).map((r) => r.word),
        notFound: data.results.filter((r) => !r.found).map((r) => r.word),
      };
      setSearchResults(formattedResults);
    } catch (err) {
      setError(
        "Error al buscar las palabras. Verifica que el servidor esté funcionando."
      );
      console.error("Search error:", err);
    } finally {
      setIsSearching(false);
    }
  };

  return (
    <div className="min-h-screen bg-background">
      <div className="container mx-auto px-4 py-8">
        <div className="text-center mb-8">
          <h1 className="text-4xl font-bold text-foreground mb-2">
            Sopa de Letras
          </h1>
          <p className="text-muted-foreground text-lg">
            Encuentra las palabras ocultas en la matriz de letras
          </p>
        </div>
        {error && (
          <div className="mb-6 p-4 bg-red-50 border border-red-200 rounded-lg">
            <p className="text-red-700 text-center">{error}</p>
          </div>
        )}

        <div className="grid lg:grid-cols-3 gap-8">
          <div className="lg:col-span-2">
            <WordGrid
              matrix={matrix}
              onMatrixChange={setMatrix}
              isSearching={isSearching}
            />
          </div>
          <div>
            <WordList
              words={words}
              onWordsChange={setWords}
              onSearch={handleSearch}
              isSearching={isSearching}
              searchResults={searchResults}
            />
          </div>
        </div>
        {searchResults && (
          <div className="mt-8">
            <SearchResults
              results={searchResults}
              isVisible={!!searchResults}
            />
          </div>
        )}
        <div className="mt-12 bg-muted rounded-lg p-6">
          <h2 className="text-lg font-semibold mb-3 text-foreground">
            Instrucciones de Uso
          </h2>
          <div className="grid md:grid-cols-2 gap-4 text-sm text-muted-foreground">
            <div>
              <h3 className="font-medium text-foreground mb-2">
                Editar Matriz:
              </h3>
              <ul className="space-y-1">
                <li>• Haz clic en cualquier celda para editarla</li>
                <li>• Escribe una letra y presiona Enter</li>
                <li>• Solo se permite una letra por celda</li>
              </ul>
            </div>
            <div>
              <h3 className="font-medium text-foreground mb-2">
                Buscar Palabras:
              </h3>
              <ul className="space-y-1">
                <li>• Escribe las palabras una por línea</li>
                <li>• Las palabras se buscan en todas las direcciones</li>
                <li>• Haz clic en "Buscar Palabras" para iniciar</li>
              </ul>
            </div>
          </div>
        </div>
      </div>
    </div>
  );
};

export default WordSearchPage;
