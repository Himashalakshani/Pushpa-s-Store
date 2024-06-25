import { Link } from "react-router-dom";
import { Icon } from "@iconify/react";
import userIcon from "@iconify-icons/mdi/account-circle-outline";
import loginIcon from "@iconify-icons/mdi/login";
import cartIcon from "@iconify-icons/mdi/shopping";
import trackIcon from "@iconify-icons/mdi/truck-fast";

const Navbar = () => {
  return (
    <nav className="bg-green-600 p-4 flex justify-between items-center navbar-main">
      {/* Logo */}
      <Link to="/" className="text-white text-2xl font-bold brand">
      Pushpa's Store
      </Link>

      {/* Links */}
      <div className="flex items-center space-x-4 right-panel">
        {/* View Profile */}
        <Link to="/user-view">
          <Icon
            icon={userIcon}
            className="text-white text-3xl hover:text-gray-400 transition duration-300"
          />
        </Link>

        {/* Login */}
        <Link to="/user-login">
          <Icon
            icon={loginIcon}
            className="text-white text-3xl hover:text-gray-400 transition duration-300"
          />
        </Link>

        {/* Cart */}
        <Link to="/cart">
          <Icon
            icon={cartIcon}
            className="text-white text-3xl hover:text-gray-400 transition duration-300"
          />
        </Link>

        {/* Track Delivery */}
        <Link to="/track">
          <Icon
            icon={trackIcon}
            className="text-white text-3xl hover:text-gray-400 transition duration-300"
          />
        </Link>
      </div>
    </nav>
  );
};

export default Navbar;
