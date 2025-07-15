import { Link, NavLink } from 'react-router-dom';
import { useStateContext } from '../../context/StateContextProvider';

const Navbar = () => {
  const {
    user,
    logout,
    handleCartClick,
    isNavOpen,
    handleNavLinks,
    handleNavClick,
    handleNavMenu,
    totalQty,
  } = useStateContext();
  console.log(user);
  return (
    <nav className="w-full bg-white shadow fixed top-0 left-0 z-50">
      <section className="max-w-6xl mx-auto flex justify-between items-center px-6 py-4 relative">

        {/* Desktop nav links */}
        <div className="hidden md:flex gap-6 text-gray-700 font-medium">
          <NavLink to="/#cakes" onClick={handleNavLinks("cakes")} className="hover:text-pink-500">Cakes</NavLink>
          <NavLink to="/about" className="hover:text-pink-500">About</NavLink>
          <NavLink to="#contact" onClick={handleNavLinks("contact")} className="hover:text-pink-500">Contact</NavLink>
          {user && <Link to="/orders" className="text-gray-700 hover:text-pink-500">My Orders</Link>}
        </div>

        {/* Mobile nav toggle */}
        <div className="md:hidden">
          {isNavOpen ? (
            <i className="fa-solid fa-x text-xl cursor-pointer" onClick={handleNavMenu}></i>
          ) : (
            <div onClick={handleNavMenu} className="flex flex-col gap-[4px] cursor-pointer">
              <span className="w-6 h-0.5 bg-gray-800 rounded"></span>
              <span className="w-6 h-0.5 bg-gray-800 rounded"></span>
              <span className="w-6 h-0.5 bg-gray-800 rounded"></span>
            </div>
          )}
        </div>

        {/* Mobile nav menu */}
        <div
          className={`absolute w-1/3 text-center top-full left-0 bg-white shadow-md rounded p-4 space-y-4 md:hidden transition-all duration-300 ${
            isNavOpen ? 'block' : 'hidden'
          }`}
        >
          <NavLink to="/#cakes" onClick={handleNavLinks("cakes")} className="block text-gray-700">Cakes</NavLink>
          <NavLink to="/about" onClick={handleNavLinks("about")} className="block text-gray-700">About</NavLink>
          <a href="#contact" onClick={handleNavLinks("contact")} className="block text-gray-700">Contact</a>

          
          {user ? (
  user.isAdmin ? (
    <NavLink to="/admin/orders" onClick={handleNavClick} className="block text-gray-700">
      Manage Orders
    </NavLink>
  ) : (
    <NavLink to="/orders" onClick={handleNavClick} className="block text-gray-700">
      My Orders
    </NavLink>
  )
) : null}


          {!user ? (
            <>
              <Link to="/login" className="block text-gray-700" onClick={() => window.scrollTo(0, 0)}>Login</Link>
              <Link to="/register" className="block px-4 py-1 bg-pink-500 text-white rounded text-center" onClick={() => window.scrollTo(0, 0)}>Register</Link>
            </>
          ) : (
            <>
              <p className="block text-gray-700">Hi, {user.name}</p>
              <button
                onClick={logout}
                className="block text-left px-4 py-1 bg-red-500 text-white text-center rounded w-full"
              >
                Logout
              </button>
            </>
          )}
        </div>

        {/* Logo */}
        <Link to="/" className="flex items-center gap-2">
          <div className="text-pink-500 text-2xl">
            <i className="fa-solid fa-cake-candles"></i>
          </div>
          <h1 className="text-xl font-bold text-gray-800">The Cake Nook</h1>
        </Link>

        {/* Right links (Desktop) */}
        <div className="hidden md:flex items-center gap-6 text-gray-700">
          {!user ? (
            <>
              <Link to="/login" className="cursor-pointer hover:text-pink-500" onClick={() => window.scrollTo(0, 0)}>Login</Link>
              <Link to="/register" className="cursor-pointer px-4 py-1 bg-pink-500 text-white rounded hover:bg-pink-600" onClick={() => window.scrollTo(0, 0)}>Register</Link>
            </>
          ) : (
            <>
              <div className="flex items-center gap-4 group relative">
              <span className="text-gray-700">Hi, <strong>{user.name}</strong></span>
              <button
                onClick={logout}
                className="opacity-0 group-hover:opacity-100 transition-opacity duration-300 px-4 py-1 bg-red-500 text-white rounded hover:bg-red-600"
              >
                Logout
              </button>
            </div>
            </>
          )}
        </div>
        <div className="relative cursor-pointer" onClick={handleCartClick}>
                    <i className="fa-solid fa-cart-shopping fa-xl"></i>
                    {totalQty > 0 && (
                    <div className="absolute -top-2 -right-2 bg-pink-500 text-white text-xs font-bold rounded-full h-5 w-5 flex items-center justify-center">
                        {totalQty}
                    </div>
                    )}
                </div>
      </section>
    </nav>
  );
};

export default Navbar;
