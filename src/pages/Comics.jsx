// Import Images
import unavailable from "../img/unavailable.png";

// Import Packages
import { useEffect, useState } from "react";
import axios from "axios";
import { Link } from "react-router-dom";

// Import Pagination
import Pagination from "@mui/material/Pagination";
import Stack from "@mui/material/Stack";

// Import Loader
import { Grid as Loader } from "react-loader-spinner";

const Comics = ({ search, page, setPage, setSearch }) => {
  const [data, setData] = useState("");
  const [isLoading, setIsLoading] = useState(true);

  let limit = 100;

  useEffect(() => {
    const fetchData = async () => {
      try {
        let skip = (page - 1) * limit;
        const response = await axios.get(
          `https://site--marvel-back--m7by8jdn4xzv.code.run/comics?limit=${limit}&skip=${skip}&title=${search}`
        );
        setData(response.data);
        setIsLoading(false);
        // setSearch("");
        // console.log("ici ==== > ", data);
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
            <div className="comic-big-block">
              {data.results.map((result, index) => {
                // console.log(result);
                return (
                  <Link
                    to={`/comic/${result._id}`}
                    className="comic-block"
                    key={index}
                  >
                    <div>
                      <p className="title">{result.title}</p>
                      <img
                        src={
                          result.thumbnail.path ===
                            "http://i.annihil.us/u/prod/marvel/i/mg/b/40/image_not_available" ||
                          result.thumbnail.path ===
                            "http://i.annihil.us/u/prod/marvel/i/mg/9/70/55ae776a0cb39"
                            ? unavailable
                            : result.thumbnail.path +
                              "." +
                              result.thumbnail.extension
                        }
                        alt={result.title}
                      />

                      <p>{result.description}</p>
                    </div>
                  </Link>
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

export default Comics;
