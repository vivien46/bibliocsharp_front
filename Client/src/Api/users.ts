import API_URL from "./apiConfig";

export const usersApi = async () => {
    const res = await fetch(`${API_URL}/user`, {
        method: 'GET',
        credentials: 'include',
        headers: {
            'Content-Type': 'application/json',
            'Accept': 'application/json',
        }
    });

    if (!res.ok) {
        throw new Error("Impossible de charger les données");
    }
    const data = await res.json();

    if (data.$values && Array.isArray(data.$values)) {
        const transformedData = data.$values.map((user: any) => ({
            id: user.id,
            username: user.username,
            email: user.email,
            role: user.role
        }));

        return transformedData;
    } else {
        // throw new Error("Les données transformées ne sont pas un tableau");
        return data
    }

}

export const getUserById = async (id: number) => {
    const res = await fetch(`${API_URL}/user/${id}`, {
        method: 'GET',
        credentials: 'include',
        headers: {
            'Content-Type': 'application/json',
            'Accept': 'application/json',
        }
    });

    if (!res.ok) {
        throw new Error("Impossible de charger les données");
    }
    const data = await res.json();

        const transformedData = {
            id: data.id,
            username: data.username,
            email: data.email,
            role: data.role
        };

        return transformedData;
    
}

export const updateUser = async (id: number, updatedUser: any) => {
    const res = await fetch(`${API_URL}/user/edit/${id}`, {
        method: 'PUT',
        credentials: 'include',
        headers: {
            'Content-Type': 'application/json',
            'Accept': 'application/json',
        },
        body: JSON.stringify(updatedUser)
    });

    if (!res.ok) {
        throw new Error("Impossible de mettre à jour l'utilisateur");
    }

    // Attendre que le corps de la réponse soit parsé en JSON
    const user = await res.json();

    return user;
}