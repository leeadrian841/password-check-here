from fastapi import FastAPI, APIRouter, HTTPException
from dotenv import load_dotenv
from starlette.middleware.cors import CORSMiddleware
from motor.motor_asyncio import AsyncIOMotorClient
import os
import logging
from pathlib import Path
from pydantic import BaseModel, Field, ConfigDict
from typing import List, Optional
import uuid
from datetime import datetime, timezone
import hashlib
import httpx


ROOT_DIR = Path(__file__).parent
load_dotenv(ROOT_DIR / '.env')

# MongoDB connection
mongo_url = os.environ['MONGO_URL']
client = AsyncIOMotorClient(mongo_url)
db = client[os.environ['DB_NAME']]

# Create the main app without a prefix
app = FastAPI()

# Create a router with the /api prefix
api_router = APIRouter(prefix="/api")


# Define Models
class StatusCheck(BaseModel):
    model_config = ConfigDict(extra="ignore")  # Ignore MongoDB's _id field
    
    id: str = Field(default_factory=lambda: str(uuid.uuid4()))
    client_name: str
    timestamp: datetime = Field(default_factory=lambda: datetime.now(timezone.utc))

class StatusCheckCreate(BaseModel):
    client_name: str


# Password breach check models
class PasswordCheckRequest(BaseModel):
    password: str


class PasswordCheckResponse(BaseModel):
    is_breached: bool
    breach_count: int
    message: str
    source: str = "HaveIBeenPwned"


# HaveIBeenPwned API helper function
async def check_password_breach(password: str) -> tuple[bool, int]:
    """
    Check if a password has been pwned using HaveIBeenPwned's k-Anonymity API.
    This ensures the full password is never sent over the network.
    
    Returns: (is_breached, breach_count)
    """
    # Create SHA-1 hash of the password (uppercase)
    sha1_hash = hashlib.sha1(password.encode('utf-8')).hexdigest().upper()
    
    # k-Anonymity: only send first 5 chars of hash
    prefix = sha1_hash[:5]
    suffix = sha1_hash[5:]
    
    # Query HaveIBeenPwned API
    url = f"https://api.pwnedpasswords.com/range/{prefix}"
    
    async with httpx.AsyncClient() as client:
        try:
            response = await client.get(
                url,
                headers={
                    "User-Agent": "PassGuard-AI-Password-Checker",
                    "Add-Padding": "true"  # Enhanced privacy
                },
                timeout=10.0
            )
            response.raise_for_status()
        except httpx.HTTPError as e:
            logger.error(f"Error querying HaveIBeenPwned API: {e}")
            raise HTTPException(status_code=503, detail="Unable to check password breach database")
    
    # Parse response and check for our hash suffix
    # Response format: "SUFFIX:COUNT\r\nSUFFIX:COUNT\r\n..."
    hashes = response.text.split('\r\n')
    
    for hash_entry in hashes:
        if ':' in hash_entry:
            entry_suffix, count = hash_entry.split(':')
            if entry_suffix == suffix:
                breach_count = int(count)
                # Count of 0 indicates padding entry (ignore)
                if breach_count > 0:
                    return True, breach_count
    
    return False, 0


# Add your routes to the router instead of directly to app
@api_router.get("/")
async def root():
    return {"message": "Hello World"}

@api_router.post("/status", response_model=StatusCheck)
async def create_status_check(input: StatusCheckCreate):
    status_dict = input.model_dump()
    status_obj = StatusCheck(**status_dict)
    
    # Convert to dict and serialize datetime to ISO string for MongoDB
    doc = status_obj.model_dump()
    doc['timestamp'] = doc['timestamp'].isoformat()
    
    _ = await db.status_checks.insert_one(doc)
    return status_obj

@api_router.get("/status", response_model=List[StatusCheck])
async def get_status_checks():
    # Exclude MongoDB's _id field from the query results
    status_checks = await db.status_checks.find({}, {"_id": 0}).to_list(1000)
    
    # Convert ISO string timestamps back to datetime objects
    for check in status_checks:
        if isinstance(check['timestamp'], str):
            check['timestamp'] = datetime.fromisoformat(check['timestamp'])
    
    return status_checks


@api_router.post("/check-password-breach", response_model=PasswordCheckResponse)
async def check_password_breach_endpoint(request: PasswordCheckRequest):
    """
    Check if a password has been exposed in known data breaches.
    
    Uses HaveIBeenPwned's k-Anonymity API to safely check passwords
    without exposing the actual password over the network.
    """
    if not request.password:
        raise HTTPException(status_code=400, detail="Password cannot be empty")
    
    try:
        is_breached, breach_count = await check_password_breach(request.password)
        
        if is_breached:
            message = f"⚠️ This password has been found {breach_count:,} times in data breaches. Do not use this password!"
        else:
            message = "✓ This password was not found in any known data breaches."
        
        return PasswordCheckResponse(
            is_breached=is_breached,
            breach_count=breach_count,
            message=message,
            source="HaveIBeenPwned"
        )
    except HTTPException:
        raise
    except Exception as e:
        logger.error(f"Error checking password breach: {e}")
        raise HTTPException(status_code=500, detail="Internal server error while checking password")


# Include the router in the main app
app.include_router(api_router)

app.add_middleware(
    CORSMiddleware,
    allow_credentials=True,
    allow_origins=os.environ.get('CORS_ORIGINS', '*').split(','),
    allow_methods=["*"],
    allow_headers=["*"],
)

# Configure logging
logging.basicConfig(
    level=logging.INFO,
    format='%(asctime)s - %(name)s - %(levelname)s - %(message)s'
)
logger = logging.getLogger(__name__)

@app.on_event("shutdown")
async def shutdown_db_client():
    client.close()