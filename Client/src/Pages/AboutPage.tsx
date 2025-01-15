import React from 'react';
import { FaBook, FaUsers, FaHandshake, FaUserTie, FaLaptopCode, FaProjectDiagram } from 'react-icons/fa';
import { SiSharp, SiDotnet, SiTypescript, SiReact, SiPostgresql, SiTailwindcss } from 'react-icons/si';

const AboutPage: React.FC = () => {
    return (
        <div className="container mx-auto px-6 py-12">
            {/* Section principale */}
            <div className="flex flex-col-reverse md:flex-row items-center justify-between">

                {/* Texte de présentation */}
                <div className="md:w-1/2 text-center md:text-left space-y-6">
                    <h1 className="text-4xl font-bold text-gray-800">
                        <FaBook className="inline-block mr-2 text-blue-600" />
                        Bienvenue sur <span className="text-blue-600">BiblioCSharp</span>
                    </h1>
                    <p className="text-lg text-gray-600 leading-relaxed">
                        <strong>BiblioCSharp</strong> est une bibliothèque numérique moderne permettant de gérer vos livres, emprunts et utilisateurs de manière intuitive et sécurisée.
                    </p>
                    <p className="text-md text-gray-700 flex items-center gap-2">
                        Ce projet est développé avec les technologies suivantes :
                    </p>

                    {/* Icônes des technologies avec texte à côté */}
                    <div className="flex flex-row gap-4 mt-4">
                        <div className="flex items-center space-x-4">
                            <SiSharp className="text-blue-500 text-4xl" />
                            <span className="text-lg text-gray-700 font-semibold">C#</span>
                        </div>
                        <div className="flex items-center space-x-4">
                            <SiDotnet className="text-purple-600 text-4xl" />
                            <span className="text-lg text-gray-700 font-semibold">ASP.NET Core</span>
                        </div>
                        <div className="flex items-center space-x-4">
                            <SiTypescript className="text-blue-400 text-4xl" />
                            <span className="text-lg text-gray-700 font-semibold">TypeScript</span>
                        </div>
                        <div className="flex items-center space-x-4">
                            <SiReact className="text-blue-300 text-4xl" />
                            <span className="text-lg text-gray-700 font-semibold">React</span>
                        </div>
                        <div className="flex items-center space-x-4">
                            <SiPostgresql className="text-blue-700 text-4xl" />
                            <span className="text-lg text-gray-700 font-semibold">PostgreSQL</span>
                        </div>
                        <div className="flex items-center space-x-4">
                            <SiTailwindcss className="text-blue-400 text-4xl" />
                            <span className="text-lg text-gray-700 font-semibold">Tailwind CSS</span>
                        </div>
                    </div>

                    <p className="text-md text-gray-600 mt-4">
                        Explorez notre collection, gérez vos emprunts et découvrez un système conçu pour faciliter la gestion de vos ressources littéraires.
                    </p>
                </div>

                {/* Image d'illustration */}
                <div className="md:w-1/2 flex justify-center mb-8 md:mb-0">
                    <img
                        src="/assets/Images/about-library.webp"
                        alt="Bibliothèque numérique"
                        className="w-full max-w-md rounded-lg shadow-lg object-cover"
                    />
                </div>
            </div>

            {/* Section Statistiques avec icônes */}
            <div className="mt-12 grid grid-cols-1 md:grid-cols-3 gap-6 text-center">
                <div className="p-6 border rounded-lg shadow-lg bg-blue-100">
                    <FaBook className="text-blue-700 text-4xl mb-2 mx-auto" />
                    <h3 className="text-2xl font-semibold text-blue-700">+1000</h3>
                    <p className="text-gray-700">Livres Disponibles</p>
                </div>
                <div className="p-6 border rounded-lg shadow-lg bg-green-100">
                    <FaUsers className="text-green-700 text-4xl mb-2 mx-auto" />
                    <h3 className="text-2xl font-semibold text-green-700">+500</h3>
                    <p className="text-gray-700">Utilisateurs Inscrits</p>
                </div>
                <div className="p-6 border rounded-lg shadow-lg bg-purple-100">
                    <FaHandshake className="text-purple-700 text-4xl mb-2 mx-auto" />
                    <h3 className="text-2xl font-semibold text-purple-700">+200</h3>
                    <p className="text-gray-700">Emprunts Effectués</p>
                </div>
            </div>

            {/* Section Équipe avec icônes */}
            <div className="mt-12 text-center">
                <h2 className="text-3xl font-bold text-gray-800 mb-6">
                    <FaUsers className="inline-block text-blue-600 mr-2" />
                    Notre Équipe
                </h2>
                <p className="text-gray-600 mb-8">
                    Une équipe de développeurs passionnés dédiée à la création d'une expérience de bibliothèque intuitive et moderne.
                </p>

                <div className="flex flex-wrap justify-center gap-6">
                    {/* Membre 1 */}
                    <div className="w-48 p-4 border rounded-lg shadow-lg bg-white">
                        <FaLaptopCode className="text-blue-500 text-6xl mb-4 mx-auto" />
                        <h3 className="text-lg font-semibold">Alex Dupont</h3>
                        <p className="text-sm text-gray-600">Développeur Backend</p>
                    </div>

                    {/* Membre 2 */}
                    <div className="w-48 p-4 border rounded-lg shadow-lg bg-white">
                        <FaProjectDiagram className="text-green-500 text-6xl mb-4 mx-auto" />
                        <h3 className="text-lg font-semibold">Sophie Martin</h3>
                        <p className="text-sm text-gray-600">Développeuse Frontend</p>
                    </div>

                    {/* Membre 3 */}
                    <div className="w-48 p-4 border rounded-lg shadow-lg bg-white">
                        <FaUserTie className="text-purple-500 text-6xl mb-4 mx-auto" />
                        <h3 className="text-lg font-semibold">Jean-Pierre Dupuis</h3>
                        <p className="text-sm text-gray-600">Chef de Projet</p>
                    </div>
                </div>
            </div>
        </div>
    );
};

export default AboutPage;
