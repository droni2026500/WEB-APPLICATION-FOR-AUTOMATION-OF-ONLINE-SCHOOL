import * as React from "react";

// importing material UI components
import AppBar from "@mui/material/AppBar";
import Toolbar from "@mui/material/Toolbar";
import Button from "@mui/material/Button";
import Menu from "@mui/material/Menu";
import MenuItem from "@mui/material/MenuItem";
import PopupState, { bindTrigger, bindMenu } from "material-ui-popup-state";
import logo from "./logo.png";

// react
import { Link, useNavigate } from "react-router-dom";
import { useContext } from "react";
import { Context } from "../../index";
import { observer } from "mobx-react-lite";
import { makeStyles } from "@material-ui/core/styles";
import { Box } from "@material-ui/core";

const useStyles = makeStyles((theme) => ({
  button: {
    backgroundColor: "#1E6738",
  },
  divForm: {
    display: "flex",
    justifyContent: "center",
    gap: 5,
  },
}));

function Header() {
  const { store } = useContext(Context);
  const navigate = useNavigate();
  const classes = useStyles();
  const role = localStorage.getItem("role");

  const handleLogout = () => {
    store.logout().then(() => {
      navigate("/login");
    });
  };

  return (
      <AppBar position="static">
        {store.isAuth && (
          <Toolbar className={classes.divForm}>
            <img src={logo} alt="logo" height="50px" width="50px" style={{position: 'absolute', left: '30px'}}/>
            <Link to="/home" style={{ color: "#FFF", textDecoration: "none" }}>
              <Button variant="contained">Главная страница</Button>
            </Link>
            {(role === "Администратор" || role === "Руководитель") && (
              <Link
                to="/director"
                style={{ color: "#FFF", textDecoration: "none" }}
              >
                <Button variant="contained">Руководитель</Button>
              </Link>
            )}
            <PopupState variant="popover" popupId="admin">
              {(popupState) => (
                <>
                  <Button variant="contained" {...bindTrigger(popupState)}>
                    Отдел поддержки
                  </Button>
                  <Menu {...bindMenu(popupState)}>
                    <Link to="/students">
                      <MenuItem onClick={popupState.close}>Ученики</MenuItem>
                    </Link>
                    {(role === "Администратор" ||
                      role === "Рук. отдела поддержки") && (
                      <Link to="/create_table">
                        <MenuItem onClick={popupState.close}>
                          Добавить таблицы
                        </MenuItem>
                      </Link>
                    )}
                  </Menu>
                </>
              )}
            </PopupState>
            {role === "Администратор" && (
              <PopupState variant="popover" popupId="admin">
                {(popupState) => (
                  <>
                    <Button variant="contained" {...bindTrigger(popupState)}>
                      Админ-панель
                    </Button>
                    <Menu {...bindMenu(popupState)}>
                      <Link onClick={popupState.close} to="/users">
                        <MenuItem>Пользователи</MenuItem>
                      </Link>
                      <Link onClick={popupState.close} to="/chatbots">
                        <MenuItem>Чат-боты</MenuItem>
                      </Link>
                    </Menu>
                  </>
                )}
              </PopupState>
            )}
            <Button
              variant="contained"
              style={{
                backgroundColor: "#ff0000",
              }}
              onClick={handleLogout}
            >
              Выход
            </Button>
          </Toolbar>
        )}
      </AppBar>
  );
  /*return (
        <AppBar position="static">
          {!store.isAuth && (
            <Toolbar className={classes.divForm}>
              <Link to="/home" style={{ color: "#FFF", textDecoration: "none" }}>
                <Button variant="contained">Главная страница</Button>
              </Link>
              <Link
                to="/director"
                style={{ color: "#FFF", textDecoration: "none" }}
              >
                <Button variant="contained">Руководитель</Button>
              </Link>
              <PopupState variant="popover" popupId="admin">
                {(popupState) => (
                  <>
                    <Button variant="contained" {...bindTrigger(popupState)}>
                      Отдел поддержки
                    </Button>
                    <Menu {...bindMenu(popupState)}>
                      <Link to="/students">
                        <MenuItem onClick={popupState.close}>Ученики</MenuItem>
                      </Link>
                      <Link to="/create_table">
                        <MenuItem onClick={popupState.close}>
                          Добавить таблицы
                        </MenuItem>
                      </Link>
                    </Menu>
                  </>
                )}
              </PopupState>
              <PopupState variant="popover" popupId="admin">
                {(popupState) => (
                  <>
                    <Button variant="contained" {...bindTrigger(popupState)}>
                      Админ-панель
                    </Button>
                    <Menu {...bindMenu(popupState)}>
                      <Link onClick={popupState.close} to="/users">
                        <MenuItem>Пользователи</MenuItem>
                      </Link>
                      <Link onClick={popupState.close} to="/chatbots">
                        <MenuItem>Чат-боты</MenuItem>
                      </Link>
                    </Menu>
                  </>
                )}
              </PopupState>
              <Button
                variant="contained"
                style={{
                  backgroundColor: "#ff0000",
                }}
                onClick={handleLogout}
              >
                Выход
              </Button>
            </Toolbar>
          )}
        </AppBar>*/
}

export default observer(Header);
