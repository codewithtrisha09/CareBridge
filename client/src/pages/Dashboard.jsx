import React, { useState, useEffect } from 'react'
import { Link } from 'react-router-dom'
import { useAuth } from '../context/AuthContext'
import { FaFileMedical, FaBell, FaChartLine, FaPlus } from 'react-icons/fa'

const Dashboard = () => {
  const { user, api } = useAuth()
  const [reports, setReports] = useState([])
  const [medicines, setMedicines] = useState([])
  const [loading, setLoading] = useState(true)

  useEffect(() => {
    fetchData()
  }, [])

  const fetchData = async () => {
    try {
      const reportsRes = await api.get('/reports')
      const medicinesRes = await api.get('/medicines')
      setReports(reportsRes.data)
      setMedicines(medicinesRes.data)
    } catch (error) {
      console.error('Error fetching data:', error)
    }
    setLoading(false)
  }

  return (
    <div className="min-h-screen bg-gray-50">
      <div className="max-w-7xl mx-auto px-4 py-8">
        {/* Header */}
        <div className="bg-gradient-to-r from-primary to-secondary text-white rounded-2xl p-8 mb-8">
          <h1 className="text-4xl font-bold mb-2">Welcome, {user?.name}! 👋</h1>
          <p className="text-xl">Manage your health reports and medicines effortlessly</p>
        </div>

        {/* Quick Actions */}
        <div className="grid grid-cols-1 md:grid-cols-3 gap-6 mb-8">
          <Link to="/upload-report" className="bg-white p-6 rounded-xl shadow-lg card-hover flex items-center space-4">
            <div className="bg-primary bg-opacity-10 p-4 rounded-lg">
              <FaPlus className="text-primary text-3xl" />
            </div>
            <div>
              <h3 className="text-xl font-bold text-gray-900">Upload Report</h3>
              <p className="text-gray-600">Add new medical report</p>
            </div>
          </Link>

          <Link to="/medicines" className="bg-white p-6 rounded-xl shadow-lg card-hover flex items-center space-4">
            <div className="bg-accent bg-opacity-10 p-4 rounded-lg">
              <FaBell className="text-accent text-3xl" />
            </div>
            <div>
              <h3 className="text-xl font-bold text-gray-900">Medicines</h3>
              <p className="text-gray-600">{medicines.length} active reminders</p>
            </div>
          </Link>

          <div className="bg-white p-6 rounded-xl shadow-lg card-hover flex items-center space-4">
            <div className="bg-secondary bg-opacity-10 p-4 rounded-lg">
              <FaChartLine className="text-secondary text-3xl" />
            </div>
            <div>
              <h3 className="text-xl font-bold text-gray-900">Reports</h3>
              <p className="text-gray-600">{reports.length} total reports</p>
            </div>
          </div>
        </div>

        {/* Recent Reports */}
        <div className="bg-white rounded-xl shadow-lg p-6 mb-8">
          <h2 className="text-2xl font-bold mb-4 flex items-center">
            <FaFileMedical className="text-primary mr-3" />
            Recent Reports
          </h2>
          
          {loading ? (
            <p className="text-gray-600">Loading...</p>
          ) : reports.length === 0 ? (
            <p className="text-gray-600">No reports yet. Upload your first report!</p>
          ) : (
            <div className="space-4">
              {reports.slice(0, 5).map((report) => (
                <div key={report._id} className="border border-gray-200 rounded-lg p-4 hover:bg-gray-50">
                  <div className="flex items-center justify-between">
                    <div>
                      <h3 className="font-semibold text-gray-900">{report.title || 'Medical Report'}</h3>
                      <p className="text-sm text-gray-600">
                        {new Date(report.createdAt).toLocaleDateString()}
                      </p>
                    </div>
                    <Link
                      to={`/report-simplified/${report._id}`}
                      className="px-4 py-2 bg-primary text-white rounded-lg hover:bg-blue-600"
                    >
                      View Simplified
                    </Link>
                  </div>
                </div>
              ))}
            </div>
          )}
        </div>

        {/* Medicine Reminders */}
        <div className="bg-white rounded-xl shadow-lg p-6">
          <h2 className="text-2xl font-bold mb-4 flex items-center">
            <FaBell className="text-accent mr-3" />
            Medicine Reminders
          </h2>
          
          {loading ? (
            <p className="text-gray-600">Loading...</p>
          ) : medicines.length === 0 ? (
            <p className="text-gray-600">No medicine reminders set.</p>
          ) : (
            <div className="space-4">
              {medicines.slice(0, 5).map((med) => (
                <div key={med._id} className="border border-gray-200 rounded-lg p-4">
                  <div className="flex items-center justify-between">
                    <div>
                      <h3 className="font-semibold text-gray-900">{med.name}</h3>
                      <p className="text-sm text-gray-600">
                        {med.dosage} - {med.time}
                      </p>
                    </div>
                    <span className={`px-3 py-1 rounded ${med.active ? 'bg-accent text-white' : 'bg-gray-200'}`}>
                      {med.active ? 'Active' : 'Inactive'}
                    </span>
                  </div>
                </div>
              ))}
            </div>
          )}
        </div>
      </div>
    </div>
  )
}

export default Dashboard
