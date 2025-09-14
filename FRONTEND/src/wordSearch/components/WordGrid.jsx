"use client";

import { useState } from "react";

const WordGrid = ({ matrix, onMatrixChange, isSearching }) => {
  const [selectedCell, setSelectedCell] = useState(null);

  const handleCellClick = (row, col) => {
    if (isSearching) return;
    setSelectedCell({ row, col });
  };

  const handleCellChange = (row, col, value) => {
    if (isSearching) return;

    // Solo permitir una letra
    const letter = value.toUpperCase().slice(-1);

    const newMatrix = matrix.map((matrixRow, rowIndex) =>
      matrixRow.map((cell, colIndex) =>
        rowIndex === row && colIndex === col ? letter : cell
      )
    );

    onMatrixChange(newMatrix);
    setSelectedCell(null);
  };

  const handleKeyDown = (e) => {
    if (e.key === "Enter" || e.key === "Escape") {
      setSelectedCell(null);
    }
  };

  return (
    <div className="bg-white rounded-xl p-6 shadow-lg border border-gray-100">
      <h2 className="text-2xl font-bold text-center mb-6 text-gray-800">
        Matriz de Letras
      </h2>
      <div className="grid grid-cols-14 gap-1 max-w-4xl mx-auto">
        {matrix.map((row, rowIndex) =>
          row.map((cell, colIndex) => (
            <div key={`${rowIndex}-${colIndex}`} className="relative">
              {selectedCell?.row === rowIndex &&
              selectedCell?.col === colIndex ? (
                <input
                  type="text"
                  value={cell}
                  onChange={(e) =>
                    handleCellChange(rowIndex, colIndex, e.target.value)
                  }
                  onBlur={() => setSelectedCell(null)}
                  onKeyDown={(e) => handleKeyDown(e, rowIndex, colIndex)}
                  className="w-8 h-8 text-center text-sm font-bold border-2 border-purple-500 rounded-md focus:outline-none focus:ring-2 focus:ring-purple-300 bg-white text-gray-800"
                  autoFocus
                  maxLength={1}
                />
              ) : (
                <button
                  onClick={() => handleCellClick(rowIndex, colIndex)}
                  disabled={isSearching}
                  className={`w-8 h-8 text-center text-sm font-bold border border-gray-200 rounded-md transition-all duration-200 ${
                    isSearching
                      ? "cursor-not-allowed opacity-50 bg-gray-50"
                      : "hover:bg-purple-50 hover:border-purple-300 hover:text-purple-700 cursor-pointer bg-white text-gray-700"
                  }`}
                >
                  {cell}
                </button>
              )}
            </div>
          ))
        )}
      </div>
      <p className="text-xs text-gray-500 text-center mt-4">
        Haz clic en cualquier celda para editar la letra
      </p>
    </div>
  );
};

export default WordGrid;
