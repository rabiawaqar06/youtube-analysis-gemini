# YouTube Video Analyzer with Gemini AI

A modern, full-stack Next.js application that leverages Google Gemini AI to analyze YouTube videos. The app extracts video transcripts, generates structured summaries, and provides an interactive Q&A feature—all in a beautiful, responsive, and dark-themed UI.

---

## ✨ Features

- **YouTube Video Analysis**: Enter any YouTube URL to fetch video details and captions.
- **AI-Powered Summaries**: Get a structured, markdown-formatted summary with key takeaways and main topics.
- **Ask Questions**: Interactively ask questions about the video content and get AI-generated answers.
- **Modern UI**: Professional, dark-themed interface with glassmorphism, gradients, and smooth animations.
- **Responsive Design**: Works seamlessly on desktop and mobile devices.

---

![LLM UI Screenshot](LLM-UI(1).png)

![LLM UI Screenshot](LLM-UI(2).png)

![LLM UI Screenshot](LLM-UI(3).png)

---

## 🛠️ Tech Stack

- **Frontend**: Next.js 14+, React 19, TypeScript, TailwindCSS
- **AI/ML**: Google Gemini AI (gemini-2.0-flash model)
- **APIs**:
  - YouTube Data API v3 (for video metadata)
  - RapidAPI (for YouTube transcript extraction)
  - Google Gemini AI API (for analysis and Q&A)
- **Markdown Rendering**: [marked](https://www.npmjs.com/package/marked)

---

## 🚀 Getting Started

### 1. Clone the Repository

```bash
git clone https://github.com/rabiawaqar06/youtube-analysis-gemini.git
cd new-gemini-app
```

### 2. Install Dependencies

```bash
npm install
```

### 3. Set Up Environment Variables

Create a `.env.local` file in the root directory:

```env
NEXT_PUBLIC_GOOGLE_API_KEY=your_gemini_api_key
NEXT_PUBLIC_YOUTUBE_API_KEY=your_youtube_api_key
NEXT_PUBLIC_RAPID_API_KEY=your_rapidapi_key
```


### 4. Run the Development Server

```bash
npm run dev
```

Visit [http://localhost:3000](http://localhost:3000) to use the app.

---

## 🗂️ Project Structure

```
new-gemini-app/
├── src/
│   ├── app/                # Next.js app directory (routing, API endpoints)
│   ├── components/         # React UI components
│   ├── lib/                # API and AI integration logic
│   └── store/              # Zustand state management
├── public/                 # Static assets
├── .env.local              # Environment variables (not committed)
├── package.json            # Project metadata and scripts
├── tailwind.config.js      # TailwindCSS configuration
├── postcss.config.js       # PostCSS configuration
├── tsconfig.json           # TypeScript configuration
└── README.md               # Project documentation
```

---

## 🧩 Key Files

- `src/components/VideoAnalyzer.tsx` — Main UI component for analysis and Q&A
- `src/lib/youtube-gemini.ts` — Handles YouTube, RapidAPI, and Gemini AI integration
- `src/app/api/analyze/route.ts` — API route for video analysis
- `src/app/api/question/route.ts` — API route for Q&A
- `src/store/video-store.ts` — Zustand store for global state

---

## 📝 Usage

1. **Paste a YouTube URL** and click "Analyze".
2. **View the summary**: See a structured, easy-to-read analysis with bold headers and bullet points.
3. **Ask questions**: Use the "Ask a Question" box to get AI-powered answers about the video content.

---

## 🔑 Environment Variables

Create a `.env.local` file with:

```env
NEXT_PUBLIC_GOOGLE_API_KEY=your_gemini_api_key
NEXT_PUBLIC_YOUTUBE_API_KEY=your_youtube_api_key
NEXT_PUBLIC_RAPID_API_KEY=your_rapidapi_key
```

---

## 🤝 Contributing

1. Fork the repo
2. Create your feature branch (`git checkout -b feature/YourFeature`)
3. Commit your changes (`git commit -m 'Add some feature'`)
4. Push to the branch (`git push origin feature/YourFeature`)
5. Open a Pull Request

---

## 📄 License

This project is licensed under the MIT License.

---

## 🙏 Acknowledgments

- [Google Gemini AI](https://ai.google.dev/)
- [YouTube Data API](https://developers.google.com/youtube/v3)
- [RapidAPI YouTube Transcript](https://rapidapi.com/)
- [marked](https://www.npmjs.com/package/marked)
- [TailwindCSS](https://tailwindcss.com/)
- [Next.js](https://nextjs.org/)

---

> Built with ❤️ and AI.
