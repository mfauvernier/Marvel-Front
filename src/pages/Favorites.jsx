import { useEffect, useState } from "react";
import unavailable from "../img/unavailable.png";

const Favorites = () => {
  const [favorites, setFavorites] = useState({ characters: [], comics: [] });

  useEffect(() => {
    try {
      const favoritesFromStorage = JSON.parse(
        localStorage.getItem("favorites")
      ) || { characters: [], comics: [] };
      if (!Array.isArray(favoritesFromStorage.characters)) {
        favoritesFromStorage.characters = [];
      }
      if (!Array.isArray(favoritesFromStorage.comics)) {
        favoritesFromStorage.comics = [];
      }
      setFavorites(favoritesFromStorage);
    } catch (error) {
      console.error(error);
    }
  }, []);

  const handleRemoveFavorite = (id, type) => {
    const updatedFavorites = { ...favorites };

    if (type === "character") {
      updatedFavorites.characters = updatedFavorites.characters.filter(
        (character) => character._id !== id
      );
    } else if (type === "comic") {
      updatedFavorites.comics = updatedFavorites.comics.filter(
        (comic) => comic._id !== id
      );
    }

    localStorage.setItem("favorites", JSON.stringify(updatedFavorites));

    setFavorites(updatedFavorites);
  };

  return (
    <main>
      <div className="container main">
        <div className="favorites-block">
          {favorites.characters.length > 0 ? (
            <>
              <div className="favorites">
                <h2>Personnages</h2>
              </div>
              <div className="favorite-cards">
                {favorites.characters.map((character) => (
                  <div className="favorite-card" key={character._id}>
                    <img
                      src={
                        character.thumbnail.path ===
                        "http://i.annihil.us/u/prod/marvel/i/mg/b/40/image_not_available"
                          ? unavailable
                          : `${character.thumbnail.path}.${character.thumbnail.extension}`
                      }
                      alt={character.name}
                    />
                    <p>{character.name}</p>
                    <button
                      className="delete"
                      onClick={() =>
                        handleRemoveFavorite(character._id, "character")
                      }
                    >
                      Supprimer le favori
                    </button>
                  </div>
                ))}
              </div>
            </>
          ) : null}

          {favorites.comics.length > 0 ? (
            <>
              <div className="favorites">
                <h2>Comics</h2>
              </div>
              <div className="favorite-cards">
                {favorites.comics.map((comic) => (
                  <div key={comic._id} className="favorite-card">
                    <img
                      src={
                        comic.thumbnail.path ===
                        "http://i.annihil.us/u/prod/marvel/i/mg/b/40/image_not_available"
                          ? unavailable
                          : `${comic.thumbnail.path}/portrait_medium.${comic.thumbnail.extension}`
                      }
                      alt={comic.title}
                    />
                    <p>{comic.title}</p>
                    <button
                      className="delete"
                      onClick={() => handleRemoveFavorite(comic._id, "comic")}
                    >
                      Supprimer le favori
                    </button>
                  </div>
                ))}
              </div>
            </>
          ) : null}

          {favorites.characters.length === 0 &&
            favorites.comics.length === 0 && (
              <p className="no-fav">Aucun favori pour le moment.</p>
            )}
        </div>
      </div>
    </main>
  );
};

export default Favorites;
