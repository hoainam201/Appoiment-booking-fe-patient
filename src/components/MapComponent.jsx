import React, { useEffect } from 'react';
import L from 'leaflet';
import 'leaflet/dist/leaflet.css';

const MapComponent = () => {
  useEffect(() => {
    // Tọa độ
    const latitude = 10.7769;
    const longitude = 106.7009;
    const mapElement = document.getElementById('map');
    let map = L.map(mapElement).setView([latitude, longitude], 15);
    // Tạo bản đồ
    if(map) {
      map.remove();
    }
    map = L.map('map').setView([latitude, longitude], 15);
    // Thêm layer OpenStreetMap
    L.tileLayer('https://{s}.tile.openstreetmap.org/{z}/{x}/{y}.png', {
      attribution: '© OpenStreetMap contributors',
    }).addTo(map);

    // Thêm marker cho tọa độ
    L.marker([latitude, longitude]).addTo(map);
  }, []);

  return <div id="map" style={{ height: '400px' }} />;
};

export default MapComponent;
