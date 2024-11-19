import React, { useState } from 'react';
import Button from '../../Components/Button/Button';
import { useNavigate } from 'react-router-dom';
import { toast } from "react-toastify";
import Input from '../../Components/Input/Input';
import Image from '../../Components/Image/Image';
import axios from 'axios';
export default function VerifyEmail() {
    const [email, setEmail] = useState('');
    const [isLoading, setIsLoading] = useState(false);
    const navigate = useNavigate();

    const handleSubmit = async (e) => {
        e.preventDefault();
        setIsLoading(true);
        localStorage.setItem("email", email);
        const formData = new FormData();
        formData.set("email", email);
        try {
            const response = await axios.post('http://localhost:5000/api/v1.0.0/verifyEmail', formData,
                { headers: { 'Content-Type': 'application/json', } });

            if (response.status == 200) {

                toast.success(response.data.message || "verification réussie");
                setIsLoading(false);
                localStorage.setItem('id', response.data.data._id)
                setTimeout(() => {
                    navigate('/email-confirmation');
                }, 3000);

            } else {
                toast.error("Email incorrect");
                setIsLoading(false);
            }

        } catch (error) {
            console.log(error)
            toast.error(error.response?.data?.message || 'Erreur lors de la vérification');
            setIsLoading(false);
        }
    };



    return (
        <div className='form-position'>
        <div className='form form-position'>
            <div className='form-img'>
                <Image src={"/public/images/login.svg"} alt={"illustration-inscription"} />
            </div>
            <div className='form-style'>
                <h1>Verification  email</h1>
                <p></p>
                <form onSubmit={handleSubmit}>
                    <Input
                        label={'Email'}
                        type={'email'}
                        reference={'email'}
                        placeholder={'Saisir votre adresse e-mail ici...'}
                        value={email}
                        onChange={(e) => { setEmail(e.target.value) }}
                    />
                    <Button
                        disabled={isLoading}
                        type={"submit"}
                        text={isLoading ? "Vérification..." : <strong>Valider</strong>}
                        style={{ backgroundColor: '#FFB800', width: '100%' }}
                    />
                </form>
            </div>
        </div>
        </div>
    );
}









