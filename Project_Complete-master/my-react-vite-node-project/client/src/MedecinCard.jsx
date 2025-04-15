import React from 'react';
import './MedecinCard.css'; // Assurez-vous d'importer le fichier CSS

const MedecinCard = ({ image, name, email }) => {
    return (
        <div className="medecin-card">
            <img src={image} alt={name} className="medecin-image" />
            <div className="medecin-info">
                <h2>{name}</h2>
                <p>{email}</p>
            </div>
        </div>
    );
};

export default MedecinCard;