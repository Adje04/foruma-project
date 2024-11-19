import React, { useEffect, useState } from 'react';
import './Chat.css';
import { Icon } from '@iconify/react/dist/iconify.js';

export default function Messages({ user, content, path, type, createdAt, username, messageId, onDelete }) {
    const userId = localStorage.getItem('userId');
    const isMe = userId && user === userId;

    const [showMenu, setShowMenu] = useState(false);
    const [menuPosition, setMenuPosition] = useState({ x: 0, y: 0 });

    const handleRightClick = (e) => {
        e.preventDefault();
        // Position du message dans la fenêtre
        const rect = e.target.getBoundingClientRect();
        const x = e.clientX;
        const y = e.clientY;
        setMenuPosition({ x: x, y: y });
        setShowMenu(true);
    };

    const handleDelete = () => {
        // Logique pour supprimer le message
        onDelete(messageId);
        console.log('Message deleted:', messageId);
        setShowMenu(false);
    };


    const handleCopy = () => {
        // Copier le message dans le presse-papiers
        navigator.clipboard.writeText(content).then(() => {
            alert('Message copié dans le presse-papiers');
        }).catch((error) => {
            console.error('Erreur lors de la copie du message:', error);
        });
        setShowMenu(false);
    };

    const handleClickOutside = (e) => {
        if (!e.target.closest('.message-options-menu')) {
            setShowMenu(false);
        }
    };

    const isImage = (filePath) => {
        const imageExtensions = ['jpg', 'jpeg', 'png'];
        const fileExtension = filePath?.split('.').pop().toLowerCase();
        return imageExtensions.includes(fileExtension);
    };

    useEffect(() => {
        document.addEventListener('click', handleClickOutside);
        return () => {
            document.removeEventListener('click', handleClickOutside);
        };
    }, []);

    return (
        <div className={`message-container ${isMe ? 'align-end' : 'align-start'}`} onContextMenu={handleRightClick}>
            <div className={`message-box ${isMe ? 'me-style' : 'other-style'}`}>
                {!isMe && <p className="username-text">{username}</p>}
                {path ? (
                    isImage(path) ? (
                        <div className="image-container">
                            <img
                                src={`http://localhost:5000/chats/${path.split('\\').pop()}`}
                                alt="Image"
                                className="uploaded-image"
                            />
                            <div className="download-overlay">
                                <a
                                    href={`http://localhost:5000/chats/${path.split('\\').pop()}`}
                                    download
                                    className="download-button"
                                >
                                    <Icon icon="basil:download-solid" className="download-icon" />
                                </a>
                            </div>
                        </div>
                    ) : (
                        <div className="file-container">
                            <div className="file-info">
                                <span className="file-name">{path.split('\\').pop()}</span>
                                <div className="file-detail">
                                    <span className="file-type">{type.split('application/')} </span>
                                    <span className="file-type">2MB </span>
                                </div>
                            </div>
                            <a
                                href={`http://localhost:5000/chats/${path.split('\\').pop()}`}
                                download
                                className="file-download-button"
                            >

                                <Icon icon="basil:download-solid" className="file-download-icon" />
                            </a>
                        </div>
                    )
                ) : (
                    <p style={{ margin: 0 }} >{content}</p>
                )}
                <p className="timestamp-text">{new Date(createdAt).toLocaleTimeString()}</p>
            </div>
            {/* Menu contextuel centré à l'écran */}
            {showMenu && (
                <div className="message-options-menu">
                    <button className="message-option" onClick={handleCopy}>
                        <Icon icon="ic:baseline-content-copy" /> Copier
                    </button>
                    <button className="message-option" onClick={handleDelete}>
                        <Icon icon="ic:baseline-delete" /> Supprimer
                    </button>
                </div>
            )}
        </div>
    );
}
























