import { useEffect, useState } from "react";
import { useParams } from "react-router-dom";
import axios from "axios";

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

  return (
    <>
      {isLoading ? (
        <p>Chargement...</p>
      ) : (
        <div>
          <p>{data.title}</p>
          <p>{data.description}</p>
          <img
            src={
              data.thumbnail.path +
              "/portrait_medium." +
              data.thumbnail.extension
            }
            alt=""
          />
        </div>
      )}
    </>
  );
};

export default Comic;
