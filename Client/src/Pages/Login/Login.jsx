import React, { useState } from 'react'
import Image from '../../Components/Image/Image'
import Input from '../../Components/Input/Input'
import Button from '../../Components/Button/Button'
import { Link, useNavigate } from 'react-router-dom'
import axios from 'axios'
import { toast } from 'react-toastify'
import 'react-toastify/dist/ReactToastify.css';
import { useUser } from '../../State/UserContext.jsx';

export default function Login() {

    const [email, setEmail] = useState('')
    const [password, setPassword] = useState('')
    const [isLoading, setIsLoading] = useState(false)
    const navigate = useNavigate()
    const { login } = useUser();

    const handleSubmit = async (e) => {
        e.preventDefault();
        setIsLoading(true);

        const formData = { email, password };

        try {
            const response = await axios.post('http://localhost:5000/api/v1.0.0/login', formData, {
                headers: { 'Content-Type': 'application/json' },
            });

            if (response.status === 200 && response.data.token) {
                toast.success('Connexion réussie');
                const userData = {
                    token: response.data.token,
                    isAdmin: response.data.isAdmin,
                    userId: response.data.data._id,
                    name: response.data.data.name 
                };

                login(userData);
                setIsLoading(false);
                setTimeout(() => {
                    navigate(userData.isAdmin ? '/dashboard' : '/userDashboard/welcome');
                }, 2000);

            } else {
                toast.error(response.data.message || 'Email ou mot de passe incorrect');
                setIsLoading(false);
            }
        } catch (error) {
            console.error(error);
            toast.error(error.response?.data?.message || 'Erreur lors de la connexion');
            setIsLoading(false);
        }
    };

    return (
        <div>
            <br /> <br /> <br /> <br />

            <div className='form'>

                <div className='form-img'>
                    <Image src={'/public/images/login.svg'} alt={"illustration-inscription"} />
                </div>

                <div className='form-style'>
                    <h1>Connexion</h1>
                    <form onSubmit={handleSubmit}>
                        <p><small>Renseignez vos informations pour vous connecter</small></p>

                        <Input
                            label={'Email'}
                            type={'email'}
                            reference={'email'}
                            placeholder={'Saisir l\'adresse e-mail ici...'}
                            value={email}
                            onChange={(e) => setEmail(e.target.value)}
                        />

                        <Input
                            label={'Mot de passe'}
                            type={'password'}
                            reference={'password'}
                            placeholder={'Saisir le mot de passe ici...'}
                            value={password}
                            onChange={(e) => setPassword(e.target.value)}
                        />
                        <Link to = {'/verify-email'}>Mot de passe oublié ?</Link> <br /><br />

                        <div>
                            <Button
                                disabled={isLoading}
                                type={"submit"}
                                text={isLoading ? "Chargement ..." : <strong>Se connecter</strong>}
                                style={{ backgroundColor: '#FFB800', width: '100%' }}
                            />
                        </div>

                        <div style={{ display: 'flex', justifyContent: 'space-between' }}>
                            <p>Pas encore de compte ?</p>
                            <p> <Link to={'/registration'} >S'inscrire</Link> </p>
                        </div>
                    </form>
                </div>
            </div>
        </div>
    )
}








