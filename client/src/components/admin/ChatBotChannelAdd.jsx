import React, { useContext, useState } from "react";
import Input from "@material-ui/core/Input";
import InputLabel from "@material-ui/core/InputLabel";
import FormControl from "@material-ui/core/FormControl";
import Button from "@mui/material/Button";
import { Alert, Snackbar } from "@mui/material";
import { Context } from "../../index";

const ChatBotChannelAdd = () => {
  const { store } = useContext(Context);
  const [open, setOpen] = React.useState(false);
  const [severity, setSeverity] = React.useState("success");
  const [alertMessage, setAlertMessage] = React.useState("");
  const [channelName, setChannelName] = useState("");


  const addChannel = () => {
    if (channelName !== "") {
      store.addChannel(channelName).then((response) => {
        if (response === "Chat created") {
          window.location.reload();
          setSeverity("success");
          setAlertMessage("Пользователь добавлен");
          setOpen(true);
        } else if (response === "Error"){
          setSeverity("error");
          setAlertMessage("Непридвиденная ошибка");
          setOpen(true);
        }
      });
    }
    else {
      setSeverity("error");
      setAlertMessage("Заполните все поля");
      setOpen(true);
      console.log("Ошибка");
    }
  };

  const handleClose = (
    event?: React.SyntheticEvent | Event,
    reason?: string
  ) => {
    if (reason === "clickaway") {
      return;
    }
    setOpen(false);
  };

  return (
    <div style={{
      display: "flex",
      flexDirection: "column",
      gap: 20,
      minWidth: 300
    }}>
      <FormControl sx={{ m: 1 }} variant="standard">
        <InputLabel htmlFor="name">Название канала</InputLabel>
        <Input
          onChange={(e) => setChannelName(e.target.value)}
          value={channelName}
          type={"text"}
          id="name"
          aria-describedby="my-helper-text"
        />
      </FormControl>
      <FormControl sx={{ m: 1 }} variant="standard">
        <Button variant="contained" onClick={addChannel}>
          Добавить
        </Button>
      </FormControl>
      <Snackbar open={open} autoHideDuration={6000} onClose={handleClose}>
        <Alert onClose={handleClose} severity={severity} sx={{ width: "100%" }}>
          {alertMessage}
        </Alert>
      </Snackbar>
    </div>
  );
};

export default ChatBotChannelAdd;
