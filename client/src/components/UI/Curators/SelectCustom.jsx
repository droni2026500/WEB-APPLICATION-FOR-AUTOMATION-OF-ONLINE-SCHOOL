import React from "react";
import { InputLabel, MenuItem, Select } from "@mui/material";
import FormControl from "@material-ui/core/FormControl";
import {observer} from "mobx-react-lite";

function SelectCustom({ inputLabel, data, onChange, value }) {
  return (
    <FormControl>
      <InputLabel>{inputLabel}</InputLabel>
      <Select value={value} onChange={onChange}>
        {data.map((item) => (
          <MenuItem key={item.value} value={item.value}>
            {item.text}
          </MenuItem>
        ))}
      </Select>
    </FormControl>
  );
}

export default observer(SelectCustom);
