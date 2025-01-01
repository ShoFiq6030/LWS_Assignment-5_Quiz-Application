import React from "react";
import { Link, useNavigate } from "react-router-dom";
import { useAuth } from "../../hooks/useAuth";
import avatar from "../../assets/avater.webp";
import logo from "../../assets/logo-white.svg"

function DashboardSideBar() {
  const { auth, setAuth } = useAuth();
  const userName = auth?.user?.full_name;
  const navigate = useNavigate();

  const handleLogout = () => {
    setAuth({});
    navigate("/login");
  };

  return (
    <aside className="w-64 bg-primary p-6 flex flex-col">
      <div className="mb-10">
        <img src={logo} className="h-7" />
      </div>
      <nav className="flex-grow">
        <ul className="space-y-2">
          <li>
            <Link
              to={"/dashboard"}
              className="block py-2 px-4 rounded-lg bg-buzzr-purple bg-white text-primary font-bold"
            >
              Quizzes
            </Link>
          </li>

          <li>
            <Link
              href="#"
              className="block py-2 px-4 rounded-lg text-gray-100 hover:bg-gray-100 hover:text-primary"
            >
              Settings
            </Link>
          </li>

          <li>
            <Link
              href="#"
              className="block py-2 px-4 rounded-lg text-gray-100 hover:bg-gray-100 hover:text-primary"
            >
              Manage Users
            </Link>
          </li>

          <li>
            <Link
              href="#"
              className="block py-2 px-4 rounded-lg text-gray-100 hover:bg-gray-100 hover:text-primary"
            >
              Manage Roles
            </Link>
          </li>

          <li>
            <button
              onClick={handleLogout}
              className="block py-2 px-4 rounded-lg text-gray-100 hover:bg-gray-100 hover:text-primary"
            >
              Logout
            </button>
          </li>
        </ul>
      </nav>
      <div className="mt-auto flex items-center">
        <img
          src={avatar}
          alt="Mr Hasan"
          className="w-10 h-10 rounded-full mr-3 object-cover"
        />
        <span className="text-white font-semibold">{userName}</span>
      </div>
    </aside>
  );
}

export default DashboardSideBar;
