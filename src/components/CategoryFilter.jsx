import { useState } from "react";
import OutlinedInput from "@mui/material/OutlinedInput";
import InputLabel from "@mui/material/InputLabel";
import MenuItem from "@mui/material/MenuItem";
import FormControl from "@mui/material/FormControl";
import ListItemText from "@mui/material/ListItemText";
import Select from "@mui/material/Select";
import Checkbox from "@mui/material/Checkbox";

const _ = require("lodash");

const ITEM_HEIGHT = 48;
const ITEM_PADDING_TOP = 8;
const MenuProps = {
  PaperProps: {
    style: {
      maxHeight: ITEM_HEIGHT * 4.5 + ITEM_PADDING_TOP,
      width: 250,
    },
  },
};

export const CategoryFilter = (props) => {
  const { data, label, options, defaultOptions, onSetFilter } = props;
  console.log("label:", label);
  const [selectedOptions, setSelectedOptions] = useState(defaultOptions);
  const [[labelId, selectId], setCtrlId] = useState([
    _.uniqueId(label + "_id_"),
    _.uniqueId(label + "_select_"),
  ]);

  const handleChange = (event) => {
    const {
      target: { value },
    } = event;
    const newValue = typeof value === "string" ? value.split(",") : value;
    setSelectedOptions(
      // On autofill we get a the stringified value.
      newValue
    );
    console.log("new filter:", {
      ...data.filters,
      [label.toLowerCase()]: newValue,
    });
    onSetFilter({ ...data.filters, [label.toLowerCase()]: newValue });
  };
  return (
    <div>
      <FormControl sx={{ m: 1, width: 300, border: "2px solid yellow" }}>
        <InputLabel id={labelId}>{label}</InputLabel>
        <Select
          labelId={labelId}
          id={selectId}
          multiple
          value={selectedOptions}
          onChange={handleChange}
          input={<OutlinedInput label={label} />}
          renderValue={(selected) => selected.join(", ")}
          MenuProps={MenuProps}
        >
          {options.map((option) => (
            <MenuItem key={option} value={option}>
              <Checkbox checked={selectedOptions.includes(option)} />
              <ListItemText primary={option} />
            </MenuItem>
          ))}
        </Select>
      </FormControl>
    </div>
  );
};
