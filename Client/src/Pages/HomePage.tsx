import React, { useEffect, useState } from "react";
import { Link } from "react-router-dom";
import { useAuth } from "../Contexts/AuthContext";
import BooksRecent from "../Components/Books/BooksRecent";
import Carousel from "../Components/Common/Carousel";
import API_URL from "../Api/apiConfig";

const HomePage: React.FC = () => {
    const { isUserLoggedIn, username, checkUserLoggedIn } = useAuth();
    const [recommendedBooks, setRecommendedBooks] = useState<any[]>([]);
    const [loading, setLoading] = useState<boolean>(true);
    const [error, setError] = useState<string | null>(null);

    useEffect(() => {
        checkUserLoggedIn();

        const fetchRecommendedBooks = async () => {
            try {
                // récupérer les données des livres recommandés
                const response = await fetch(`${API_URL}/book/recommended`, {
                    method: "GET",
                    headers: {
                        "Content-Type": "application/json",
                    },
                });
                if (!response.ok) {
                    throw new Error("Une erreur est survenue lors de la récupération des livres recommandés.");
                }

                const data = await response.json();

                // Vérification du tableau de données statiques
                if (data && data.values && data.values.$values && Array.isArray(data.values.$values)) {

                    const processedData = data.values.$values.map((book: any) => ({
                        id: book.id,
                        titre: book.titre,
                        imageUrl: book.imageUrl ? `${API_URL}/book/image/${book.imageUrl}` : "/default-image.jpg",

                    }));
                    // Affecter les données statiques
                    setRecommendedBooks(processedData);
                } else {
                    // Gérer l'erreur
                    setError("Les données reçues ne sont pas valides.");
                }

            } catch (err: any) {
                // Gérer l'erreur
                setError(err.message || "Une erreur est survenue lors de la récupération des livres.");
            } finally {
                // Arrêter l'état de chargement
                setLoading(false);
            }
        };

        fetchRecommendedBooks();
    }, [checkUserLoggedIn]);

    return (
        <div className="container mx-auto px-4 py-8">
            {isUserLoggedIn ? (
                <div className="text-center mb-12">
                    <h2 className="text-3xl font-bold text-gray-800">
                        Bienvenue, <span className="text-blue-500">{username}</span> !
                    </h2>
                    <p className="text-gray-600">
                        Accédez à vos options via le menu de navigation.
                    </p>
                </div>
            ) : (
                <div className="text-center mb-12">
                    <p className="text-xl text-gray-700 mb-4">
                        Connectez-vous pour profiter de toutes les fonctionnalités.
                    </p>
                    <Link
                        to="/user/register"
                        className="bg-blue-500 text-white px-4 py-2 rounded-md shadow hover:bg-blue-600 transition"
                    >
                        Inscription
                    </Link>
                    <span className="mx-4 text-gray-500">ou</span>
                    <Link
                        to="/user/login"
                        className="bg-gray-500 text-white px-4 py-2 rounded-md shadow hover:bg-gray-600 transition"
                    >
                        Connexion
                    </Link>
                </div>
            )}

            {/* Section du carrousel des livres recommandés */}
            <section className="mt-12">
                <h2 className="text-2xl font-bold text-gray-800 mb-4 text-center">Livres recommandés</h2>
                {loading ? (
                    <p className="text-center text-gray-700">Chargement des livres recommandés...</p>
                ) : error ? (
                    <p className="text-center text-red-600">{error}</p>
                ) : (
                    <Carousel items={recommendedBooks} />
                )}
            </section>

            {/* Section des livres récents */}
            <section className="mt-12">
                <BooksRecent showTitle={true} showButton={true} />
            </section>

        </div>
    );
};

export default HomePage;
