import React, { useState, ChangeEvent } from "react";
import { Button } from "../components/ui/Button";
import { Icon } from "../@/components/ui/Icon";
import { useNavigate } from "react-router-dom";

const RegistrationPage: React.FC = () => {
  // State for form data, messages, and success status
  const [userData, setUserData] = useState({
    firstName: "",
    lastName: "",
    email: "",
    password: "",
  });

  const [message, setMessage] = useState<string>("");
  const [isSuccess, setIsSuccess] = useState<boolean | null>(null);
  const navigate = useNavigate();

  const handleChange = (e: ChangeEvent<HTMLInputElement>) => {
    const { id, value } = e.target;
    setUserData((prev) => ({ ...prev, [id]: value }));
  };

  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault();
    setMessage("");
    setIsSuccess(null);

    try {
      const res = await fetch("/api/auth/register", {
        headers: {
          "Content-Type": "application/json",
        },
        method: "POST",
        body: JSON.stringify({ ...userData }),
      });

      const data = await res.json();

      if (!res.ok) {
        setIsSuccess(false);
        setMessage(data.message);
        return;
      }

      setUserData({
        firstName: "",
        lastName: "",
        email: "",
        password: "",
      });
      setIsSuccess(true);
      setMessage(data.message);

      setTimeout(() => {
        setMessage("");
        setIsSuccess(null);
        navigate("/login");
      }, 3000);
    } catch (error) {
      console.error("Registration error:", error);
      setMessage("An unexpected error occurred. Please try again.");
    }
  };

  return (
    <div className="flex items-center justify-center min-h-screen bg-gray-50">
      <div className="bg-white p-8 rounded-lg shadow-lg w-full max-w-sm">
        <h2 className="text-2xl font-bold text-gray-800 mb-6 text-center">
          Create Your Account
        </h2>

        {message && (
          <div
            className={`text-sm text-center mb-4 ${
              isSuccess ? "text-green-500" : "text-red-500"
            }`}
          >
            {message}
          </div>
        )}

        <form onSubmit={handleSubmit} className="space-y-4">
          {/* First Name Input */}
          <div>
            <label className="block text-sm font-medium text-gray-700 mb-2" htmlFor="firstName">
              First Name
            </label>
            <input
              type="text"
              id="firstName"
              value={userData.firstName}
              onChange={handleChange}
              required
              className="w-full p-3 border border-gray-300 rounded-lg focus:outline-none focus:ring-2 focus:ring-blue-500"
              placeholder="First Name"
            />
          </div>

          {/* Last Name Input */}
          <div>
            <label className="block text-sm font-medium text-gray-700 mb-2" htmlFor="lastName">
              Last Name
            </label>
            <input
              type="text"
              id="lastName"
              value={userData.lastName}
              onChange={handleChange}
              required
              className="w-full p-3 border border-gray-300 rounded-lg focus:outline-none focus:ring-2 focus:ring-blue-500"
              placeholder="Last Name"
            />
          </div>

          {/* Email Input */}
          <div>
            <label className="block text-sm font-medium text-gray-700 mb-2" htmlFor="email">
              Email Address
            </label>
            <input
              type="email"
              id="email"
              value={userData.email}
              onChange={handleChange}
              required
              className="w-full p-3 border border-gray-300 rounded-lg focus:outline-none focus:ring-2 focus:ring-blue-500"
              placeholder="you@example.com"
            />
          </div>

          {/* Password Input */}
          <div>
            <label className="block text-sm font-medium text-gray-700 mb-2" htmlFor="password">
              Password
            </label>
            <input
              type="password"
              id="password"
              value={userData.password}
              onChange={handleChange}
              required
              className="w-full p-3 border border-gray-300 rounded-lg focus:outline-none focus:ring-2 focus:ring-blue-500"
              placeholder="••••••••"
            />
          </div>

          {/* Submit Button */}
          <Button variant="default" size="lg" className="w-full mt-4" disabled={isSuccess === true}>
            {isSuccess === true ? "Redirecting..." : "Register"}
          </Button>
        </form>

        {/* Social Media Login Options */}
        <div className="mt-6 text-center">
          <p className="text-sm text-gray-600 mb-4">or register with</p>
          <div className="flex justify-center gap-4">
            {/* Google Register */}
            <Button variant="outline" size="sm" className="flex items-center justify-center gap-2 px-4 py-2">
              <Icon name="google" className="text-red-500 text-2xl" />
            </Button>

            {/* GitHub Register */}
            <Button variant="outline" size="sm" className="flex items-center justify-center gap-2 px-4 py-2">
              <Icon name="github" className="text-gray-800 text-2xl" />
            </Button>

            {/* Facebook Register */}
            <Button variant="outline" size="sm" className="flex items-center justify-center gap-2 px-4 py-2">
              <Icon name="facebook" className="text-blue-600 text-2xl" />
            </Button>

            {/* Twitter Register */}
            <Button variant="outline" size="sm" className="flex items-center justify-center gap-2 px-4 py-2">
              <Icon name="twitter" className="text-blue-400 text-2xl" />
            </Button>
          </div>
        </div>

        {/* Already have an account link */}
        <div className="mt-4 text-center">
          <p className="text-sm text-gray-600">
            Already have an account?{" "}
            <a href="/login" className="text-sm text-blue-500 hover:underline">
              Login here
            </a>
          </p>
        </div>
      </div>
    </div>
  );
};

export default RegistrationPage;
