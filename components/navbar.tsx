'use client';

import Link from 'next/link'

export default function Navbar() {
  return (
    <nav className="fixed top-0 z-50 w-full border-b border-white/10 bg-black/20 backdrop-blur-xl">
      <div className="mx-auto flex max-w-7xl items-center justify-between p-4">
        <Link href="/" className="flex items-center space-x-2">
          <span className="text-xl font-bold bg-gradient-to-r from-teal-400 to-teal-600 bg-clip-text text-transparent">
            SentimentWise
          </span>
        </Link>
        
        <div className="flex items-center space-x-6">
          <Link href="/analyze/text" className="text-sm text-gray-300 hover:text-white transition-colors">
            Text Analysis
          </Link>
          <Link href="/analyze/url" className="text-sm text-gray-300 hover:text-white transition-colors">
            URL Analysis
          </Link>
          <Link href="/analyze/hashtag" className="text-sm text-gray-300 hover:text-white transition-colors">
            Hashtag Analysis
          </Link>
          <Link href="/analyze/text" className="rounded-full bg-teal-600 px-4 py-1.5 text-sm font-medium text-white hover:bg-teal-500 transition-colors">
            Get Started
          </Link>
        </div>
      </div>
    </nav>
  )
}
