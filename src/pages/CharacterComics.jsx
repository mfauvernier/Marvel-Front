import { useEffect, useState } from "react";
import { useParams } from "react-router-dom";
import axios from "axios";

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
        <p>Chargement ...</p>
      ) : (
        <div>
          <p>{data.name}</p>
          <p>{data.description}</p>
          {data.comics.map((comic) => {
            return (
              <>
                <p>{comic.title}</p>
                <img
                  src={
                    comic.thumbnail.path +
                    "/portrait_medium." +
                    comic.thumbnail.extension
                  }
                  alt=""
                />
              </>
            );
          })}
        </div>
      )}
    </div>
  );
};

export default CharacterComics;
