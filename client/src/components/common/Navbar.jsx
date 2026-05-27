import React, { useState, useEffect, useRef } from 'react';
import { Link, NavLink, useNavigate, useLocation } from 'react-router-dom';
import { useAuth } from '../../context/AuthContext';
import { BiMenu, BiX, BiChevronDown, BiSearch } from 'react-icons/bi';
import { GENRES } from '../../utils/constants';
import { useDebounce } from '../../hooks/useDebounce';

const Navbar = () => {
  const { isAuthenticated, setLoginModalOpen, setRegisterModalOpen, logout, user } = useAuth();
  const [scrolled, setScrolled] = useState(false);
  const [sidebarOpen, setSidebarOpen] = useState(false);
  const [genreDropdownOpen, setGenreDropdownOpen] = useState(false);
  const [searchVal, setSearchVal] = useState('');
  const [mobileSearchFocused, setMobileSearchFocused] = useState(false);

  const navigate = useNavigate();
  const location = useLocation();
  const debouncedSearch = useDebounce(searchVal, 500);
  const inputRef = useRef(null);
  const mobileInputRef = useRef(null);

  // Scroll listener — darkens navbar on scroll
  useEffect(() => {
    const handleScroll = () => {
      setScrolled(window.scrollY > 30);
    };
    window.addEventListener('scroll', handleScroll);
    return () => window.removeEventListener('scroll', handleScroll);
  }, []);

  // Navigate to /search when debounced value changes
  useEffect(() => {
    const params = new URLSearchParams(location.search);
    const currentQuery = params.get('q') || '';
    if (location.pathname === '/search' && debouncedSearch.trim() && debouncedSearch.trim() !== currentQuery) {
      navigate(`/search?q=${encodeURIComponent(debouncedSearch.trim())}`);
    }
  }, [debouncedSearch, navigate, location]);

  const handleSearchChange = (e) => {
    setSearchVal(e.target.value);
  };

  const handleSearchSubmit = (e) => {
    e.preventDefault();
    const params = new URLSearchParams(location.search);
    const currentQuery = params.get('q') || '';
    const target = searchVal.trim() ? `/search?q=${encodeURIComponent(searchVal.trim())}` : '/search';
    if (target !== location.pathname + (currentQuery ? `?q=${currentQuery}` : '')) {
      navigate(target);
    }
  };

  const handleClearSearch = () => {
    setSearchVal('');
    inputRef.current?.focus();
    mobileInputRef.current?.focus();
  };

  return (
    <header
      className={`fixed top-0 left-0 right-0 z-40 transition-all duration-300 py-3 px-2 sm:px-6 md:px-12 flex items-center justify-between gap-1.5 sm:gap-4 ${
        scrolled
          ? 'bg-[#090909]/95 backdrop-blur-md shadow-lg border-b border-neutral-900/50'
          : 'bg-gradient-to-b from-black/80 to-transparent'
      }`}
    >
      {/* Brand & Desktop Nav Links */}
      <div className={`flex items-center space-x-8 shrink-0 ${mobileSearchFocused ? 'hidden lg:flex' : ''}`}>
        <Link
          to="/"
          className="text-xl sm:text-2xl md:text-3xl font-extrabold text-brand tracking-tighter hover:scale-105 transition-transform duration-200"
        >
          CINE<span className="text-white">SCOPE</span>
        </Link>

        {/* Desktop navigation */}
        <nav className="hidden lg:flex items-center space-x-6 text-sm font-semibold text-brand">
          <NavLink
            to="/"
            end
            className={({ isActive }) =>
              `hover:text-white transition duration-200 ${isActive ? 'text-white font-bold' : ''}`
            }
          >
            Home
          </NavLink>

          <NavLink
            to="/search"
            className={({ isActive }) =>
              `hover:text-white transition duration-200 ${isActive ? 'text-white font-bold' : ''}`
            }
          >
            Browse
          </NavLink>

          {/* Genres Dropdown */}
          <div className="relative">
            <button
              onClick={() => setGenreDropdownOpen(!genreDropdownOpen)}
              onMouseEnter={() => setGenreDropdownOpen(true)}
              className="hover:text-white flex items-center space-x-1 transition duration-200 py-1 cursor-pointer"
            >
              <span>Genres</span>
              <BiChevronDown
                className={`w-4 h-4 transition-transform duration-200 ${genreDropdownOpen ? 'rotate-180' : ''}`}
              />
            </button>

            {genreDropdownOpen && (
              <div
                onMouseLeave={() => setGenreDropdownOpen(false)}
                className="absolute left-0 mt-2 w-64 bg-dark-200 border border-neutral-800 rounded-xl shadow-2xl grid grid-cols-2 gap-1 p-2 z-50"
              >
                {GENRES.map((genre) => (
                  <Link
                    key={genre.id}
                    to={`/genres/${genre.id}`}
                    onClick={() => setGenreDropdownOpen(false)}
                    className="px-3 py-2 text-xs hover:bg-neutral-800 rounded-md text-brand hover:text-white font-medium transition duration-150"
                  >
                    {genre.name}
                  </Link>
                ))}
              </div>
            )}
          </div>

          <NavLink
            to="/watchlist"
            className={({ isActive }) =>
              `hover:text-white transition duration-200 ${isActive ? 'text-white font-bold' : ''}`
            }
          >
            Watchlist
          </NavLink>
        </nav>
      </div>

      {/* Centre: Search Bar — always visible on desktop */}
      <form
        onSubmit={handleSearchSubmit}
        className="hidden lg:flex flex-1 max-w-sm items-center bg-neutral-900/80 border border-brand rounded-full px-4 py-2 gap-2 focus-within:border-red-500 focus-within:ring-1 focus-within:ring-red-500 transition duration-300"
      >
        <BiSearch className="w-4 h-4 text-neutral-500 shrink-0" />
        <input
          ref={inputRef}
          type="text"
          value={searchVal}
          onChange={handleSearchChange}
          placeholder="Search movies, actors..."
          className="bg-transparent border-none text-sm text-white placeholder-neutral-500 focus:outline-none w-full"
        />
        {searchVal && (
          <button
            type="button"
            onClick={handleClearSearch}
            className="text-neutral-500 hover:text-white transition shrink-0"
          >
            <BiX className="w-4 h-4" />
          </button>
        )}
      </form>

      {/* Mobile Search Bar in Nav (visible only on mobile/tablet) */}
      {!mobileSearchFocused ? (
        <button
          type="button"
          onClick={() => {
            setMobileSearchFocused(true);
            setTimeout(() => mobileInputRef.current?.focus(), 50);
          }}
          className="flex lg:hidden flex-1 mx-1.5 max-w-[115px] sm:max-w-xs items-center bg-neutral-900/80 border border-brand rounded-full px-2 py-1 gap-1 transition-all duration-300 cursor-text"
        >
          <BiSearch className="w-3 h-3 text-neutral-500 shrink-0" />
          <span className="text-[11px] text-neutral-500 truncate">Search...</span>
        </button>
      ) : (
        <form
          onSubmit={handleSearchSubmit}
          className="flex lg:hidden flex-1 items-center bg-neutral-900/80 border border-red-500 ring-1 ring-red-500 rounded-full px-3 py-1.5 gap-2 transition-all duration-300"
        >
          <BiSearch className="w-4 h-4 text-neutral-500 shrink-0" />
          <input
            ref={mobileInputRef}
            type="text"
            value={searchVal}
            onChange={handleSearchChange}
            placeholder="Search movies, actors..."
            className="bg-transparent border-none text-sm text-white placeholder-neutral-500 focus:outline-none w-full"
          />
          <button
            type="button"
            onClick={() => {
              setSearchVal('');
              setMobileSearchFocused(false);
              mobileInputRef.current?.blur();
            }}
            className="text-neutral-400 hover:text-white transition shrink-0"
          >
            <BiX className="w-5 h-5" />
          </button>
        </form>
      )}

      {/* Right: Auth Buttons & Menu trigger */}
      <div className={`flex items-center space-x-2 md:space-x-3 shrink-0 ${mobileSearchFocused ? 'hidden lg:flex' : ''}`}>
        {/* Desktop Auth Section (Sign In / Sign Up) */}
        {!isAuthenticated && (
          <div className="hidden lg:flex items-center space-x-3">
            <button
              onClick={() => setLoginModalOpen(true)}
              className="text-white hover:text-brand font-semibold text-sm px-4 py-2 transition"
            >
              Sign In
            </button>
            <button
              onClick={() => setRegisterModalOpen(true)}
              className="bg-brand text-white text-sm font-bold px-4 py-2 rounded-lg hover:bg-brand/90 transition shadow-md shadow-brand/20 active:scale-95"
            >
              Sign Up
            </button>
          </div>
        )}

        {/* Sidebar Trigger (Hamburger Menu) - visible on mobile always, on desktop only when authenticated */}
        <button
          onClick={() => setSidebarOpen(!sidebarOpen)}
          className={`text-neutral-350 hover:text-white p-1 cursor-pointer transition active:scale-95 ${
            isAuthenticated ? 'flex' : 'flex lg:hidden'
          }`}
          aria-label="Toggle Menu"
        >
          {sidebarOpen ? <BiX className="w-7 h-7" /> : <BiMenu className="w-7 h-7" />}
        </button>
      </div>

      {/* Sliding Sidebar Drawer */}
      {/* Backdrop overlay */}
      <div
        className={`fixed inset-0 bg-black/60 backdrop-blur-sm z-40 transition-opacity duration-300 ${
          sidebarOpen ? 'opacity-100 pointer-events-auto' : 'opacity-0 pointer-events-none'
        }`}
        onClick={() => setSidebarOpen(false)}
      />

      {/* Sidebar Panel */}
      <div
        className={`fixed top-0 left-0 h-screen w-[280px] bg-black border-r border-neutral-850 z-50 flex flex-col shadow-2xl transition-transform duration-300 ease-in-out ${
          sidebarOpen ? 'translate-x-0' : '-translate-x-full'
        }`}
      >
        {/* Scrollable Container inside Sidebar */}
        <div className="flex-1 overflow-y-auto p-6 flex flex-col justify-between min-h-0">
          <div className="flex flex-col gap-6">
            {/* Top Row: User Details (with Logo) & Close Button */}
            <div className="flex justify-between items-center pb-3 border-b border-neutral-800 gap-3">
              <div className="flex items-center gap-3 min-w-0">
                <div className="w-8 h-8 rounded-full bg-brand flex items-center justify-center font-bold text-white text-sm shrink-0 shadow-md">
                  {user?.name ? user.name.charAt(0).toUpperCase() : 'U'}
                </div>
                <div className="flex flex-col min-w-0">
                  <span className="text-sm font-bold text-white truncate">{user?.name || 'CineScope User'}</span>
                  <span className="text-xs text-neutral-500 truncate">{user?.email || 'Welcome back'}</span>
                </div>
              </div>
              <button
                onClick={() => setSidebarOpen(false)}
                className="text-neutral-450 hover:text-white p-1 transition shrink-0"
                aria-label="Close Menu"
              >
                <BiX className="w-7 h-7" />
              </button>
            </div>

            {/* Navigation Links */}
            <nav className="flex flex-col space-y-4 text-base font-semibold text-neutral-300">
              <Link
                to="/"
                onClick={() => setSidebarOpen(false)}
                className="hover:text-white py-1 transition lg:hidden"
              >
                Home
              </Link>

              {/* Genres Accordion */}
              <div className="flex flex-col gap-2 lg:hidden">
                <button
                  onClick={() => setGenreDropdownOpen(!genreDropdownOpen)}
                  className="hover:text-white flex items-center justify-between w-full py-1 text-left cursor-pointer transition"
                >
                  <span>Genre</span>
                  <BiChevronDown
                    className={`w-5 h-5 transition-transform duration-200 ${genreDropdownOpen ? 'rotate-180' : ''}`}
                  />
                </button>

                {genreDropdownOpen && (
                  <div className="grid grid-cols-2 gap-2 pl-3 py-2 border-l border-neutral-800 animate-in slide-in-from-top-2 duration-200">
                    {GENRES.map((genre) => (
                      <Link
                        key={genre.id}
                        to={`/genres/${genre.id}`}
                        onClick={() => setSidebarOpen(false)}
                        className="text-sm text-neutral-450 hover:text-white transition duration-150"
                      >
                        {genre.name}
                      </Link>
                    ))}
                  </div>
                )}
              </div>

              <Link
                to="/search"
                onClick={() => setSidebarOpen(false)}
                className="hover:text-white py-1 transition lg:hidden"
              >
                Searchbar (Browse)
              </Link>

              {/* Account links - visible on all screens inside sidebar */}
              {isAuthenticated && (
                <>
                  <Link
                    to="/profile"
                    onClick={() => setSidebarOpen(false)}
                    className="hover:text-white py-1 transition flex items-center space-x-2"
                  >
                    <span>My Profile</span>
                  </Link>

                  <Link
                    to="/watchlist"
                    onClick={() => setSidebarOpen(false)}
                    className="hover:text-white py-1 transition flex items-center space-x-2"
                  >
                    <span>My Watchlist</span>
                  </Link>
                </>
              )}
            </nav>
          </div>

          {/* Bottom Profile / Auth buttons */}
          <div className="border-t border-neutral-800 pt-4 mt-6">
            {isAuthenticated ? (
              <button
                onClick={async () => {
                  setSidebarOpen(false);
                  await logout();
                  navigate('/');
                }}
                className="w-full bg-neutral-800 hover:bg-neutral-700 text-brand text-sm font-bold py-2.5 rounded-lg transition active:scale-95"
              >
                Sign Out
              </button>
            ) : (
              <div className="flex flex-col gap-3">
                <button
                  onClick={() => {
                    setSidebarOpen(false);
                    setLoginModalOpen(true);
                  }}
                  className="w-full border border-neutral-700 text-white font-semibold py-2.5 rounded-lg text-sm hover:bg-neutral-800 transition active:scale-95"
                >
                  Sign In
                </button>
                <button
                  onClick={() => {
                    setSidebarOpen(false);
                    setRegisterModalOpen(true);
                  }}
                  className="w-full bg-brand text-white font-bold py-2.5 rounded-lg text-sm hover:bg-brand/90 transition shadow-md shadow-brand/20 active:scale-95"
                >
                  Sign Up
                </button>
              </div>
            )}
          </div>
        </div>
      </div>
    </header>
  );
};

export default Navbar;
