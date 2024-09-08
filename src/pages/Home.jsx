import logo from "../img/marvel-logo.png";
import { Link } from "react-router-dom";

const Home = (setHome) => {
  return (
    <div className="container-home">
      <Link
        to="/characters"
        onClick={() => {
          setHome(true);
        }}
      >
        <img src={logo} alt="Marvel Logo" />
      </Link>
    </div>
  );
};

export default Home;
