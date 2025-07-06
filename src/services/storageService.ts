import { ref, uploadBytes, getDownloadURL } from 'firebase/storage';
import { storage } from '../firebase';

export const storageService = {
  uploadImage: (file: File, path: string) =>
    uploadBytes(ref(storage, `products/${path}`), file)
      .then(snapshot => getDownloadURL(snapshot.ref)),
};