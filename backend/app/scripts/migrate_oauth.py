"""
migrate_oauth.py - Add OAuth fields to existing users
Run once to update your database schema
"""

import asyncio
from motor.motor_asyncio import AsyncIOMotorClient
from datetime import datetime


async def migrate_users_collection():
    """Add OAuth fields to users collection"""
    
    # Connect to MongoDB
    client = AsyncIOMotorClient("mongodb+srv://BHUVANESH:Bhuvimdb@cluster0.k7ghmcw.mongodb.net/?appName=Cluster0")
    db = client.airo_db
    
    try:
        print("🔄 Starting migration...")
        
        # Get existing users
        users_collection = db.users
        
        # Update all documents to add OAuth fields
        result = await users_collection.update_many(
            {},  # Match all documents
            {
                "$set": {
                    "avatar_url": None,
                    "oauth_google_id": None,
                    "oauth_github_id": None,
                    "updated_at": datetime.now()
                }
            }
        )
        
        print(f"✅ Migration completed!")
        print(f"   - Matched: {result.matched_count} documents")
        print(f"   - Modified: {result.modified_count} documents")
        print(f"   - Added fields: avatar_url, oauth_google_id, oauth_github_id")
        
    except Exception as e:
        print(f"❌ Migration failed: {e}")
        raise
    finally:
        client.close()


if __name__ == "__main__":
    asyncio.run(migrate_users_collection())