// Import Images
import logo from "../img/marvel-logo.png";

// Import Packages
import { Link } from "react-router-dom";

const Home = () => {
  return (
    <div className="container-home">
      <Link to="/characters">
        <img src={logo} alt="Marvel Logo" />
      </Link>
    </div>
  );
};

export default Home;
