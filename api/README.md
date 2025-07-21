# Image Upload API

This is a simple Flask API that handles image uploads to Firebase Storage, bypassing CORS issues that can occur with direct uploads from the browser.

## Setup

1. Install dependencies:
   ```
   pip install -r requirements.txt
   ```

2. Download your Firebase service account key from the Firebase Console:
   - Go to Project Settings > Service Accounts
   - Click "Generate new private key"
   - Save the JSON file as `serviceAccountKey.json` in this directory

3. Run the server:
   ```
   python app.py
   ```

## API Endpoints

### POST /upload

Uploads an image to Firebase Storage.

**Request:**
- Form data with a file field named 'file'

**Response:**
```json
{
  "success": true,
  "imageUrl": "https://storage.googleapis.com/projectn-daee6.appspot.com/products/abc123-image.jpg"
}
```