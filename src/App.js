import { Route, Routes } from "react-router-dom";
import Layout from "src/components/Layout/Layout";

import { useEffect } from "react";
import { useDispatch } from "react-redux";


import { Collection, Filters, Home, MovieDetail, NotFound, Search, TvDetail } from "./pages";
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
        <Route exact path="/collection/:homeSectionId" element={<Collection />} ></Route>
        <Route exact path="/filters" element={<Filters />}></Route>
        <Route exact path="/search" element={<Search />}></Route>
        <Route exact path="/movie/:id" element={<MovieDetail />}></Route>
        <Route exact path="/tv/:id" element={<TvDetail />}></Route>
        <Route path='*' exact={true} element={<NotFound />} />
      </Routes>
    </Layout>
  );
}

export default App;
