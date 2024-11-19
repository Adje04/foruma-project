import React, { useState, useEffect } from 'react';
import Input from '../../../Components/Input/Input';
import Button from '../../../Components/Button/Button';
import { toast } from 'react-toastify';
import { apiClient } from '../../../axios/axios';
import { useNavigate } from 'react-router';
import TextArea from '../../../Components/Textarea/Textarea';

export default function QuestionCategory({ category, onSave, onCancel }) {
  const [name, setName] = useState('');
  const [description, setDescription] = useState('');
  const [isLoading, setIsLoading] = useState(false);
  const navigate = useNavigate();

  // Pré-remplir les champs avec les données de la catégorie si elles existent
  useEffect(() => {
    if (category) {
      setName(category.name || '');
      setDescription(category.description || '');
    }
  }, [category]);

  // Méthode pour créer une catégorie
  const handleCreateCategory = async () => {
    const formData = new FormData();
    formData.set('name', name);
    formData.set('description', description);

    setIsLoading(true);

    try {
      const response = await apiClient.post('category-create', formData);
      if (response.status === 201) {

        toast.success("Catégorie de question créée avec succès!");
        setIsLoading(false);

        setName('')
        setDescription('')
        // Appelle la fonction onSave après création
        onSave();

        setTimeout(() => {
          navigate('/dashboard/list-category');
        }, 3000);

      } else {

        toast.error(response.data.message || "Erreur lors de la création de la catégorie de question");
        setIsLoading(false);
      }
    } catch (error) {

      console.error(error);
      toast.error(error.response?.data?.message || "une reeur de source inattendue s'est produite");
      setIsLoading(false);
    }
  };


  // Méthode pour modifier une catégorie
  const handleUpdateCategory = async () => {
    const formData = new FormData();
    formData.set('name', name);
    formData.set('description', description);

    setIsLoading(true);

    try {
      const response = await apiClient.put(`category-update/${category._id}`, formData);
      if (response.status === 200) {
        toast.success('Catégorie modifiée avec succès!');
        setIsLoading(false);

        setName('')
        setDescription('')
        onSave(); // Appelle la fonction onSave après modification

        setTimeout(() => {
          navigate('/dashboard/list-category');
        }, 3000);

      } else {

        toast.error(response.data.message || "Erreur lors de la modification de la catégorie de question");
        setIsLoading(false);
      }
    } catch (error) {

      console.error(error);
      toast.error(error.response?.data?.message || "une erreur de source innatendue s'est produite lors de la modification");
      setIsLoading(false);
    }
  };

  // Appelle la bonne méthode selon le contexte (création ou modification)
  const handleSubmit = (e) => {
    e.preventDefault();

    if (category) {
      handleUpdateCategory();
    } else {
      handleCreateCategory();
    }
  };

  return (
    <form className='category-form' onSubmit={handleSubmit}>
      <div>
        <h3>{category ? 'Modifier la catégorie' : 'Créer une catégorie de question'}</h3>
        <br />
        <Input
          label={'Nom'}
          type={'text'}
          reference={'quest-category'}
          placeholder={'Saisir le nom de la catégorie ici...'}
          value={name}
          onChange={(e) => setName(e.target.value)}
        />
        <br />
      
        <TextArea
          label={'Description (optionnel)'}
          reference={'description'}
          rows={4}
          placeholder={'Décrire brièvement la catégorie'}
          value={description}
          onChange={(e) => setDescription(e.target.value)}
        />
        <br />
        <Button
          disabled={isLoading}
          type={'submit'}
          text={isLoading ? 'Chargement ...' : <strong>{category ? 'Modifier' : 'Créer'}</strong>}
          style={{ backgroundColor: '#FFB800', width: '100%' }}
        />
        <Button
          className="close-button"
          onClick={onCancel}
          text={'Fermer'}
        />
      </div>
    </form>
  );
}









