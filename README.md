# 🎯 SentimentWise

SentimentWise is a modern web application for analyzing sentiment across different sources - URLs, hashtags, and text. Built with Next.js, FastAPI, and TextBlob, it features a beautiful dark theme UI with glass morphism effects.

🌐 **[Live Demo](https://sentiment-wise.vercel.app/)**


## ✨ Features

- 🌐 **URL Analysis**: Extract and analyze sentiment from any webpage
- 🔍 **Hashtag Analysis**: Track sentiment trends across social media
- 📊 **Visual Analytics**: Beautiful charts and metrics using Recharts
- 🎨 **Modern UI**: Sleek dark theme with glass morphism effects
- ⚡ **Fast Processing**: Powered by FastAPI backend
- 📱 **Responsive Design**: Works seamlessly on all devices

## 🚀 Getting Started

### Prerequisites

- Node.js 18+ and npm
- Python 3.8+
- pip (Python package manager)

### Installation

1. Clone the repository:
   ```bash
   git clone https://github.com/Sarathi7777/SentimentWise.git
   cd SentimentWise
   ```

2. Install frontend dependencies:
   ```bash
   npm install
   ```

3. Install backend dependencies:
   ```bash
   cd backend
   pip install -r requirements.txt
   ```

### Running the Application

1. Start the backend server:
   ```bash
   cd backend
   uvicorn app:app --reload
   ```

2. In a new terminal, start the frontend:
   ```bash
   npm run dev
   ```

3. Open [http://localhost:3000](http://localhost:3000) in your browser

## 🛠️ Tech Stack

### Frontend
- **Next.js** - React framework
- **Tailwind CSS** - Styling
- **Framer Motion** - Animations
- **Recharts** - Data visualization

### Backend
- **FastAPI** - API framework
- **TextBlob** - Natural Language Processing
- **BeautifulSoup4** - Web scraping
- **Python-Twitter** - Twitter API integration

## 📦 Project Structure

```
sentiment-scope/
├── app/                    # Next.js pages and components
│   ├── analyze/           # Analysis pages (URL, hashtag)
│   └── layout.tsx         # Root layout
├── components/            # Reusable React components
├── backend/              # FastAPI server
│   ├── app.py            # Main API endpoints
│   └── requirements.txt  # Python dependencies
└── lib/                  # Utility functions
```

## 👨‍💻 Author

**Sarathi**
- GitHub: [@sarathi7777](https://github.com/Sarathi7777/)


### Running the Application

1. Start the frontend development server:
   ```bash
   npm run dev
   # or
   yarn dev
   ```

2. Start the backend API server:
   ```bash
   cd api
   uvicorn main:app --reload
   ```

3. Open [http://localhost:3000](http://localhost:3000) in your browser

## API Documentation

The backend API provides the following endpoints:

- `POST /analyze/text` - Analyze text sentiment
- `POST /analyze/url` - Analyze webpage content sentiment
- `POST /analyze/hashtag` - Analyze social media hashtag sentiment

For detailed API documentation, visit [http://localhost:8000/docs](http://localhost:8000/docs) when the backend server is running.

## Learn More

To learn more about Next.js, take a look at the following resources:

- [Next.js Documentation](https://nextjs.org/docs) - learn about Next.js features and API.
- [Learn Next.js](https://nextjs.org/learn) - an interactive Next.js tutorial.

You can check out [the Next.js GitHub repository](https://github.com/vercel/next.js) - your feedback and contributions are welcome!

## Deploy on Vercel

The easiest way to deploy your Next.js app is to use the [Vercel Platform](https://vercel.com/new?utm_medium=default-template&filter=next.js&utm_source=create-next-app&utm_campaign=create-next-app-readme) from the creators of Next.js.

Check out our [Next.js deployment documentation](https://nextjs.org/docs/app/building-your-application/deploying) for more details.

## 🤝 Contributing

Contributions, issues, and feature requests are welcome! Feel free to check issues page.

## 📝 License

This project is open source and available under the MIT License.

---
Created with Pure ❤️
