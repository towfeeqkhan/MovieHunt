import { CiSearch, CiBellOn, CiCalendarDate, CiStar } from "react-icons/ci";
import { MdLanguage } from "react-icons/md";
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

function Header() {
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
    <div className="flex items-center justify-end gap-8 h-24 bg-[#0F0F11] text-white relative">
      <div
        ref={searchRef}
        className="flex items-center space-x-3 border border-[#252527] w-[350px] px-4 py-3 rounded-[24px] "
      >
        <CiSearch size={24} />
        <input
          className="flex-1 py-1 outline-none"
          type="text"
          placeholder="Search"
          value={query}
          onChange={(e) => setQuery(e.target.value)}
        />
        {debouncedQuery && (
          <div className="w-86 h-65 bg-[#0F0F11] absolute top-full right-45 rounded-b-lg">
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
      <div className="cursor-pointer">
        <CiBellOn size={30} />
      </div>
      <div className="mr-10">
        <img className="h-11 cursor-pointer" src={Avatar} alt="avatar" />
      </div>
    </div>
  );
}

export default Header;
