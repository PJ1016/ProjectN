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

  useEffect(() => {
    const unsubscribe = onAuthStateChanged(auth, (user) => {
      setUserState(user);
      if (user) {
        dispatch(
          setUser({
            uid: user.uid,
            email: user.email,
            displayName: user.displayName,
            photoURL: user.photoURL,
          })
        );
        // Check if user is admin (replace with your admin email)
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
    </AuthContext.Provider>
  );
};
