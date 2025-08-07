import ClientVideoAnalyzer from '../components/ClientVideoAnalyzer';

export default function Home() {
  return (
    <main className="min-h-screen p-8">
      <div className="max-w-4xl mx-auto">
        <div className="text-center mb-12 animate-fade-in">
          <h1 className="text-5xl font-bold mb-3 bg-clip-text text-transparent bg-gradient-to-r from-blue-400 to-purple-400">
            YouTube Video Analyzer
          </h1>
          <p className="text-gray-300 text-lg">Analyze YouTube videos with AI-powered insights and summaries</p>
        </div>
        <ClientVideoAnalyzer />
      </div>
    </main>
  );
}
