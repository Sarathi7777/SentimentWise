'use client';

import { useState } from 'react';

// Get the API URL from environment variable or fallback to production URL
const API_URL = process.env.NEXT_PUBLIC_API_URL || 'http://localhost:8000';
import { motion } from 'framer-motion';
import { PieChart, Pie, Cell, ResponsiveContainer } from 'recharts';

export default function TextAnalysis() {
  const [text, setText] = useState('');
  const [loading, setLoading] = useState(false);
  const [result, setResult] = useState<null | {
    sentiment: 'positive' | 'negative' | 'neutral';
    score: number;
    confidence: number;
    details: {
      vader_scores: {
        pos: number;
        neu: number;
        neg: number;
        compound: number;
      };
      textblob_score: number;
    };
  }>(null);

  const handleAnalyze = async () => {
    if (!text.trim()) return;
    
    setLoading(true);
    try {
      const response = await fetch(`${API_URL}/analyze/text`, {
        method: 'POST',
        headers: {
          'Content-Type': 'application/json',
        },
        body: JSON.stringify({ text: text.trim() }),
      });
      
      if (!response.ok) {
        throw new Error(`HTTP error! status: ${response.status}`);
      }
      
      const data = await response.json();
      console.log('API Response:', data);
      setResult(data);
    } catch (error) {
      console.error('Error analyzing text:', error);
    } finally {
      setLoading(false);
    }
  };

  const pieData = result ? [
    { name: 'Positive', value: result.details.vader_scores.pos },
    { name: 'Neutral', value: result.details.vader_scores.neu },
    { name: 'Negative', value: result.details.vader_scores.neg }
  ] : [];

  const pieColors = ['#4CAF50', '#9e9e9e', '#f44336'];

  return (
    <div className="container mx-auto px-4 pt-24">
      <div className="mx-auto max-w-4xl">
        {/* Glowing Icon */}
        <div className="mx-auto mb-12 flex max-w-fit items-center justify-center">
          <div className="relative">
            <div className="absolute -inset-1 rounded-full bg-teal-500/30 blur-lg" />
            <div className="relative rounded-full bg-white/5 p-4 backdrop-blur-sm">
              <svg className="h-8 w-8 text-teal-400" fill="none" viewBox="0 0 24 24" stroke="currentColor">
                <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M9 12h6m-6 4h6m2 5H7a2 2 0 01-2-2V5a2 2 0 012-2h5.586a1 1 0 01.707.293l5.414 5.414a1 1 0 01.293.707V19a2 2 0 01-2 2z" />
              </svg>
            </div>
          </div>
        </div>

        {/* Header */}
        <div className="text-center">
          <h1 className="bg-gradient-to-b from-white to-white/70 bg-clip-text text-4xl font-bold tracking-tight text-transparent sm:text-5xl">
            Text Analysis
          </h1>
          <p className="mt-4 text-lg text-gray-400">
            Analyze the sentiment of any text content
          </p>
        </div>

        {/* Main Input Area */}
        <div className="relative mt-12">
          <div className="rounded-2xl border border-white/10 bg-black/20 p-8 backdrop-blur-xl">
            <textarea
              value={text}
              onChange={(e) => setText(e.target.value)}
              placeholder="Enter your text here..."
              className="min-h-[200px] w-full rounded-xl bg-white/5 p-6 text-base text-white placeholder-gray-400 backdrop-blur-sm focus:outline-none focus:ring-2 focus:ring-teal-500/50"
              style={{ resize: 'vertical' }}
            />
            
            <div className="mt-6 flex justify-end">
              <button
                onClick={handleAnalyze}
                disabled={!text.trim() || loading}
                className="relative overflow-hidden rounded-full bg-teal-600 px-8 py-3 text-sm font-medium text-white transition-all hover:bg-teal-500 disabled:opacity-50"
              >
                <span className="relative z-10">
                  {loading ? 'Analyzing...' : 'Analyze Text'}
                </span>
                <div className="absolute inset-0 -z-0 bg-gradient-to-r from-teal-600 via-teal-400 to-teal-600 opacity-0 transition-opacity hover:opacity-100" />
              </button>
            </div>
          </div>
          
          {/* Decorative gradient behind the input box */}
          <div className="absolute -inset-1 -z-10 rounded-2xl bg-gradient-to-r from-teal-600/30 via-teal-400/30 to-blue-500/30 opacity-50 blur-xl transition-all" />
        </div>

        {/* Results Section */}
        {result && (
          <motion.div
            initial={{ opacity: 0, y: 20 }}
            animate={{ opacity: 1, y: 0 }}
            className="mt-12"
          >
            <div className="relative">
              <div className="rounded-2xl border border-white/10 bg-black/20 p-8 backdrop-blur-xl">
                {/* Results Grid */}
                <div className="grid gap-8 md:grid-cols-2">
                  {/* Sentiment Score Card */}
                  <div className="relative overflow-hidden rounded-xl border border-white/10 bg-white/5 p-6 backdrop-blur-sm">
                    <div className="absolute -right-6 -top-6">
                      <div className="relative">
                        <div className="absolute -inset-4 rounded-full bg-teal-500/20 blur-xl" />
                        <svg className="relative h-12 w-12 text-teal-400/80" fill="none" viewBox="0 0 24 24" stroke="currentColor">
                          <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={1.5} d="M9 12l2 2 4-4m6 2a9 9 0 11-18 0 9 9 0 0118 0z" />
                        </svg>
                      </div>
                    </div>
                    <h3 className="mb-4 text-lg font-medium text-white">Overall Sentiment</h3>
                    <div className="mt-2 space-y-4">
                      <div className={`text-3xl font-bold ${result.sentiment === 'positive' ? 'text-green-400' : result.sentiment === 'negative' ? 'text-red-400' : 'text-blue-400'}`}>
                        {result.sentiment.toUpperCase()}
                      </div>
                      <div>
                        <p className="text-sm text-gray-400 mb-1">Sentiment Score</p>
                        <p className="text-2xl font-semibold text-white">{result.score.toFixed(2)}</p>
                      </div>
                    </div>
                  </div>

                  {/* Sentiment Distribution */}
                  <div className="relative overflow-hidden rounded-xl border border-white/10 bg-white/5 p-6 backdrop-blur-sm">
                    <div className="h-[200px]">
                      <ResponsiveContainer width="100%" height="100%">
                        <PieChart>
                          <Pie
                            data={pieData}
                            cx="50%"
                            cy="50%"
                            innerRadius={50}
                            outerRadius={80}
                            paddingAngle={5}
                            dataKey="value"
                          >
                            {pieData.map((entry, index) => (
                              <Cell 
                                key={`cell-${index}`} 
                                fill={pieColors[index]}
                                className="stroke-background stroke-2"
                              />
                            ))}
                          </Pie>
                        </PieChart>
                      </ResponsiveContainer>
                    </div>
                  </div>

                  {/* Detailed Scores */}
                  <div className="relative col-span-2 overflow-hidden rounded-xl border border-white/10 bg-white/5 p-6 backdrop-blur-sm">
                    <h3 className="mb-4 text-lg font-medium text-white">Detailed Analysis</h3>
                    <div className="grid gap-4 md:grid-cols-3">
                      {[
                        { label: 'Positive Score', value: result.details.vader_scores.pos, color: '#4CAF50' },
                        { label: 'Neutral Score', value: result.details.vader_scores.neu, color: '#9e9e9e' },
                        { label: 'Negative Score', value: result.details.vader_scores.neg, color: '#f44336' }
                      ].map((score, index) => (
                        <div key={index} className="relative">
                          <div className="mb-2 text-sm text-gray-400">{score.label}</div>
                          <div className="flex items-center gap-2">
                            <div 
                              className="h-2 flex-1 rounded-full bg-white/10"
                              style={{
                                background: `linear-gradient(to right, ${score.color}cc ${score.value * 100}%, transparent ${score.value * 100}%)`
                              }}
                            />
                            <span className="text-sm font-medium text-white">
                              {(score.value * 100).toFixed(1)}%
                            </span>
                          </div>
                        </div>
                      ))}
                    </div>
                  </div>
                </div>
              </div>
              
              {/* Decorative gradient behind results */}
              <div className="absolute -inset-1 -z-10 rounded-2xl bg-gradient-to-r from-teal-600/30 via-teal-400/30 to-blue-500/30 opacity-50 blur-xl" />
            </div>
          </motion.div>
        )}

        {/* Background Elements */}
        <div className="fixed inset-0 -z-10">
          <div className="absolute inset-0 bg-[radial-gradient(circle_at_center,_var(--tw-gradient-stops))] from-teal-500/10 via-transparent to-transparent" />
          <div className="absolute bottom-0 left-0 right-0 h-[500px] bg-gradient-to-t from-background to-transparent" />
        </div>
      </div>
    </div>
  );
}
