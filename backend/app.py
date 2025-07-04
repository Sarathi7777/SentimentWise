from fastapi import FastAPI, HTTPException
from fastapi.middleware.cors import CORSMiddleware
from pydantic import BaseModel
import json
from textblob import TextBlob
import requests
from bs4 import BeautifulSoup
import re

app = FastAPI()

# Enable CORS
app.add_middleware(
    CORSMiddleware,
    allow_origins=["*"],  # In production, replace with your frontend URL
    allow_credentials=True,
    allow_methods=["*"],
    allow_headers=["*"],
)

def analyze_sentiment(text: str):
    analysis = TextBlob(text)
    # Get the polarity score (-1 to 1)
    score = analysis.sentiment.polarity
    
    # Determine sentiment label
    if score > 0:
        sentiment = "positive"
    elif score < 0:
        sentiment = "negative"
    else:
        sentiment = "neutral"
        
    # Calculate confidence (0 to 1)
    confidence = abs(score)
    
    return {
        "sentiment": sentiment,
        "score": score,
        "confidence": confidence
    }

class HashtagRequest(BaseModel):
    hashtag: str

class URLRequest(BaseModel):
    url: str

@app.post("/analyze/hashtag")
async def analyze_hashtag(request: HashtagRequest):
    try:
        # Remove # if present
        hashtag = request.hashtag.strip("#")
        
        if not hashtag:
            raise HTTPException(status_code=400, detail="Hashtag is required")
        
        # For demo purposes, using a mock response
        # In production, you would use Twitter API to get real tweets
        mock_tweets = [
            "This is amazing! #" + hashtag,
            "Love this so much #" + hashtag,
            "Not bad, could be better #" + hashtag,
        ]
        
        # Combine all tweets
        combined_text = " ".join(mock_tweets)
        
        # Get sentiment analysis
        result = analyze_sentiment(combined_text)
        
        # Add mock timeline data
        result["timeline"] = [
            {"time": "00:00", "sentiment": result["score"] - 0.2, "volume": 12},
            {"time": "04:00", "sentiment": result["score"] - 0.1, "volume": 18},
            {"time": "08:00", "sentiment": result["score"], "volume": 25},
            {"time": "12:00", "sentiment": result["score"] + 0.1, "volume": 30},
            {"time": "16:00", "sentiment": result["score"] + 0.05, "volume": 28},
            {"time": "20:00", "sentiment": result["score"] + 0.15, "volume": 22}
        ]
        
        return result
        
    except Exception as e:
        raise HTTPException(status_code=500, detail=str(e))

@app.post("/analyze/url")
async def analyze_url(request: URLRequest):
    try:
        if not request.url:
            raise HTTPException(status_code=400, detail="URL is required")
        
        # Fetch webpage content
        headers = {'User-Agent': 'Mozilla/5.0'}
        response = requests.get(request.url, headers=headers)
        response.raise_for_status()
        
        # Parse HTML
        soup = BeautifulSoup(response.text, 'html.parser')
        
        # Extract text content
        text = soup.get_text()
        
        # Clean text
        text = re.sub(r'\s+', ' ', text).strip()
        
        # Get sentiment analysis
        result = analyze_sentiment(text)
        
        # Add word frequency
        words = text.lower().split()
        word_freq = {}
        for word in words:
            if len(word) > 3:  # Only count words longer than 3 characters
                word_freq[word] = word_freq.get(word, 0) + 1
        
        # Sort by frequency and get top 10
        word_freq = sorted(word_freq.items(), key=lambda x: x[1], reverse=True)[:10]
        result["wordFrequency"] = [{"word": word, "count": count} for word, count in word_freq]
        
        return result
        
    except Exception as e:
        raise HTTPException(status_code=500, detail=str(e))

if __name__ == "__main__":
    import uvicorn
    uvicorn.run(app, host="0.0.0.0", port=8000)
