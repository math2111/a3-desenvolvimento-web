import 'leaflet/dist/leaflet.css';
import { useMapEvents, MapContainer, TileLayer, Marker } from 'react-leaflet'
import { useState } from 'react';
import { AddShelterTab } from '../components/add-shelter-tab'
import { SheltersTab } from '../components/shelters-tab'
import '../app.css'

export function Map() {
  const [map, setMap] = useState(null)

  const [showModal, setShowModal] = useState(false);
  const [markers, setMarkers] = useState([]);
  const [selectCoord, setSelectCoord] = useState({});
  const [selectedTab, setSelectedTab] = useState('shelters')

  const addMarker = (id, lat, lng) => {
    setMarkers([...markers, { id, lat, lng }])
  }

  return (
    <div className='container'>
      <div className='map-wrapper'>
        <MapContainer
          style={{
            height: '100%',
            width: '100%',
            borderRadius: '8px',
          }}
          center={[-30.0277, -51.2287]}
          zoom={13}
          ref={setMap}
        >
          <Comp setSelectCoord={setSelectCoord} showModal={showModal} />
          <TileLayer
            attribution='&copy; <a href="https://www.openstreetmap.org/copyright">OpenStreetMap</a> contributors'
            url="https://{s}.tile.openstreetmap.org/{z}/{x}/{y}.png"
          />
          {markers.map((marker) => {
            return (
              <Marker
                key={marker.id}
                position={[marker.lat, marker.lng]}
              />
            )
          })}
        </MapContainer>
      </div>
      <div className='info-wrapper'>
        <div className='tab'>
          <button className={selectedTab === 'shelters' ? 'tab-button-selected' : 'tab-button'} onClick={() => setSelectedTab('shelters')}>Todos os abrigos</button>
          <button className={selectedTab === 'add-shelter' ? 'tab-button-selected' : 'tab-button'} onClick={() => {setShowModal(true); setSelectedTab('add-shelter')}}>Adicionar abrigo</button>
        </div>
        {selectedTab === 'shelters' && <SheltersTab map={map} setMarkers={setMarkers} />}
        {selectedTab === 'add-shelter' && <AddShelterTab setShowModal={setShowModal} lat={selectCoord.lat} lng={selectCoord.lng} addMarker={addMarker} setSelectedTab={setSelectedTab} />}
      </div>
    </div>
  )
}

function Comp({ setSelectCoord, showModal }) {
  useMapEvents({
    click(e) {
      console.log(e);
      if (showModal) {
        setSelectCoord({lat: e.latlng.lat, lng: e.latlng.lng})
      }
    }
  })
}
