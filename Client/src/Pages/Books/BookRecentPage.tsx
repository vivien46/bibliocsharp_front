import React from 'react';
import BooksRecent from '../../Components/Books/BooksRecent';
import { Link } from 'react-router-dom';

const BookRecentPage: React.FC = () => {
    return (
        <div className="container mx-auto px-4 py-8">
            <div className="flex justify-between items-center">
                <h1 className="text-3xl font-bold text-gray-800 mb-6">Livres Récents</h1>
                <p className="text-lg text-gray-600 mb-4">
                    Découvre les derniers livres ajoutés à notre collection.
                    Cliquez sur un livre pour en savoir plus.
                </p>
            </div>

            <BooksRecent showTitle={false} showButton={false} />

            <div className="mt-8 text-center">
                <Link to="/" className="bg-blue-500 text-white px-4 py-2 rounded hover:bg-blue-600 transition duration-300">
                    retour à la l'accueil
                </Link>
            </div>
        </div>
    );
}

export default BookRecentPage;