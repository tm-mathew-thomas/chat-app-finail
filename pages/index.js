import React, { useContext } from "react";
import { Context } from "../context";
import { useRouter } from "next/router";
import axios from "axios";

// Firebase imports
import { initializeApp } from "firebase/app";
import { getDatabase, ref } from "firebase/database";
import { getAuth, GoogleAuthProvider, signInWithPopup, signOut } from "firebase/auth";

// Firebase configuration
const firebaseConfig = {
  apiKey: "AIzaSyBMJ0QFm3VXxWsDZFb3tbCc8csGFDne4mU",
  authDomain: "real-chat-app-d0d76.firebaseapp.com",
  projectId: "real-chat-app-d0d76",
  storageBucket: "real-chat-app-d0d76.firebasestorage.app",
  messagingSenderId: "196251140781",
  appId: "1:196251140781:web:8d1daea87bd93d84c0bc24",
  measurementId: "G-Z915GF4VYP"
};

// Initialize Firebase
const app = initializeApp(firebaseConfig);
const db = getDatabase(app);
const chatRef = ref(db, "messages");
const auth = getAuth();
const provider = new GoogleAuthProvider();

export default function Auth() {
  const { setUsername, setSecret } = useContext(Context);
  const router = useRouter();

  const handleGoogleSignIn = async () => {
    try {
      const result = await signInWithPopup(auth, provider);
      const user = result.user;
      setUsername(user.email);
      setSecret(user.uid);
      router.push("/chat"); // Redirect to chat page
    } catch (error) {
      console.error("Google Sign-In Error:", error);
    }
  };

  return (
    <div className="background">
      <div className="auth-container">
        <form className="auth-form" onSubmit={(e) => e.preventDefault()}>
          <div className="auth-title">NextJS Chat</div>

          <div className="input-container">
            <input
              placeholder="Email"
              className="text-input"
              onChange={(e) => setUsername(e.target.value)}
            />
          </div>

          <div className="input-container">
            <input
              type="password"
              placeholder="Password"
              className="text-input"
              onChange={(e) => setSecret(e.target.value)}
            />
          </div>

          <button type="submit" className="submit-button">
            Login / Sign Up
          </button>

          <button type="button" className="google-button" onClick={handleGoogleSignIn}>
            Sign in with Google
          </button>
        </form>
      </div>
    </div>
  );
}

export { chatRef, auth, provider };
