import React, { useState } from 'react';
import { useNavigate } from "react-router-dom";

const Login = () => {
  const [email, setEmail] = useState("");
  const [password, setPassword] = useState("");
  const navigate = useNavigate();

  const handleSubmit = (e) => {
    e.preventDefault();
    // Handle sign in logic here
    alert(`Signed in as ${email}`);
  };

  function handleCreateAccount(e) {
    e.preventDefault();
    navigate("/register");
  }

  return (
    <div className="min-h-screen flex items-center justify-center bg-[#fff]">
      <form
        onSubmit={handleSubmit}
        className="bg-white p-8 rounded-2xl shadow-xl w-full max-w-sm flex flex-col gap-6 border border-neutral-200">
        <img
          src="https://upload.wikimedia.org/wikipedia/commons/b/b8/YouTube_Logo_2017.svg"
          alt="YouTube"
          className="w-32 mx-auto mb-2"
        />
        <h2 className="text-center text-2xl font-semibold text-neutral-900">
          Sign in
        </h2>
        <p className="text-center text-neutral-500 mb-2">
          to continue to YouTube
        </p>
        <input
          type="email"
          placeholder="Email or phone"
          value={email}
          onChange={(e) => setEmail(e.target.value)}
          required
          className="px-4 py-3 rounded-lg border border-neutral-300 bg-neutral-100 text-neutral-900 placeholder-neutral-400 focus:outline-none focus:ring-2 focus:ring-[#ff0000] text-base"
        />
        <input
          type="password"
          placeholder="Enter your password"
          value={password}
          onChange={(e) => setPassword(e.target.value)}
          required
          className="px-4 py-3 rounded-lg border border-neutral-300 bg-neutral-100 text-neutral-900 placeholder-neutral-400 focus:outline-none focus:ring-2 focus:ring-[#ff0000] text-base"
        />
        <button
          type="submit"
          className="bg-[#ff0000] hover:bg-[#e60000] text-white rounded-lg py-3 font-semibold text-base transition-colors shadow-md">
          Sign In
        </button>
        <div className="text-center text-sm">
          <a href="#" className="text-[#ff0000] hover:underline">
            Forgot email?
          </a>
        </div>
        <div className="text-center text-xs text-neutral-400">
          Not your computer? Use Guest mode to sign in privately.
        </div>
        <div className="text-center mt-2">
          <button
            onClick={handleCreateAccount}
            className="text-[#ff0000] hover:underline font-medium text-sm">
            Create account
          </button>
        </div>
      </form>
    </div>
  );
};

export default Login;
