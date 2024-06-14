import axios from "axios"
import { useEffect, useState } from "react"

export function SheltersTab({ map, setMarkers }) {
  const [shelters, setShelters] = useState([])

  useEffect(() => {
    const fetchShelters = async () => {
      const { data } = await axios.get('http://localhost:3000/shelters')
      console.log({ data });
      const newShelters = data.map(shelter => ({
        id: shelter.id,
        name: shelter.name,
        address: shelter.address,
        contact: shelter.contact,
        lat: Number(shelter.lat),
        lng: Number(shelter.lng)
      }))
      setMarkers(newShelters)
      setShelters(newShelters)
    }
    fetchShelters()
  }, [setMarkers])

  return (
    <div className="shelter-tab-wrapper">
      {shelters.map(shelter => (
        <div key={shelter.id} className="shelter">
          <div style={{ display: 'flex', justifyContent: 'space-between', alignItems: 'center' }}>
            <span>{shelter.name}</span>
            <button onClick={() => map.flyTo([shelter.lat, shelter.lng], 15)}>
              Ver no mapa
            </button>
          </div>
          <span>{shelter.address}</span>
          <span>{shelter.contact} | Latitude {shelter.lat} | Longitude {shelter.lng}</span>
        </div>
      ))}
    </div>
  )
}