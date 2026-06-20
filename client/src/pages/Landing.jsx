import React from 'react'
import { Link } from 'react-router-dom'
import { useAuth } from '../context/AuthContext'
import { FaHeart, FaFileMedical, FaLightbulb, FaBell, FaChartLine } from 'react-icons/fa'

const Landing = () => {
  const { user } = useAuth()

  return (
    <div className="bg-[radial-gradient(circle_at_top_left,#dbeafe,transparent_34%),linear-gradient(180deg,#f8fafc_0%,#eef2ff_52%,#ffffff_100%)]">
      {/* Hero Section */}
      <div className="max-w-7xl mx-auto px-4 py-16 lg:py-20">
        <div className="grid lg:grid-cols-[1.05fr_0.95fr] gap-10 items-center">
          <div>
            <div className="inline-flex items-center px-4 py-2 bg-white border border-slate-200 rounded-lg shadow-sm mb-6">
              <FaHeart className="text-primary mr-2" />
              <span className="text-sm font-semibold text-slate-700">AI Healthcare Report Assistant</span>
            </div>
            <h1 className="text-5xl lg:text-6xl font-bold text-slate-950 mb-6 leading-tight">
            CAREBRIDGE
          </h1>
          <p className="text-2xl text-slate-700 mb-4">
            Understand medical reports faster, with OCR and AI explanations built for patients.
          </p>
          <p className="text-lg text-slate-600 mb-8 max-w-2xl">
            Upload report images, extract text automatically, simplify complex results, and keep medicine reminders in one focused workspace.
          </p>

          {!user ? (
            <div className="flex flex-col sm:flex-row gap-4">
              <Link to="/signup" className="px-8 py-4 bg-primary text-white text-lg rounded-lg hover:bg-blue-600 shadow-lg text-center">
                Get Started Free
              </Link>
              <Link to="/login" className="px-8 py-4 bg-white text-primary text-lg rounded-lg hover:bg-slate-50 shadow-lg border border-slate-200 text-center">
                Login
              </Link>
            </div>
          ) : (
            <Link to="/dashboard" className="px-8 py-4 bg-primary text-white text-lg rounded-lg hover:bg-blue-600 shadow-lg">
              Go to Dashboard
            </Link>
          )}
          </div>

          <div className="surface-card p-6 lg:p-8">
            <div className="flex items-center justify-between border-b border-slate-200 pb-4 mb-5">
              <div>
                <p className="text-sm text-slate-500">Sample report insight</p>
                <h2 className="text-xl font-bold text-slate-900">CBC Summary</h2>
              </div>
              <FaFileMedical className="text-primary text-3xl" />
            </div>
            <div className="space-y-4">
              <div className="bg-slate-50 border border-slate-200 rounded-lg p-4">
                <p className="text-sm font-semibold text-slate-900">OCR Extracted Text</p>
                <p className="text-sm text-slate-600 mt-2">Hemoglobin 10.8 g/dL, MCV 76 fL, WBC 7,200 cells/uL.</p>
              </div>
              <div className="bg-emerald-50 border border-emerald-200 rounded-lg p-4">
                <p className="text-sm font-semibold text-emerald-900">AI Explanation</p>
                <p className="text-sm text-emerald-800 mt-2">Hemoglobin and MCV are mildly low, which may suggest iron deficiency. Other values are within range.</p>
              </div>
              <div className="grid grid-cols-3 gap-3 pt-2">
                <div className="text-center bg-white border border-slate-200 rounded-lg p-3">
                  <p className="text-2xl font-bold text-primary">OCR</p>
                  <p className="text-xs text-slate-500">Extraction</p>
                </div>
                <div className="text-center bg-white border border-slate-200 rounded-lg p-3">
                  <p className="text-2xl font-bold text-secondary">AI</p>
                  <p className="text-xs text-slate-500">Summary</p>
                </div>
                <div className="text-center bg-white border border-slate-200 rounded-lg p-3">
                  <p className="text-2xl font-bold text-accent">Rx</p>
                  <p className="text-xs text-slate-500">Reminders</p>
                </div>
              </div>
            </div>
          </div>
        </div>
      </div>

      {/* Features Section */}
      <div className="max-w-7xl mx-auto px-4 py-16">
        <h2 className="text-4xl font-bold text-center text-slate-900 mb-12">
          Powerful Features
        </h2>

        <div className="grid grid-cols-1 md:grid-cols-3 gap-8">
          <div className="surface-card p-8 card-hover">
            <FaFileMedical className="text-5xl text-primary mb-4" />
            <h3 className="text-2xl font-bold mb-3 text-slate-900">Report Upload</h3>
            <p className="text-slate-600">Upload medical report images and extract data automatically using OCR.</p>
          </div>

          <div className="surface-card p-8 card-hover">
            <FaLightbulb className="text-5xl text-accent mb-4" />
            <h3 className="text-2xl font-bold mb-3 text-slate-900">AI Simplification</h3>
            <p className="text-slate-600">Get complex medical reports explained in simple language using Gemini AI.</p>
          </div>

          <div className="surface-card p-8 card-hover">
            <FaBell className="text-5xl text-secondary mb-4" />
            <h3 className="text-2xl font-bold mb-3 text-slate-900">Medicine Reminders</h3>
            <p className="text-slate-600">Set timely reminders for your medications and stay organized.</p>
          </div>

          <div className="surface-card p-8 card-hover">
            <FaChartLine className="text-5xl text-primary mb-4" />
            <h3 className="text-2xl font-bold mb-3 text-slate-900">Smart Dashboard</h3>
            <p className="text-slate-600">Track your reports and medicine schedule from one dashboard.</p>
          </div>

          <div className="surface-card p-8 card-hover">
            <FaFileMedical className="text-5xl text-accent mb-4" />
            <h3 className="text-2xl font-bold mb-3 text-slate-900">OCR Extraction</h3>
            <p className="text-slate-600">Automatic text extraction from scanned reports using Tesseract OCR.</p>
          </div>

          <div className="surface-card p-8 card-hover">
            <FaHeart className="text-5xl text-secondary mb-4" />
            <h3 className="text-2xl font-bold mb-3 text-slate-900">Secure & Private</h3>
            <p className="text-slate-600">Your account is protected with JWT authentication and private user data.</p>
          </div>
        </div>
      </div>

      {/* Technology Section */}
      <div className="bg-white py-16 border-t border-slate-200">
        <div className="max-w-7xl mx-auto px-4">
          <h2 className="text-4xl font-bold text-center text-slate-900 mb-12">
            Built with Modern Technology
          </h2>
          <div className="grid grid-cols-2 md:grid-cols-4 gap-6 text-center">
            <div className="p-6 border border-slate-200 rounded-lg">
              <h3 className="text-xl font-bold text-primary">React</h3>
              <p className="text-slate-600">Frontend</p>
            </div>
            <div className="p-6 border border-slate-200 rounded-lg">
              <h3 className="text-xl font-bold text-secondary">Node.js</h3>
              <p className="text-slate-600">Backend</p>
            </div>
            <div className="p-6 border border-slate-200 rounded-lg">
              <h3 className="text-xl font-bold text-accent">MongoDB</h3>
              <p className="text-slate-600">Database</p>
            </div>
            <div className="p-6 border border-slate-200 rounded-lg">
              <h3 className="text-xl font-bold text-indigo-600">Gemini AI</h3>
              <p className="text-slate-600">AI Integration</p>
            </div>
          </div>
        </div>
      </div>
    </div>
  )
}

export default Landing
