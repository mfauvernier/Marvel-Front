import { BrowserRouter as Router, Routes, Route } from "react-router-dom";
import { useState } from "react";

import "./App.css";

// Import des composants
import Header from "./components/Header";

// Import des Pages
import Home from "./pages/Home";
import Comics from "./pages/Comics";
import Characters from "./pages/Characters";
import CharacterComics from "./pages/CharacterComics";
import Comic from "./pages/Comic";
import Favorites from "./pages/Favorites";

function App() {
  const [search, setSearch] = useState("");
  const [page, setPage] = useState(1);

  return (
    <>
      <Router>
        <Header search={search} setSearch={setSearch} setPage={setPage} />
        <Routes>
          <Route path="/" element={<Home />} />
          <Route
            path="/characters"
            element={
              <Characters
                search={search}
                page={page}
                setPage={setPage}
                setSearch={setSearch}
              />
            }
          />
          <Route
            path="/comics"
            element={
              <Comics
                search={search}
                page={page}
                setPage={setPage}
                setSearch={setSearch}
              />
            }
          />
          <Route path="/comics/:characterId" element={<CharacterComics />} />
          <Route path="/comic/:comicId" element={<Comic />} />
          <Route path="/character/:characterId" />
          <Route path="/favorites" element={<Favorites />} />
        </Routes>
      </Router>
    </>
  );
}

export default App;
