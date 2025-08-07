import { create } from 'zustand';
import { VideoDetails, TranscriptSegment } from '../lib/youtube-gemini';

interface VideoState {
  videoDetails: VideoDetails | null;
  transcript: TranscriptSegment[];
  summary: string | null;
  isLoading: boolean;
  isAskingQuestion: boolean;
  answer: string | null;
  error: string | null;
  setVideoDetails: (details: VideoDetails | null) => void;
  setTranscript: (transcript: TranscriptSegment[]) => void;
  setSummary: (summary: string | null) => void;
  setLoading: (loading: boolean) => void;
  setAskingQuestion: (loading: boolean) => void;
  setAnswer: (answer: string | null) => void;
  setError: (error: string | null) => void;
}

export const useVideoStore = create<VideoState>((set) => ({
  videoDetails: null,
  transcript: [],
  summary: null,
  isLoading: false,
  isAskingQuestion: false,
  answer: null,
  error: null,
  setVideoDetails: (details) => set({ videoDetails: details }),
  setTranscript: (transcript) => set({ transcript }),
  setSummary: (summary) => set({ summary }),
  setLoading: (loading) => set({ isLoading: loading }),
  setAskingQuestion: (loading) => set({ isAskingQuestion: loading }),
  setAnswer: (answer) => set({ answer }),
  setError: (error) => set({ error }),
}));
