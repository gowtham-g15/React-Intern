import { useState, useEffect } from "react";
import { Link, useNavigate, useLocation } from "react-router-dom";
import axios from "axios";

const Navbar = () => {
  const [isLoggedIn, setIsLoggedIn] = useState(false);
  const [searchQuery, setSearchQuery] = useState("");
  const [searchResult, setSearchResult] = useState(null);

  const navigate = useNavigate();
  const location = useLocation();

  useEffect(() => {
    const token = localStorage.getItem("token");
    setIsLoggedIn(!!token);

    if (token && location.pathname === "/") {
      navigate("/employee");
    }
    if (!token && location.pathname.startsWith("/employee")) {
      navigate("/");
    }
  }, [location, navigate]);

  const handleSearch = async (e) => {
  e.preventDefault();
  try {
    console.log(searchQuery)
    const token = localStorage.getItem("token");
    const response = await axios.get(`https://springboot-intern-rjt3.onrender.com/api/employees/name/${searchQuery}`, {
      headers: { Authorization: `Bearer ${token}` }
    });
    setSearchResult(response.data);
    navigate("/employee");
  } catch (error) {
    console.error("Search error:", error);
    alert("Employee not found");
  }
};

  const handleLogout = () => {
    localStorage.clear();
    setIsLoggedIn(false);
    navigate("/");
  };

  return (
    <nav className="navbar navbar-expand-lg navbar-dark bg-dark">
      <div className="container">
        <Link className="navbar-brand" to={isLoggedIn ? "/employee" : "/"}>EMS</Link>

        <ul className="navbar-nav me-auto">
          {isLoggedIn && (
            <>
              <li className="nav-item"><Link className="nav-link" to="/employee">Employees</Link></li>
              <li className="nav-item"><Link className="nav-link" to="/add">Add</Link></li>
            </>
          )}
        </ul>

        {isLoggedIn && (
          <form onSubmit={handleSearch} className="d-flex align-items-center">
            <input
              className="form-control me-2"
              type="search"
              placeholder="Search Employee"
              value={searchQuery}
              onChange={(e) => setSearchQuery(e.target.value)}
              required
            />
            <button className="btn btn-outline-light" type="submit">Search</button>
            <button className="btn btn-outline-light ms-2" onClick={handleLogout}>Logout</button>
          </form>
        )}
      </div>
    </nav>
  );
};

export default Navbar;
