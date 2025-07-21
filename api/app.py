from flask import Flask, request, jsonify
from flask_cors import CORS
import os
import traceback
import logging
import firebase_admin
from firebase_admin import credentials, storage
import uuid
from werkzeug.utils import secure_filename

app = Flask(__name__)

# Configure CORS with detailed settings
CORS(app, resources={
    r"/*": {
        "origins": "*",  # Allow all origins
        "methods": ["GET", "POST", "PUT", "DELETE", "OPTIONS"],
        "allow_headers": ["Content-Type", "Authorization"]
    }
})

# Configure logging
logging.basicConfig(level=logging.DEBUG)

# Health check endpoint
@app.route('/', methods=['GET'])
def health_check():
    return jsonify({
        "status": "ok",
        "message": "API is running"
    })

# Error handler for all exceptions
@app.errorhandler(Exception)
def handle_exception(e):
    app.logger.error(f"Unhandled exception: {str(e)}")
    traceback.print_exc()
    return jsonify({
        "error": "Internal server error",
        "message": str(e)
    }), 500

# Initialize Firebase Admin SDK
# You'll need to download your Firebase service account key and save it as serviceAccountKey.json
if not firebase_admin._apps:
    cred = credentials.Certificate('serviceAccountKey.json')
    firebase_admin.initialize_app(cred, {
        'storageBucket': 'projectn-daee6.appspot.com'
    })

bucket = storage.bucket()

@app.route('/upload', methods=['POST'])
def upload_image():
    try:
        # Log request details
        print(f"Received upload request. Files: {list(request.files.keys())}")
        
        if 'file' not in request.files:
            print("Error: No file part in request")
            return jsonify({'error': 'No file part', 'details': 'The request does not contain a file part'}), 400
        
        file = request.files['file']
        
        if file.filename == '':
            print("Error: Empty filename")
            return jsonify({'error': 'No selected file', 'details': 'The file has no name'}), 400
        
        # Log file details
        print(f"Processing file: {file.filename}, Content-Type: {file.content_type}")
        
        # Create a secure filename with UUID to avoid conflicts
        filename = secure_filename(file.filename)
        unique_filename = f"{uuid.uuid4().hex}-{filename}"
        
        # Create temp directory if it doesn't exist
        temp_dir = "./temp"
        if not os.path.exists(temp_dir):
            os.makedirs(temp_dir)
        
        # Save file temporarily
        temp_path = f"{temp_dir}/{unique_filename}"
        file.save(temp_path)
        print(f"File saved temporarily at {temp_path}")
        
        try:
            # Upload to Firebase Storage
            print(f"Uploading to Firebase Storage: products/{unique_filename}")
            blob = bucket.blob(f"products/{unique_filename}")
            blob.upload_from_filename(temp_path)
            
            # Make the blob publicly accessible
            blob.make_public()
            
            # Get the public URL
            image_url = blob.public_url
            print(f"Upload successful. Public URL: {image_url}")
            
            # Clean up the temporary file
            os.remove(temp_path)
            
            return jsonify({
                'success': True,
                'imageUrl': image_url
            })
        except Exception as e:
            print(f"Firebase upload error: {str(e)}")
            traceback.print_exc()
            return jsonify({
                'error': 'Firebase upload failed',
                'details': str(e)
            }), 500
    except Exception as e:
        print(f"Unexpected error: {str(e)}")
        traceback.print_exc()
        return jsonify({
            'error': 'Server error',
            'details': str(e)
        }), 500

if __name__ == '__main__':
    app.run(debug=True, port=5000)