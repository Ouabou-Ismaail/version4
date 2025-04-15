import React from 'react';
import MedecinCard from './MedecinCard';
import './MedecinList.css'; // Assurez-vous d'importer le fichier CSS

const MedecinList = () => {
    const medecins = [
        { image: '/medecin1.jpg', name: 'Dr. Anh', email: 'anh@example.com' },
        { image: '/medecin2.jpg', name: 'Dr. Hamid Jlol', email: 'hamidjlol@example.com' },
        { image: '/medecin3.jpg', name: 'Dr. Nawar Faty', email: 'nawarfaty@example.com' },
        // Ajoutez plus de médecins ici
    ];

    return (
        <div className="medecin-list">
            {medecins.map((medecin, index) => (
                <MedecinCard
                    key={index}
                    image={medecin.image}
                    name={medecin.name}
                    email={medecin.email}
                />
            ))}
        </div>
    );
};

export default MedecinList;