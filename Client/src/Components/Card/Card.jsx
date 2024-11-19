import React from 'react'
import "./Card.css";
import { Icon } from '@iconify/react/dist/iconify.js';

export default function Card({ width, height, image, file, text, icon, iconStyle, style, className }) {
 const defaultCover = 'http://localhost:5000/resource/coverDefault.png'
  const defaultIconStyle = {
    display: 'flex',
    justifyContent: 'center',
    alignItems: 'center',
    fontSize: '24px',
    color: '#FFB800',
  }

  return (
    <div className={`card ${className}`} style={{ width, height, ...style }}>
      <img 
        src={image ? `http://localhost:5000/resource/${image.split('\\').pop()}` : defaultCover} 
        alt="image de la ressource" 
        className="card-image" 
      />
      <div className="card-content">
        <div>
          <p className='card-title'>{text}</p>
        </div>

        <div className={`card-icon ${className}`}>
      
            {icon && <span style={{ ...defaultIconStyle, ...iconStyle }}>{icon}</span>}
      
        </div>
      </div>
      <img src="" alt="" />
    </div>
  )
}







