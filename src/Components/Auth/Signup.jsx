import React, { useState } from "react";
import axios from "axios";
import { Card, TextInput, Button } from "flowbite-react";
import { Link } from "react-router-dom";
import { Label } from "flowbite-react";
import { useNavigate } from "react-router";
import Success from "../miscellaneous/success";

function Signup() {
  const [email, setEmail] = useState("");
  const [password, setPassword] = useState("");
  const [confirmPassword, setConfirmPassword] = useState("");
  const [isCompany, setIsCompany] = useState(false);
  const [success, setsuccess] = useState(false);
  const history = useNavigate();

  const handleSignup = async () => {
    if (password !== confirmPassword) {
      alert("Passwords do not match");
      return;
    }

    const userType = isCompany ? "company" : "goverment";

    try {
      const response = await axios.post(
        `http://localhost:3001/${userType}/signup`,
        {
          email,
          password,
        }
      );
      console.log(email);
      console.log(password);

      if (response.status === 200) {
        alert("Signup successful! You can now login.");
        setsuccess(true);
        setTimeout(() => {
          setsuccess(false);
        }, 2000);
        history("/login")(); // Corrected navigation
      }
    } catch (error) {
      console.error("Error signing up:", error);
      alert("Error signing up. Please try again later.");
    }
  };

  return (
    <div>
      {success ? (
        <Success />
      ) : (
        <div
          className="flex justify-center items-center h-screen "
          style={{
            backgroundImage:
              "url('https://wallpapers.com/images/high/blockchain-stylized-poster-lettering-0yk3hg7ynbp1hl02.webp')",
          }}
        >
          <div className="max-w-md w-full p-6 bg-white rounded-lg shadow-md">
            <h1 className="text-3xl font-semibold text-center mb-6">Sign Up</h1>
            <div className="mb-4">
              <label
                htmlFor="email"
                className="block text-sm font-medium text-gray-700"
              >
                Email
              </label>
              <input
                id="email"
                type="email"
                className="mt-1 block w-full rounded-md  border-none focus:border-none shadow-md p-3 focus:border-indigo-500 focus:ring focus:ring-indigo-200 focus:ring-opacity-50"
                placeholder="Your email"
                required
                value={email}
                onChange={(e) => setEmail(e.target.value)}
              />
            </div>
            <div className="mb-4">
              <label
                htmlFor="password"
                className="block text-sm font-medium text-gray-700"
              >
                Password
              </label>
              <input
                id="password"
                type="password"
                className="mt-1 block w-full rounded-md  border-none focus:border-none shadow-md p-3 focus:border-indigo-500 focus:ring focus:ring-indigo-200 focus:ring-opacity-50"
                placeholder="Your password"
                required
                value={password}
                onChange={(e) => setPassword(e.target.value)}
              />
            </div>
            <div className="mb-4">
              <label
                htmlFor="confirmPassword"
                className="block text-sm font-medium text-gray-700"
              >
                Confirm Password
              </label>
              <input
                id="confirmPassword"
                type="password"
                className="mt-1 block w-full rounded-md  border-none focus:border-none shadow-md p-3 focus:border-indigo-500 focus:ring focus:ring-indigo-200 focus:ring-opacity-50"
                placeholder="Confirm password"
                required
                value={confirmPassword}
                onChange={(e) => setConfirmPassword(e.target.value)}
              />
            </div>
            <div className="flex items-center mb-4">
              <input
                id="isCompany"
                type="checkbox"
                className="mr-2 rounded border-gray-300 shadow-sm focus:border-indigo-500 focus:ring focus:ring-indigo-200 focus:ring-opacity-50"
                checked={isCompany}
                onChange={() => setIsCompany(!isCompany)}
              />
              <label htmlFor="isCompany" className="text-sm text-gray-700">
                Sign up as a Company
              </label>
            </div>
            <button
              onClick={handleSignup}
              className="w-full bg-indigo-500 text-white py-2 px-4 rounded-md hover:bg-indigo-600 focus:outline-none focus:bg-indigo-600"
            >
              Sign Up
            </button>
            <p className="mt-2 text-sm text-gray-600 text-center">
              Already have an account?{" "}
              <Link to="/login" className="text-blue-500">
                Login here
              </Link>
            </p>
          </div>
        </div>
      )}
    </div>
  );
}

export default Signup;
