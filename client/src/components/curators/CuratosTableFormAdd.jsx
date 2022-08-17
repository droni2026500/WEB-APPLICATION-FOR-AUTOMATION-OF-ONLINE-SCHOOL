import React, { useContext, useState } from "react";
import { makeStyles } from "@material-ui/core/styles";
import Input from "@material-ui/core/Input";
import InputLabel from "@material-ui/core/InputLabel";
import MenuItem from "@material-ui/core/MenuItem";
import FormControl from "@material-ui/core/FormControl";
import Select from "@material-ui/core/Select";
import Button from "@mui/material/Button";
import { OutlinedInput } from "@mui/material";
import { Context } from "../../index";
import { observer } from "mobx-react-lite";

const useStyles = makeStyles((theme) => ({
  formControl: {
    margin: theme.spacing(1),
    minWidth: 120,
    maxWidth: 300,
    display: "flex",
    flexDirection: "column",
    gap: 16,
    justifyContent: "center",
  },
  divForm: {
    display: "flex",
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

const CuratorsTableFormAdd = () => {
  //styles
  const classes = useStyles();

  const { store } = useContext(Context);

  const successAddUserMessage = "User added";

  //variables
  const [tableName, setTableName] = useState("");
  const [flow, setFlow] = useState("");
  const [curator, setCurator] = useState("");
  const [lessons, setLessons] = useState([{ header: "", accessor: "" , width: 70}]);

  const handleChangeFlow = (e) => {
    setFlow(e.target.value);
  };

  const handleChangeCurator = (e) => {
    setCurator(e.target.value);
  };

  const handleChangeLessons = (i, e) => {
    const newFormValues = [...lessons];
    newFormValues[i][e.target.name] = e.target.value;
    newFormValues[i]["accessor"] = `col${i + 7}`;
    setLessons(newFormValues);
  };

  const addFormFields = () => {
    setLessons([...lessons, { header: "", accessor: "" , width: 70}]);
  };

  const removeFormFields = (i) => {
    const newFormValues = [...lessons];
    newFormValues.splice(i, 1);
    setLessons(newFormValues);
  };

  const addTable = () => {
    if (tableName.length && flow.length && curator.length && lessons.length) {
      console.log(lessons);
      store.addTable(tableName, flow, curator, lessons).then((response) => {
        console.log(response);
        if (response === successAddUserMessage) {
          window.location.reload();
        }
      });
    } else {
      console.log(JSON.stringify(lessons) + flow + curator + tableName);
      console.log("Ошибка");
    }
  };

  const optionsFlows = [
    { label: "Поток 4", value: "flow4" },
    { label: "Поток 5", value: "flow5" },
    { label: "Поток 6", value: "flow6" },
    { label: "Поток 7", value: "flow7" },
  ];

  const optionsCurators = [
    { label: "Андрей", value: "maildron@yandex.ru" },
  ];

  return (
      <form className={classes.formControl}>
        <FormControl sx={{ m: 1 }} variant="standard">
          <InputLabel htmlFor="name">Название таблицы</InputLabel>
          <Input
            onChange={(e) => setTableName(e.target.value)}
            value={tableName}
            type={"text"}
            id="name"
            aria-describedby="my-helper-text"
          />
        </FormControl>
        <FormControl
          sx={{ m: 1 }}
          className={classes.formControl}
          variant="standard"
        >
          <Select
            labelId="demo-simple-select-standard-label"
            id="demo-simple-select-standard"
            value={flow}
            onChange={handleChangeFlow}
            input={<OutlinedInput />}
          >
            <MenuItem value="">
              <em>Выберите поток</em>
            </MenuItem>
            {optionsFlows.map((optionsFlows) => (
              <MenuItem key={optionsFlows.value} value={optionsFlows.value}>
                {optionsFlows.label}
              </MenuItem>
            ))}
          </Select>
          <Select
            // labelId="demo-simple-select-standard-label"
            id="demo-simple-select-standard"
            value={curator}
            onChange={handleChangeCurator}
            input={<OutlinedInput />}
          >
            <MenuItem value="">
              <em>Куратор</em>
            </MenuItem>
            {optionsCurators.map((optionsCurators) => (
              <MenuItem
                key={optionsCurators.value}
                value={optionsCurators.value}
              >
                {optionsCurators.label}
              </MenuItem>
            ))}
          </Select>
        </FormControl>
        {lessons.map((element, index) => (
          <FormControl
            sx={{ m: 1 }}
            className={classes.formControlBtns}
            variant="standard"
            key={index}
          >
            <InputLabel htmlFor="demo-customized-textbox">Уроки</InputLabel>
            <Input
              type="text"
              name="header"
              value={element.header || ""}
              onChange={(e) => handleChangeLessons(index, e)}
              aria-describedby="my-helper-text"
            />
            {index + 1 === lessons.length && (
              <Button
                variant="contained"
                className="button add"
                type="button"
                onClick={addFormFields}
              >
                Добавить
              </Button>
            )}
            {index + 1 !== lessons.length && (
              <Button
                variant="contained"
                type="button"
                className="button remove"
                onClick={() => removeFormFields(index)}
              >
                Удалить
              </Button>
            )}
            {/*<Button*/}
            {/*    variant="contained"*/}
            {/*    className="button add"*/}
            {/*    type="button"*/}
            {/*    onClick={addFormFields}*/}
            {/*>*/}
            {/*  Добаить*/}
            {/*</Button>*/}
            {/*{index ? (*/}
            {/*    <Button*/}
            {/*        variant="contained"*/}
            {/*        type="button"*/}
            {/*        className="button remove"*/}
            {/*        onClick={() => removeFormFields(index)}*/}
            {/*    >*/}
            {/*      Удалить*/}
            {/*    </Button>*/}
            {/*) : null}*/}
          </FormControl>
        ))}
        <Button
          variant="contained"
          className="button submit"
          onClick={addTable}
        >
          Создать таблицу
        </Button>
      </form>
  );
};

export default observer(CuratorsTableFormAdd);
