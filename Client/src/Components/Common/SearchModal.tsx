// SearchModal.tsx
import React, { useState, useEffect, useRef } from "react";
import { useNavigate } from "react-router-dom";
import API_URL from "../../Api/apiConfig";
import Input from "./Input";
import Form from "./Form";
import { FaTimes } from "react-icons/fa";
import Button from "./Button";

interface Book {
  id: number;
  titre: string;
  auteur: string;
  editeur?: string;
}

interface SearchModalProps {
  isOpen: boolean;
  onClose: () => void;
}

const SearchModal: React.FC<SearchModalProps> = ({ isOpen, onClose }) => {
  const [query, setQuery] = useState("");
  const [results, setResults] = useState<Book[]>([]);
  const navigate = useNavigate();
  const inputRef = useRef<HTMLInputElement>(null);

  useEffect(() => {
    if (isOpen) {
      setQuery("");
      setResults([]);

      setTimeout(() => {
        inputRef.current?.focus();
      }, 50);
    }
  }, [isOpen]);

  useEffect(() => {
    if (!isOpen) return;

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
        if (data && data.values && data.values.$values) {
          const transformedData: Book[] = data.values.$values.map((book: any) => ({
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
        console.error("Erreur de recherche : ", error.message);
        setResults([]);
      }
    };

    const debounce = setTimeout(fetchResults, 300);
    return () => clearTimeout(debounce);
  }, [query, isOpen]);

  const handleInputChange = (e: React.ChangeEvent<HTMLInputElement>) => {
    setQuery(e.target.value);
  };

  const handleBookClick = (id: number) => {
    navigate(`/book/${id}`);
    onClose();
  };

  return (
    isOpen && (
      <div
        className={`fixed inset-0 z-50 flex items-center justify-center bg-black bg-opacity-50 transition-opacity duration-300 ${isOpen ? "opacity-100" : "opacity-0 pointer-events-none"}`}
      >
        <div
          className={`bg-white w-full max-w-lg mx-auto p-6 rounded-md shadow-lg relative transition-transform duration-300 transform ${isOpen ? "scale-100" : "scale-95"}`}
        >
          <Button
            type="button"
            variant="secondary"
            onClick={onClose}
            className="absolute top-2 right-2 w-8 h-8 flex items-center justify-center"
            aria-label="Fermer la recherche"
          >
            <FaTimes className="text-black w-6 h-6" />
          </Button>



          <h2 className="text-lg font-semibold mb-4">Rechercher un livre</h2>
          <Form onSubmit={(e) => e.preventDefault()}>
            <Input
              id="search-bar"
              name="search"
              label=""
              type="search"
              value={query}
              onChange={handleInputChange}
              placeholder="Rechercher par titre, auteur, éditeur..."
              className="w-full p-2 border border-gray-300 rounded focus:ring focus:ring-blue-500"
            />
            <Button
              type="submit"
              className="absolute top-1 right-2 text-gray-500 hover:text-gray-700"
            >
            </Button>
          </Form>

          <div className="mt-4 max-h-64 overflow-y-auto">
            {results.length > 0 ? (
              results.map((book) => (
                <div
                  key={book.id}
                  className="p-2 border-b border-gray-300 hover:bg-gray-100 cursor-pointer"
                  onClick={() => handleBookClick(book.id)}
                >
                  <p className="text-sm font-medium">{book.titre}</p>
                  <p className="text-xs text-gray-500">{book.auteur}</p>
                  {book.editeur && (
                    <p className="text-xs text-gray-500">{book.editeur}</p>
                  )}
                </div>
              ))
            ) : (
              query.length >= 2 && (
                <p className="text-sm text-gray-500">Aucun résultat...</p>
              )
            )}
          </div>
        </div>
      </div>
    )
  );
};

export default SearchModal;
