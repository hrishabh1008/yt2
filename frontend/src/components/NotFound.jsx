import React from 'react'

const NotFound = () => {
  return (
    <div className="flex flex-col items-center justify-center h-[80vh] text-center">
      <img src="/Youtube.png" alt="Not Found" className="w-32 h-32 mb-6 opacity-80" />
      <h1 className="text-4xl font-bold mb-2 text-gray-800">404</h1>
      <h2 className="text-2xl font-semibold mb-4 text-gray-700">This page isn't available</h2>
      <p className="text-gray-500 mb-8">Sorry, the page you are looking for does not exist or has been moved.</p>
      <a href="/" className="px-6 py-2 bg-blue-600 text-white rounded-full font-semibold hover:bg-blue-700 transition">Go to Home</a>
    </div>
  )
}

export default NotFound