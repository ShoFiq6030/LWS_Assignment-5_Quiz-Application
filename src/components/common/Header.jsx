import logo from "../../assets/logo.svg";
function Header() {
  return (
    <header className="flex justify-between items-center mb-12">
      <img src={logo} className="h-7" />
      <div>
        <button
          className="px-4 py-2 rounded hover:bg-primary hover:text-white transition-colors"
          style={{ fontFamily: "Jaro" }}
        >
          Login
        </button>

        <button
          className="px-4 py-2 rounded hover:bg-primary hover:text-white transition-colors"
          style={{ fontFamily: "Jaro" }}
        >
          Logout
        </button>
      </div>
    </header>
  );
}

export default Header;
