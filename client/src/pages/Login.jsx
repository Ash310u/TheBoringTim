import { useState } from 'react';
import { FaArrowsRotate } from "react-icons/fa6";

const Login = () => {
  const [isLogin, setIsLogin] = useState(false);

  return (
    <div className="min-h-screen bg-gradient-to-br from-purple-100 to-pink-100 p-4 md:p-8 lg:p-12 flex items-center justify-center relative overflow-hidden">
      {/* Animated Background Blobs */}
      <div className="absolute inset-0 pointer-events-none">
        <div className="absolute top-20 left-20 w-72 h-72 bg-purple-200 rounded-full mix-blend-multiply filter blur-xl opacity-70 animate-blob"></div>
        <div className="absolute top-40 right-20 w-72 h-72 bg-pink-200 rounded-full mix-blend-multiply filter blur-xl opacity-70 animate-blob animation-delay-2000"></div>
        <div className="absolute -bottom-8 left-40 w-72 h-72 bg-yellow-200 rounded-full mix-blend-multiply filter blur-xl opacity-70 animate-blob animation-delay-4000"></div>
      </div>

      {/* Main Content Box */}
      <div className="bg-white rounded-3xl p-12 shadow-lg w-full max-w-3xl transform hover:scale-[1.02] transition-transform duration-300 relative min-h-[500px] backdrop-blur-sm bg-opacity-95">
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

              <form className="space-y-4">
                <div className="transform hover:-translate-y-1 transition-transform duration-200">
                  <input
                    type="text"
                    id="name"
                    name="name"
                    className="w-full px-4 py-3 rounded-xl border border-gray-200 focus:outline-none focus:ring-2 focus:ring-purple-500 focus:border-transparent transition-all duration-300 hover:border-purple-300"
                    placeholder="Full Name"
                  />
                </div>

                <div className="transform hover:-translate-y-1 transition-transform duration-200">
                  <input
                    type="text"
                    id="username"
                    name="username"
                    className="w-full px-4 py-3 rounded-xl border border-gray-200 focus:outline-none focus:ring-2 focus:ring-purple-500 focus:border-transparent transition-all duration-300 hover:border-purple-300"
                    placeholder="Username"
                  />
                </div>

                <div className="transform hover:-translate-y-1 transition-transform duration-200">
                  <input
                    type="email"
                    id="signup-email"
                    name="email"
                    className="w-full px-4 py-3 rounded-xl border border-gray-200 focus:outline-none focus:ring-2 focus:ring-purple-500 focus:border-transparent transition-all duration-300 hover:border-purple-300"
                    placeholder="Email Address"
                  />
                </div>

                <div className="transform hover:-translate-y-1 transition-transform duration-200">
                  <input
                    type="password"
                    id="signup-password"
                    name="password"
                    className="w-full px-4 py-3 rounded-xl border border-gray-200 focus:outline-none focus:ring-2 focus:ring-purple-500 focus:border-transparent transition-all duration-300 hover:border-purple-300"
                    placeholder="Create Password"
                  />
                </div>

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

              <form className="space-y-4">
                <div className="transform hover:-translate-y-1 transition-transform duration-200">
                  <input
                    type="text"
                    id="login-email"
                    name="email"
                    className="w-full px-4 py-3 rounded-xl border border-gray-200 focus:outline-none focus:ring-2 focus:ring-purple-500 focus:border-transparent transition-all duration-300 hover:border-purple-300"
                    placeholder="Email or Username"
                  />
                </div>

                <div className="transform hover:-translate-y-1 transition-transform duration-200">
                  <input
                    type="password"
                    id="login-password"
                    name="password"
                    className="w-full px-4 py-3 rounded-xl border border-gray-200 focus:outline-none focus:ring-2 focus:ring-purple-500 focus:border-transparent transition-all duration-300 hover:border-purple-300"
                    placeholder="Password"
                  />
                </div>

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