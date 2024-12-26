import { useState } from "react";
import axios from "axios";
import { useNavigate } from "react-router-dom";
import { toast } from "react-toastify";

function RegistrationForm() {
  const [newUser, setNewUser] = useState({
    full_name: "",
    email: "",
    password: "",
    confirmPassword: "",
    role: "user",
  });
  const [error, setError] = useState(null);
  const [loading, setLoading] = useState(false);
  const navigate = useNavigate();

  const clearForm = () => {
    setNewUser({
      full_name: "",
      email: "",
      password: "",
      confirmPassword: "",
      role: "user",
    });
    setError(null);
  };
  const handleChange = (e) => {
    setError(null);
    setNewUser((prev) => ({
      ...prev,
      [e.target.name]: e.target.value,
    }));
  };
  const handleCheckboxChange = (e) => {
    setNewUser((prev) => ({
      ...prev,
      role: e.target.checked ? "admin" : "user",
    }));
  };

  const handleFormSubmit = async (e) => {
    e.preventDefault();

    // Reset errors
    setError(null);

    const errors = {};

    // Validate fields
    if (!newUser.full_name) errors.full_name = "Full Name is required";
    if (!newUser.email) errors.email = "Email is required";
    // if (!/^[^\s@]+@[^\s@]+\.[^\s@]+$/.test(newUser.email)) {
    //     errors.email = "Invalid email format";
    //   }
    if (!newUser.password) errors.password = "Password is required";
    if (newUser.password.length < 8) {
      errors.password = "Password must be at least 8 characters long";
    }
    if (!newUser.confirmPassword) {
      errors.confirmPassword = "Confirm Password is required";
    } else if (newUser.password !== newUser.confirmPassword) {
      errors.confirmPassword = "Passwords do not match";
    }

    // If there are errors, set them and return
    if (Object.keys(errors).length > 0) {
      setError(errors);
      return;
    }

    setLoading(true);

    // If validation passes, make the API call
    try {
      console.log("Submitting user:", newUser);

      // Make the API call

      const response = await toast.promise(
        axios.post(
          `${import.meta.env.VITE_SERVER_URL}/api/auth/register`,
          newUser
        ),
        {
          pending: "Loading...",
          success: "Registration successful 🎉",
          error: "Registration failed 😢",
        }
      );
      console.log(response.data);

      setLoading(false);
      clearForm(); // Clear the form after successful registration
      navigate("/login"); // Redirect to login page
    } catch (err) {
      setLoading(false);
      console.error("Error during registration:", err);
      setError({ general: ` Registration failed.....! ${err.message}` });
    }
  };

  return (
    <form onSubmit={handleFormSubmit} className="">
      <div className="">
        <div className="mb-4">
          <label htmlFor="name" className="block mb-2">
            Full Name
          </label>
          <input
            type="text"
            id="name"
            name="full_name"
            className={`w-full px-4 py-3 rounded-lg border ${
              error?.full_name ? "border-red-300" : "border-gray-300"
            }`}
            placeholder="John Doe"
            value={newUser.full_name}
            onChange={handleChange}
          />
          {error?.full_name && (
            <p className="text-red-500 text-sm mt-1">{error.full_name}</p>
          )}
        </div>

        <div className="mb-4">
          <label htmlFor="email" className="block mb-2">
            Email
          </label>
          <input
            type="email"
            id="email"
            name="email"
            className={`w-full px-4 py-3 rounded-lg border ${
              error?.full_name ? "border-red-300" : "border-gray-300"
            }`}
            placeholder="Email address"
            value={newUser.email}
            onChange={handleChange}
          />
          {error?.email && (
            <p className="text-red-500 text-sm mt-1">{error.email}</p>
          )}
        </div>
      </div>

      <div className="flex  gap-4">
        <div className="mb-6">
          <label htmlFor="password" className="block mb-2">
            Enter your Password
          </label>
          <input
            type="password"
            id="password"
            name="password"
            className={`w-full px-4 py-3 rounded-lg border ${
              error?.full_name ? "border-red-300" : "border-gray-300"
            }`}
            placeholder="Password"
            value={newUser.password}
            onChange={handleChange}
          />
          {error?.password && (
            <p className="text-red-500 text-sm mt-1">{error.password}</p>
          )}
        </div>

        <div className="mb-6">
          <label htmlFor="confirmPassword" className="block mb-2">
            Confirm Password
          </label>
          <input
            type="password"
            id="confirmPassword"
            name="confirmPassword"
            className={`w-full px-4 py-3 rounded-lg border ${
              error?.full_name ? "border-red-300" : "border-gray-300"
            }`}
            placeholder="Confirm Password"
            value={newUser.confirmPassword}
            onChange={handleChange}
          />
          {error?.confirmPassword && (
            <p className="text-red-500 text-sm mt-1">{error.confirmPassword}</p>
          )}
        </div>
      </div>

      <div className="mb-6 flex gap-2 items-center">
        <input
          type="checkbox"
          id="admin"
          name="admin"
          className="px-4 py-3 rounded-lg border border-gray-300"
          onChange={handleCheckboxChange}
        />
        <label htmlFor="admin" className="block ">
          Register as Admin
        </label>
      </div>
      {error?.general && (
        <p className="text-red-500 text-sm mt-1">{error.general}</p>
      )}

      <button
        disabled={loading}
        type="submit"
        className={`w-full text-white py-3 rounded-lg mb-2 ${
          loading ? "bg-gray-500" : "bg-primary"
        }`}
      >
        {loading ? "Processing..." : "Create Account"}
      </button>
    </form>
  );
}

export default RegistrationForm;
