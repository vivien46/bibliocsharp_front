import React, { useState, useRef, useEffect } from 'react';
import { Link } from 'react-router-dom';
import { useAuth } from '../../Contexts/AuthContext';
import { FaBook, FaUsers, FaBookOpen, FaHome, FaChevronDown, FaSearch } from 'react-icons/fa';
import SearchModal from '../Common/SearchModal';
import Input from '../Common/Input';

interface LayoutProps {
  children: React.ReactNode;
}

const Layout: React.FC<LayoutProps> = ({ children }) => {
  const { isUserLoggedIn, username, userRole, checkUserLoggedIn } = useAuth();
  const [isUserDropdownOpen, setIsUserDropdownOpen] = useState(false);
  const [isBookDropdownOpen, setIsBookDropdownOpen] = useState(false);
  const [isEmpruntDropdownOpen, setIsEmpruntDropdownOpen] = useState(false);
  const [isProfileDropdownOpen, setIsProfileDropdownOpen] = useState(false);
  const [isSearchModalOpen, setIsSearchModalOpen] = useState(false);
  const [searchQuery, setSearchQuery] = useState('');

  const currentYear = new Date().getFullYear();
  const releaseYear = 2024;

  const openSearchModal = () => setIsSearchModalOpen(true);
  const closeSearchModal = () => setIsSearchModalOpen(false);

  // Création de refs distincts pour chaque dropdown
  const usersDropdownRef = useRef<HTMLDivElement>(null);
  const booksDropdownRef = useRef<HTMLDivElement>(null);
  const empruntDropdownRef = useRef<HTMLDivElement>(null);
  const profileDropdownRef = useRef<HTMLDivElement>(null);

  const isAdmin = isUserLoggedIn && userRole === 'Admin';

  useEffect(() => {
    checkUserLoggedIn();

    const handleClickOutside = (event: MouseEvent) => {
      if (
        usersDropdownRef.current && !usersDropdownRef.current.contains(event.target as Node)
      ) {
        setIsUserDropdownOpen(false);
      }
      if (
        booksDropdownRef.current && !booksDropdownRef.current.contains(event.target as Node)
      ) {
        setIsBookDropdownOpen(false);
      }
      if (
        empruntDropdownRef.current && !empruntDropdownRef.current.contains(event.target as Node)
      ) {
        setIsEmpruntDropdownOpen(false);
      }
      if (
        profileDropdownRef.current && !profileDropdownRef.current.contains(event.target as Node)
      ) {
        setIsProfileDropdownOpen(false);
      }
    };

    document.addEventListener('mousedown', handleClickOutside);
    return () => document.removeEventListener('mousedown', handleClickOutside);
  }, [checkUserLoggedIn]);

  return (
    <div className="min-h-screen flex flex-col">
      {/* === NAVIGATION === */}
      <nav className="bg-indigo-600 text-white shadow-lg">
        <div className="max-w-7xl mx-auto px-4">
          <div className="flex items-center justify-between h-16">
            <div className="flex items-center space-x-8">
              <Link to="/" className="flex items-center space-x-2 hover:text-indigo-200">
                <FaHome size={20} />
                <span>Accueil</span>
              </Link>

              {/* Utilisateurs (Admin) */}
              {isAdmin && (
                <div ref={usersDropdownRef} className="relative">
                  <button onClick={() => setIsUserDropdownOpen(!isUserDropdownOpen)} className="flex items-center space-x-2 hover:text-indigo-200">
                    <FaUsers size={20} />
                    <span>Utilisateurs</span>
                    <FaChevronDown size={16} />
                  </button>
                  {isUserDropdownOpen && (
                    <div className="absolute z-10 w-48 rounded-md shadow-lg bg-white mt-2">
                      <Link to="/user" className="block px-4 py-2 text-gray-700 hover:bg-indigo-100">Liste des Utilisateurs</Link>
                      <Link to="/user/add" className="block px-4 py-2 text-gray-700 hover:bg-indigo-100">Ajouter un Utilisateur</Link>
                    </div>
                  )}
                </div>
              )}

              {/* Livres (Admin) */}
              {isAdmin && (
                <div ref={booksDropdownRef} className="relative">
                  <button onClick={() => setIsBookDropdownOpen(!isBookDropdownOpen)} className="flex items-center space-x-2 hover:text-indigo-200">
                    <FaBook size={20} />
                    <span>Livres</span>
                    <FaChevronDown size={16} />
                  </button>
                  {isBookDropdownOpen && (
                    <div className="absolute z-10 w-48 rounded-md shadow-lg bg-white mt-2">
                      <Link to="/book" className="block px-4 py-2 text-gray-700 hover:bg-indigo-100">Liste des Livres</Link>
                      <Link to="/book/add" className="block px-4 py-2 text-gray-700 hover:bg-indigo-100">Ajouter un Livre</Link>
                    </div>
                  )}
                </div>
              )}

              {/* Emprunts */}
              {isUserLoggedIn && (
                <div ref={empruntDropdownRef} className="relative">
                  <button onClick={() => setIsEmpruntDropdownOpen(!isEmpruntDropdownOpen)} className="flex items-center space-x-2 hover:text-indigo-200">
                    <FaBookOpen size={20} />
                    <span>Emprunts</span>
                    <FaChevronDown size={16} />
                  </button>
                  {isEmpruntDropdownOpen && (
                    <div className="absolute z-10 w-48 rounded-md shadow-lg bg-white mt-2">
                      <Link to="/emprunt" className="block px-4 py-2 text-gray-700 hover:bg-indigo-100">Liste des Emprunts</Link>
                      {isAdmin && (
                        <Link to="/emprunt/add" className="block px-4 py-2 text-gray-700 hover:bg-indigo-100">Ajouter un Emprunt</Link>
                      )}
                    </div>
                  )}
                </div>
              )}
            </div>

            {/* Barre de recherche */}
            <div className="flex-1 max-w-lg mx-8 relative">
              <div className="absolute inset-y-0 left-0 flex items-center pl-3 pointer-events-none">
                <FaSearch size={18} className="text-indigo-300" />
              </div>
              <Input
                id="search"
                name="search"
                type="text"
                label=""
                value={searchQuery}
                onChange={(e) => setSearchQuery(e.target.value)}
                onFocus={openSearchModal}
                className="block w-full pl-10 pr-3 py-2 border border-transparent rounded-md leading-5 bg-indigo-500 text-white placeholder-indigo-300 focus:outline-none focus:bg-white focus:text-gray-900 focus:placeholder-gray-400 focus:ring-0 sm:text-sm cursor-pointer"
                placeholder="Rechercher des livres..."
              />
            </div>

            {/* Partie Droite : Profil et Déconnexion */}
            <div className="relative">
              {isUserLoggedIn ? (
                <div ref={profileDropdownRef} className="relative">
                  <button
                    onClick={() => setIsProfileDropdownOpen(!isProfileDropdownOpen)}
                    className="flex items-center space-x-2 hover:text-indigo-200"
                  >
                    <span>{username}</span>
                    <FaChevronDown size={16} />
                  </button>
                  {isProfileDropdownOpen && (
                    <div className="absolute right-0 mt-2 w-48 rounded-md shadow-lg bg-white border border-gray-200">
                      <Link to="/profile" className="block px-4 py-2 text-gray-700 hover:bg-indigo-100">Profil</Link>
                      <Link to="/logout" className="block px-4 py-2 text-gray-700 hover:bg-indigo-100">Déconnexion</Link>
                    </div>
                  )}
                </div>
              ) : (
                <>
                  <Link to="/login" className="hover:text-indigo-200">Connexion</Link>
                  <Link to="/register" className="ml-4 hover:text-indigo-200">Inscription</Link>
                </>
              )}
            </div>
          </div>
        </div>
      </nav>

      {/* Modale de Recherche */}
      <SearchModal isOpen={isSearchModalOpen} onClose={closeSearchModal} />

      <main className="flex-grow container mx-auto px-4 py-8">{children}</main>

      <footer className="bg-gray-800 text-white py-4 text-center">
        © {releaseYear} - {currentYear} - Tous droits réservés.
      </footer>
    </div>
  );
};

export default Layout;