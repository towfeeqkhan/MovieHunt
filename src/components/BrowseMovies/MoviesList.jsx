import { MdLanguage } from "react-icons/md";
import { CiCalendarDate } from "react-icons/ci";
import { Link } from "react-router";
import { useQuery } from "@tanstack/react-query";
import axios from "axios";

const languageMap = {
  // Existing Major World Languages
  en: "English",
  hi: "Hindi",
  ko: "Korean",
  ja: "Japanese",
  fr: "French",
  es: "Spanish",
  de: "German",
  zh: "Chinese",
  it: "Italian",
  ru: "Russian",

  // Additional Major World Languages
  ar: "Arabic",
  pt: "Portuguese",
  tr: "Turkish",
  id: "Indonesian",
  tl: "Thai",
  nl: "Dutch",
  sv: "Swedish",
  pl: "Polish",

  // Indian Regional Languages
  ta: "Tamil",
  te: "Telugu",
  kn: "Kannada",
  ml: "Malayalam",
  pa: "Punjabi",
  ur: "Urdu",
};

const apiKey = import.meta.env.VITE_TMDB_API_KEY;

const fetchMoviesByGenre = async (genreId) => {
  const response = await axios.get(
    `https://api.themoviedb.org/3/discover/movie?api_key=${apiKey}&with_genres=${genreId}&language=en-US&page=1`
  );

  return response.data.results;
};

function MoviesList({ genreName }) {
  const GENRES = {
    Action: 28,
    Comedy: 35,
    Drama: 18,
    Horror: 27,
    Romance: 10749,
  };

  const genreId = GENRES[genreName];

  const { data, isLoading, isError } = useQuery({
    queryKey: ["moviesByGenre", genreId],
    queryFn: () => fetchMoviesByGenre(genreId),
  });

  if (isLoading) {
    return <p>Loading...</p>;
  }

  if (isError) {
    return <p>Error fetching movies</p>;
  }

  return (
    <div className="mt-8">
      <p className="font-semibold text-white text-2xl mb-3">{genreName}</p>

      {/* ✅ Scrollable container */}
      <div className="flex gap-10 overflow-x-auto no-scrollbar pt-2 pb-4 scroll-smooth snap-x snap-mandatory">
        {data.map((movie) => (
          <Link
            to={`/moviedetails/${movie.id}/${movie.title
              .replace(/\s+/g, "-")
              .toLowerCase()}`}
            key={movie.id}
          >
            <div
              key={movie.id}
              className="w-45 transition-transform duration-300 hover:-translate-y-1 hover:scale-[1.03] flex-shrink-0 rounded-t-lg snap-start relative"
            >
              <div className="h-[215px]">
                <img
                  className="w-full h-full object-cover rounded-t-lg"
                  src={`https://image.tmdb.org/t/p/original/${movie.poster_path}`}
                  alt="poster"
                />
              </div>
              <div className="h-[160px] bg-[#1F1F1F] rounded-b-lg px-5 py-4 flex flex-col justify-between">
                {/* Top section - Movie title */}
                <div>
                  <p className="text-white font-semibold text-[18px] leading-tight">
                    {movie.title.length > 30
                      ? movie.title.slice(0, 30) + "..."
                      : movie.title}
                  </p>
                </div>

                {/* Bottom section - Language + Release date */}
                <div>
                  <div className="flex items-center gap-3 text-gray-300">
                    <MdLanguage size={20} />
                    <p>
                      {languageMap[movie.original_language] ||
                        movie.original_language}
                    </p>
                  </div>
                  <div className="flex items-center gap-3 text-gray-300 mt-1">
                    <CiCalendarDate size={20} />
                    <p>{movie.release_date.slice(0, 4)}</p>
                  </div>
                </div>
              </div>
              <div className="bg-[#AC1A19] text-white rounded-full w-8 p-1 absolute top-[-8px] right-[-15px]">
                <p className="text-[15px] text-center">
                  {movie.vote_average.toFixed(1)}
                </p>
              </div>
            </div>
          </Link>
        ))}
      </div>
    </div>
  );
}

export default MoviesList;
