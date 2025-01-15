import React, { useState, useEffect } from "react";
import { useNavigate, useParams } from "react-router-dom";
import { getUserById } from "../../Api/users";
import { useAuth } from "../../Contexts/AuthContext";
import API_URL from "../../Api/apiConfig";
import Input from "../../Components/Common/Input";
import Button from "../../Components/Common/Button";
import Select from "../../Components/Common/Select";

interface UserUpdateData {
    username: string;
    passwordHash?: string;
    email: string;
    role: number;
    emprunts?: any[];
}

const UserEditPage: React.FC = () => {
    const { id } = useParams<{ id: string }>();
    const navigate = useNavigate();
    const { userRole } = useAuth(); // Récupération du rôle connecté
    const [user, setUser] = useState<UserUpdateData>({
        username: "",
        passwordHash: "",
        email: "",
        role: 0,
        emprunts: [],
    });
    const [loading, setLoading] = useState<boolean>(true);
    const [error, setError] = useState<string | null>(null);

    useEffect(() => {
        const fetchData = async () => {
            try {
                const userToUpdate = await getUserById(Number(id));
                if (userToUpdate) {
                    setUser({
                        ...userToUpdate,
                        username: userToUpdate.username,
                        email: userToUpdate.email,
                        role: userToUpdate.role,
                    });
                    setLoading(false);
                } else {
                    setError("Utilisateur non trouvé");
                }
            } catch (error: any) {
                setError("Impossible de charger les données : " + error.message);
                setLoading(false);
            }
        };
        fetchData();
    }, [id]);

    const handleChanges = (e: React.ChangeEvent<HTMLInputElement | HTMLSelectElement>) => {
        const { name, value } = e.target;
        setUser((prevState) => ({
            ...prevState,
            [name]: name === "role" ? Number(value) : value,
        }));
    };

    const handleSubmit = async (e: React.FormEvent<HTMLFormElement>) => {
        e.preventDefault();
        try {
            const { passwordHash, emprunts, ...userWithoutPassword } = user;
            const formData = new FormData();
            formData.append("username", userWithoutPassword.username);
            formData.append("email", userWithoutPassword.email);

            // Inclure le rôle uniquement si connecté en tant qu'admin
            if (userRole === "Admin") {
                formData.append("role", userWithoutPassword.role.toString());
            }

            const response = await fetch(`${API_URL}/user/edit/${id}`, {
                method: "PUT",
                body: formData,
            });

            if (!response.ok) {
                const errorText = await response.text();
                throw new Error(
                    `Erreur lors de la mise à jour de l'utilisateur. Statut: ${response.status}, Message: ${errorText}`
                );
            }

            alert("L'utilisateur a été mis à jour avec succès");
            navigate(`/user/${id}`);
        } catch (error: any) {
            setError(
                "Erreur lors de la mise à jour de l'utilisateur : " +
                error.message
            );
            alert(error.message);
        }
    };

    const handlePasswordChange = () => {
        navigate(`/user/change-password/${id}`);
    };

    if (loading) {
        return <p className="text-center text-gray-700">Chargement...</p>;
    }

    if (error) {
        return (
            <p className="text-center text-red-500">
                Une erreur s'est produite : {error}
            </p>
        );
    }

    return (
        <div className="flex justify-center items-center min-h-screen bg-gray-100">
            <div className="bg-white shadow-md rounded p-6 w-full max-w-md">
                <h1 className="text-2xl font-bold text-gray-800 mb-6 text-center">
                    Modifier l'utilisateur
                </h1>
                <form onSubmit={handleSubmit} className="space-y-4">
                    <Input
                        type="text"
                        id="username"
                        name="username"
                        label="Nom d'utilisateur"
                        value={user.username}
                        onChange={handleChanges}
                        placeholder="Entrez le nom d'utilisateur"
                        className="text-center"
                        required
                    />
                    <Input
                        type="email"
                        id="email"
                        name="email"
                        label="Adresse e-mail"
                        value={user.email}
                        onChange={handleChanges}
                        placeholder="Entrez l'adresse e-mail"
                        className="text-center"
                        required
                    />
                    {userRole === "Admin" && (
                        <Select
                            id="role"
                            name="role"
                            label="Rôle"
                            value={user.role}
                            onChange={handleChanges}
                            options={[
                                { value: 1, label: "Admin" },
                                { value: 0, label: "User" },
                            ]}
                            className="text-center"
                        />
                    )}
                    <Button
                        type="submit"
                        className="bg-green-500 text-white px-4 py-2 rounded hover:bg-blue-600 w-full"
                    >
                        Mettre à jour
                    </Button>
                </form>
                <div className="mt-6 text-center">
                    <Button
                        type="button"
                        className="bg-violet-500 text-white px-4 py-2 rounded hover:bg-gray-600"
                        onClick={handlePasswordChange}
                    >
                        Changer le mot de passe
                    </Button>
                </div>
            </div>
        </div>
    );
};

export default UserEditPage;
