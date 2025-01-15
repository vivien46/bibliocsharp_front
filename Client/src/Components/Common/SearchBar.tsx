import React, { useState, useEffect } from 'react';
import API_URL from '../../Api/ApiConfig';
import Input from './Input';
import Form from './Form';

interface Book {
  id: number;
  titre: string;
  auteur: string;
  editeur?: string;
}

interface SearchBarProps {
  placeholder?: string;
  onSearchSubmit?: (query: string) => void;
}

const SearchBar: React.FC<SearchBarProps> = ({ placeholder = "Rechercher un livre par titre, auteur, éditeur...", onSearchSubmit }) => {
  const [query, setQuery] = useState('');
  const [results, setResults] = useState<Book[]>([]);

  useEffect(() => {
    const fetchResults = async () => {
      if (query.length < 2) {
        setResults([]);
        return;
      }

      try {
        const response = await fetch(`${API_URL}/book/search?q=${encodeURIComponent(query)}`);
        if (!response.ok) {
          throw new Error(`Erreur lors de la recherche : ${response.status} ${response.statusText}`);
        }

        const data = await response.json();

        if (data && data.$values) {
          const transformedData: Book[] = data.$values.map((book: any) => ({
            id: book.id,
            titre: book.titre,
            auteur: book.auteur,
            editeur: book.editeur,
          }));
          setResults(transformedData);
        } else {
          setResults([]);
        }
      } catch (error: any) {
        console.error('Erreur de recherche : ', error.message);
        setResults([]);
      }
    };

    const debounce = setTimeout(fetchResults, 300);
    return () => clearTimeout(debounce);
  }, [query]);

  const handleInputChange = (event: React.ChangeEvent<HTMLInputElement>) => {
    setQuery(event.target.value);
  };

  const handleFormSubmit = (event: React.FormEvent<HTMLFormElement>) => {
    event.preventDefault();
    if (onSearchSubmit) {
      onSearchSubmit(query);
    }
  };

  return (
    <div className="relative">
      <Form onSubmit={handleFormSubmit} className="mb-4">
        <Input
          id="search-bar"
          name="search"
          label="Rechercher un livre"
          type="search"
          value={query}
          onChange={handleInputChange}
          placeholder={placeholder}
          className="w-full p-2 border border-gray-300 rounded focus:ring focus:ring-blue-500"
        />
      </Form>
      {results.length > 0 && (
        <div className="absolute w-full bg-white border border-gray-300 rounded mt-2 z-10"> {/* Ajout de z-10 pour l'ordre d'affichage */}
          {results.map((result) => (
            <div key={result.id} className="p-2 border-b border-gray-300 hover:bg-gray-100 cursor-pointer"> {/* Style au hover et curseur */}
              <p className="text-sm font-medium">{result.titre}</p>
              <p className="text-xs text-gray-500">{result.auteur}</p>
              {result.editeur && <p className="text-xs text-gray-500">{result.editeur}</p>}
            </div>
          ))}
        </div>
      )}
    </div>
  );
};

export default SearchBar;