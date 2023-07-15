import React from "react";
import Index from "../pages/Index/Index";
import Details from "../pages/Details/Details";
import SiteRoot from "../pages/SiteRoot/SiteRoot";

export const ROUTES = [
  {
    path: "/",
    element: <SiteRoot />,
    children: [
      {
        path: "",
        element: <Index />,
      },
      {
        path: "details/:id",
        element: <Details />,
      },
    ],
  },
];
