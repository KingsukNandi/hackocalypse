import React, { useState } from 'react';
import { 
  createUserWithEmailAndPassword, 
  signInWithEmailAndPassword,
  GoogleAuthProvider,
  signInWithPopup
} from 'firebase/auth';

import { auth, firestore } from '../firebase'; // Import firestore for saving username
import { useNavigate } from 'react-router-dom'; // Import useNavigate
import { setDoc, doc } from 'firebase/firestore'; // Firestore functions for saving user data

function Auth() {
  const [email, setEmail] = useState('');
  const [password, setPassword] = useState('');
  const [username, setUsername] = useState(''); // State for username
  const [isSignUp, setIsSignUp] = useState(false);
  const [loading, setLoading] = useState(false);
  const navigate = useNavigate();

  // Handle user signup or login
  const handleAuth = async (e) => {
    e.preventDefault();
    setLoading(true);
    try {
      let userCredential;
      if (isSignUp) {
        // Signup flow
        userCredential = await createUserWithEmailAndPassword(auth, email, password);

        // Save the username in Firestore
        await setDoc(doc(firestore, 'users', userCredential.user.uid), {
          email,
          username, // Save the username
          timestamp: new Date(),
        });
      } else {
        // Sign-in flow
        userCredential = await signInWithEmailAndPassword(auth, email, password);
      }
      navigate('/admin');
    } catch (error) {
      console.error(error);
    } finally {
      setLoading(false);
    }
  };

  // Handle Google Sign-In
  const handleGoogleSignIn = async () => {
    const provider = new GoogleAuthProvider();
    setLoading(true);
    try {
      await signInWithPopup(auth, provider);
      navigate('/admin');
    } catch (error) {
      console.error(error);
    } finally {
      setLoading(false);
    }
  };

  return (
    <div>
      <form onSubmit={handleAuth}>
        {isSignUp && (
          <input 
            type="text" 
            value={username}
            onChange={(e) => setUsername(e.target.value)}
            placeholder="Username"
            required
          />
        )}
        <input 
          type="email" 
          value={email}
          onChange={(e) => setEmail(e.target.value)}
          placeholder="Email"
          required
        />
        <input 
          type="password"
          value={password}
          onChange={(e) => setPassword(e.target.value)}
          placeholder="Password"
          required
        />
        <button type="submit">
          {isSignUp ? 'Sign Up' : 'Sign In'}
        </button>
      </form>

      <button onClick={handleGoogleSignIn}>
        Sign In with Google
      </button>

      <button onClick={() => setIsSignUp(!isSignUp)}>
        {isSignUp ? 'Switch to Sign In' : 'Switch to Sign Up'}
      </button>
    </div>
  );
}

export default Auth;
