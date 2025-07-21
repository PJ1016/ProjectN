from flask import Flask, request, jsonify
from flask_cors import CORS
import os
import traceback
import logging
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
        "message": "API is running locally without Firebase"
    })

# Mock upload endpoint for local testing
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
        
        # Create uploads directory if it doesn't exist
        uploads_dir = "./uploads"
        if not os.path.exists(uploads_dir):
            os.makedirs(uploads_dir)
        
        # Save file locally
        file_path = f"{uploads_dir}/{unique_filename}"
        file.save(file_path)
        print(f"File saved locally at {file_path}")
        
        # Return a mock URL for local testing
        # Use environment variable for base URL, fallback to localhost
        base_url = os.getenv('API_BASE_URL', 'http://localhost:5000')
        mock_url = f"{base_url}/uploads/{unique_filename}"
        
        return jsonify({
            'success': True,
            'imageUrl': mock_url,
            'message': 'File uploaded locally (Firebase disabled for local testing)'
        })
        
    except Exception as e:
        print(f"Unexpected error: {str(e)}")
        traceback.print_exc()
        return jsonify({
            'error': 'Server error',
            'details': str(e)
        }), 500

# Serve uploaded files
@app.route('/uploads/<filename>')
def uploaded_file(filename):
    from flask import send_from_directory
    return send_from_directory('uploads', filename)

# Test endpoint
@app.route('/test', methods=['GET'])
def test():
    return jsonify({
        "message": "Flask API is working!",
        "endpoints": [
            "GET / - Health check",
            "POST /upload - Upload file (local storage)",
            "GET /uploads/<filename> - Serve uploaded files",
            "GET /test - This test endpoint"
        ]
    })

if __name__ == '__main__':
    app.run(debug=True, port=5000)
