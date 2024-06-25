import { Link } from "react-router-dom";

const NavBar = () => {
  return (
    <nav className="bg-green-600">
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
        <div className="flex items-center justify-between h-16">
          <Link to="/table">
            <div className="flex-shrink-0">
              {/* Your logo or brand name */}
              <span className="text-white font-semibold text-lg">
                Pushpa's Store
              </span>
            </div>
          </Link>
          <div className="hidden md:block">
            <div className="flex space-x-4">
              <Link
                className="text-white font-semibold hover:underline"
                to="/agents"
              >
                Agents
              </Link>
              <Link
                className="text-white font-semibold hover:underline"
                to="/table"
              >
                Manage Products
              </Link>
              <Link
                className="text-white font-semibold hover:underline"
                to="/supplier"
              >
                Manage Suppliers
              </Link>
            </div>
          </div>
        </div>
      </div>
    </nav>
  );
};

export default NavBar;
