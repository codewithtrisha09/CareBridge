import React, { useState, useEffect } from 'react'
import { useAuth } from '../context/AuthContext'
import { FaBell, FaPlus, FaCheck, FaTimes } from 'react-icons/fa'

const MedicineReminders = () => {
  const { api } = useAuth()
  const [medicines, setMedicines] = useState([])
  const [showForm, setShowForm] = useState(false)
  const [newMed, setNewMed] = useState({
    name: '', dosage: '', time: '', frequency: 'daily'
  })

  useEffect(() => {
    fetchMedicines()
  }, [])

  const fetchMedicines = async () => {
    try {
      const res = await api.get('/medicines')
      setMedicines(res.data)
    } catch (error) {
      console.error('Error:', error)
    }
  }

  const addMedicine = async (e) => {
    e.preventDefault()
    try {
      await api.post('/medicines', newMed)
      setShowForm(false)
      setNewMed({ name: '', dosage: '', time: '', frequency: 'daily' })
      fetchMedicines()
    } catch (error) {
      console.error('Error:', error)
    }
  }

  const toggleActive = async (id, active) => {
    try {
      await api.put(`/medicines/${id}`, { active: !active })
      fetchMedicines()
    } catch (error) {
      console.error('Error:', error)
    }
  }

  const deleteMedicine = async (id) => {
    try {
      await api.delete(`/medicines/${id}`)
      fetchMedicines()
    } catch (error) {
      console.error('Error:', error)
    }
  }

  return (
    <div className="min-h-screen bg-gray-50 py-8">
      <div className="max-w-4xl mx-auto px-4">
        <div className="bg-white rounded-xl shadow-lg p-8">
          <div className="flex items-center justify-between mb-6">
            <h1 className="text-3xl font-bold flex items-center">
              <FaBell className="text-accent mr-3" />
              Medicine Reminders
            </h1>
            <button
              onClick={() => setShowForm(true)}
              className="px-4 py-2 bg-accent text-white rounded-lg hover:bg-green-600 flex items-center"
            >
              <FaPlus className="mr-2" />
              Add Medicine
            </button>
          </div>

          {/* Add Form */}
          {showForm && (
            <div className="mb-8 bg-green-50 p-6 rounded-lg">
              <form onSubmit={addMedicine}>
                <div className="grid grid-cols-2 gap-4 mb-4">
                  <input
                    type="text"
                    value={newMed.name}
                    onChange={(e) => setNewMed({ ...newMed, name: e.target.value })}
                    placeholder="Medicine Name"
                    className="border border-gray-300 rounded-lg px-4 py-2"
                    required
                  />
                  <input
                    type="text"
                    value={newMed.dosage}
                    onChange={(e) => setNewMed({ ...newMed, dosage: e.target.value })}
                    placeholder="Dosage (e.g., 500mg)"
                    className="border border-gray-300 rounded-lg px-4 py-2"
                    required
                  />
                  <input
                    type="time"
                    value={newMed.time}
                    onChange={(e) => setNewMed({ ...newMed, time: e.target.value })}
                    className="border border-gray-300 rounded-lg px-4 py-2"
                    required
                  />
                  <select
                    value={newMed.frequency}
                    onChange={(e) => setNewMed({ ...newMed, frequency: e.target.value })}
                    className="border border-gray-300 rounded-lg px-4 py-2"
                  >
                    <option value="daily">Daily</option>
                    <option value="weekly">Weekly</option>
                    <option value="as_needed">As Needed</option>
                  </select>
                </div>
                <div className="flex space-4">
                  <button type="submit" className="px-6 py-2 bg-accent text-white rounded-lg hover:bg-green-600">
                    Add Medicine
                  </button>
                  <button
                    onClick={() => setShowForm(false)}
                    className="px-6 py-2 bg-gray-200 text-gray-700 rounded-lg"
                  >
                    Cancel
                  </button>
                </div>
              </form>
            </div>
          )}

          {/* Medicine List */}
          <div className="space-4">
            {medicines.length === 0 ? (
              <p className="text-gray-600 text-center py-8">No medicines added yet</p>
            ) : (
              medicines.map((med) => (
                <div key={med._id} className="border border-gray-200 rounded-lg p-4">
                  <div className="flex items-center justify-between">
                    <div>
                      <h3 className="font-semibold text-gray-900">{med.name}</h3>
                      <p className="text-sm text-gray-600">
                        {med.dosage} · {med.time} · {med.frequency}
                      </p>
                    </div>
                    <div className="flex items-center space-2">
                      <button
                        onClick={() => toggleActive(med._id, med.active)}
                        className={`px-3 py-1 rounded ${med.active ? 'bg-accent text-white' : 'bg-gray-200'}`}
                      >
                        {med.active ? <FaCheck /> : <FaTimes />}
                      </button>
                      <button
                        onClick={() => deleteMedicine(med._id)}
                        className="px-3 py-1 bg-red-100 text-red-600 rounded"
                      >
                        Delete
                      </button>
                    </div>
                  </div>
                </div>
              ))
            )}
          </div>
        </div>
      </div>
    </div>
  )
}

export default MedicineReminders
