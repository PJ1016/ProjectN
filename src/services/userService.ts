import { doc, setDoc, getDoc } from 'firebase/firestore';
import { db } from '../firebase';
import { setUserProperties } from 'firebase/analytics';
import { analytics } from '../firebase';

export interface UserProfile {
  uid: string;
  email: string;
  displayName?: string;
  photoURL?: string;
  phoneNumber?: string;
  createdAt: Date;
  updatedAt: Date;
}

export const userService = {
  async saveUserProfile(profile: Partial<UserProfile>) {
    try {
      const userRef = doc(db, 'users', profile.uid!);
      await setDoc(userRef, {
        ...profile,
        updatedAt: new Date(),
      }, { merge: true });

      // Update analytics with phone number
      if (profile.phoneNumber) {
        setUserProperties(analytics, {
          phone_number: profile.phoneNumber,
          email: profile.email,
          display_name: profile.displayName,
        });
      }
    } catch (error) {
      console.error('Error saving user profile:', error);
      throw error;
    }
  },

  async getUserProfile(uid: string): Promise<UserProfile | null> {
    try {
      const userRef = doc(db, 'users', uid);
      const userSnap = await getDoc(userRef);
      
      if (userSnap.exists()) {
        return userSnap.data() as UserProfile;
      }
      return null;
    } catch (error) {
      console.error('Error getting user profile:', error);
      return null;
    }
  },
};