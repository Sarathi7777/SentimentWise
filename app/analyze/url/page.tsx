'use client';

import { useState } from 'react';
import { Input } from '@/components/ui/input';
import { motion } from 'framer-motion';
import { BarChart, Bar, XAxis, YAxis, CartesianGrid, Tooltip, ResponsiveContainer } from 'recharts';

export default function URLAnalysis() {
  const [url, setUrl] = useState('');
  const [loading, setLoading] = useState(false);
  const [result, setResult] = useState<null | {
    sentiment: 'positive' | 'negative' | 'neutral';
    score: number;
    confidence: number;
    wordFrequency: { word: string; count: number }[];
  }>(null);

  const handleAnalyze = async () => {
    if (!url.trim()) return;
    
    setLoading(true);
    try {
      const response = await fetch('http://localhost:8000/analyze/url', {
        method: 'POST',
        headers: {
          'Content-Type': 'application/json',
        },
        body: JSON.stringify({ url }),
      });
      
      if (!response.ok) {
        throw new Error('Failed to analyze URL');
      }
      
      const data = await response.json();
      setResult({
        sentiment: data.sentiment,
        score: data.score,
        confidence: data.confidence,
        wordFrequency: data.wordFrequency
      });
    } catch (error) {
      console.error('Error analyzing URL:', error);
      alert('Failed to analyze URL. Please try again.');
    } finally {
      setLoading(false);
    }
  };

  return (
    <div className="container mx-auto px-4 pt-32">
      <div className="mx-auto max-w-3xl">
        {/* Logo/Icon */}
        <div className="mx-auto mb-12 flex max-w-fit items-center justify-center">
          <div className="relative">
            <div className="absolute -inset-1 rounded-full bg-teal-500/30 blur-lg" />
            <div className="relative rounded-full bg-white/5 p-4 backdrop-blur-sm">
              <svg className="h-8 w-8 text-teal-400" fill="none" viewBox="0 0 24 24" stroke="currentColor">
                <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M13.828 10.172a4 4 0 00-5.656 0l-4 4a4 4 0 105.656 5.656l1.102-1.101m-.758-4.899a4 4 0 005.656 0l4-4a4 4 0 00-5.656-5.656l-1.1 1.1" />
              </svg>
            </div>
          </div>
        </div>

        {/* Header */}
        <div className="text-center">
          <h1 className="bg-gradient-to-b from-white to-white/70 bg-clip-text text-4xl font-bold tracking-tight text-transparent sm:text-5xl">
            URL Analysis
          </h1>
          <p className="mt-4 text-lg text-gray-400">
            Analyze the sentiment of any webpage content
          </p>
        </div>

        {/* Input Section */}
        <div className="relative mt-12">
          <div className="rounded-2xl border border-white/10 bg-black/20 p-8 backdrop-blur-xl">
            <div className="relative">
              <Input
                type="url"
                value={url}
                onChange={(e) => setUrl(e.target.value.trim())}
                placeholder="   Enter URL to analyze"
                className="h-14 bg-white/5 px-6 text-base backdrop-blur-sm"
                icon={
                  <svg className="h-5 w-5 text-gray-400" fill="none" viewBox="0 0 24 24" stroke="currentColor">
                    <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M13.828 10.172a4 4 0 00-5.656 0l-4 4a4 4 0 105.656 5.656l1.102-1.101m-.758-4.899a4 4 0 005.656 0l4-4a4 4 0 00-5.656-5.656l-1.1 1.1" />
                  </svg>
                }
              />
              <button
                onClick={handleAnalyze}
                disabled={!url.trim() || loading}
                className={`mt-4 w-full rounded-lg bg-teal-600 px-4 py-3 text-sm font-medium text-white transition-colors
                  hover:bg-teal-500 focus:outline-none focus:ring-2 focus:ring-teal-500/20
                  ${!url.trim() || loading ? 'cursor-not-allowed opacity-50' : ''}`}
              >
                {loading ? 'Analyzing...' : 'Analyze URL'}
              </button>
            </div>
          </div>
        </div>

        {/* Results Section */}
        {result && (
          <motion.div
            initial={{ opacity: 0, y: 20 }}
            animate={{ opacity: 1, y: 0 }}
            className="mt-12"
          >
            <div className="grid md:grid-cols-2 gap-8">
              <div className="rounded-2xl border border-white/10 bg-black/20 p-8 backdrop-blur-xl">
                <h3 className="text-xl font-semibold text-white mb-4">Analysis Results</h3>
                <div className="space-y-4">
                  <div className="rounded-lg border border-white/5 bg-white/5 p-4">
                    <p className="text-sm text-gray-400">Overall Sentiment</p>
                    <p className="mt-1 text-2xl font-semibold text-white capitalize">{result.sentiment}</p>
                  </div>
                  <div className="rounded-lg border border-white/5 bg-white/5 p-4">
                    <p className="text-sm text-gray-400">Confidence Score</p>
                    <p className="mt-1 text-2xl font-semibold text-white">{(result.confidence * 100).toFixed(1)}%</p>
                  </div>
                </div>
              </div>

              <div className="rounded-2xl border border-white/10 bg-black/20 p-8 backdrop-blur-xl">
                <h3 className="text-xl font-semibold text-white mb-4">Word Frequency</h3>
                <div className="h-64">
                  <ResponsiveContainer width="100%" height="100%">
                    <BarChart
                      data={result.wordFrequency}
                      layout="vertical"
                      margin={{ top: 5, right: 30, left: 40, bottom: 5 }}
                    >
                      <CartesianGrid strokeDasharray="3 3" stroke="#333" />
                      <XAxis type="number" stroke="#999" tick={{ fill: '#999' }} />
                      <YAxis dataKey="word" type="category" width={80} stroke="#999" tick={{ fill: '#999' }} />
                      <Tooltip 
                        contentStyle={{
                          backgroundColor: 'rgba(0, 0, 0, 0.8)',
                          border: '1px solid rgba(255, 255, 255, 0.1)',
                          borderRadius: '8px',
                          color: '#fff'
                        }}
                      />
                      <Bar dataKey="count" fill="#9333EA" radius={[4, 4, 0, 0]} />
                    </BarChart>
                  </ResponsiveContainer>
                </div>
              </div>
            </div>
          </motion.div>
        )}
      </div>

      {/* Background decorative elements */}
      <div className="fixed inset-0 -z-10">
        <div className="absolute inset-0 bg-[radial-gradient(circle_at_center,_var(--tw-gradient-stops))] from-teal-500/10 via-transparent to-transparent" />
      </div>
    </div>
  );
}
