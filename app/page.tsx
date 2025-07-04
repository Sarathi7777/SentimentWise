'use client';

import Link from 'next/link';

export default function Home() {
  return (
    <div className="relative min-h-screen">
      {/* Announcement Banner */}
      <div className="relative z-10 mx-auto mt-24 flex max-w-fit items-center justify-center space-x-2 overflow-hidden rounded-full border border-white/10 bg-white/5 px-7 py-2 backdrop-blur">
        <span className="text-sm text-teal-400">New: AI-powered sentiment analysis Tool</span>
      </div>

      {/* Hero Section */}
      <div className="relative z-10 mx-auto mt-16 max-w-5xl text-center">
        <h1 className="bg-gradient-to-b from-white to-white/70 bg-clip-text text-6xl font-bold tracking-tight text-transparent sm:text-5xl">
          Deeper Insights with
          <br />
          SentiWise
        </h1>
        <p className="mt-6 text-lg text-gray-400">
          Never miss a sentiment, emotion, or insight in your text.
        </p>
        <div className="mt-10 flex items-center justify-center gap-x-6">
          <Link 
            href="/analyze/text" 
            className="rounded-full bg-teal-600 px-8 py-3 text-sm font-medium text-white hover:bg-teal-500 transition-colors"
          >
            Start analyzing
          </Link>
        </div>
      </div>

      {/* Feature Cards */}
      <div className="relative z-10 mx-auto mt-32 max-w-7xl px-6">
        <div className="grid grid-cols-1 gap-8 sm:grid-cols-2 lg:grid-cols-3">
          {features.map((feature, index) => (
            <div
              key={index}
              className="group relative rounded-3xl border border-white/10 bg-white/5 p-8 hover:bg-white/10 transition-colors"
            >
              <div className="flex h-12 w-12 items-center justify-center rounded-full bg-teal-600/10">
                {feature.icon}
              </div>
              <h3 className="mt-6 text-xl font-semibold text-white">{feature.title}</h3>
              <p className="mt-2 text-gray-400">{feature.description}</p>
              <Link href={feature.link} className="mt-4 inline-block rounded-full bg-teal-600 px-6 py-2 text-sm font-medium text-white hover:bg-teal-500 transition-colors">Get Started</Link>
            </div>
          ))}
        </div>
      </div>

      {/* Decorative Elements */}
      <div className="fixed left-1/2 top-1/2 -z-10 -translate-x-1/2 -translate-y-1/2">
        <div className="h-[40rem] w-[40rem] rounded-full bg-teal-600/20 blur-3xl" />
      </div>
    </div>
  )
}

const features = [
  {
    title: 'Text Analysis',
    description: 'Analyze sentiment in any text with advanced NLP algorithms.',
    link: '/analyze/text',
    icon: (
      <svg className="h-6 w-6 text-teal-400" fill="none" viewBox="0 0 24 24" stroke="currentColor">
        <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M9 12h6m-6 4h6m2 5H7a2 2 0 01-2-2V5a2 2 0 012-2h5.586a1 1 0 01.707.293l5.414 5.414a1 1 0 01.293.707V19a2 2 0 01-2 2z" />
      </svg>
    ),
  },
  {
    title: 'URL Analysis',
    description: 'Extract and analyze sentiment from any webpage content.',
    link: '/analyze/url',
    icon: (
      <svg className="h-6 w-6 text-teal-400" fill="none" viewBox="0 0 24 24" stroke="currentColor">
        <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M13.828 10.172a4 4 0 00-5.656 0l-4 4a4 4 0 105.656 5.656l1.102-1.101m-.758-4.899a4 4 0 005.656 0l4-4a4 4 0 00-5.656-5.656l-1.1 1.1" />
      </svg>
    ),
  },
  {
    title: 'Hashtag Analysis',
    description: 'Track sentiment trends across social media hashtags.',
    link: '/analyze/hashtag',
    icon: (
      <svg className="h-6 w-6 text-teal-400" fill="none" viewBox="0 0 24 24" stroke="currentColor">
        <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M7 20l4-16m2 16l4-16M6 9h14M4 15h14" />
      </svg>
    ),
  },
]
