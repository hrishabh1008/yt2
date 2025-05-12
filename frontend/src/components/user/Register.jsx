import React, { useState } from "react";
import { useNavigate } from "react-router-dom";

const Register = () => {
  const [form, setForm] = useState({
    username: "",
    email: "",
    password: "",
    confirmPassword: "",
  });
  const [error, setError] = useState("");

  const handleChange = (e) => {
    setForm({ ...form, [e.target.name]: e.target.value });
    setError("");
  };

  const handleSubmit = (e) => {
    e.preventDefault();
    if (form.password !== form.confirmPassword) {
      setError("Passwords do not match");
      return;
    }
    // Submit logic here (e.g., API call)
    alert("Registered successfully!");
  };

  const navigate = useNavigate();

  function directToHome(e) {
    e.preventDefault();
    navigate("/");
  }

  return (
    <div className="min-h-screen flex items-center justify-center bg-[#fff]">
      <div className="w-full max-w-md bg-white rounded-2xl shadow-xl p-8 border border-neutral-200">
        <div className="flex flex-col items-center mb-8">
          <img
            src="https://upload.wikimedia.org/wikipedia/commons/b/b8/YouTube_Logo_2017.svg"
            alt="YouTube"
            className="w-32 mx-auto mb-2"
            onClick={directToHome}
          />

          <h2 className="text-3xl font-bold text-neutral-900 mb-1">
            Create your account
          </h2>
          <p className="text-neutral-500 text-sm">to continue to YouTube</p>
        </div>
        <form onSubmit={handleSubmit}>
          <div className="mb-5">
            <label className="block text-neutral-700 font-medium mb-1">
              Username
            </label>
            <input
              type="text"
              name="username"
              value={form.username}
              onChange={handleChange}
              required
              className="w-full px-4 py-2 bg-neutral-100 text-neutral-900 border border-neutral-300 rounded-lg focus:outline-none focus:ring-2 focus:ring-[#ff0000] placeholder-neutral-400"
              placeholder="Enter your username"
              autoComplete="username"
            />
          </div>
          <div className="mb-5">
            <label className="block text-neutral-700 font-medium mb-1">
              Email
            </label>
            <input
              type="email"
              name="email"
              value={form.email}
              onChange={handleChange}
              required
              className="w-full px-4 py-2 bg-neutral-100 text-neutral-900 border border-neutral-300 rounded-lg focus:outline-none focus:ring-2 focus:ring-[#ff0000] placeholder-neutral-400"
              placeholder="Enter your email"
              autoComplete="email"
            />
          </div>
          <div className="mb-5">
            <label className="block text-neutral-700 font-medium mb-1">
              Password
            </label>
            <input
              type="password"
              name="password"
              value={form.password}
              onChange={handleChange}
              required
              className="w-full px-4 py-2 bg-neutral-100 text-neutral-900 border border-neutral-300 rounded-lg focus:outline-none focus:ring-2 focus:ring-[#ff0000] placeholder-neutral-400"
              placeholder="Enter your password"
              autoComplete="new-password"
            />
          </div>
          <div className="mb-5">
            <label className="block text-neutral-700 font-medium mb-1">
              Confirm Password
            </label>
            <input
              type="password"
              name="confirmPassword"
              value={form.confirmPassword}
              onChange={handleChange}
              required
              className="w-full px-4 py-2 bg-neutral-100 text-neutral-900 border border-neutral-300 rounded-lg focus:outline-none focus:ring-2 focus:ring-[#ff0000] placeholder-neutral-400"
              placeholder="Confirm your password"
              autoComplete="new-password"
            />
          </div>
          {error && <div className="text-[#ff0000] mb-4 text-sm">{error}</div>}
          <button
            type="submit"
            className="w-full py-2 bg-[#ff0000] hover:bg-[#e60000] text-white rounded-lg font-semibold text-lg transition focus:outline-none focus:ring-2 focus:ring-[#ff0000] shadow-md">
            Sign Up
          </button>
        </form>
        <div className="text-center mt-6">
          <span className="text-neutral-500">Already have an account? </span>
          <a
            href="/login"
            className="text-[#ff0000] hover:underline font-medium">
            Sign in
          </a>
        </div>
      </div>
    </div>
  );
};

export default Register;
