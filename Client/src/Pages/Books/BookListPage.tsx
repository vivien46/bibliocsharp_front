import React, { useEffect, useState } from "react";
import { Link } from "react-router-dom";
import { getAllBooks } from "../../Api/books";
import Pagination from "../../Components/Common/Pagination";

const BookListPage: React.FC = () => {
  const [books, setBooks] = useState<any[]>([]);
  const [loading, setLoading] = useState<boolean>(true);
  const [error, setError] = useState<string | null>(null);

  const [currentPage, setCurrentPage] = useState<number>(1);
  const [itemsPerPage, setItemsPerPage] = useState<number>(10);

  useEffect(() => {
      const fetchBooks = async () => {
        try {
          const data = await getAllBooks();
          
           if(data) {
            setBooks(data);
           } else {
            setError("Les données transformées ne sont pas un tableau.");
           }
        } catch (error: any) {
          console.error("Erreur lors de la récupération des données :", error);
          setError("Impossible de charger les données");
        } finally {
          setLoading(false);
        }
      };
      fetchBooks();
    }, []);

    const indexOfLastItem = currentPage * itemsPerPage;
    const indexOfFirstItem = indexOfLastItem - itemsPerPage;
    const currentItems = books.slice(indexOfFirstItem, indexOfLastItem);
  
    if (loading) {
      return <p>Chargement...</p>;
    }
  
    if (error) {
      return <p>{error}</p>;
    }

  return (
    <div className="flex flex-col justify-center">
  <h2 className="text-center font-medium text-2xl mb-5">Liste des livres</h2>

  <div>
    <Link to="/book/add">
      <button className="bg-green-700 hover:bg-green-500 text-white font-bold py-1 px-2 rounded">
        Ajouter un Livre
      </button>
    </Link>
  </div>

  {books.length > 0 ? (
    <div className="overflow-x-auto">
      <table className="border-collapse border-2 border-gray-500 mt-5 w-full table-auto">
        <thead>
          <tr>
            <th className="border-2 border-gray-500 text-center p-2">Titre</th>
            <th className="border-2 border-gray-500 text-center p-2">Auteur</th>
            <th className="border-2 border-gray-500 text-center p-2">Editeur</th>
            <th className="border-2 border-gray-500 text-center p-2">Année</th>
            <th className="border-2 border-gray-500 text-center p-2">ISBN</th>
            <th className="border-2 border-gray-500 text-center p-2 mx-auto">Image</th>
            <th className="border-2 border-gray-500 text-center p-2">Actions</th>
          </tr>
        </thead>
        <tbody>
          {currentItems.map((book: any, index: number) => (
            <tr key={index} className="border-b">
              <td className="border-2 border-gray-500 text-center p-2 text-sm md:text-base">{book.titre}</td>
              <td className="border-2 border-gray-500 text-center p-2 text-sm md:text-base">{book.auteur}</td>
              <td className="border-2 border-gray-500 text-center p-2 text-sm md:text-base">{book.editeur}</td>
              <td className="border-2 border-gray-500 text-center p-2 text-sm md:text-base">{book.annee}</td>
              <td className="border-2 border-gray-500 text-center p-2 text-sm md:text-base">{book.isbn}</td>
              <td className="border-2 border-gray-500 text-center p-2">
                {book.imageUrl ? (
                  <div className="flex flex-row justify-center m-auto">
                    <img
                      src={`${import.meta.env.VITE_API_BASE_URL}/book/image/${book.imageUrl}`}
                      alt={book.imageUrl}
                      className="h-30 w-20 max-w-[90px] p-1 md:text-xs"
                      loading="lazy"
                    />
                  </div>
                ) : (
                  <p>Pas d'image</p>
                )}
              </td>
              <td className="border-2 border-gray-500 text-center p-2">
                <Link to={`/book/${book.id}`}>
                  <button className="bg-blue-700 hover:bg-blue-500 text-white font-bold py-1 px-2 rounded">
                    Détails
                  </button>
                </Link>
              </td>
            </tr>
          ))}
        </tbody>
      </table>
      <Pagination
        totalItems={books.length}
        itemsPerPage={itemsPerPage}
        currentPage={currentPage}
        onPageChange={setCurrentPage}
        onItemsPerPageChange={setItemsPerPage}
      />
    </div>
  ) : (
    <p>Aucun livre trouvé</p>
  )}
</div>
  );
};

export default BookListPage;