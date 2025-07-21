import { collection, addDoc, updateDoc, doc, getDocs, query, orderBy, Timestamp, deleteDoc } from 'firebase/firestore';
import { db } from '../firebase';

// Helper function to convert Firestore Timestamp to serializable date
const convertTimestampToSerializable = (data: any): any => {
  if (!data) return data;
  
  if (data instanceof Timestamp) {
    // Convert Timestamp to ISO string
    return data.toDate().toISOString();
  }
  
  if (typeof data === 'object') {
    // Handle arrays
    if (Array.isArray(data)) {
      return data.map(item => convertTimestampToSerializable(item));
    }
    
    // Handle objects
    const result: Record<string, any> = {};
    Object.keys(data).forEach(key => {
      result[key] = convertTimestampToSerializable(data[key]);
    });
    return result;
  }
  
  return data;
}

export interface Product {
  id?: string;
  name: string;
  price: number;
  discount: number;
  stock: number;
  description: string;
  category: string;
  imageUrl?: string;
  createdAt?: string; // ISO string format for serializable dates
  updatedAt?: string; // ISO string format for serializable dates
}

const PRODUCTS_COLLECTION = 'products';

export const firestoreService = {
  addProduct: (product: Omit<Product, 'id' | 'createdAt' | 'updatedAt'>) =>
    addDoc(collection(db, PRODUCTS_COLLECTION), {
      ...product,
      createdAt: new Date(),
      updatedAt: new Date(),
    }).then(docRef => docRef.id),

  updateProduct: (id: string, product: Partial<Product>) =>
    updateDoc(doc(db, PRODUCTS_COLLECTION, id), {
      ...product,
      updatedAt: new Date(),
    }),

  getProducts: () =>
    getDocs(query(collection(db, PRODUCTS_COLLECTION), orderBy('createdAt', 'desc')))
      .then(querySnapshot => 
        querySnapshot.docs.map(doc => {
          // Convert Firestore data to serializable format
          const data = convertTimestampToSerializable(doc.data());
          return {
            id: doc.id,
            ...data,
          };
        }) as Product[]
      ),

  updateStock: (id: string, stock: number) =>
    updateDoc(doc(db, PRODUCTS_COLLECTION, id), {
      stock,
      updatedAt: new Date(),
    }),
    
  deleteProduct: (id: string) =>
    deleteDoc(doc(db, PRODUCTS_COLLECTION, id)),
};