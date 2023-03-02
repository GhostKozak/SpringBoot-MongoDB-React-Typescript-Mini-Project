import "./App.css";
import api from "./api/axiosConfig";
import { useState, useEffect } from "react";
import { Movie, ReviewId } from './types';
import Layout from "./components/Layout";
import { Routes, Route } from "react-router-dom";
import Home from "./components/Home";
import Header from "./components/Header/Header";
import Trailer from "./components/Trailer/Trailer";
import Reviews from "./components/Reviews/Reviews";
import NotFound from "./components/NotFound/NotFound";

function App() {
  const [movies, setMovies] = useState<Movie[]>([]);
  const [movie, setMovie] = useState<Movie>();
  const [reviews, setReviews] = useState<ReviewId[]>([]); // Change to ReviewId[]

  const getMovies = async () => {
    try {
      const response = await api.get("/movies");
      console.log(response);
      setMovies(response.data);
    } catch (error) {
      console.error(error);
    }
  };

  const getMovieData = async (movieId: string) => { // Change movieId type to string
    try {
      const response = await api.get(`/movies/${movieId}`);
      const singleMovie: Movie = response.data; // Define singleMovie type as Movie
      const reviews: ReviewId[] = singleMovie.reviewIds;
      setMovie(singleMovie);
      setReviews(reviews);
    } catch (error) {
      console.error(error);
    }
  };

  useEffect(() => {
    getMovies();
  }, []);

  return (
    <div className="App">
      <Header />
      <Routes>
        <Route path="/" element={<Layout />}>
          <Route path="/" element={<Home movies={movies} />} />
          <Route path="/Trailer/:ytTrailerId" element={<Trailer />} />
          <Route
            path="/Reviews/:movieId"
            element={
              <Reviews
                getMovieData={movieId => getMovieData(movieId as string)}
                reviews={reviews}
                setReviews={setReviews}
                movie={movie}
              />
            }
          />
          <Route path="*" element={<NotFound />} />
        </Route>
      </Routes>
    </div>
  );
}

export default App;