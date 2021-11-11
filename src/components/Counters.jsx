import React, { Component } from "react";
import Counter from "./Counter";

class Counters extends React.Component {
  render() {
    console.log("Counters are rendered.");
    console.log(this.props.counters);
    return (
      <div>
        {/* <img src={this.state.imageUrl} alt="No image"></img> */}
        <button
          onClick={this.props.onReset}
          className="btn btn-danger btn-sm m-2"
        >
          Reset
        </button>
        <br />
        {this.props.counters.map((counter) => (
          <Counter
            key={counter.id}
            onDelete={this.props.onDelete}
            onIncrement={this.props.onIncrement}
            counter={counter}
          >
            <h4>
              my dialog
              <p>hello</p>
            </h4>
          </Counter>
        ))}
      </div>
    );
  }
}

export default Counters;
