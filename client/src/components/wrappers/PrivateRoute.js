import React, {useContext} from "react";
import { Navigate, Route, useLocation } from "react-router-dom";
import NotFound from "../notFound/NotFound";
import {Context} from "../../index";
import LoginForm from "../login/LoginForm";

export const PrivateRoute = ({ children, roles }) => {
  const { store } = useContext(Context);
  let location = useLocation();
  const role = localStorage.getItem("role");
  const { user } = ((state) => state.auth);
  console.log(roles.includes(role))


  if (store.isLoading) {
    return <div></div>;
  }

  const userHasRequiredRole = roles.includes(role) ? true : false;
  console.log(user)

  if (!store.isAuth) {
    return <LoginForm />;
  }

  if (store.isAuth && !userHasRequiredRole) {
    return <NotFound />;
  }

  return children;
};
