'use client';

import { useState } from 'react';
import { useVideoStore } from '../store/video-store';
import { marked } from 'marked';

export default function VideoAnalyzer() {
  const [url, setUrl] = useState('');
  const [question, setQuestion] = useState('');
  const { 
    videoDetails, 
    summary, 
    isLoading,
    isAskingQuestion,
    answer,
    error, 
    setVideoDetails, 
    setSummary,
    setLoading,
    setAskingQuestion,
    setAnswer,
    setError 
  } = useVideoStore();

  const extractVideoId = (url: string) => {
    try {
      const urlObj = new URL(url);
      if (urlObj.hostname.includes('youtube.com')) {
        return urlObj.searchParams.get('v');
      } else if (urlObj.hostname.includes('youtu.be')) {
        return urlObj.pathname.slice(1);
      }
    } catch (error) {
      return null;
    }
    return null;
  };

  const handleAnalyze = async () => {
    const videoId = extractVideoId(url);
    if (!videoId) {
      setError('Invalid YouTube URL');
      return;
    }

    setLoading(true);
    try {
      const response = await fetch('/api/analyze', {
        method: 'POST',
        headers: {
          'Content-Type': 'application/json',
        },
        body: JSON.stringify({ videoId }),
      });

      if (!response.ok) {
        const errorData = await response.json();
        throw new Error(errorData.error || 'Failed to analyze video');
      }

      const data = await response.json();
      console.log('Response data:', data);
      setVideoDetails(data.details);
      setSummary(data.summary);
    } catch (error) {
      setError(error instanceof Error ? error.message : 'An error occurred');
    } finally {
      setLoading(false);
    }
  };

  const handleAskQuestion = async () => {
    if (!question.trim()) return;
    
    setAskingQuestion(true);
    setAnswer(null);
    try {
      const response = await fetch('/api/question', {
        method: 'POST',
        headers: {
          'Content-Type': 'application/json',
        },
        body: JSON.stringify({ 
          transcript: summary,
          question: question.trim() 
        }),
      });

      if (!response.ok) {
        throw new Error('Failed to get answer');
      }

      const data = await response.json();
      setAnswer(data.answer);
      setQuestion('');
    } catch (error) {
      setError(error instanceof Error ? error.message : 'Failed to get answer');
    } finally {
      setAskingQuestion(false);
    }
  };

  return (
    <div className="space-y-8">
      <div className="mb-8">
        <div className="flex gap-4">
          <input
            type="text"
            value={url}
            onChange={(e) => setUrl(e.target.value)}
            placeholder="Enter YouTube URL"
            className="flex-1 p-3 bg-gray-800/50 border border-gray-700 rounded-lg shadow-lg focus:ring-2 focus:ring-blue-500 focus:border-blue-400 text-lg text-gray-200 placeholder-gray-400 backdrop-blur-sm transition-all duration-300"
          />
          <button
            onClick={handleAnalyze}
            disabled={isLoading}
            className="px-6 py-3 bg-gradient-to-r from-blue-600 to-purple-600 text-white rounded-lg hover:from-blue-500 hover:to-purple-500 disabled:opacity-50 font-medium text-lg shadow-lg transition-all duration-300 transform hover:scale-105 hover:shadow-blue-500/25"
          >
            {isLoading ? 'Analyzing...' : 'Analyze'}
          </button>
        </div>
        {error && (
          <p className="mt-2 text-red-500">{error}</p>
        )}
      </div>

      {videoDetails && (
        <div className="space-y-6">
          <div className="bg-gray-800/50 backdrop-blur-md rounded-lg shadow-xl p-6 border border-gray-700 transform transition-all duration-300 hover:scale-[1.01]">
            <h2 className="text-2xl font-bold mb-4 text-transparent bg-clip-text bg-gradient-to-r from-blue-400 to-purple-400">{videoDetails.title}</h2>
          </div>

          {summary && (
            <div className="bg-gray-800/50 backdrop-blur-md rounded-lg shadow-xl p-8 border border-gray-700 transform transition-all duration-300 hover:scale-[1.02]">
              <div className="prose prose-invert max-w-none
                prose-h2:text-4xl prose-h2:font-extrabold prose-h2:mb-8 prose-h2:mt-8 prose-h2:bg-gradient-to-r prose-h2:from-blue-400 prose-h2:to-purple-400 prose-h2:bg-clip-text prose-h2:text-transparent prose-h2:pb-3 prose-h2:tracking-tight prose-h2:border-b prose-h2:border-gray-700
                prose-p:text-gray-300 prose-p:leading-relaxed prose-p:mb-6 prose-p:text-lg
                prose-strong:text-blue-400
                prose-ul:mt-6 prose-ul:space-y-4 prose-ul:list-none
                prose-li:text-gray-300 prose-li:ml-0 prose-li:text-lg
                first:prose-h2:mt-0"
                dangerouslySetInnerHTML={{
                  __html: marked.parse(summary, {
                    gfm: true,
                    breaks: true
                  })
                }}
              />
            </div>
          )}

          {/* Question Section */}
          {summary && (
            <div className="bg-gray-800/50 backdrop-blur-md rounded-lg shadow-xl p-8 border border-gray-700 transform transition-all duration-300 hover:scale-[1.01]">
              <h3 className="text-2xl font-bold mb-6 text-transparent bg-clip-text bg-gradient-to-r from-blue-400 to-purple-400 border-b border-gray-700 pb-3">Ask a Question</h3>
              <div className="flex gap-4">
                <input
                  type="text"
                  value={question}
                  onChange={(e) => setQuestion(e.target.value)}
                  placeholder="Ask anything about the video..."
                  className="flex-1 p-3 border border-gray-300 rounded-lg shadow-sm focus:ring-2 focus:ring-blue-500 focus:border-blue-500 text-lg"
                />
                <button
                  onClick={handleAskQuestion}
                  disabled={isAskingQuestion || !question.trim()}
                  className="px-6 py-3 bg-blue-600 text-white rounded-lg hover:bg-blue-700 disabled:opacity-50 font-medium text-lg shadow-sm transition-colors duration-200"
                >
                  {isAskingQuestion ? 'Thinking...' : 'Ask'}
                </button>
              </div>
              {answer && (
                <div className="mt-6 p-4 rounded-lg bg-gray-900/50 border border-gray-700">
                  <h4 className="font-semibold text-lg mb-3 text-blue-400">Answer:</h4>
                  <p className="text-gray-300 leading-relaxed">{answer}</p>
                </div>
              )}
            </div>
          )}
        </div>
      )}
    </div>
  );
}
