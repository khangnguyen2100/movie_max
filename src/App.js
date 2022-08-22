import Layout from "./components/Layout/Layout";
import { Routes, Route } from "react-router-dom";

import Home from "./pages/Home";
import Collection from "./pages/Collection";
import Filters from "./pages/Filters";
import Search from "./pages/Search";
import Detail from "./pages/Detail";
import NotFound from "./pages/NotFound";
function App() {
  return (
    <Layout>
      <Routes>
        <Route exact path="/" element={<Home />}></Route>
        <Route exact path="/collection/:homeSectionId" element={<Collection />} ></Route>
        <Route exact path="/filters" element={<Filters />}></Route>
        <Route exact path="/search" element={<Search />}></Route>
        <Route exact path="/detail/:category/:id" element={<Detail />}></Route>
        <Route exact path="/detail/:category/:id/:episodeId" element={<Detail />}></Route>
        <Route path='*' exact={true} element={<NotFound />} />
      </Routes>
    </Layout>
  );
}

export default App;
