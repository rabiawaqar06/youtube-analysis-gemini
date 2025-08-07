import { google } from 'googleapis';
import { GoogleGenerativeAI } from '@google/generative-ai';
import axios from 'axios';

// Initialize Gemini AI
const genAI = new GoogleGenerativeAI(process.env.NEXT_PUBLIC_GOOGLE_API_KEY!);
const model = genAI.getGenerativeModel({ model: 'gemini-2.0-flash' });

// Initialize YouTube API
const youtube = google.youtube('v3');

export interface VideoDetails {
  title: string;
  description: string;
  videoId: string;
}

export interface TranscriptSegment {
  text: string;
  offset: number;
  duration: number;
}

export async function getVideoDetails(videoId: string): Promise<VideoDetails> {
  try {
    console.log('Using YouTube API Key:', process.env.NEXT_PUBLIC_YOUTUBE_API_KEY?.slice(0, 5) + '...');
    console.log('Using Gemini API Key:', process.env.NEXT_PUBLIC_GOOGLE_API_KEY?.slice(0, 5) + '...');
    const response = await youtube.videos.list({
      key: process.env.NEXT_PUBLIC_YOUTUBE_API_KEY,
      part: ['snippet'],
      id: [videoId],
    });

    const video = response.data.items?.[0];
    if (!video || !video.snippet) {
      throw new Error('Video not found');
    }

    return {
      title: video.snippet.title || '',
      description: video.snippet.description || '',
      videoId,
    };
  } catch (error) {
    console.error('Error fetching video details:', error);
    throw error;
  }
}

export async function getTranscript(videoId: string): Promise<TranscriptSegment[]> {
  try {
    const response = await axios.get(`https://youtube-captions-transcript-subtitles-video-combiner.p.rapidapi.com/download-all/${videoId}?format_subtitle=srt&format_answer=json`, {
      headers: {
        'X-RapidAPI-Key': process.env.NEXT_PUBLIC_RAPID_API_KEY!,
        'X-RapidAPI-Host': 'youtube-captions-transcript-subtitles-video-combiner.p.rapidapi.com'
      }
    });

    if (!response.data || !Array.isArray(response.data)) {
      console.error('Unexpected API response:', response.data);
      throw new Error('Unexpected response format from transcript API');
    }

    // Log the first item to help debug the response format
    if (response.data.length > 0) {
      console.log('First transcript item:', response.data[0]);
    }

    const segments = response.data.map((sub: any) => {
      if (!sub.subtitle && !sub.text) {
        console.warn('Missing text in transcript segment:', sub);
      }
      return {
        text: sub.subtitle || sub.text || '',
        offset: Math.floor((sub.start || sub.timeStamp || 0) * 1000),
        duration: Math.floor(((sub.end || sub.duration || 0) - (sub.start || sub.timeStamp || 0)) * 1000)
      };
    });

    return segments;
  } catch (error) {
    console.error('Error fetching transcript:', error);
    throw error;
  }
}

export async function generateSummary(transcript: string) {
  try {
    const prompt = `Analyze this video transcript and provide the following analysis. Use proper markdown formatting:

    ## Summary
    [Provide a clear, structured summary in 2-3 paragraphs. Make sure to use proper sentence structure and paragraph breaks.]

    ## Key Takeaways
    * **[First key point]:** [Detailed explanation]
    * **[Second key point]:** [Detailed explanation]
    * **[Third key point]:** [Detailed explanation]
    * **[Fourth key point]:** [Detailed explanation]
    * **[Fifth key point]:** [Detailed explanation]

    ## Main Topics
    * **[Primary Topic]**: [Brief description]
    * **[Secondary Topic]**: [Brief description]
    * **[Additional Topic]**: [Brief description]
    * **[Other Topics]**: [Brief description]

    Transcript: ${transcript}`;
    
    const result = await model.generateContent(prompt);
    const response = await result.response;
    return response.text();
  } catch (error) {
    console.error('Error generating summary:', error);
    throw error;
  }
}

export async function answerQuestion(transcript: string, question: string) {
  try {
    const prompt = `Based on this video transcript, please answer the following question:
    
    Transcript: ${transcript}
    Question: ${question}
    
    Please provide a clear and concise answer based only on the information available in the transcript.`;

    const result = await model.generateContent(prompt);
    const response = await result.response;
    return response.text();
  } catch (error) {
    console.error('Error answering question:', error);
    throw error;
  }
}
