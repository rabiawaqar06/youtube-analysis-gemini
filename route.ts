import { NextResponse } from 'next/server';
import { answerQuestion } from '../../../lib/youtube-gemini';

export async function POST(request: Request) {
  try {
    const { transcript, question } = await request.json();
    
    if (!transcript || !question) {
      return NextResponse.json(
        { error: 'Transcript and question are required' },
        { status: 400 }
      );
    }

    const answer = await answerQuestion(transcript, question);
    return NextResponse.json({ answer });

  } catch (error) {
    console.error('Error answering question:', error);
    return NextResponse.json(
      { error: 'Failed to answer question' },
      { status: 500 }
    );
  }
}
