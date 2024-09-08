import { useEffect, useState } from "react";
import { useParams } from "react-router-dom";
import axios from "axios";
import unavailable from "../img/unavailable.png";
import { Grid as Loader } from "react-loader-spinner";

const CharacterComics = () => {
  const [data, setData] = useState();
  const [isLoading, setIsLoading] = useState(true);

  const { characterId } = useParams();
  // console.log("params ===> ", characterId);

  useEffect(() => {
    const fetchData = async () => {
      try {
        const response = await axios.get(
          `https://site--marvel-back--m7by8jdn4xzv.code.run/comics/${characterId}`
        );
        // console.log(response.data);
        setData(response.data);
        setIsLoading(false);
      } catch (error) {
        console.log(error);
      }
    };
    fetchData();
  }, [characterId]);

  return (
    <div>
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
        <main>
          <div className="container">
            <div className="character-comic-block">
              <div className="top-character">
                <p>{data.name}</p>
                <img
                  src={
                    data.thumbnail.path ===
                      "http://i.annihil.us/u/prod/marvel/i/mg/b/40/image_not_available" ||
                    data.thumbnail.path ===
                      "http://i.annihil.us/u/prod/marvel/i/mg/f/60/4c002e0305708"
                      ? unavailable
                      : data.thumbnail.path + "." + data.thumbnail.extension
                  }
                  alt={data.name}
                />
              </div>
              {data.comics.map((comic) => {
                return (
                  <div className="character-comic" key={comic.title}>
                    <p>{comic.title}</p>
                    <img
                      src={
                        comic.thumbnail.path ===
                        "http://i.annihil.us/u/prod/marvel/i/mg/b/40/image_not_available"
                          ? unavailable
                          : comic.thumbnail.path +
                            "/portrait_medium." +
                            comic.thumbnail.extension
                      }
                      alt={comic.title}
                    />
                  </div>
                );
              })}
            </div>
          </div>
        </main>
      )}
    </div>
  );
};

export default CharacterComics;
