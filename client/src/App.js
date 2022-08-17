import React, { useContext, useEffect } from "react";
import LoginForm from "./components/login/LoginForm";
import { Context } from "./index";
import { observer } from "mobx-react-lite";
import { Redirect, Route, Routes, useLocation } from "react-router-dom";
import { Navigate } from "react-router-dom";
import Curators from "./components/curators/Curators";
import UsersPage from "./components/admin/UsersPage";
import DirectorPage from "./components/director/DirectorPage";
import ChatBotsPage from "./components/admin/ChatBotsPage";
import CuratorsTableFormAdd from "./components/curators/CuratosTableFormAdd";
import MainPage from "./components/mainPage/MainPage";
import NotFound from "./components/notFound/NotFound";
import AdminWrapper, { PrivateRoute } from "./components/wrappers/PrivateRoute";
import { ROLE } from "./components/login/roles";

function App() {
  const { store } = useContext(Context);
  useEffect(() => {
    if (localStorage.getItem("access_token")) {
      store.checkAuth();
    }
  }, []);

  if (store.isLoading) {
    return <div></div>;
  }

  function RequireAuth({ children }) {
    const location = useLocation();
    return store.isAuth ? (
      children
    ) : (
      <LoginForm />
      // <Navigate to="/login" replace state={{ path: location.pathname }} />
    );
  }

  return (
    <Routes>
      <Route
        path="/home"
        element={
          <RequireAuth>
            <MainPage />
          </RequireAuth>
        }
      />
      <Route path="/login" element={<LoginForm />} />
      <Route
        path="/"
        element={
          <RequireAuth>
            <MainPage />
          </RequireAuth>
        }
      />
      <Route
        path="/users"
        element={
          <RequireAuth>
            <UsersPage />
          </RequireAuth>
        }
      />
      <Route
        path="/director"
        element={
          <RequireAuth>
            <DirectorPage />
          </RequireAuth>
        }
      />
      <Route
        path="/chatbots"
        element={
          <RequireAuth>
            <ChatBotsPage />
          </RequireAuth>
        }
      />
      <Route
        path="/students"
        element={
          <RequireAuth>
            <Curators />
          </RequireAuth>
        }
      />
      <Route
        path="/create_table"
        element={
          <RequireAuth>
            <CuratorsTableFormAdd />
          </RequireAuth>
        }
      />
      <Route path="*" element={<NotFound />} />
    </Routes>
  );
}

export default observer(App);
