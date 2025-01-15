import React, {useState} from 'react';
import Form from '../Components/Common/Form';
import Input from '../Components/Common/Input';
import Textarea from '../Components/Common/Textarea';
import Button from '../Components/Common/Button';
import API_URL from '../Api/apiConfig';

const ContactPage: React.FC = () => {
    const [name, setName] = useState("");
    const [email, setEmail] = useState("");
    const [message, setMessage] = useState("");
    const [error, setError] = useState("");
    const [status, setStatus] = useState<string | null>(null);

    const handleSubmit = async (e: React.FormEvent) => {
        e.preventDefault();
        setStatus(null);

        if (!name || !email || !message) {
            setError("Veuillez remplir tous les champs");
            return;
        }

        try {
            const response = await fetch(`${API_URL}/contact`, {
                method: 'POST',
                headers: {
                    'Content-Type': 'application/json'
                },
                body: JSON.stringify({name, email, message})
            });

            if (!response.ok) {
                throw new Error("Une erreur est survenue");
            }

            setStatus("Votre message a bien été envoyé");
            setName("");
            setEmail("");
            setMessage("");
            } catch (error) {
                setError("Une erreur est survenue : "+ {error});
                setMessage("Une erreur est survenue et votre message n'a pas pu être envoyé");
            }
        };

    return (
        <div className="container mx-auto px-4 py-8">
            <h1 className="text-3xl font-bold text-center text-gray-800 mb-6">Contactez-nous</h1>

            {/* Form */}
            <Form onSubmit={handleSubmit} className="space-y-6 max-w-lg mx-auto">
                {/* Nom */}
                <Input
                    label="Nom"
                    type="text"
                    id='name'
                    name='name'
                    value={name}
                    onChange={(e) => setName(e.target.value)}
                    placeholder='Votre nom'
                    required
                />

                {/* Email */}
                <Input
                    label="Email"
                    type="email"
                    id='email'
                    name='email'
                    value={email}
                    onChange={(e) => setEmail(e.target.value)}
                    placeholder='Votre email'
                    required
                />

                {/* Message */}
                <Textarea
                    label="Message"
                    id='message'
                    name='message'
                    value={message}
                    onChange={(e) => setMessage(e.target.value)}
                    placeholder='Tapez votre message'
                    required
                    rows = {4}
                    cols = {50}
                />

                {/* Submit */}
                <Button type="submit" variant="primary" className="w-full">
                    Envoyer
                </Button>

                {/* Status & Error Messages */}
                {status === "success" && (
                    <div className="text-center text-green-500 mt-4">
                        Votre message a bien été envoyé !
                    </div>
                )}
                {status === "error" && error && (
                    <div className="text-center text-red-500 mt-4">
                        {error}
                    </div>
                )}
            </Form>
        </div>
    );
};

export default ContactPage;