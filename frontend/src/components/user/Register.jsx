import React, { useState } from "react";
import { useNavigate } from "react-router-dom";
import { signupUser } from "./userAuth.Service";

const Register = () => {
  const [form, setForm] = useState({
    userName: "",
    userEmail: "",
    userPassword: "",
    confirmPassword: "",
  });
  const [error, setError] = useState("");
  const navigate = useNavigate();

  const handleChange = (e) => {
    setForm((prevForm) => {
      const updatedForm = { ...prevForm, [e.target.name]: e.target.value };
      // console.log(updatedForm);
      return updatedForm;
    });
    // console.log(form);
    setError("");
  };

  const handleSubmit = async (e) => {
    const { userName, userEmail, userPassword } = form;
    e.preventDefault();
    if (form.userPassword !== form.confirmPassword) {
      setError("Passwords do not match");
      return;
    }
    const userData = {
      userName: userName,
      userEmail: userEmail,
      userPassword: userPassword,
    };
    try {
      const data = await signupUser(userData);
      // console.log(data);
      if (data.status === 201) {
        alert("Registered successfully!");
        navigate("/login");
      } else {
        setError(data.message || "Registration failed");
      }
    } catch (err) {
      setError("An error occurred during registration.");
      console.error(err);
    }
  };

  function handleSignIn(e) {
    e.preventDefault();
    navigate("/login");
  }

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
            className="w-32 mx-auto mb-2  hover:drop-shadow-red-300 hover:drop-shadow-xs"
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
              name="userName"
              value={form.userName}
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
              name="userEmail"
              value={form.userEmail}
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
              name="userPassword"
              value={form.userPassword}
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
          <button
            onClick={handleSignIn}
            className="text-[#ff0000] hover:underline font-medium">
            Sign in
          </button>
        </div>
      </div>
    </div>
  );
};

export default Register;
