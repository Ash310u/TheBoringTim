import { useState } from 'react';
import { FaArrowsRotate } from "react-icons/fa6";
import Input from '../components/features/Input';
import Blob from '../components/Blob';
import { useSignupMutation, useLoginMutation } from '../store';
import { useDispatch } from 'react-redux';
import { setToken, setUserId } from '../store';
import { useNavigate } from 'react-router-dom';

const Login = () => {
  const [isLogin, setIsLogin] = useState(false);
  const [signup] = useSignupMutation();
  const [login] = useLoginMutation();
  const dispatch = useDispatch();
  const navigate = useNavigate();

  const signupFields = [
    { type: "text", id: "name", name: "name", placeholder: "Full Name" },
    { type: "email", id: "signup-email", name: "email", placeholder: "Email Address" },
    { type: "password", id: "signup-password", name: "password", placeholder: "Create Password" }
  ];

  const loginFields = [
    { type: "text", id: "login-email", name: "email", placeholder: "Email" },
    { type: "password", id: "login-password", name: "password", placeholder: "Password" }
  ];

  const handleSignup = async (e) => {
    e.preventDefault();
    const formData = new FormData(e.target);
    const userData = Object.fromEntries(formData);
    const response = await signup(userData);
    if (response.data?.token) {
      localStorage.setItem('token', response.data.token);
      localStorage.setItem('userId', response.data.user._id);
      dispatch(setToken(response.data.token));
      dispatch(setUserId(response.data.user._id));
      navigate('/dashboard');
    }
  };

  const handleLogin = async (e) => {
    e.preventDefault();
    const formData = new FormData(e.target);
    const userData = Object.fromEntries(formData);
    const response = await login(userData);
    if (response.data?.token) {
      localStorage.setItem('token', response.data.token);
      localStorage.setItem('userId', response.data.user._id);
      dispatch(setToken(response.data.token));
      dispatch(setUserId(response.data.user._id));
      navigate('/dashboard');
    }
  };

  return (
    <div className="h-[calc(100vh-64px)] bg-gradient-to-br from-purple-100 to-pink-100 flex items-center justify-center relative overflow-hidden">
      {/* Animated Background Blobs */}
      <div className="absolute inset-0 pointer-events-none">
        <Blob color="purple" className="top-20 left-20" />
        <Blob color="pink" className="top-40 right-20" delay="2000" />
        <Blob color="yellow" className="-bottom-8 left-40" delay="4000" />
      </div>

      {/* Main Content Box */}
      <div className="bg-white rounded-3xl p-12 shadow-lg w-full max-w-3xl transform hover:scale-[1.02] transition-transform duration-300 relative min-h-[450px] backdrop-blur-sm bg-opacity-95">
        <div className="grid grid-cols-2 gap-8 h-full">
          {/* Left Side - Simple Welcome */}
          <div className="flex flex-col justify-center">
            <h1 className="text-3xl font-bold text-navy-800 mb-4">Welcome to Mindful</h1>
            <p className="text-gray-600 text-lg mb-6">Your journey to mental wellness begins here.</p>
          </div>

          {/* Right Side - Forms */}
          <div className="relative">
            {/* Sign Up Form */}
            <div 
              className={`absolute top-0 left-0 w-full h-full transition-all duration-500 ease-in-out ${
                isLogin ? 'opacity-0 pointer-events-none translate-x-full' : 'opacity-100 translate-x-0'
              }`}
            >
              <div className="text-center mb-8 animate-fadeIn">
                <h2 className="text-2xl font-semibold text-navy-800">Create Account</h2>
              </div>

              <form onSubmit={handleSignup} className="space-y-4">
                {signupFields.map((field) => (
                  <Input
                    key={field.id}
                    {...field}
                  />
                ))}

                <button
                  type="submit"
                  className="w-full bg-gradient-to-r from-purple-400 to-pink-400 text-white py-3 rounded-xl hover:from-purple-500 hover:to-pink-500 transition-all duration-300 transform hover:scale-[1.02] font-medium shadow-md"
                >
                  Create Account
                </button>
              </form>
            </div>

            {/* Sign In Form */}
            <div 
              className={`absolute top-0 left-0 w-full h-full transition-all duration-500 ease-in-out ${
                isLogin ? 'opacity-100 translate-x-0' : 'opacity-0 pointer-events-none -translate-x-full'
              }`}
            >
              <div className="text-center mb-8 animate-fadeIn">
                <h2 className="text-2xl font-semibold text-navy-800">Welcome Back</h2>
              </div>

              <form onSubmit={handleLogin} className="space-y-4">
                {loginFields.map((field) => (
                  <Input
                    key={field.id}
                    {...field}
                  />
                ))}

                <div className="text-right">
                  <a 
                    href="/forgot-password" 
                    className="text-sm text-purple-600 hover:text-purple-700 transition-colors duration-300 hover:underline"
                  >
                    Forgot Password?
                  </a>
                </div>

                <button
                  type="submit"
                  className="w-full bg-gradient-to-r from-purple-400 to-pink-400 text-white py-3 rounded-xl hover:from-purple-500 hover:to-pink-500 transition-all duration-300 transform hover:scale-[1.02] font-medium shadow-md"
                >
                  Sign In
                </button>
              </form>
            </div>
          </div>
        </div>

        {/* Switch Button */}
        <button
          onClick={() => setIsLogin(!isLogin)}
          className="absolute top-4 right-4 w-12 h-12 bg-gradient-to-r from-purple-400 to-pink-400 rounded-full flex items-center justify-center text-white transform hover:scale-110 transition-all duration-300 shadow-md z-10"
          aria-label={isLogin ? "Switch to Sign Up" : "Switch to Sign In"}
        >
          <FaArrowsRotate className={`text-xl transition-transform duration-300 ${isLogin ? 'rotate-180' : ''}`} />
        </button>
      </div>
    </div>
  );
};

export default Login;