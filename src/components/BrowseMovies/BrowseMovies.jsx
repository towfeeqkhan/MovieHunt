import MoviesBanner from "./MoviesBanner";
import MoviesList from "./MoviesList";

function BrowseMovies() {
  return (
    <div className="px-4 md:px-8 bg-[#0F0F11]">
      <MoviesBanner />
      <MoviesList genreName="Action" />
      <MoviesList genreName="Horror" />
      <MoviesList genreName="Comedy" />
      <MoviesList genreName="Drama" />
    </div>
  );
}

export default BrowseMovies;
