import React, { useContext, useState } from "react";
import Input from "@material-ui/core/Input";
import InputLabel from "@material-ui/core/InputLabel";
import FormControl from "@material-ui/core/FormControl";
import Button from "@mui/material/Button";
import { Alert, Select, Snackbar } from "@mui/material";
import { Context } from "../../index";
import MenuItem from "@mui/material/MenuItem";

const UsersAdd = ({setModal}) => {
  const { store } = useContext(Context);
  const [open, setOpen] = React.useState(false);
  const [severity, setSeverity] = React.useState("success");
  const [alertMessage, setAlertMessage] = React.useState("");
  const [full_name, setFull_name] = useState("");
  const [email, setEmail] = useState("");
  const [password, setPassword] = useState("");
  const [role, setRole] = useState("");

  const options = [
    { label: "Администратор", value: "Администратор" },
    { label: "Руководитель", value: "Руководитель" },
    { label: "Рук. отдела продаж", value: "Рук. отдела продаж" },
    { label: "Менеджер отдела продаж", value: "Менеджер отдела продаж" },
    { label: "Рук. отдела маркетинга", value: "Рук. отдела маркетинга" },
    { label: "Маркетолог", value: "Маркетолог" },
    { label: "Рук. отдела поддержки", value: "Рук. отдела поддержки" },
    { label: "Куратор", value: "Кураторы" },
  ];

  const handleChange = (e) => {
    setRole(e.target.value);
  };

  const addUsers = () => {
    if (full_name !== "" && email !== "" && password !== "" && role !== "") {
      store.addUser(full_name, email, password, role).then((response) => {
        if (response === "User added") {
          return store.getUsers()
        }
      })
        .then(() => {
            setSeverity("success");
            setAlertMessage("Пользователь добавлен");
            setOpen(true);

            // это писал НЕ рустам
            setTimeout(() => {
                setModal(false)
            }, 2000)
          })
    } else {
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
      minWidth: 500
    }}>
      <FormControl sx={{ m: 1 }} variant="standard">
        <InputLabel htmlFor="name">Фамилия и Имя</InputLabel>
        <Input
          onChange={(e) => setFull_name(e.target.value)}
          value={full_name}
          type={"text"}
          id="name"
          aria-describedby="my-helper-text"
        />
      </FormControl>
      <FormControl sx={{ m: 1 }} variant="standard">
        <InputLabel htmlFor="email">Email</InputLabel>
        <Input
          onChange={(e) => setEmail(e.target.value)}
          value={email}
          type={"email"}
          id="email"
          aria-describedby="my-helper-text"
        />
      </FormControl>
      <FormControl sx={{ m: 1 }} variant="standard">
        <InputLabel htmlFor="password">Пароль</InputLabel>
        <Input
          onChange={(e) => setPassword(e.target.value)}
          value={password}
          type={"password"}
          id="password"
          aria-describedby="my-helper-text"
        />
      </FormControl>
      <FormControl variant="standard" sx={{ m: 1, minWidth: 120 }}>
        <Select
          labelId="demo-simple-select-standard-label"
          id="demo-simple-select-standard"
          value={role}
          onChange={handleChange}
          label="Age"
        >
          <MenuItem value="">
            <em>Выберите роль</em>
          </MenuItem>
          {options.map((option) => (
            <MenuItem key={option.value} value={option.value}>{option.label}</MenuItem>
          ))}
        </Select>
      </FormControl>
      <FormControl sx={{ m: 1 }} variant="standard">
        <Button variant="contained" onClick={addUsers}>
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

export default UsersAdd;
