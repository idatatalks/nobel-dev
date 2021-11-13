import React, { Component, useState } from "react";
import Checkbox from "@mui/material/Checkbox";
import FormGroup from "@mui/material/FormGroup";
import FormControlLabel from "@mui/material/FormControlLabel";
import Container from "@mui/material/Container";
import { FormControl, FormLabel } from "@mui/material";
import Paper from "@mui/material/Paper";

const _ = require("lodash");

function GroupCheckBox(props) {
  // const options = ["Physics", "Chemistry", "Peace", "Literature", "Biology"];
  // const options = (() => {
  //   console.log("props:", props.options);
  //   return props.options;
  // })();
  const legend = props.legend;
  const options = props.options.map((option) => [
    option,
    _.uniqueId(legend + "-")
  ]);
  const [states, updateStates] = useState(
    Object.fromEntries(options.map((category) => [category[0], true]))
  );

  const [boxAllChecked, updateBoxAllChecked] = useState(true);

  function PrintCategory() {
    console.log(states);
    return <div>hello wolrd</div>;
  }

  function indeterminate() {
    console.log("indeterminate");
    return (
      Object.values(states).includes(true) &&
      Object.values(states).includes(false)
    );
  }

  function handleCategoryClick(e) {
    const newState = {
      ...states,
      [e.target.value]: e.target.checked
    };
    updateStates(newState);
    updateBoxAllChecked(!Object.values(newState).includes(false));
  }

  function handleAllClick(e) {
    updateBoxAllChecked(e.target.checked);
    const newCategoryStates = { ...states };
    options.forEach((item) => {
      console.log(item);
      newCategoryStates[item[0]] = e.target.checked;
    });
    console.log("newStatus", newCategoryStates);
    updateStates(newCategoryStates);
  }

  return (
    <>
      <Paper
        elevation={5}
        sx={{
          textAlign: "center",
          margin: "auto",
          p: 1
        }}
      >
        <Container>
          <FormControl
            component="fieldset"
            sx={{
              textAlign: "center",
              ml: "0.5"
            }}
          >
            <FormLabel component="legend">{legend}</FormLabel>
            <FormGroup row={true} sx={{ textAlign: "right" }}>
              <FormControlLabel /* check box "All" */
                label="All"
                key="All-1"
                labelPlacement={"bottom"}
                control={
                  <Checkbox
                    onChange={handleAllClick}
                    checked={boxAllChecked}
                    indeterminate={indeterminate()}
                    value="All"
                  />
                }
              />
              {options.map((item, index) => {
                return (
                  <FormControlLabel
                    label={item[0]}
                    key={item[1]}
                    labelPlacement={"bottom"}
                    control={
                      <Checkbox
                        onChange={handleCategoryClick}
                        checked={states[item[0]]}
                        value={item[0]}
                      />
                    }
                  />
                );
              })}
            </FormGroup>
          </FormControl>
        </Container>
      </Paper>
    </>
  );
}

export default GroupCheckBox;
