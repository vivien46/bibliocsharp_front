import API_URL from "./apiConfig";

export const empruntsApi = async () => {
    const res = await fetch(`${API_URL}/emprunt`);

    if (!res.ok) {
        throw new Error("Impossible de charger les données");
    }
    const data = await res.json();
    return data;
}

export const getEmpruntById = async (id: number) => {
    const res = await fetch(`${API_URL}/emprunt/${id}`);

    if (!res.ok) {
        throw new Error("Impossible de charger les données");
    }
    const data = await res.json();
    console.log('Données brutes reçues de l\'API Emprunt :', data);

    const transformedData = {
        id: data.id,
        dateEmprunt: data.dateEmprunt,
        dateRetour: data.dateRetour,
        livre: data.livre,
        user: data.user
        }
        return transformedData;
    };

export const updateEmprunt = async (id: number, updatedEmprunt: any) => {
    const formData = new FormData();
    formData.append("dateEmprunt", updatedEmprunt.dateEmprunt);
    formData.append("dateRetour", updatedEmprunt.dateRetour);
    formData.append("livreId", updatedEmprunt.livreId.toString());
    formData.append("userId", updatedEmprunt.userId.toString());

    const res = await fetch(`${API_URL}/emprunt/edit/${id}`, {
        method: 'PUT',
        body: formData
    });

    if (!res.ok) {
        throw new Error("Impossible de mettre à jour l'emprunt");
    }

    const data = await res.json();
    return data;
};

export const deleteEmprunt = async (id: number) => {
    try {
    const res = await fetch(`${API_URL}/emprunt/${id}`, {
        method: 'DELETE'
    });

    if (!res.ok) {
        throw new Error("Impossible de supprimer l'emprunt");
    }

    alert('Emprunt supprimé avec succès');
    return res;
    } catch (error) {
        console.error('Erreur lors de la suppression :', error);
        alert('Erreur lors de la suppression');
    }
};