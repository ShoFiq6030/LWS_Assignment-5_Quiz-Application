import { useState } from "react";
import axios from "axios";
import { useNavigate } from "react-router-dom";
import { toast } from "react-toastify";
import { useAuth } from "../../hooks/useAuth";
import { ClipLoader } from "react-spinners";

function LoginForm() {
  const [user, setUser] = useState({ email: "", password: "" });
  const [admin, setAdmin] = useState(false);
  const [error, setError] = useState(null);
  const [loading, setLoading] = useState(false);
  const navigate = useNavigate();
  const { setAuth } = useAuth();

  const handleFormSubmit = async (e) => {
    e.preventDefault();
    setError(null);

    if (user.email === "" || user.password === "") {
      return toast.error("Please fill in all fields");
    }

    // if (admin && !user.email.includes("admin")) {
    //   // Prevent unnecessary API call for non-admin users
    //   setError({ general: "Admin login credentials are required" });
    //   return toast.error("Admin login credentials are required");
    // }

    setLoading(true);

    try {
      const response = await axios.post(
        `${import.meta.env.VITE_SERVER_URL}/api/auth/login`,
        user
      );

      setLoading(false);

      if (response.status === 200) {
        const { tokens, user } = response.data.data;

        // Admin role validation
        if (admin && user.role !== "admin") {
          setError({ general: "You are not an admin" });
          return toast.error("You are not an admin");
        }
        //User role validation
        if (!admin && user.role !== "user") {
          setError({ general: "You are not a user" });
          return toast.error("You are not a user");
        }

        // Set authentication tokens and user data
        if (tokens) {
          const authToken = tokens.accessToken;
          const refreshToken = tokens.refreshToken;

          setAuth({ user, authToken, refreshToken });
          setUser({ email: "", password: "" }); // Reset form
          toast.success("Login successful 🎉");
          navigate("/");
        }
      }
    } catch (error) {
      setLoading(false);
      const errorMessage =
        error.response?.data?.message || "Login failed. Please try again.";
      setError({ general: errorMessage });
      toast.error(`Login failed: ${errorMessage}`);
    }
  };

  return (
    <form onSubmit={handleFormSubmit}>
      <div className="mb-4">
        <label htmlFor="email" className="block mb-2">
          Enter your username or email address
        </label>
        <input
          type="email"
          name="email"
          id="email"
          value={user.email}
          className="w-full px-4 py-3 rounded-lg border border-gray-300"
          placeholder="Username or email address"
          onChange={(e) => setUser({ ...user, email: e.target.value })}
        />
      </div>
      <div className="mb-6">
        <label htmlFor="password" className="block mb-2">
          Enter your Password
        </label>
        <input
          type="password"
          name="password"
          id="password"
          value={user.password}
          className="w-full px-4 py-3 rounded-lg border border-gray-300"
          placeholder="Password"
          onChange={(e) => setUser({ ...user, password: e.target.value })}
        />
      </div>
      <div className="mb-6 flex gap-2 items-center">
        <input
          type="checkbox"
          id="admin"
          className="px-4 py-3 rounded-lg border border-gray-300"
          onChange={(e) => setAdmin(e.target.checked)}
        />
        <label htmlFor="admin" className="block">
          Login as Admin
        </label>
      </div>
      {error && <p className="text-red-500 text-sm mt-1">{error.general}</p>}
      <button
        disabled={loading}
        type="submit"
        className={`w-full text-white  py-3 rounded-lg mb-2 ${
          loading
            ? "bg-gray-500 cursor-not-allowed"
            : "bg-primary hover:bg-violet-900"
        }`}
      >
        {loading ? <ClipLoader size={20} color="#ffffff" /> : "Sign In"}
      </button>
    </form>
  );
}

export default LoginForm;
