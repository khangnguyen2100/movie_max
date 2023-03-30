import { Route, Routes } from "react-router-dom";
import Layout from "src/components/Layout/Layout";
// import Layout from "./components/Layout/Layout";

import { useEffect } from "react";
import { useDispatch } from "react-redux";
import {
  Collection,
  Filters,
  Home,
  MovieDetail,
  NotFound,
  Movie,
  Tv,
  Search,
  TvDetail,
  TrendingWeek,
  TrendingDay,
  TvSeason,
} from "./pages";
import { getConfig, getGenres } from "./services/";

function App() {
  const dispatch = useDispatch();
  useEffect(() => {
    dispatch(
      getConfig({
        path: "configuration",
      })
    );
    dispatch(
      getGenres({
        path: "genre/movie/list",
        type: 'movie'
      })
    );
    dispatch(
      getGenres({
        path: "genre/tv/list",
        type: 'tv'
      })
    );
  }, []);

  return (
    <Layout>
      <Routes>
        <Route exact path="/" element={<Home />}></Route>
        <Route exact path="/search" element={<Search />}></Route>

        <Route exact path="/movie" element={<Movie />}></Route>
        <Route exact path="/movie/popular" element={<Movie type='popular' />}></Route>
        <Route exact path="/movie/now-playing" element={<Movie type='now_playing' />}></Route>
        <Route exact path="/movie/upcoming" element={<Movie type='upcoming' />}></Route>
        <Route exact path="/movie/top-rated" element={<Movie type='top_rated' />}></Route>
        <Route exact path="/movie/:id" element={<MovieDetail />}></Route>

        <Route exact path="/tv" element={<Tv />}></Route>
        <Route exact path="/tv/popular" element={<Tv type='popular' />}></Route>
        <Route exact path="/tv/airing-today" element={<Tv type='airing_today' />}></Route>
        <Route exact path="/tv/on-the-air" element={<Tv type='on_the_air' />}></Route>
        <Route exact path="/tv/top-rated" element={<Tv type='top_rated' />}></Route>
        <Route exact path="/tv/:id" element={<TvDetail />}></Route>
        <Route exact path="/tv/:id/season/:seasonId" element={<TvSeason />}></Route>

        <Route exact path="/trending/week" element={<TrendingWeek />}></Route>
        <Route exact path="/trending/day" element={<TrendingDay />}></Route>


        <Route path='*' exact={true} element={<NotFound />} />
      </Routes>
    </Layout>
  );
}

export default App;
