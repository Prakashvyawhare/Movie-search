import { useState } from 'react';
import { useNavigate, Link, useLocation } from 'react-router-dom';
import { useAuth } from '../Hooks/AuthContext';

function Login() {
  const [email, setEmail] = useState('');
  const [password, setPassword] = useState('');
  const [error, setError] = useState('');
  const location = useLocation();
  const navigate = useNavigate();


  const from = location.state?.from?.pathname ||'/home'
 const { login, loading } = useAuth();
  const handleSubmit = async (e) => {
    e.preventDefault();
    setError('');
    // setLoading(true);

    // Basic validation
    if (!email || !password) {
      setError('Email and password are required');
    //   setLoading(false);
      return;
    }

    if (!email.includes('@')) {
      setError('Please enter a valid email');
    //   setLoading(false);
      return;
    }

    if (password.length < 6) {
      setError('Password must be at least 6 characters');
    //   setLoading(false);
      return;
    }
    const result = await login(email, password);
    if (result.success) {
        
      navigate(from, {replace:true});
    } else {
      setError(result.error || "Login failed");
    }
   
  };

  return (
    <div className="min-h-screen bg-gray-950 flex items-center justify-center p-4">
      <div className="w-full max-w-md">
        <div className="bg-gray-900 rounded-lg shadow-lg p-8 border border-gray-800">
          {/* Header */}
          <div className="text-center mb-8">
            <h1 className="text-3xl font-bold mb-2">
              <span className="text-2xl">🎬</span>
              <span className="text-white ml-2">Movie</span>
              <span className="text-yellow-400">Search</span>
            </h1>
            <p className="text-gray-400">Sign in to your account</p>
          </div>

          {/* Form */}
          <form onSubmit={handleSubmit} className="space-y-6">
            {/* Error Alert */}
            {error && (
              <div className="bg-red-900 border border-red-700 text-red-200 px-4 py-3 rounded">
                {error}
              </div>
            )}

            {/* Email Field */}
            <div>
              <label htmlFor="email" className="block text-sm font-medium text-gray-300 mb-2">
                Email Address
              </label>
              <input
                type="email"
                id="email"
                value={email}
                onChange={(e) => setEmail(e.target.value)}
                placeholder="you@example.com"
                className="w-full px-4 py-2 bg-gray-800 border border-gray-700 rounded-lg text-white placeholder-gray-500 focus:outline-none focus:border-yellow-400 focus:ring-1 focus:ring-yellow-400 transition"
              />
            </div>

            {/* Password Field */}
            <div>
              <label htmlFor="password" className="block text-sm font-medium text-gray-300 mb-2">
                Password
              </label>
              <input
                type="password"
                id="password"
                value={password}
                onChange={(e) => setPassword(e.target.value)}
                placeholder="••••••••"
                className="w-full px-4 py-2 bg-gray-800 border border-gray-700 rounded-lg text-white placeholder-gray-500 focus:outline-none focus:border-yellow-400 focus:ring-1 focus:ring-yellow-400 transition"
              />
            </div>

            {/* Submit Button */}
            <button
              type="submit"
              disabled={loading}
              className="w-full bg-yellow-400 hover:bg-yellow-500 disabled:bg-yellow-600 text-gray-900 font-semibold py-2 px-4 rounded-lg transition duration-200"
            >
              {loading ? 'Signing in...' : 'Sign In'}
            </button>
          </form>

          {/* Divider */}
          <div className="mt-8 relative">
            <div className="absolute inset-0 flex items-center">
              <div className="w-full border-t border-gray-700"></div>
            </div>
            <div className="relative flex justify-center text-sm">
              <span className="px-2 bg-gray-900 text-gray-400">Don't have an account?</span>
            </div>
          </div>

          {/* Sign Up Link */}
          <p className="mt-8 text-center text-gray-400">
            <Link to="/signup" className="text-yellow-400 hover:text-yellow-300 font-medium">
              Create an account
            </Link>
          </p>

          {/* Demo Credentials */}
          <div className="mt-6 p-4 bg-gray-800 rounded-lg border border-gray-700">
            <p className="text-xs text-gray-400 mb-2">
              <strong>Demo Credentials:</strong>
            </p>
            <p className="text-xs text-gray-400">Email: demo@example.com</p>
            <p className="text-xs text-gray-400">Password: demo123</p>
          </div>
        </div>
      </div>
    </div>
  );
}

export default Login;
