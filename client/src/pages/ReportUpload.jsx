import React, { useState } from 'react'
import { useNavigate } from 'react-router-dom'
import { useAuth } from '../context/AuthContext'

const ReportUpload = () => {
  const { api } = useAuth()
  const navigate = useNavigate()
  
  const [title, setTitle] = useState('')
  const [file, setFile] = useState(null)
  const [isUploading, setIsUploading] = useState(false)
  const [error, setError] = useState(null)
  const [success, setSuccess] = useState(false)

  const handleUpload = async (e) => {
    e.preventDefault()
    
    if (!file) {
      setError('Please choose a report image')
      return
    }

    if (!title.trim()) {
      setError('Please enter a title')
      return
    }

    setIsUploading(true)
    setError(null)

    try {
      const formData = new FormData()
      formData.append('title', title)
      formData.append('file', file)

      const response = await api.post('/reports/upload', formData, {
        headers: { 'Content-Type': 'multipart/form-data' }
      })

      setSuccess(true)
      setIsUploading(false)
      
      setTimeout(() => {
        navigate(`/report-simplified/${response.data._id}`)
      }, 2000)
    } catch (error) {
      setError(error.response?.data?.message || error.message || 'Upload failed')
      setIsUploading(false)
    }
  }

  return (
    <div className="min-h-screen bg-gradient-to-br from-blue-50 to-indigo-100 p-6">
      <div className="max-w-4xl mx-auto">
        <div className="bg-white rounded-2xl shadow-xl p-8">
          <div className="flex items-center mb-8">
            <div className="w-10 h-10 mr-3 bg-blue-600 rounded-full flex items-center justify-center">
              <span className="text-white font-bold text-lg">C</span>
            </div>
            <h1 className="text-3xl font-bold text-gray-800">Upload Medical Report</h1>
          </div>

          <form onSubmit={handleUpload} className="space-y-6">
            <div>
              <label className="block text-sm font-medium text-gray-700 mb-2">Report Title</label>
              <input
                type="text"
                value={title}
                onChange={(e) => setTitle(e.target.value)}
                className="w-full px-4 py-3 border border-gray-300 rounded-lg focus:ring-2 focus:ring-blue-500"
                required
              />
            </div>

            <div>
              <label className="block text-sm font-medium text-gray-700 mb-2">Report Image</label>
              <input
                type="file"
                accept="image/png,image/jpeg,image/jpg,image/bmp,image/tiff"
                onChange={(e) => setFile(e.target.files?.[0] || null)}
                className="w-full px-4 py-3 border border-gray-300 rounded-lg focus:ring-2 focus:ring-blue-500"
                required
              />
            </div>

            {error && (
              <div className="bg-red-50 border border-red-200 rounded-lg p-4">
                <span className="text-red-800">{error}</span>
              </div>
            )}

            {success && (
              <div className="bg-green-50 border border-green-200 rounded-lg p-4">
                <span className="text-green-800">Report uploaded and OCR complete! Redirecting...</span>
              </div>
            )}

            <button
              type="submit"
              disabled={isUploading}
              className={`w-full py-4 rounded-lg font-semibold text-white ${
                isUploading ? 'bg-gray-400' : 'bg-gradient-to-r from-blue-600 to-indigo-600'
              }`}
            >
              {isUploading ? 'Extracting text...' : 'Upload Report'}
            </button>
          </form>
        </div>
      </div>
    </div>
  )
}

export default ReportUpload
