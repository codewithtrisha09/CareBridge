import React, { useState, useEffect } from 'react'
import { useParams } from 'react-router-dom'
import { useAuth } from '../context/AuthContext'
import { FaFileMedical, FaLightbulb, FaDownload } from 'react-icons/fa'

const ReportSimplified = () => {
  const { id } = useParams()
  const { api } = useAuth()
  const [report, setReport] = useState(null)
  const [simplified, setSimplified] = useState(null)
  const [loading, setLoading] = useState(true)
  const [simplifying, setSimplifying] = useState(false)

  useEffect(() => {
    fetchReport()
  }, [id])

  const fetchReport = async () => {
    try {
      const res = await api.get(`/reports/${id}`)
      setReport(res.data)
      setSimplified(res.data.simplifiedText)
    } catch (error) {
      console.error('Error:', error)
    }
    setLoading(false)
  }

  const simplifyWithAI = async () => {
  console.log('Report:', report)
  console.log('Extracted Text:', report?.extractedText)
  
  if (!report?.extractedText) {
    console.error('No extracted text found!')
    return
  }
    setSimplifying(true)
    try {
      const res = await api.post('/reports/simplify', {
        reportId: id,
        extractedText: report.extractedText
      })
      setSimplified(res.data.simplifiedText)
    } catch (error) {
      console.error('AI Error:', error)
    }
    setSimplifying(false)
  }

  if (loading) return <div className="min-h-screen flex items-center justify-center">Loading...</div>

  return (
    <div className="min-h-screen bg-gray-50 py-8">
      <div className="max-w-5xl mx-auto px-4">
        <div className="bg-white rounded-xl shadow-lg p-8">
          <h1 className="text-3xl font-bold mb-6 flex items-center">
            <FaLightbulb className="text-accent mr-3" />
            AI-Simplified Report
          </h1>

          <div className="mb-6">
            <h2 className="text-xl font-semibold mb-2">{report?.title}</h2>
            <p className="text-gray-600">
              Uploaded: {new Date(report?.createdAt).toLocaleDateString()}
            </p>
          </div>

          {/* Extracted Text */}
          <div className="mb-8">
            <h3 className="text-lg font-semibold mb-3 flex items-center">
              <FaFileMedical className="text-primary mr-2" />
              Extracted Text (OCR)
            </h3>
            <div className="bg-gray-100 p-4 rounded-lg">
              <p className="text-gray-700">{report?.extractedText || 'No text extracted'}</p>
            </div>
          </div>

          {/* AI Simplification */}
          <div>
            <h3 className="text-lg font-semibold mb-3 flex items-center">
              <FaLightbulb className="text-accent mr-2" />
              AI Simplified Explanation
            </h3>
            
            {!simplified ? (
              <button
                onClick={simplifyWithAI}
                disabled={simplifying}
                className="px-6 py-3 bg-accent text-white rounded-lg hover:bg-green-600 disabled:bg-gray-400"
              >
                {simplifying ? 'Simplifying with AI...' : 'Simplify with Gemini AI'}
              </button>
            ) : (
              <div className="bg-green-50 border border-green-200 p-6 rounded-lg">
                <p className="text-gray-800 text-lg">{simplified}</p>
              </div>
            )}
          </div>

          {/* Download */}
          <div className="mt-8">
            <a
              href={`http://localhost:5000/${report?.filePath}`}
              download
              className="inline-flex items-center px-6 py-3 bg-primary text-white rounded-lg hover:bg-blue-600"
            >
              <FaDownload className="mr-2" />
              Download Original Report
            </a>
          </div>
        </div>
      </div>
    </div>
  )
}

export default ReportSimplified
