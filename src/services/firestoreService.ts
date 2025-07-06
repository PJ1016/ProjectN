import { collection, addDoc, updateDoc, doc, getDocs, query, orderBy } from 'firebase/firestore';
import { db } from '../firebase';

export interface Product {
  id?: string;
  name: string;
  price: number;
  discount: number;
  stock: number;
  description: string;
  category: string;
  imageUrl?: string;
  createdAt?: Date;
  updatedAt?: Date;
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
        querySnapshot.docs.map(doc => ({
          id: doc.id,
          ...doc.data(),
        })) as Product[]
      ),

  updateStock: (id: string, stock: number) =>
    updateDoc(doc(db, PRODUCTS_COLLECTION, id), {
      stock,
      updatedAt: new Date(),
    }),
};