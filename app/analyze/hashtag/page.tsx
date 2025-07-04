'use client';

import { useState } from 'react';
import { Input } from '@/components/ui/input';
import { motion } from 'framer-motion';
import { LineChart, Line, XAxis, YAxis, CartesianGrid, Tooltip, ResponsiveContainer } from 'recharts';
import { cn } from '@/lib/utils';

// Get the API URL from environment variable or fallback to production URL
const API_URL = process.env.NEXT_PUBLIC_API_URL || 'https://sentimentscope-j7sl.onrender.com';

export default function HashtagAnalysis() {
  const [hashtag, setHashtag] = useState('');
  const [loading, setLoading] = useState(false);
  const [error, setError] = useState<string | null>(null);
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
    timeline: {
      time: string;
      sentiment: number;
      volume: number;
    }[];
  }>(null);

  const handleHashtagChange = (e: React.ChangeEvent<HTMLInputElement>) => {
    // Remove any special characters and spaces
    const cleanedHashtag = e.target.value.replace(/[^a-zA-Z0-9_]/g, '');
    setHashtag(cleanedHashtag);
    setError(null);
  };

  const handleAnalyze = async () => {
    if (!hashtag.trim()) {
      setError('Please enter a hashtag');
      return;
    }
    
    if (hashtag.length < 2) {
      setError('Hashtag must be at least 2 characters long');
      return;
    }
    
    setLoading(true);
    setError(null);
    try {
      const cleanHashtag = hashtag.trim().replace(/^#/, '');
      
      // Debug logging
      console.log('Environment:', {
        NEXT_PUBLIC_API_URL: process.env.NEXT_PUBLIC_API_URL,
        API_URL: API_URL
      });
      
      console.log('Request details:', {
        url: `${API_URL}/analyze/hashtag`,
        hashtag: cleanHashtag
      });
      
      const response = await fetch(`${API_URL}/analyze/hashtag`, {
        method: 'POST',
        headers: {
          'Content-Type': 'application/json',
          'Accept': 'application/json',
        },
        body: JSON.stringify({ hashtag: cleanHashtag }),
      });
      
      // Log response details
      console.log('Response details:', {
        status: response.status,
        statusText: response.statusText,
        headers: Object.fromEntries(response.headers.entries())
      });
      
      if (!response.ok) {
        const errorText = await response.text();
        console.error('Error response:', errorText);
        throw new Error(errorText || `HTTP error! status: ${response.status}`);
      }
      
      const data = await response.json();
      console.log('API Response:', data);
      setResult({
        sentiment: data.sentiment,
        score: data.score,
        confidence: data.confidence,
        details: {
          vader_scores: data.details.vader_scores,
          textblob_score: data.details.textblob_score
        },
        timeline: data.timeline || []
      });
    } catch (error: unknown) {
      console.error('Full error details:', error);
      const errorMessage = error instanceof Error ? error.message : 'Unknown error';
      setError(`Failed to analyze hashtag. Please try again later.\n\nError: ${errorMessage}`);
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
                <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M7 20l4-16m2 16l4-16M6 9h14M4 15h14" />
              </svg>
            </div>
          </div>
        </div>

        {/* Header */}
        <div className="text-center">
          <h1 className="bg-gradient-to-b from-white to-white/70 bg-clip-text text-4xl font-bold tracking-tight text-transparent sm:text-5xl">
            Hashtag Analysis
          </h1>
          <p className="mt-4 text-lg text-gray-400">
            Track sentiment trends across social media
          </p>
        </div>

        {/* Input Section */}
        <div className="relative mt-12">
          <div className="rounded-2xl border border-white/10 bg-black/20 p-8 backdrop-blur-xl">
            <div className="relative">
              <Input
                type="text"
                value={hashtag}
                onChange={handleHashtagChange}
                placeholder="  Enter hashtag (without #)"
                className="h-14 bg-white/5 px-6 text-base backdrop-blur-sm"
                autoComplete="off"
                icon={
                  <svg className="h-5 w-5 text-gray-400" fill="none" viewBox="0 0 24 24" stroke="currentColor">
                    <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M7 20l4-16m2 16l4-16M6 9h14M4 15h14" />
                  </svg>
                }
              />
              <button
                onClick={handleAnalyze}
                disabled={!hashtag.trim() || loading}
                className={cn(
                  "mt-4 w-full rounded-lg bg-teal-600 px-4 py-3 text-sm font-medium text-white transition-colors",
                  "hover:bg-teal-500 focus:outline-none focus:ring-2 focus:ring-teal-500/20",
                  "disabled:cursor-not-allowed disabled:opacity-50"
                )}
              >
                {loading ? 'Analyzing...' : 'Analyze Hashtag'}
              </button>
              
              {/* Error Message */}
              {error && (
                <div className="mt-4 rounded-lg border border-red-500/10 bg-red-500/5 p-4 text-sm text-red-400">
                  {error}
                </div>
              )}
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
            <div className="rounded-2xl border border-white/10 bg-black/20 p-8 backdrop-blur-xl">
              <h3 className="text-2xl font-bold mb-4">Text Analysis</h3>
              
              {/* Sentiment Score */}
              <div className="mb-6">
                <h4 className="text-lg font-semibold text-gray-300">Sentiment Score</h4>
                <p className="text-3xl font-bold">{result.score.toFixed(2)}</p>
                <p className="text-sm text-gray-400">Overall sentiment intensity</p>
              </div>

              {/* Detailed Analysis */}
              <div className="space-y-4">
                <h4 className="text-lg font-semibold text-gray-300">Detailed Analysis</h4>
                
                {/* Positive Score */}
                <div className="relative pt-1">
                  <div className="flex items-center justify-between">
                    <div>
                      <span className="text-xs font-semibold inline-block text-green-400">
                        Positive Score
                      </span>
                    </div>
                    <div className="text-right">
                      <span className="text-xs font-semibold inline-block text-green-400">
                        {(result.details.vader_scores.pos * 100).toFixed(1)}%
                      </span>
                    </div>
                  </div>
                  <div className="overflow-hidden h-2 mb-4 text-xs flex rounded bg-green-400/20">
                    <div style={{ width: `${result.details.vader_scores.pos * 100}%` }}
                         className="shadow-none flex flex-col text-center whitespace-nowrap text-white justify-center bg-green-400">
                    </div>
                  </div>
                </div>

                {/* Neutral Score */}
                <div className="relative pt-1">
                  <div className="flex items-center justify-between">
                    <div>
                      <span className="text-xs font-semibold inline-block text-blue-400">
                        Neutral Score
                      </span>
                    </div>
                    <div className="text-right">
                      <span className="text-xs font-semibold inline-block text-blue-400">
                        {(result.details.vader_scores.neu * 100).toFixed(1)}%
                      </span>
                    </div>
                  </div>
                  <div className="overflow-hidden h-2 mb-4 text-xs flex rounded bg-blue-400/20">
                    <div style={{ width: `${result.details.vader_scores.neu * 100}%` }}
                         className="shadow-none flex flex-col text-center whitespace-nowrap text-white justify-center bg-blue-400">
                    </div>
                  </div>
                </div>

                {/* Negative Score */}
                <div className="relative pt-1">
                  <div className="flex items-center justify-between">
                    <div>
                      <span className="text-xs font-semibold inline-block text-red-400">
                        Negative Score
                      </span>
                    </div>
                    <div className="text-right">
                      <span className="text-xs font-semibold inline-block text-red-400">
                        {(result.details.vader_scores.neg * 100).toFixed(1)}%
                      </span>
                    </div>
                  </div>
                  <div className="overflow-hidden h-2 mb-4 text-xs flex rounded bg-red-400/20">
                    <div style={{ width: `${result.details.vader_scores.neg * 100}%` }}
                         className="shadow-none flex flex-col text-center whitespace-nowrap text-white justify-center bg-red-400">
                    </div>
                  </div>
                </div>
              </div>

              <div className="h-64 mt-8">
                <ResponsiveContainer width="100%" height="100%">
                  <LineChart
                    data={result.timeline}
                    margin={{ top: 5, right: 30, left: 20, bottom: 5 }}
                  >
                    <CartesianGrid strokeDasharray="3 3" stroke="#333" />
                    <XAxis dataKey="time" stroke="#999" />
                    <YAxis yAxisId="left" stroke="#4F46E5" />
                    <YAxis yAxisId="right" orientation="right" stroke="#10B981" />
                    <Tooltip 
                      contentStyle={{
                        backgroundColor: 'rgba(0, 0, 0, 0.8)',
                        border: '1px solid rgba(255, 255, 255, 0.1)',
                        borderRadius: '8px',
                        color: '#fff'
                      }}
                    />
                    <Line
                      yAxisId="left"
                      type="monotone"
                      dataKey="sentiment"
                      name="Sentiment"
                      stroke="#4F46E5"
                      activeDot={{ r: 8 }}
                    />
                    <Line
                      yAxisId="right"
                      type="monotone"
                      dataKey="volume"
                      name="Volume"
                      stroke="#10B981"
                      activeDot={{ r: 8 }}
                    />
                  </LineChart>
                </ResponsiveContainer>
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
