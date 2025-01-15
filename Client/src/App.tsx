import React from 'react';
import { BrowserRouter as Router, Route, Routes } from 'react-router-dom';
import PrivateRoute from "./Components/Routes/PrivateRoute";
import Layout from './Components/layout/Layout';
import HomePage from './Pages/HomePage';
import UsersPage from './Pages/Users/UsersPage';
import LoginPage from './Pages/LoginPage';
import LogoutPage from './Pages/LogoutPage';
import ChangePasswordPage from './Pages/Auth/ChangePasswordPage';
import UserRegisterPage from './Pages/Users/UserRegisterPage';
import UserProfilePage from './Pages/Users/UserProfilePage';
import UserEditPage from './Pages/Users/UserEditPage';
import UserDeletePage from './Pages/Users/UserDeletePage';
import BooksPage from './Pages/Books/BooksPage';
import BookAddPage from './Pages/Books/BookAddPage';
import BookDetailPage from './Pages/Books/BookDetailPage';
import BookUpdatePage from './Pages/Books/BookUpdatePage';
import BooksRecentPage from './Pages/Books/BookRecentPage';
import EmpruntAddPage from './Pages/Emprunts/EmpruntAddPage';
import EmpruntListPage from './Pages/Emprunts/EmpruntListPage';
import EmpruntDetailPage from './Pages/Emprunts/EmpruntDetailPage';
import EmpruntUpdatePage from './Pages/Emprunts/EmpruntUpdatePage';
import ContactPage from './Pages/ContactPage';
import AboutPage from './Pages/AboutPage';
import './index.css';

const App: React.FC = () => {
  return (
    <Router>
      <Layout>
        <Routes>
          {/* Routes accessibles à tous */}
          <Route path='/' element={<HomePage />} />
          <Route path='/login' element={<LoginPage />} />
          <Route path='/logout' element={<LogoutPage />} />
          <Route path='/register' element={<UserRegisterPage />} />
          <Route path='/contact' element={<ContactPage />} />
          <Route path='/about' element={<AboutPage />} />

          {/* Routes accessibles aux utilisateurs connectés */}
          <Route path='/user/:id' element={<PrivateRoute><UserProfilePage /></PrivateRoute>} />
          <Route path='/user/edit/:id' element={<PrivateRoute><UserEditPage /></PrivateRoute>} />
          <Route path='/book/recent' element={<PrivateRoute><BooksRecentPage /></PrivateRoute>} />
          <Route path='/user/change-password/:id?' element={<PrivateRoute><ChangePasswordPage /></PrivateRoute>} />


          {/* Routes spécifiques pour les admins */}
          <Route path='/user' element={<PrivateRoute role="Admin"><UsersPage /></PrivateRoute>} />
          <Route path='/user/delete/:id' element={<PrivateRoute role="Admin"><UserDeletePage /></PrivateRoute>} />
          <Route path='/book/add' element={<PrivateRoute role="Admin"><BookAddPage /></PrivateRoute>} />
          <Route path='/book/edit/:id' element={<PrivateRoute role="Admin"><BookUpdatePage /></PrivateRoute>} />
          <Route path='/emprunt' element={<PrivateRoute role="Admin"><EmpruntListPage /></PrivateRoute>} />

          {/* Routes accessibles aux utilisateurs connectés pour les emprunts */}
          <Route path='/emprunt/add' element={<PrivateRoute><EmpruntAddPage /></PrivateRoute>} />
          <Route path='/emprunt/:id' element={<PrivateRoute><EmpruntDetailPage /></PrivateRoute>} />
          <Route path='/emprunt/edit/:id' element={<PrivateRoute><EmpruntUpdatePage /></PrivateRoute>} />
          
          {/* Routes accessibles à tous pour les livres */}
          <Route path='/book' element={<BooksPage />} />
          <Route path='/book/:id' element={<BookDetailPage />} />

          {/* Gestion des erreurs */}
          <Route path='*' element={<h1>La page que vous avez demandée n'existe pas ou a été déplacée</h1>} />
        </Routes>
      </Layout>
    </Router>
  );
};

export default App;
