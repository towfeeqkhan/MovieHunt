import { Swiper, SwiperSlide } from "swiper/react";
import { Autoplay, Pagination, Navigation, EffectFade } from "swiper/modules";
import "swiper/css";
import "swiper/css/pagination";
import "swiper/css/navigation";
import "swiper/css/effect-fade";
import { useQuery } from "@tanstack/react-query";
import axios from "axios";
import { Link } from "react-router";

const apiKey = import.meta.env.VITE_TMDB_API_KEY;

const fetchMoviesBanner = async () => {
  const response = await axios.get(
    `https://api.themoviedb.org/3/trending/movie/week?api_key=${apiKey}`
  );

  const data = response.data.results;

  const backdrops = data.slice(0, 3);

  return backdrops;
};

function MoviesBanner() {
  const { data, isLoading, isError } = useQuery({
    queryKey: ["moviesBanner"],
    queryFn: fetchMoviesBanner,
  });

  if (isLoading) {
    return <p>Loading...</p>;
  }

  if (isError) {
    return <p>Error fetching movie banner. Please try again later.</p>;
  }

  return (
    <div className="w-full">
      <Swiper
        spaceBetween={0}
        centeredSlides={true}
        effect="fade"
        fadeEffect={{ crossFade: true }}
        autoplay={{
          delay: 4000,
          disableOnInteraction: false,
        }}
        pagination={{
          clickable: true,
        }}
        // navigation={true}
        modules={[Autoplay, Pagination, Navigation, EffectFade]}
        className="mySwiper"
      >
        {data?.map((banner, index) => (
          <SwiperSlide key={index}>
            <div className="relative">
              <img
                className="w-full max-h-[440px] object-cover"
                src={`https://image.tmdb.org/t/p/original/${banner.backdrop_path}`}
                alt={banner.title}
              />
              <div className="absolute top-16 left-8">
                <p className="text-6xl text-white font-bold mb-5">NETFLIX</p>
                <p className="text-3xl text-white mb-8">{banner.title}</p>
                <Link to={`/moviedetails/${banner.id}/${banner.title}`}>
                  <button className="text-white bg-[#AC1A19] py-3 px-8 rounded-3xl">
                    Watch
                  </button>
                </Link>
              </div>
            </div>
          </SwiperSlide>
        ))}
      </Swiper>
    </div>
  );
}

export default MoviesBanner;

// import Banner1 from "../../assets/banner1.png";

// function MoviesBanner() {
//   return (
//     <>
//       <div className="w-full relative">
//         <img
//           className="w-full max-h-[440px] object-cover"
//           src={Banner1}
//           alt="banner"
//         />

//         <div className="absolute top-16 left-8">
//           <p className="text-6xl text-white font-bold mb-5">NETFLIX</p>
//           <p className="text-3xl text-white mb-8">Alice in Border Land</p>

//           <button className="text-white bg-[#AC1A19] py-3 px-8 rounded-3xl">
//             Watch
//           </button>
//         </div>
//       </div>
//     </>
//   );
// }

// export default MoviesBanner;
