import React, { useState } from "react";
import { InputLabel, MenuItem, Select } from "@mui/material";
import FormControl from "@material-ui/core/FormControl";
import { SelectChangeEvent } from "@mui/material";

function SelectCurator() {

  const [curator, setCurator] = React.useState("");

  const handleChangeCurator = (event: SelectChangeEvent) => {
    setCurator(event.target.value);
  };
  console.log(curator);

  const trinityPersons = [
    { value: "1@yandex.ru", text: "Валерия" },
    { value: "2@yandex.ru", text: "Малерия" },
  ];

  return (
    <FormControl>
      <InputLabel htmlFor="trinity-select">Выбор Куратора</InputLabel>
      <Select
        id="trinity-select"
        value={curator}
        label="Поток"
        onChange={handleChangeCurator}
      >
        {trinityPersons.map((person) => (
          <MenuItem key={person.value} value={person.value}>
            {person.text}
          </MenuItem>
        ))}
      </Select>
    </FormControl>
  );
}

export default SelectCurator;
