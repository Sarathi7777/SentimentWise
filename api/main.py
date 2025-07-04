from fastapi import FastAPI, HTTPException
from fastapi.middleware.cors import CORSMiddleware
from pydantic import BaseModel
from textblob import TextBlob
import requests
from bs4 import BeautifulSoup
import nltk
from typing import Optional

# Download required NLTK data
nltk.download('punkt')
nltk.download('averaged_perceptron_tagger')

app = FastAPI(title="SentimentScope API")

# Configure CORS
app.add_middleware(
    CORSMiddleware,
    allow_origins=["http://localhost:3000"],
    allow_credentials=True,
    allow_methods=["*"],
    allow_headers=["*"],
)

class TextInput(BaseModel):
    text: str

class URLInput(BaseModel):
    url: str

class HashtagInput(BaseModel):
    hashtag: str

class SentimentResponse(BaseModel):
    sentiment: str
    score: float
    confidence: float

class HashtagResponse(BaseModel):
    sentiment: str
    score: float
    confidence: float

def analyze_sentiment(text: str) -> SentimentResponse:
    """Analyze sentiment of given text using TextBlob."""
    blob = TextBlob(text)
    polarity = blob.sentiment.polarity
    subjectivity = blob.sentiment.subjectivity
    
    # Determine sentiment category
    if polarity > 0:
        sentiment = "positive"
    elif polarity < 0:
        sentiment = "negative"
    else:
        sentiment = "neutral"
    
    # Convert polarity to a 0-1 scale
    score = (polarity + 1) / 2
    
    # Use subjectivity as a proxy for confidence
    confidence = 1 - abs(0.5 - subjectivity) * 2
    
    return SentimentResponse(
        sentiment=sentiment,
        score=score,
        confidence=confidence
    )

@app.post("/analyze/text", response_model=SentimentResponse)
async def analyze_text(input: TextInput):
    """Analyze sentiment of provided text."""
    try:
        return analyze_sentiment(input.text)
    except Exception as e:
        raise HTTPException(status_code=500, detail=str(e))

@app.post("/analyze/url", response_model=SentimentResponse)
async def analyze_url(input: URLInput):
    """Analyze sentiment of text content from a URL."""
    try:
        # Fetch URL content
        response = requests.get(input.url)
        response.raise_for_status()
        
        # Parse HTML and extract text
        soup = BeautifulSoup(response.text, 'html.parser')
        text = ' '.join([p.get_text() for p in soup.find_all('p')])
        
        return analyze_sentiment(text)
    except requests.RequestException as e:
        raise HTTPException(status_code=400, detail=f"Error fetching URL: {str(e)}")
    except Exception as e:
        raise HTTPException(status_code=500, detail=str(e))

@app.post("/analyze/hashtag", response_model=HashtagResponse)
async def analyze_hashtag(input: HashtagInput):
    """
    Analyze sentiment of a hashtag.
    This is a simplified implementation that analyzes the hashtag text itself.
    For a production app, you would want to integrate with social media APIs
    to analyze actual posts containing the hashtag.
    """
    try:
        # Remove '#' if present and analyze the text
        hashtag_text = input.hashtag.lstrip('#').replace('_', ' ')
        return analyze_sentiment(hashtag_text)
    except Exception as e:
        raise HTTPException(status_code=500, detail=str(e))

if __name__ == "__main__":
    import uvicorn
    uvicorn.run(app, host="0.0.0.0", port=8000)
