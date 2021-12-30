import React, { Component, useState } from "react";
import Checkbox from "@mui/material/Checkbox";
import FormGroup from "@mui/material/FormGroup";
import FormControlLabel from "@mui/material/FormControlLabel";
import Container from "@mui/material/Container";
import { FormControl, FormLabel } from "@mui/material";
import Paper from "@mui/material/Paper";

function Category(props) {
  // const categories = ["Physics", "Chemistry", "Peace", "Literature", "Biology"];
  const categories = props.category;
  const [categoryStates, updateCategoryStates] = useState(
    Object.fromEntries(categories.map((category) => [category, true]))
  );

  const [boxAllChecked, updateBoxAllChecked] = useState(true);

  function PrintCategory() {
    console.log(categoryStates);
    return <div>hello wolrd</div>;
  }

  function indeterminate() {
    console.log("indeterminate");
    return (
      Object.values(categoryStates).includes(true) &&
      Object.values(categoryStates).includes(false)
    );
  }

  function handleCategoryClick(e) {
    const newState = {
      ...categoryStates,
      [e.target.value]: e.target.checked
    };
    updateCategoryStates(newState);
    updateBoxAllChecked(!Object.values(newState).includes(false));
  }

  function handleAllClick(e) {
    updateBoxAllChecked(e.target.checked);
    const newCategoryStates = { ...categoryStates };
    categories.forEach((item) => {
      console.log(item);
      newCategoryStates[item] = e.target.checked;
    });
    console.log("newStatus", newCategoryStates);
    updateCategoryStates(newCategoryStates);
  }

  return (
    <>
      <Paper
        elevation={10}
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
            <FormLabel component="legend">Category</FormLabel>
            <FormGroup row={true} sx={{ textAlign: "right" }}>
              <FormControlLabel /* check box "All" */
                label="All"
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
              {categories.map((item) => {
                return (
                  <FormControlLabel
                    label={item}
                    labelPlacement={"bottom"}
                    control={
                      <Checkbox
                        onChange={handleCategoryClick}
                        checked={categoryStates[item]}
                        value={item}
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

export default Category;
