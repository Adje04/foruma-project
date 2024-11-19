import React, { useState } from 'react'
import Input from '../../Components/Input/Input'
import Button from '../../Components/Button/Button'
import { useNavigate } from 'react-router'
import '../Registration/Registration.css'
import Image from '../../Components/Image/Image'
import { toast } from 'react-toastify'
import axios from 'axios'
export default function ForgetPassword() {
    const [password, setPassword] = useState('')
    const [passwordConfirm, setpasswordConfirm] = useState('')
    const [isLoading, setIsLoading] = useState(false);
    const navigate = useNavigate()

    const id = localStorage.getItem('id')
    const handleSubmit = async (e) => {
        e.preventDefault()
        setIsLoading(true)

        if (password !== passwordConfirm) {
            toast.error("Les mots de passe ne correspondent pas.");
            setIsLoading(false);
            return;
        }
       
        const formData = {
            password: password,
            passwordConfirm: passwordConfirm
        };

        try {
            const response = await axios.post(`http://localhost:5000/api/v1.0.0/resetPassword/${id}`, formData);
            if (response.data.success) {
                toast.success("Réinitialisation du mot de passe réussie !");
                setIsLoading(false);
                setTimeout(() => {
                    navigate('/login'); // Rediriger après un succès
                }, 3000);
            } else {
                toast.error(response.data.message);
                setIsLoading(false);
            }

        } catch (error) {
            console.error(error);
            toast.error(error.response?.data?.message || "Une erreur de source innattendue s'est produite");
            setIsLoading(false);
        }
    }
    return (
        <div>

            <div className='form'>
                <div className='form-img'>
                    <Image src={'/public/images/password.svg'} alt={"illustration-password"} />
                </div>

                <div className='form-style'>

                    <h1>Renitialiser mot de passe</h1>
                    <form onSubmit={handleSubmit}>
                        <p><small></small></p>

                        <Input
                            label={'Nouveau mot de passe'}
                            type={'password'}
                            reference={'password'}
                            placeholder={'Saisir le mot de passe  ici...'}
                            value={password}
                            onChange={(e) => {
                                setPassword(e.target.value)
                            }} />

                        <Input
                            label={'Confirmer le mot de passe'}
                            type={'password'}
                            reference={'passwordConfirm'}
                            placeholder={'Confirmer le mot de passe  ici...'}
                            value={passwordConfirm}
                            onChange={(e) => {
                                setpasswordConfirm(e.target.value)
                            }} /><br />

                        <div>
                            <Button
                                disabled={isLoading}
                                type={"submit"}
                                text={isLoading ? "Chargement ..." : <strong>Valider</strong>}
                                style={{ backgroundColor: '#FFB800', width: '100%' }}
                            />
                        </div>
                    </form>
                </div>

            </div>
        </div>
    )
}









