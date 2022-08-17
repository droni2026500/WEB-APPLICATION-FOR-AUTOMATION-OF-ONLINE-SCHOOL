import React, { useContext, useEffect, useState } from "react";
import { Context } from "../../index";
import { useNavigate } from "react-router-dom";
import Button from "@mui/material/Button";
import InputLabel from "@material-ui/core/InputLabel";
import Input from "@material-ui/core/Input";
import FormControl from "@material-ui/core/FormControl";
import { makeStyles } from "@material-ui/core/styles";
import ChatBotChannelAdd from "../admin/ChatBotChannelAdd";
import MyModal from "../UI/MyModal/MyModal";
import { Alert, Snackbar } from "@mui/material";
import {observer} from "mobx-react-lite";

const useStyles = makeStyles((theme) => ({
  h1Control: {
    justifyContent: "center",
    display: "flex",
  },
  divForm: {
    display: "flex",
    justifyContent: "center",
  },
  formControl: {
    margin: theme.spacing(14),
    minWidth: 300,
    maxWidth: 700,
    display: "flex",
    flexDirection: "column",
    gap: 16,
    justifyContent: "center",
  },
  formControlBtns: {
    margin: theme.spacing(1),
    minWidth: 400,
    display: "flex",
    flexDirection: "row",
    alignItems: "baseline",
    gap: 8,
  },
}));

function LoginForm() {
  const { store } = useContext(Context);
  const classes = useStyles();

  const navigate = useNavigate();

  const [email, setEmail] = useState("");
  const [password, setPassword] = useState("");

  useEffect(() => {
  }, [store.open]);

  const login = () => {
    if (email.length && password.length) {
      store.login(email, password)
          .then((response) => {
            console.log(response)
        navigate("/home");
      }).catch((error) => {
        store.setOpen(true)
        store.setSeverity("error")
        store.setAlertMessage("Данные введены неверно")
      });
    }
    else {
      store.setOpen(true)
      store.setSeverity("error")
      store.setAlertMessage("Заполните все поля")
    }
  };

  const handleClose = (
    event?: React.SyntheticEvent | Event,
    reason?: string
  ) => {
    if (reason === "clickaway") {
      return;
    }
    store.setOpen(false);
  };

  return (
    <div className={classes.divForm}>
      <form className={classes.formControl}>
        <h1 className={classes.h1Control}>Вход</h1>
        <FormControl sx={{ m: 1 }} variant="standard">
          <InputLabel htmlFor="name">Email</InputLabel>
          <Input
            onChange={(e) => setEmail(e.target.value)}
            value={email}
            type={"text"}
            aria-describedby="my-helper-text"
          />
        </FormControl>
        <FormControl sx={{ m: 1 }} variant="standard">
          <InputLabel htmlFor="name">Пароль</InputLabel>
          <Input
            onChange={(e) => setPassword(e.target.value)}
            value={password}
            type={"password"}
            aria-describedby="my-helper-text"
          />
        </FormControl>
        <FormControl sx={{ m: 1 }} variant="standard">
          <Button variant="contained" onClick={() => login()}>
            Войти
          </Button>
        </FormControl>
      </form>
      <Snackbar
        open={store.open}
        autoHideDuration={6000}
        onClose={handleClose}
    >
      <Alert
          onClose={handleClose}
          severity={store.severity}
          sx={{ width: "100%" }}
      >
        {store.alertMessage}
      </Alert>
    </Snackbar>
    </div>
  );
}

export default observer(LoginForm);
