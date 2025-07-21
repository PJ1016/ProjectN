import { ref, uploadBytes, getDownloadURL, uploadString } from 'firebase/storage';
import { storage } from '../firebase';

export const storageService = {
  // Method 1: Direct upload (may have CORS issues)
  uploadImage: (file: File, path: string) =>
    uploadBytes(ref(storage, `products/${path}`), file)
      .then(snapshot => getDownloadURL(snapshot.ref)),
  
  // Method 2: Base64 upload (avoids CORS issues)
  uploadImageAsBase64: async (file: File, path: string) => {
    // Convert file to base64
    const base64 = await convertFileToBase64(file);
    
    // Upload base64 string
    const storageRef = ref(storage, `products/${path}`);
    const snapshot = await uploadString(storageRef, base64, 'data_url');
    
    // Get download URL
    return getDownloadURL(snapshot.ref);
  }
};

// Helper function to convert File to base64
function convertFileToBase64(file: File): Promise<string> {
  return new Promise((resolve, reject) => {
    const reader = new FileReader();
    reader.readAsDataURL(file);
    reader.onload = () => resolve(reader.result as string);
    reader.onerror = error => reject(error);
  });
}