
import React from 'react';
import './Medecin.css';
import MedecinList from './MedecinList';

const Medecin = () => {
  return (
    <div id="screen">
      <h1>Nos Médecins</h1>
      {/* <div className="medecin-card">
        <img src="/path/to/medecin-image.jpg" alt="Médecin" className="medecin-image" />
        <div className="medecin-info">
          <h2>Dr. John Doe</h2>
          <p>Cardiologue</p>
        </div>
      </div>
      Add more medecin-card elements as needed */}
    <MedecinList />
    </div>
  );
};

export default Medecin;