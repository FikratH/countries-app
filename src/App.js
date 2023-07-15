import "./App.css";
import { createBrowserRouter, RouterProvider } from "react-router-dom";
import { ROUTES } from "./routes/route";
import MainContext from "./contexts/MainContext";
import { useState } from "react";

const router = createBrowserRouter(ROUTES);

function App() {
  const [search, setSearch] = useState("");
  const [filterValue, setFilterValue] = useState("");

  const data = { search, setSearch, filterValue, setFilterValue };
  return (
    <MainContext.Provider value={data}>
      <RouterProvider router={router} />
    </MainContext.Provider>
  );
}

export default App;
