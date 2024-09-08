// Import Images

// Import Packages
import { useEffect, useState } from "react";
import { useParams } from "react-router-dom";
import axios from "axios";
import { Grid as Loader } from "react-loader-spinner";

const Comic = () => {
  const [data, setData] = useState();
  const [isLoading, setIsLoading] = useState(true);

  const { comicId } = useParams();

  useEffect(() => {
    const fetchData = async () => {
      try {
        const response = await axios.get(
          `https://site--marvel-back--m7by8jdn4xzv.code.run/comic/${comicId}`
        );
        // console.log(response.data);
        setData(response.data);
        setIsLoading(false);
        // console.log("data ===> ", data);
      } catch (error) {
        console.log(error);
      }
    };
    fetchData();
  }, [comicId]);

  const addToFavorites = () => {
    try {
      const favoritesFromStorage = JSON.parse(
        localStorage.getItem("favorites")
      ) || { characters: [], comics: [] };

      const favoriteComics = favoritesFromStorage.comics || [];

      const isFavorite = favoriteComics.find((fav) => fav._id === data._id);

      if (!isFavorite) {
        const updatedFavorites = {
          ...favoritesFromStorage,
          comics: [...favoriteComics, data],
        };
        localStorage.setItem("favorites", JSON.stringify(updatedFavorites));
        alert("Comic ajouté aux favoris !");
      } else {
        alert("Ce comic est déjà dans vos favoris.");
      }
    } catch (error) {
      console.error(error);
    }
  };

  return (
    <>
      {isLoading ? (
        <div className="container-loader">
          <Loader
            visible={true}
            height="160"
            width="160"
            color="black"
            ariaLabel="grid-loading"
            radius="12.5"
            wrapperStyle={{}}
            wrapperClass="grid-wrapper"
          />
        </div>
      ) : (
        <div className="container main">
          <div className="comic-comic-block">
            <div className="top-comic">
              <img
                src={data.thumbnail.path + "." + data.thumbnail.extension}
                alt={data.title}
              />
              <div className="favorite-comic">
                <p>{data.title}</p>
                <button onClick={() => addToFavorites(data)}>
                  Ajouter ce comic aux favoris
                </button>
              </div>
            </div>
            <p className="comic-description">{data.description}</p>
          </div>
        </div>
      )}
    </>
  );
};

export default Comic;
