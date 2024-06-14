import { useMemo, useState } from 'react'
import axios from 'axios'

export function AddShelterTab({
  lat,
  lng,
  setShowModal,
  addMarker,
  setSelectedTab
}) {
  const [name, setName] = useState('')
  const [contact, setContact] = useState('')
  const [address, setAddress] = useState('')

  const handleAddShelter = async () => {
    const { data } = await axios.post('http://localhost:3000/shelters', {
      name,
      contact,
      address,
      isAvailable: true,
      lat,
      lng,
    })
    setShowModal(false)
    console.log({ data });
    addMarker(data.id, Number(lat), Number(lng))
    setSelectedTab('shelters')
    setName('')
    setContact('')
    setAddress('')
  }

  const isAddShelterDisabled = useMemo(() => {
    return !(name && contact && address && lat && lng)
  }, [name, contact, address, lat, lng])

  return (
    <div>
      <div style={{ display: 'flex', justifyContent: 'space-between' }}>
        <div style={{ width: '49%' }}>
          <input className='input' onChange={(e) => setName(e.target.value)} value={name} type="text" placeholder="Nome" />
        </div>
        <div style={{ width: '49%' }}>
          <input className='input' onChange={(e) => setContact(e.target.value)} value={contact} type="text" placeholder="Contato" />
        </div>
      </div>
      <input className='input' onChange={(e) => setAddress(e.target.value)} value={address} type="text" placeholder="Endereço" />
      <p style={{ marginBottom: '8px', color: '#8A8A8A' }}>*para selecionar latitude e longitude clique no mapa</p>
      <div style={{ display: 'flex', justifyContent: 'space-between' }}>
        <div style={{ width: '49%' }}>
          <input className='input' type="text" disabled placeholder="Latitude" value={lat} />
        </div>
        <div style={{ width: '49%' }}>
          <input className='input' type="text" disabled placeholder="Longitude" value={lng} />
        </div>
      </div>
      <button className='add-shelter-button' disabled={isAddShelterDisabled} onClick={handleAddShelter}>Adicionar</button>
    </div>
  )
}