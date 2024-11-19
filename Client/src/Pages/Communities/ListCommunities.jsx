import React, { useEffect, useState } from 'react';
import '../Admin/Categories/style.css';
import { Icon } from '@iconify/react/dist/iconify.js'
import { toast } from 'react-toastify';

import { useLocation, useNavigate } from 'react-router';
import Input from '../../Components/Input/Input';
import Button from '../../Components/Button/Button';
import { apiClient } from '../../axios/axios';
import { useUser } from '../../State/UserContext';
import CreateCommunity from './CreateCommunity';
import Navbar from '../../Components/TopBar/Navbar';
import Footer from '../../Components/Footer/Footer';


export default function ListCommunities() {
    const [page, setPage] = useState(0);
    const [rowsPerPage, setRowsPerPage] = useState(5);
    //gérer les recherches
    const [search, setsearch] = useState('');
    // gerer les catégories
    const [showcreateCommunity, setShowCreateCommunity] = useState(false);
    const [communities, setCommunities] = useState([]);
    const [showEditModal, setShowEditModal] = useState(false);
    const [selectCommunity, setSelectCommunity] = useState(null);
    const [name, setName] = useState('');
    const [description, setDescription] = useState('');
    const {user} = useUser();
    const navigate = useNavigate();
    const location = useLocation();

    const handleChangePage = (newPage) => {
        setPage(newPage);
    };

    const handleChangeRowsPerPage = (event) => {
        setRowsPerPage(parseInt(event.target.value, 10));
        setPage(0);
    };

    const handleFilterChange = (event) => {
        setsearch(event.target.value);
    };



    const formData = new FormData();
    formData.set('name', name);
    formData.set('description', description);

    const filteredRows = communities.filter((communities) =>
        communities.name.toLowerCase().includes(search.toLowerCase())
    );

    const displaycommunities = async () => {
        try {
            const response = await apiClient.get('communities');
            if (response.data.success) {
                setCommunities(response.data.data);
            }
            else {
                console.error('les groupes ne s\'affiche pas', response.data);
            }
        } catch (error) {
            console.error('Erreur lors de la récupération des catégories', error);

            throw error;
        }
    };


    const joinCommunity = async (group) => {

        if (!user) {
            navigate('/login')
            return;
        }

        try {
            const response = await apiClient.post(`join/${group}`);
            if (response.status === 200) {
                toast.success('Vous êtes desormais membre de ce groupe!');
                displaycommunities()
            } else {
                toast.error('Erreur lors de l\'ajout!');
            }
        } catch (error) {
            if (error.response) {
            
                if (error.response.status === 409) {
                    toast.error(error.response.data.message || "L'email est déjà utilisé.");
                } else {
                    toast.error("Une erreur est survenue");
                }
            } else {
                toast.error("Une erreur est survenue");
            }

            setIsLoading(false);

        }
    };

    useEffect(() => { displaycommunities(); }, []);

    return (
        <div>

            <div>
                {decodeURIComponent(location.pathname) === '/communities' && <div><Navbar /> <br /><br /><br /><br /><br /></div>}
            </div>
            <div className="item-table-container">
                <h1>Liste des communautés</h1>
                <div className='flex-2'>

                    <Input
                        type="text"
                        placeholder="Search by name"
                        value={search}
                        onChange={handleFilterChange}
                        className="search-input"
                    />

                    <Button onClick={() => setShowCreateCommunity(true)} className="create-button"
                        text={'créer une communauté'} />
                </div>

                <table className="item-table">
                    <thead>
                        <tr>
                            <th>ID</th>
                            <th>Name</th>
                            <th>Description</th>
                            <th>Membres</th>
                            <th>Operations</th>
                        </tr>
                    </thead>
                    <tbody>
                        {communities
                            .filter(group => group.name.toLowerCase().includes(search.toLowerCase()))
                            .slice(page * rowsPerPage, page * rowsPerPage + rowsPerPage)
                            .map((group, index) => (
                                <tr key={index}>

                                    <td>{page * rowsPerPage + index + 1}</td>
                                    <td>{group.name}</td>
                                    <td>{group.description}</td>
                                    <td>{group.description}</td>
                                    <td className='flex-op'>
                                        <Button className='btn-operation' onClick={() => joinCommunity(group._id)}
                                            icon={<Icon icon="qlementine-icons:plus-16" style={{ color: 'black' }} />}
                                            text={<strong>Rejoindre</strong>}
                                            style={{ backgroundColor: '#9DB3ED', width: '100%' }}
                                        />
                                    </td>
                                </tr>
                            ))}
                    </tbody>
                </table>

                <div className="pagination">
                    <div className='flex'>
                        <span>
                            Affichage par page
                            <select value={rowsPerPage} onChange={handleChangeRowsPerPage}>
                                <option value={5}>5</option>
                                <option value={10}>10</option>
                                <option value={25}>25</option>
                            </select>
                        </span>
                        <span>
                            Page {page + 1} of {Math.ceil(filteredRows.length / rowsPerPage)}
                        </span>
                    </div>

                    <Button
                        disabled={page === 0}
                        onClick={() => handleChangePage(page - 1)}
                        style={{ backgroundColor: 'transparent' }}
                        icon={<Icon icon="ic:round-arrow-back-ios" style={{ color: '#273eec' }} />}
                    />

                    <Button
                        disabled={page >= Math.ceil(filteredRows.length / rowsPerPage) - 1}
                        onClick={() => handleChangePage(page + 1)}
                        style={{ backgroundColor: 'transparent' }}
                        icon={<Icon icon="ic:round-arrow-back-ios" style={{ color: '#273eec', transform: 'rotate(180deg)' }} />}
                    />

                </div>

                {showcreateCommunity && (
                    <div className="overlay">
                        <div className="modal">
                            <CreateCommunity

                                onSave={() => {
                                    displaycommunities();
                                    setShowCreateCommunity(false);
                                }}
                                onCancel={() => setShowCreateCommunity(false)}
                            />

                        </div>
                    </div>
                )}
            </div>

            <div>
                {decodeURIComponent(location.pathname) === '/communities' && <div><br /><br /><br /><br /><br /><Footer /> </div>}
            </div>
        </div>
    );
}









