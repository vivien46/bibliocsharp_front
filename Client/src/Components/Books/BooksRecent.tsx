import React, { useEffect, useState } from 'react';
import { Link } from 'react-router-dom';
import API_URL from '../../Api/apiConfig';
import Pagination from '../Common/Pagination';

// Interface pour décrire un livre
interface Book {
    id: number;
    titre: string;
    auteur: string;
    imageUrl?: string;
    dateAjout: string;
    editeur?: string;
    annee?: number;
}

// Interface pour les props du composant BooksRecent
interface BooksRecentProps {
    showTitle?: boolean; // Pour décider si le titre de section est affiché
    showButton?: boolean; // Pour décider si le bouton "Voir tous" est affiché
}

// Composant BooksRecent
const BooksRecent: React.FC<BooksRecentProps> = ({ showTitle = true, showButton = true }) => {
    const [recentBooks, setRecentBooks] = useState<Book[]>([]);
    const [loading, setLoading] = useState<boolean>(true);
    const [error, setError] = useState<string | null>(null);
    const [currentPage, setCurrentPage] = useState<number>(1);
    const [itemsPerPage, setItemsPerPage] = useState<number>(5);
    const [totalItems, setTotalItems] = useState<number>(0);

    useEffect(() => {
        const fetchRecentBooks = async () => {

            setLoading(true);
            try {
                const response = await fetch(`${API_URL}/book/recent?pageNumber=${currentPage}&pageSize=${itemsPerPage}`);

                if (!response.ok) {
                    const errorText = await response.text();
                    throw new Error(`Erreur HTTPS : ${response.status} - ${errorText}`);
                }
                const data = await response.json();

                if (data.books && data.books.$values && Array.isArray(data.books.$values)) {

                // Transformation des données pour correspondre à l'interface Book
                const transformedData = data.books.$values.map((book: any) => ({
                    id: book.id,
                    titre: book.titre,
                    auteur: book.auteur,
                    imageUrl: book.imageUrl ? `${API_URL}/book/image/${book.imageUrl}` : "",
                    dateAjout: book.dateAjout,
                    editeur: book.editeur,
                    annee: book.annee,
                }));

                setRecentBooks(transformedData);
                setTotalItems(data.totalItems);
                setCurrentPage(data.pageNumber);
                setItemsPerPage(data.pageSize);
                } else {
                    throw new Error('Erreur lors de la récupération des livres récents');
                }

            } catch (error: any) {
                console.error("Erreur attrapée : ", error);
                setError(error.message || 'Une erreur inconnue est survenue');
            } finally {
                setLoading(false);
            }
        };

        fetchRecentBooks();
    }, [currentPage, itemsPerPage]);

    if (loading) {
        return <p className="text-center text-gray-700">Chargement des livres récents...</p>;
    }

    if (error) {
        return <p className="text-center text-red-600">{error}</p>;
    }

    return (
        <div className="container mx-auto px-4 py-8">
            {showTitle && (
                <h2 className="text-2xl font-bold text-gray-800 mb-6 text-center">Livres récents</h2>
            )}
            <div className="grid grid-cols-1 sm:grid-cols-2 md:grid-cols-3 lg:grid-cols-4 gap-4">
                {recentBooks.map((book) => (
                    <div key={book.id} className="bg-white shadow-md rounded p-4 flex flex-col items-center">
                        <div className="w-full h-48 bg-gray-200 flex justify-center items-center">
                            {book.imageUrl ? (
                                <img
                                    src={book.imageUrl}
                                    alt={book.titre}
                                    className="h-full w-full object-cover"
                                    loading='lazy'
                                />
                            ) : (
                                <p className="text-center text-gray-700">Pas d'image</p>
                            )}
                        </div>
                        <h3 className="text-lg font-semibold mt-2">{book.titre}</h3>
                        <p className="text-gray-700">{book.auteur}</p>
                        {book.editeur && (
                            <p className="text-sm text-gray-500">
                                Éditeur : {book.editeur} ({book.annee || 'Année inconnue'})
                            </p>
                        )}
                        <p className="text-sm text-gray-500 mt-1">
                            Ajouté le : {new Date(book.dateAjout).toLocaleDateString('fr-FR')}
                        </p>
                        <Link
                            to={`/book/${book.id}`}
                            className="mt-4 bg-blue-500 text-white px-4 py-2 rounded hover:bg-blue-600"
                        >
                            Voir le livre
                        </Link>
                    </div>
                ))}
            </div>
            <Pagination totalItems={totalItems} itemsPerPage={itemsPerPage} currentPage={currentPage} onPageChange={setCurrentPage} onItemsPerPageChange={setItemsPerPage} />
            {showButton && (
                <div className="text-center mt-6">
                    <Link
                        to="/book/recent"
                        className="bg-green-500 text-white px-4 py-2 rounded hover:bg-green-600"
                    >
                        Voir tous les livres récents
                    </Link>
                </div>
            )}
        </div>
    );
};

export default BooksRecent;
