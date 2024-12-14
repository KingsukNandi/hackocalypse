import React, { useState } from 'react';
import { 
  createUserWithEmailAndPassword, 
  signInWithEmailAndPassword,
  GoogleAuthProvider,
  signInWithPopup
} from 'firebase/auth';
import { auth } from '../firebase';
import { useNavigate } from 'react-router-dom';

function Auth() {
  const [email, setEmail] = useState('');
  const [password, setPassword] = useState('');
  const [isSignUp, setIsSignUp] = useState(false);
  const [loading, setLoading] = useState(false);
  const navigate = useNavigate();

  const handleAuth = async (e) => {
    e.preventDefault();
    setLoading(true);
    try {
      if (isSignUp) {
        await createUserWithEmailAndPassword(auth, email, password);
      } else {
        await signInWithEmailAndPassword(auth, email, password);
      }
      navigate('/admin');
    } catch (error) {
      console.error(error);
    } finally {
      setLoading(false);
    }
  };

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
    <div className="min-h-screen p-8">
      <div className="max-w-md mx-auto pip-boy-container">
        <div className="text-center mb-8">
          <h1 className="text-2xl">VAULT-TEC TERMINAL</h1>
          <p className="text-xl opacity-80">
            {isSignUp ? 'CIVILIAN REGISTRATION' : 'ACCESS TERMINAL'}
          </p>
        </div>

        <form onSubmit={handleAuth} className="space-y-6">
          <div>
            <label className="block mb-2">EMAIL</label>
            <input
              type="email"
              value={email}
              onChange={(e) => setEmail(e.target.value)}
              className="vault-input w-full"
              placeholder="Enter your email"
              required
            />
          </div>

          <div>
            <label className="block mb-2">PASSWORD</label>
            <input
              type="password"
              value={password}
              onChange={(e) => setPassword(e.target.value)}
              className="vault-input w-full"
              placeholder="Enter your password"
              required
            />
          </div>

          <button
            type="submit"
            disabled={loading}
            className="vault-button w-full"
          >
            {loading 
              ? (isSignUp ? 'PROCESSING...' : 'ACCESSING...') 
              : (isSignUp ? 'REGISTER' : 'LOGIN')}
          </button>
        </form>

        <button
          onClick={handleGoogleSignIn}
          disabled={loading}
          className="vault-button w-full mt-4"
        >
          {loading ? 'PROCESSING...' : 'SIGN IN WITH GOOGLE'}
        </button>

        <p className="text-center mt-6">
          {isSignUp ? 'Already registered? ' : 'Not registered? '}
          <button
            onClick={() => setIsSignUp(!isSignUp)}
            className="text-[#FFB000] hover:underline"
          >
            {isSignUp ? 'Access Terminal' : 'Register Now'}
          </button>
        </p>
      </div>
    </div>
  );
}

export default Auth;
