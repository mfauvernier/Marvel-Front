// Import Images
import unavailable from "../img/unavailable.png";

// Import Packages
import { useEffect, useState } from "react";
import { useParams } from "react-router-dom";
import axios from "axios";
import { Grid as Loader } from "react-loader-spinner";
import { Link } from "react-router-dom";

const CharacterComics = () => {
  const [data, setData] = useState(null);
  const [isLoading, setIsLoading] = useState(true);
  const { characterId } = useParams();

  useEffect(() => {
    const fetchData = async () => {
      try {
        const response = await axios.get(
          `https://site--marvel-back--m7by8jdn4xzv.code.run/comics/${characterId}`
        );
        setData(response.data);
        setIsLoading(false);
      } catch (error) {
        console.log(error);
      }
    };
    fetchData();
  }, [characterId]);

  if (isLoading) {
    return (
      <div className="container-loader">
        <Loader
          visible={true}
          height="160"
          width="160"
          color="black"
          ariaLabel="grid-loading"
          radius="12.5"
        />
      </div>
    );
  }

  return (
    <main>
      <div className="container main">
        <div className="character-comic-block">
          <div className="top-character">
            <div className="favorite-character">
              <p>{data.name}</p>
              <button>Ajouter ce personnage aux favoris</button>
            </div>
            <img
              src={
                data.thumbnail.path ===
                  "http://i.annihil.us/u/prod/marvel/i/mg/b/40/image_not_available" ||
                data.thumbnail.path ===
                  "http://i.annihil.us/u/prod/marvel/i/mg/f/60/4c002e0305708"
                  ? unavailable
                  : `${data.thumbnail.path}.${data.thumbnail.extension}`
              }
              alt={data.name}
            />
          </div>
          {data.comics.map((comic) => (
            <div className="character-comic" key={comic.title}>
              <Link to={`/comic/${comic._id}`}>
                <p>{comic.title}</p>
                <img
                  src={
                    comic.thumbnail.path ===
                    "http://i.annihil.us/u/prod/marvel/i/mg/b/40/image_not_available"
                      ? unavailable
                      : `${comic.thumbnail.path}/portrait_medium.${comic.thumbnail.extension}`
                  }
                  alt={comic.title}
                />
              </Link>
            </div>
          ))}
        </div>
      </div>
    </main>
  );
};

export default CharacterComics;
