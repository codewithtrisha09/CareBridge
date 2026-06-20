import React from 'react'
import { FaHeart } from 'react-icons/fa'

const Footer = () => {
  return (
    <footer className="border-t border-slate-200 bg-white">
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-8">
        <div className="flex flex-col md:flex-row md:items-center md:justify-between gap-4">
          <div>
            <p className="text-sm font-semibold text-slate-900">CareBridge</p>
            <p className="text-sm text-slate-600 mt-1">"Healthcare feels easier when information feels human."</p>
          </div>
          <div className="flex items-center text-sm text-slate-600">
            <span>Created by Trisha Shetty, MIT Manipal</span>
            <FaHeart className="ml-2 text-primary" />
          </div>
        </div>
      </div>
    </footer>
  )
}

export default Footer
