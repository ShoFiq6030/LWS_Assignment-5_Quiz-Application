import { useState } from "react";
import axios from "axios";
import { useNavigate } from "react-router-dom";
import { toast } from "react-toastify";
import { useAuth } from "../../hooks/useAuth";

function LoginForm() {
  const [user, setUser] = useState({
    email: "",
    password: "",
  });
  const [error, setError] = useState(null);
  const [loading, setLoading] = useState(false);
  const navigate = useNavigate();
  const { setAuth } = useAuth();

  const handleFormSubmit = async (e) => {
    setError(null);
    e.preventDefault();
    if (user.email === "" || user.password === "") {
      return toast.error("Please fill in all fields");
    }
    // console.log(user);
    setLoading(true);
    try {
      const response = await toast.promise(
        axios.post(`${import.meta.env.VITE_SERVER_URL}/api/auth/login`, user),
        {
          pending: "Loading...",
          success: "Login successful 🎉",
          error: "Login failed !!!",
        }
      );
      // console.log(response);
      setLoading(false);
      if (response.status === 200) {
        const { tokens, user } = response.data.data;
        // console.log(tokens);
        if (tokens) {
          const authToken = tokens.accessToken;
          const refreshToken = tokens.refreshToken;
          console.log(`login time: ${tokens.accessToken}`);
          setAuth({ user, authToken, refreshToken });
          navigate("/");
        }
      }
    } catch (error) {
      setLoading(false);
      console.log(error);
      setError({
        general: ` Login failed.....! ${error.response.data.message}`,
      });
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
        />
        <label htmlFor="admin" className="block ">
          Login as Admin
        </label>
      </div>
      {error && <p className="text-red-500 text-sm mt-1">{error.general}</p>}
      <button
        disabled={loading}
        type="submit"
        className={`w-full text-white py-3 rounded-lg mb-2 ${
          loading ? "bg-gray-500" : "bg-primary"
        }`}
      >
        {loading ? "Processing..." : "Sign In"}
      </button>
    </form>
  );
}

export default LoginForm;
