import React, { Component } from "react";
import "bootstrap/dist/css/bootstrap.css";

class Navbar extends React.Component {
  constructor() {
    super();
    console.log("Navbar constructed.");
  }

  render() {
    console.log("NavBar:", this.props.counters);
    return (
      <nav
        className="navbar navbar-light"
        style={{ backgroundColor: "yellow" }}
      >
        TotalCount:
        {this.props.counters.filter((count) => count.value > 0).length}
      </nav>
    );
  }
}

export default Navbar;
