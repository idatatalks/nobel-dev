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
  const { legend, options, defaultOptions } = props;
  const localOptions = options.map((option) => ({
    label: option,
    isChecked: defaultOptions.includes(option),
    id: _.uniqueId(legend + "-"),
  }));
  console.log("LALALA:", localOptions);
  const [optionStates, updateOptionStates] = useState(localOptions);

  const [boxAllChecked, updateBoxAllChecked] = useState(true);

  function PrintCategory() {
    console.log(optionStates);
    return <div>hello wolrd</div>;
  }

  function indeterminate() {
    console.log(optionStates);
    const checks = optionStates.map((d) => d.isChecked);
    console.log("indeterminate checks:", checks);
    return checks.includes(true) && checks.includes(false);
  }

  function handleCategoryClick(e) {
    console.log("click->", e.target.value, ":", e.target.checked);
    // const newState = {
    //   ...optionStates,
    //   [e.target.value]: e.target.checked,
    // };
    const newOptionStates = optionStates.slice();
    let option = newOptionStates.find(
      (option) => option.label == e.target.value
    );
    option.isChecked = e.target.checked;
    console.log("option", option);
    console.log("options:", newOptionStates);
    updateOptionStates(newOptionStates);
    updateBoxAllChecked(
      !newOptionStates.map((option) => option.isChecked).includes(false)
    );
    // updateBoxAllChecked(!Object.values(newOptionStates).includes(false));
  }

  function handleAllClick(e) {
    updateBoxAllChecked(e.target.checked);
    const newOptionStates = optionStates.slice();
    newOptionStates.forEach((item) => {
      console.log("option:", item);
      item.isChecked = e.target.checked;
    });
    console.log("newStatus", newOptionStates);
    updateOptionStates(newOptionStates);
  }

  return (
    <>
      <Paper
        elevation={5}
        sx={{
          textAlign: "center",
          margin: "auto",
          p: 1,
        }}
      >
        <Container>
          <FormControl
            component="fieldset"
            sx={{
              textAlign: "center",
              ml: "0.5",
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
              {optionStates.map((item, index) => {
                return (
                  <FormControlLabel
                    label={item.label}
                    key={item.id}
                    labelPlacement={"bottom"}
                    control={
                      <Checkbox
                        onChange={handleCategoryClick}
                        checked={item.isChecked}
                        value={item.label}
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
