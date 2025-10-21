import { useParams } from "react-router";
import { GoHeartFill } from "react-icons/go";
import { MdLanguage } from "react-icons/md";
import { CiCalendarDate } from "react-icons/ci";
import { CiStar } from "react-icons/ci";
import { useQuery } from "@tanstack/react-query";
import axios from "axios";
import { languageMap } from "../../languageMap";

const apiKey = import.meta.env.VITE_TMDB_API_KEY;

async function fetchMovieById(movieId) {
  const response = await axios.get(
    `https://api.themoviedb.org/3/movie/${movieId}?api_key=${apiKey}`
  );

  return response.data;
}

function MovieDetails() {
  const { movieId } = useParams();

  const { data, isLoading, isError } = useQuery({
    queryKey: ["movieById", movieId],
    queryFn: () => fetchMovieById(movieId),
  });

  // Handle the loading state
  if (isLoading) {
    return (
      <div className="flex justify-center items-center h-screen bg-[#0F0F11] text-white">
        Loading movie details...
      </div>
    );
  }

  // Handle the error state
  if (isError) {
    return (
      <div className="flex justify-center items-center h-screen bg-[#0F0F11] text-red-500">
        Error fetching movie details. Please try again later.
      </div>
    );
  }

  return (
    <div className="px-4 md:px-8 bg-[#0F0F11] h-screen">
      <div className="w-full">
        <img
          className="w-full max-h-[510px] object-cover"
          src={`https://image.tmdb.org/t/p/original/${data.backdrop_path}`}
          alt="backdrop"
        />
      </div>
      <div className="flex items-center justify-between mt-8 text-white">
        <p className="text-[28px] max-md:w-[80%] font-semibold">{data.title}</p>
        <button className="cursor-pointer max-md:self-start max-md:mt-3 rounded-2xl customSize2:text-3xl text-2xl">
          <GoHeartFill />
        </button>
      </div>
      <div className="flex gap-4">
        <div className="flex items-center gap-3 text-gray-300 mt-4">
          <MdLanguage size={20} />
          <p>{languageMap[data.original_language] || data.original_language}</p>
        </div>
        <div className="self-end h-4 w-px bg-gray-300 my-1"></div>
        <div className="flex items-center gap-3 text-gray-300 mt-4">
          <CiCalendarDate size={20} />
          <p>{data.release_date.slice(0, 4)}</p>
        </div>
        <div className="self-end h-4 w-px bg-gray-300 my-1"></div>
        <div className="flex items-center gap-3 text-gray-300 mt-4">
          <CiStar size={20} />
          <p>{data.vote_average.toFixed(1)}</p>
        </div>
      </div>
      <div className="mt-9">
        <p className="text-gray-300 text-lg">{data.overview}</p>
      </div>
    </div>
  );
}

export default MovieDetails;
