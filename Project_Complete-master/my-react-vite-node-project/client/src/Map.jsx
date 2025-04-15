import React from "react";
import { MapContainer, TileLayer, Marker, Popup } from "react-leaflet";
import L from "leaflet";
import {
  FaMapMarkerAlt,
  FaPhoneAlt,
  FaEnvelope,
  FaClock,
  FaHospitalAlt,
} from "react-icons/fa";
import "leaflet/dist/leaflet.css";
import "./Map.css";

// Icône personnalisée
const customIcon = new L.Icon({
  iconUrl: "https://cdn-icons-png.flaticon.com/512/684/684908.png",
  iconSize: [32, 32],
  iconAnchor: [16, 32],
  popupAnchor: [0, -32],
});

const position = [30.3322, -5.8378];

export default function Map() {
  return (
    <div className="contact-section" id="map">
      <div className="contact-header">
        <FaHospitalAlt className="contact-header-icon" />
        <h2>Nous Contacter & Localisation</h2>
        <p>Retrouvez-nous à Zagora et contactez-nous pour toute information</p>
      </div>

      <div className="contact-content">
        <div className="contact-details">
          <div className="detail">
            <FaMapMarkerAlt className="icon red" />
            <span>Av. Hassan II, Zagora, Maroc</span>
          </div>
          <div className="detail">
            <FaPhoneAlt className="icon blue" />
            <span>+212 528 82 34 56</span>
          </div>
          <div className="detail">
            <FaEnvelope className="icon green" />
            <span>contact@hopitalzagora.ma</span>
          </div>
          <div className="detail">
            <FaClock className="icon yellow" />
            <span>Lundi - Vendredi : 08h - 19h</span>
          </div>
        </div>

        <div className="map-container">
          <MapContainer center={position} zoom={13} scrollWheelZoom={true}>
            <TileLayer
              attribution='&copy; <a href="https://openstreetmap.org">OpenStreetMap</a>'
              url="https://{s}.tile.openstreetmap.org/{z}/{x}/{y}.png"
            />
            <Marker position={position} icon={customIcon}>
              <Popup>
                Hôpital Zagora-Future <br /> Nous sommes ici !
              </Popup>
            </Marker>
          </MapContainer>
        </div>
      </div>
    </div>
  );
}
