import React, { useState, useEffect } from 'react';
import Button from '../../Components/Button/Button';
import { useNavigate } from 'react-router-dom';
import axios from 'axios';
import { toast } from "react-toastify";
import Input from '../../Components/Input/Input';
import Image from '../../Components/Image/Image';

export default function OtpCode() {
  const [otpCode, setOtpCode] = useState('');
  const [email, setEmail] = useState('');
  const [isLoading, setIsLoading] = useState(false);
  const navigate = useNavigate();

  // Utilise useEffect pour initialiser l'email à partir de localStorage
  useEffect(() => {
    const savedEmail = localStorage.getItem('email');
    if (savedEmail) {
      setEmail(savedEmail);
    }
  }, []);

  const handleSubmit = async (e) => {
    e.preventDefault();
    setIsLoading(true);
    const formData = new FormData();
  
    formData.set("email", email);
    formData.set("code", otpCode);

    try {
      const response = await axios.post('http://localhost:5000/api/v1.0.0/verify-otpCode', formData,
        { headers: {
            'Content-Type': 'application/json',
        } }
      );

      if (response.status == 200) {
        
        toast.success("verification réussie");
        setIsLoading(false);

        setTimeout(() => {
            navigate('/login');
        }, 3000);
        
        setTimeout(() => {
            navigate('/login');
        }, 3000);



    } else {
        toast.error(response.data.message || "Email ou code incompatible incorrect");
        setIsLoading(false);
    }
   
    } catch (error) {
      toast.error(error.response?.data?.message || 'Erreur lors de la vérification');
      setIsLoading(false);
    }
  };

  return (
    <div className='form'>
      <div className='form-img'>
        <Image src={"/images/login 1.svg"} alt={"illustration-inscription"} />
      </div>
      <div className='form-style'>
        <h1>Code de confirmation</h1>
        <p>Un code vous a été envoyé à votre email ({email}). Veuillez le saisir</p>
        <form onSubmit={handleSubmit}>
          <Input
            label={'Email'}
            type={'email'}
            reference={'email'}
            placeholder={'Saisir l\'adresse e-mail ici...'}
            value={email}
            onChange={(e) => { setEmail(e.target.value) }}
          />
          <Input
            label={'Code de confirmation'}
            type={'text'}
            reference={'code'}
            placeholder={'Saisissez le code ici...'}
            value={otpCode}
            onChange={(e) => setOtpCode(e.target.value)}
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
  );
}



