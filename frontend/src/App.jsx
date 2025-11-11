import { useState } from 'react'
import { createBrowserRouter } from "react-router";
import { RouterProvider } from "react-router/dom";

import { Layout } from "./components/Layout";
import { Home } from "./components/Pages/Home/home";
import { SinglePost } from "./components/Pages/Post/SinglePost";
import { Contacts } from "./components/Pages/Contacts/contacts";
import Login from './components/Pages/Auth/login';
import Register from './components/Pages/Auth/register';
import Profile from './components/Pages/Profile/profile';

import { AuthProvider } from './Context/AuthContext'

function App() {

  const router = createBrowserRouter([
  {
    path: "/",
    element: <Layout />,
    children: [
      {index: true, Component: Home},
      {path: "contacts", Component: Contacts},
      {path: "login", Component: Login},
      {path: "register", Component: Register},
      {path: "profile", Component: Profile},
      {path: "posts/:id", Component: SinglePost}
      ],
    },
  ]);

  return (
    <AuthProvider><RouterProvider router={router} /></AuthProvider>
  )
}

export default App
