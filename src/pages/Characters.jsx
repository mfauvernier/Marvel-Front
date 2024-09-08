// Import images
import unavailable from "../img/unavailable.png";

//  Import Packages
import { useEffect, useState } from "react";
import axios from "axios";
import { Link } from "react-router-dom";

// Import Pagination
import Pagination from "@mui/material/Pagination";
import Stack from "@mui/material/Stack";

// Import Loader
import { Grid as Loader } from "react-loader-spinner";

const Characters = ({ search, page, setPage, setSearch }) => {
  const [data, setData] = useState();
  const [isLoading, setIsLoading] = useState(true);

  let limit = 100;
  // console.log("search 2 ===> ", search);
  useEffect(() => {
    const fetchData = async () => {
      try {
        const skip = (page - 1) * limit;
        const response = await axios.get(
          `https://site--marvel-back--m7by8jdn4xzv.code.run/characters?limit=${limit}&skip=${skip}&name=${search}`
        );
        setData(response.data);
        setIsLoading(false);
        // setSearch("");
      } catch (error) {
        console.log(error);
      }
    };
    const timer = setTimeout(() => {
      fetchData();
    }, 200);
    return () => {
      clearTimeout(timer);
    };
  }, [search, limit, page, setSearch]);

  useEffect(() => {
    setPage(1);
  }, [search]);

  // console.log("response ===> ", data);

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
          <div className="container main">
            <Stack>
              <Pagination
                className="pagination-container"
                page={page}
                onChange={(event, value) => {
                  setPage(value);
                }}
                size="large"
                sx={{
                  "& .MuiPaginationItem-root": { color: "#999999" },
                  "& .MuiPaginationItem-root:hover": {
                    color: "black",
                    backgroundColor: "red",
                  },
                  "& .Mui-selected": {
                    color: "black",
                    backgroundColor: "red !important",
                  },
                  "& .Mui-selected:hover": { backgroundColor: "orange" },
                }}
                count={Math.ceil(data.count / limit)}
              />
            </Stack>
            <div className="character-big-block">
              {data.results.map((result) => {
                // console.log("result ===> ", result);
                return (
                  <>
                    <Link
                      className="character-block"
                      key={result._id}
                      to={`/comics/${result._id}`}
                    >
                      <div>
                        <p className="name">{result.name}</p>
                        <img
                          src={
                            result.thumbnail.path ===
                              "http://i.annihil.us/u/prod/marvel/i/mg/b/40/image_not_available" ||
                            result.thumbnail.path ===
                              "http://i.annihil.us/u/prod/marvel/i/mg/f/60/4c002e0305708"
                              ? unavailable
                              : result.thumbnail.path +
                                "." +
                                result.thumbnail.extension
                          }
                          alt={result.name}
                        />
                        <div className="text">
                          <p>
                            {result.description
                              ? result.description
                              : "Pas de description pour ce personnage."}
                          </p>
                        </div>
                      </div>
                    </Link>
                    {/* <button>Ajouter aux favoris</button> */}
                  </>
                );
              })}
            </div>
            <Stack>
              <Pagination
                className="pagination-container"
                page={page}
                onChange={(event, value) => {
                  setPage(value);
                }}
                size="large"
                sx={{
                  "& .MuiPaginationItem-root": { color: "#999999" },
                  "& .MuiPaginationItem-root:hover": {
                    color: "black",
                    backgroundColor: "red",
                  },
                  "& .Mui-selected": {
                    color: "black",
                    backgroundColor: "red !important",
                  },
                  "& .Mui-selected:hover": { backgroundColor: "orange" },
                }}
                count={Math.ceil(data.count / limit)}
              />
            </Stack>
          </div>
        </main>
      )}
    </div>
  );
};

export default Characters;
