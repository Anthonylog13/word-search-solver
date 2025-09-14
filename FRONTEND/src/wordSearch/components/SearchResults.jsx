const SearchResults = ({ results, isVisible }) => {
  if (!isVisible || !results) return null;

  const { found = [], notFound = [] } = results;

  return (
    <div className="bg-card rounded-lg p-6 shadow-sm border">
      <h2 className="text-xl font-semibold mb-4 text-foreground">
        Resultados de Búsqueda
      </h2>

      <div className="grid md:grid-cols-2 gap-6">
        <div>
          <h3 className="text-lg font-medium text-green-600 mb-3 flex items-center gap-2">
            <span className="w-2 h-2 bg-green-500 rounded-full"></span>
            Encontradas ({found.length})
          </h3>
          {found.length > 0 ? (
            <div className="space-y-2">
              {found.map((word, index) => (
                <div
                  key={index}
                  className="flex items-center gap-2 p-2 bg-green-50 border border-green-200 rounded text-green-700"
                >
                  <span className="text-green-500">✓</span>
                  <span className="font-medium">{word}</span>
                </div>
              ))}
            </div>
          ) : (
            <p className="text-muted-foreground text-sm">
              No se encontraron palabras
            </p>
          )}
        </div>
        <div>
          <h3 className="text-lg font-medium text-red-600 mb-3 flex items-center gap-2">
            <span className="w-2 h-2 bg-red-500 rounded-full"></span>
            No Encontradas ({notFound.length})
          </h3>
          {notFound.length > 0 ? (
            <div className="space-y-2">
              {notFound.map((word, index) => (
                <div
                  key={index}
                  className="flex items-center gap-2 p-2 bg-red-50 border border-red-200 rounded text-red-700"
                >
                  <span className="text-red-500">✗</span>
                  <span className="font-medium">{word}</span>
                </div>
              ))}
            </div>
          ) : (
            <p className="text-muted-foreground text-sm">
              Todas las palabras fueron encontradas
            </p>
          )}
        </div>
      </div>
      <div className="mt-6 p-4 bg-muted rounded-lg">
        <div className="flex justify-between items-center text-sm">
          <span className="text-muted-foreground">Total de palabras:</span>
          <span className="font-medium">{found.length + notFound.length}</span>
        </div>
        <div className="flex justify-between items-center text-sm mt-1">
          <span className="text-muted-foreground">Porcentaje de éxito:</span>
          <span className="font-medium text-primary">
            {found.length + notFound.length > 0
              ? Math.round(
                  (found.length / (found.length + notFound.length)) * 100
                )
              : 0}
            %
          </span>
        </div>
      </div>
    </div>
  );
};

export default SearchResults;
