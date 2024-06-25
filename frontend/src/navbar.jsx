const NavBar = () => {
    return (
      <nav className="bg-green-600">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
          <div className="flex items-center justify-between h-16">
            <div className="flex-shrink-0">
              {/* Your logo or brand name */}
              <span className="text-white font-semibold text-lg">Your Brand</span>
            </div>
            <div className="hidden md:block">
              <div className="flex space-x-4">
                <a
                  href="#"
                  className="text-white hover:bg-green-700 px-3 py-2 rounded-md text-lg font-medium"
                >
                  Suppliers
                </a>
                <a
                  href="#"
                  className="text-white hover:bg-green-700 px-3 py-2 rounded-md text-lg font-medium"
                >
                  Delivery
                </a>
                <a
                  href="#"
                  className="text-white hover:bg-green-700 px-3 py-2 rounded-md text-lg font-medium"
                >
                  Orders
                </a>
                <a
                  href="#"
                  className="text-white hover:bg-green-700 px-3 py-2 rounded-md text-lg font-medium"
                >
                  Manage Products
                </a>
              </div>
            </div>
          </div>
        </div>
      </nav>
    );
  };
  
  export default NavBar;
  