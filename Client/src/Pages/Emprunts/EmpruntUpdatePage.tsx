import React, { useState, useEffect } from 'react';
import { useNavigate, useParams } from 'react-router-dom';
import { getEmpruntById, updateEmprunt } from '../../Api/emprunts';
import Form from '../../Components/Common/Form';
import Input from '../../Components/Common/Input';
import Button from '../../Components/Common/Button';

interface EmpruntUpdateData {
  id: number;
  dateEmprunt: string;
  dateRetour: string;
  livre: {
    titre: string;
    imageUrl: string;
  };
  user: {
    username: string;
  };
}

const EmpruntUpdatePage: React.FC = () => {
  const { id } = useParams<{ id: string }>();
  const navigate = useNavigate();
  
  const [emprunt, setEmprunt] = useState<EmpruntUpdateData>({
    id: 0,
    dateEmprunt: '',
    dateRetour: '',
    livre: { titre: '', imageUrl: '' },
    user: { username: '' }
  });  

  useEffect(() => {
    const fetchData = async () => {
      try {
        const empruntToUpdate = await getEmpruntById(Number(id));
        if (empruntToUpdate) {
          const formattedData = {
            ...empruntToUpdate,
            dateEmprunt: new Date(empruntToUpdate.dateEmprunt).toISOString().split('T')[0],
            dateRetour: new Date(empruntToUpdate.dateRetour).toISOString().split('T')[0],
          };

          setEmprunt(formattedData);
        } else {
          console.error('Emprunt non trouvé');
        }
      } catch (error) {
        console.error('Impossible de charger les données :', error);
      }
    };
    fetchData();
  }, [id]);

  const handleChange = (e: React.ChangeEvent<HTMLInputElement>) => {
   
    const { name, value } = e.target;
    setEmprunt((prevEmprunt) => ({ ...prevEmprunt, [name]: value }));
  };

  const handleNestedChange = (e: React.ChangeEvent<HTMLInputElement>, field: 'livre' | 'user') => {
    const { name, value } = e.target;
    setEmprunt((prevEmprunt) => ({
      ...prevEmprunt,
      [field]: {
        ...prevEmprunt[field],
        [name]: value,
      },
    }));
    
  }

  const formatDateToDDMMYYYY = (date: string) => {
    const [year, month, day] = date.split('-');
    return `${day}/${month}/${year}`;
  }

  const handleSubmit = async (e: React.FormEvent<HTMLFormElement>) => {
    e.preventDefault();
    try {
      const updatedEmprunt = {
        ...emprunt,
        dateEmprunt: formatDateToDDMMYYYY(emprunt.dateEmprunt),
        dateRetour: formatDateToDDMMYYYY(emprunt.dateRetour),
      };

      await updateEmprunt(Number(id), updatedEmprunt);

      alert('Emprunt mis à jour avec succès');
      navigate(`/emprunt/${id}`);
    } catch (error) {
      console.error('Erreur lors de la mise à jour :', error);
      alert('Erreur lors de la mise à jour');
    }
  };

  return (
    <div>
      <h1>Modifier l'emprunt N°{emprunt.id}</h1>
      <Form onSubmit={handleSubmit}>
        <Input
          id="dateEmprunt"
          type="date"
          name="dateEmprunt"
          value={emprunt.dateEmprunt}
          onChange={handleChange}
          label="Date d'emprunt"
          required
        />
        <Input
          id="dateRetour"
          type="date"
          name="dateRetour"
          value={emprunt.dateRetour}
          onChange={handleChange}
          label="Date de retour"
          required
        />
        <Input
          id="titre"
          type="text"
          name="titre"
          value={emprunt.livre.titre || ''}
          onChange={(e) => handleNestedChange(e, 'livre')}
          label="Titre du livre"
          required
        />
        <Input
          id="username"
          type="text"
          name="username"
          value={emprunt.user.username || ''}
          onChange={(e) => handleNestedChange(e, 'user')}
          label="nom de l'emprunteur"
          required
        />
        <Button type="submit">Mettre à jour l'emprunt</Button>
      </Form>
    </div>
  );
};

export default EmpruntUpdatePage;