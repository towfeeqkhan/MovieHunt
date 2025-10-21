import { CiSearch, CiBellOn, CiCalendarDate, CiStar } from "react-icons/ci";
import { MdLanguage } from "react-icons/md";
import { RxHamburgerMenu } from "react-icons/rx";
import Avatar from "../assets/avatar.png";
import { useQuery } from "@tanstack/react-query";
import { useEffect, useRef, useState } from "react";
import axios from "axios";
import { Link } from "react-router";
import { languageMap } from "../languageMap";
import { useDebounce } from "../custom hook/useDebounce";

const apiKey = import.meta.env.VITE_TMDB_API_KEY;

async function searchMovie(movie) {
  if (!movie) return [];
  const response = await axios.get(
    `https://api.themoviedb.org/3/search/movie?query=${movie}&api_key=${apiKey}`
  );

  const data = response.data.results;

  const movies = data.slice(0, 3);

  return movies;
}

function Header({ toggleSidebar }) {
  const [query, setQuery] = useState("");
  const debouncedQuery = useDebounce(query, 500);

  const searchRef = useRef(null);

  const { data, isLoading, isError } = useQuery({
    queryKey: ["searchMovie", debouncedQuery],
    queryFn: () => searchMovie(debouncedQuery),
    enabled: !!debouncedQuery,
  });

  useEffect(() => {
    function handleClickOutside(event) {
      if (searchRef.current && !searchRef.current.contains(event.target)) {
        setQuery("");
      }
    }

    document.addEventListener("mousedown", handleClickOutside);

    return () => {
      document.removeEventListener("mousedown", handleClickOutside);
    };
  }, []);

  return (
    <div className="flex items-center justify-end customSize2:gap-8 gap-4 h-24 bg-[#0F0F11] text-white relative">
      <div className="flex-1 sm:ml-8 ml-4 max-customSize:block hidden customSize2:text-2xl text-xl">
        <RxHamburgerMenu onClick={toggleSidebar} />
      </div>
      <div
        ref={searchRef}
        className="flex items-center customSize2:space-x-3 space-x-1.5 border border-[#252527] sm:w-[350px] w-[60%] sm:px-4 sm:py-3 px-2 py-2 rounded-[24px] customSize2:text-lg"
      >
        <div className="mt-0.5">
          <CiSearch />
        </div>
        <input
          className="flex-1 py-1 outline-none customSize2:placeholder:text-[16px] placeholder:text-[12px]"
          type="text"
          placeholder="Search"
          value={query}
          onChange={(e) => setQuery(e.target.value)}
        />
        {debouncedQuery && (
          <div className="w-86 h-65 bg-[#0F0F11] absolute top-full sm:right-45 right-30 max-customSize2:right-5 rounded-b-lg">
            {isLoading && <p className="text-center">Searching...</p>}
            {isError && <p className="text-center">Something went wrong</p>}
            {data?.length === 0 && (
              <p className="text-center">No results found</p>
            )}
            {data?.map((movie) => (
              <Link
                to={`/moviedetails/${movie.id}/${movie.title
                  .replace(/\s+/g, "-")
                  .toLowerCase()}`}
                key={movie.id}
                onClick={() => setQuery("")}
              >
                <div
                  key={movie.id}
                  className="flex items-center gap-4 py-3 px-4"
                >
                  <div>
                    <img
                      className="w-12 h-15 object-cover"
                      src={`https://image.tmdb.org/t/p/w500/${movie.poster_path}`}
                      alt={movie.title}
                    />
                  </div>
                  <div className="self-start">
                    <p className="font-semibold text-[17px]">
                      {movie.title.length > 26
                        ? movie.title.slice(0, 26) + "..."
                        : movie.title}
                    </p>
                    <div className="flex  gap-3">
                      <div className="flex items-center gap-3 text-gray-300 mt-2">
                        <MdLanguage size={18} />
                        <p className="text-[13px]">
                          {languageMap[movie.original_language] ||
                            movie.original_language}
                        </p>
                      </div>
                      <div className="self-end h-4 w-px bg-gray-300 mt-2"></div>
                      <div className="flex items-center gap-3 text-gray-300 mt-2">
                        <CiCalendarDate size={18} />
                        <p className="text-[13px]">
                          {movie.release_date.slice(0, 4)}
                        </p>
                      </div>
                      <div className="self-end h-4 w-px bg-gray-300 mt-2"></div>
                      <div className="flex items-center gap-3 text-gray-300 mt-2">
                        <CiStar size={18} />
                        <p className="text-[13px]">
                          {movie.vote_average.toFixed(1)}
                        </p>
                      </div>
                    </div>
                  </div>
                </div>
              </Link>
            ))}
          </div>
        )}
      </div>
      <div className="cursor-pointer customSize2:text-[28px] text-[25px]">
        <CiBellOn />
      </div>
      <div className="customSize2:mr-10 mr-3">
        <img
          className="w-11 max-customSize2:w-9 cursor-pointer"
          src={Avatar}
          alt="avatar"
        />
      </div>
    </div>
  );
}

export default Header;
