import React from 'react';
import { useParams } from 'react-router-dom';
import ChangePasswordForm from '../../Components/Password/ChangePasswordForm';

const ChangePasswordPage: React.FC = () => {
  const { id } = useParams<{ id?: string }>(); // Rendre id optionnel

  return (
    <div>
      <h1>Changer de mot de passe</h1>
      {!id ? (
        <>
          <p>Veuillez entrer votre adresse e-mail pour recevoir un lien de changement de mot de passe.</p>
          <form>
            <div className="flex flex-col mb-4">
              <label htmlFor="email" className="mb-2">Adresse e-mail</label>
              <input
                type="email"
                id="email"
                name="email"
                placeholder="Entrez votre adresse e-mail"
                className="border border-gray-300 rounded px-4 py-2"
              />
            </div>
            <button
              type="submit"
              className="bg-blue-500 text-white px-4 py-2 rounded"
            >
              Envoyer
            </button>
          </form>
        </>
      ) : (
        <ChangePasswordForm />
      )}
    </div>
  );
};

export default ChangePasswordPage;
