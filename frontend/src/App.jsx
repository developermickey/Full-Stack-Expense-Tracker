import React from "react";
import { createBrowserRouter, RouterProvider } from "react-router-dom";
import Home from "./components/Home";
import Login from "./components/Login";
import Signup from "./components/Signup";
import CreateExpense from "./components/CreateExpense";
import ExpenseList from "./components/ExpenseList";
import Layout from "./components/Layout";
import PublicRoute from "./components/PublicRoute";
import ProtectedRoute from "./components/ProtectedRoute";
import { ToastContainer } from "react-toastify";

const appRouter = createBrowserRouter([
  {
    path: "/",
    element: <Layout />,
    children: [
      { path: "/", element: <Home /> },
      {
        path: "/login",
        element: (
          <PublicRoute>
            <Login />
          </PublicRoute>
        ),
      },
      {
        path: "/signup",
        element: (
          <PublicRoute>
            <Signup />
          </PublicRoute>
        ),
      },
      {
        path: "/expenses/add",
        element: (
          <ProtectedRoute>
            <CreateExpense />
          </ProtectedRoute>
        ),
      },
      {
        path: "/expenses",
        element: (
          <ProtectedRoute>
            <ExpenseList />
          </ProtectedRoute>
        ),
      },
    ],
  },
]);

const App = () => {
  return (
    <>
      <RouterProvider router={appRouter} />
      <ToastContainer
        position="top-right"
        autoClose={3000}
        hideProgressBar={false}
        newestOnTop={false}
        closeOnClick
        rtl={false}
        pauseOnFocusLoss
        draggable
        pauseOnHover
      />
    </>
  );
};

export default App;