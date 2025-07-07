import { createContext, useContext, useEffect, useState } from "react";
import {
  signInWithPopup,
  signOut,
  onAuthStateChanged,
  type User,
} from "firebase/auth";
import { useDispatch } from "react-redux";
import { auth, googleProvider } from "../firebase";
import { setUser, clearUser } from "../store/authSlice";
import { setAdminStatus } from "../store/adminSlice";
import { PhoneNumberDialog } from "../components/PhoneNumberDialog";
import { userService } from "../services/userService";

interface AuthContextType {
  user: User | null;
  signInWithGoogle: () => Promise<void>;
  logout: () => Promise<void>;
}

const AuthContext = createContext<AuthContextType | null>(null);

export const useAuth = () => {
  const context = useContext(AuthContext);
  if (!context) throw new Error("useAuth must be used within AuthProvider");
  return context;
};

export const AuthProvider = ({ children }: { children: React.ReactNode }) => {
  const [user, setUserState] = useState<User | null>(null);
  const [showPhoneDialog, setShowPhoneDialog] = useState(false);
  const dispatch = useDispatch();

  const signInWithGoogle = async () => {
    try {
      console.log("Starting Google sign-in...");
      const result = await signInWithPopup(auth, googleProvider);
      console.log("Sign-in successful:", result.user);
    } catch (error) {
      console.error("Sign-in error:", error);
    }
  };

  const logout = async () => {
    await signOut(auth);
    dispatch(clearUser());
  };

  const handlePhoneNumberSubmit = async (phoneNumber: string) => {
    if (user) {
      await userService.saveUserProfile({
        uid: user.uid,
        email: user.email!,
        displayName: user.displayName,
        photoURL: user.photoURL,
        phoneNumber,
      });
    }
    setShowPhoneDialog(false);
  };

  useEffect(() => {
    const unsubscribe = onAuthStateChanged(auth, async (user) => {
      setUserState(user);
      if (user) {
        console.log("user", user);
        dispatch(
          setUser({
            uid: user.uid,
            email: user.email,
            displayName: user.displayName,
            photoURL: user.photoURL,
          })
        );
        
        // Check if user profile exists and has phone number
        const userProfile = await userService.getUserProfile(user.uid);
        if (!userProfile?.phoneNumber) {
          setShowPhoneDialog(true);
        }
        
        // Check if user is admin
        const isAdmin = [
          "praveen.jayanth.1111@gmail.com",
          "drmounikaupputuri@gmail.com",
        ].includes(user.email as string);
        dispatch(setAdminStatus(isAdmin));
      } else {
        dispatch(clearUser());
        dispatch(setAdminStatus(false));
      }
    });
    return unsubscribe;
  }, [dispatch]);

  return (
    <AuthContext.Provider value={{ user, signInWithGoogle, logout }}>
      {children}
      <PhoneNumberDialog
        open={showPhoneDialog}
        onClose={() => setShowPhoneDialog(false)}
        onSubmit={handlePhoneNumberSubmit}
        userEmail={user?.email || undefined}
      />
    </AuthContext.Provider>
  );
};
