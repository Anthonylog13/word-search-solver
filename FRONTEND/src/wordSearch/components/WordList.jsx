"use client";

import { useState } from "react";

const WordList = ({
  words,
  onWordsChange,
  onSearch,
  isSearching,
  searchResults,
}) => {
  const [wordsText, setWordsText] = useState(words.join("\n"));

  const handleWordsChange = (e) => {
    const text = e.target.value;
    setWordsText(text);
    const wordArray = text
      .split("\n")
      .map((word) => word.trim().toUpperCase())
      .filter((word) => word.length > 0);

    onWordsChange(wordArray);
  };

  const getWordStatus = (word) => {
    if (!searchResults) return "default";
    return searchResults.found?.includes(word)
      ? "found"
      : searchResults.notFound?.includes(word)
      ? "not-found"
      : "default";
  };

  const getWordStatusColor = (status) => {
    switch (status) {
      case "found":
        return "text-green-700 bg-green-100 border-green-300";
      case "not-found":
        return "text-red-700 bg-red-100 border-red-300";
      default:
        return "text-gray-700 bg-gray-50 border-gray-200";
    }
  };

  return (
    <div className="bg-white rounded-xl p-6 shadow-lg border border-gray-100">
      <h2 className="text-xl font-bold mb-4 text-gray-800">
        Lista de Palabras a Buscar
      </h2>

      <div className="space-y-4">
        <textarea
          value={wordsText}
          onChange={handleWordsChange}
          placeholder="Ingresa las palabras a buscar, una por línea..."
          className="w-full min-h-32 p-3 border border-gray-200 rounded-lg resize-none focus:border-purple-400 focus:ring-2 focus:ring-purple-200 focus:outline-none transition-colors duration-200"
          disabled={isSearching}
        />

        {words.length > 0 && (
          <div className="space-y-2">
            <h3 className="text-sm font-semibold text-gray-600">
              Palabras ({words.length}):
            </h3>
            <div className="flex flex-wrap gap-2">
              {words.map((word, index) => {
                const status = getWordStatus(word);
                return (
                  <span
                    key={index}
                    className={`px-3 py-1 text-xs font-semibold rounded-full border ${getWordStatusColor(
                      status
                    )}`}
                  >
                    {word}
                    {status === "found" && " ✓"}
                    {status === "not-found" && " ✗"}
                  </span>
                );
              })}
            </div>
          </div>
        )}

        <button
          onClick={onSearch}
          disabled={isSearching || words.length === 0}
          className="w-full bg-purple-600 hover:bg-purple-700 disabled:bg-gray-400 disabled:cursor-not-allowed text-white font-semibold py-3 rounded-lg transition-colors duration-200"
        >
          {isSearching ? "Buscando..." : "Buscar Palabras"}
        </button>
      </div>
    </div>
  );
};

export default WordList;
