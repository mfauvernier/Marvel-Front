import logo from "../img/marvel-logo.png";
import { Link } from "react-router-dom";
import { useLocation } from "react-router-dom";

const Header = ({ search, setSearch, setPage }) => {
  const location = useLocation();
  const isHome = location.pathname === "/";
  if (isHome) return null;

  return (
    <header>
      <div className="container">
        <div className="header">
          <Link to="/">
            <img src={logo} alt="Marvel Logo" />
          </Link>
          <input
            className="header-input"
            placeholder="Recherche ..."
            type="search"
            value={search}
            onChange={(e) => {
              setSearch(e.target.value);
              setPage(1);
            }}
          />
          <div className="header-right">
            <Link
              to="/characters"
              onClick={() => {
                setPage(1);
                setSearch("");
              }}
            >
              <p>Personnages</p>
            </Link>
            <Link
              to="/comics"
              onClick={() => {
                setPage(1);
                setSearch("");
              }}
            >
              <p>Comics</p>
            </Link>
            <Link to="/favorites">
              <p>Favoris</p>
            </Link>
          </div>
        </div>
      </div>
    </header>
  );
};

export default Header;
