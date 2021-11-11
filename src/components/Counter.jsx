import React, { Component } from "react";

class Counter extends React.Component {
  state = {
    // value: this.props.value,
    imageUrl: "https://picsum.photos/200",
    tags: ["tag1", "tag2", "tag3"],
  };

  constructor(...params) {
    super(...params);
    // this.handleClick = this.handleClick.bind(this);
    console.log("Counter constructed");
  }

  componentDidMount() {
    console.log("Counter mounted!");
  }

  render() {
    console.log(this.props.counter);
    return (
      <React.Fragment>
        <div>
          <span style={{ fontSize: "12px" }} className={this.getSpanClasses()}>
            {this.getValue()}
            {/* {this.props.value} */}
          </span>
          <button
            onClick={() => this.props.onIncrement(this.props.counter)}
            className="btn btn-sm btn-secondary"
          >
            totalCount
          </button>
          <button
            onClick={() => this.props.onDelete(this.props.counter.id)}
            className="btn btn-danger btn-sm m-2"
          >
            Delete
          </button>
          {/* <ul>
          {this.state.tags.map((tag) => (
            <li key={tag}>{tag}</li>
          ))}
        </ul> */}
        </div>
      </React.Fragment>
    );
  }

  getSpanClasses() {
    let cls = "badge m-2 bg-";
    cls += this.props.value === 0 ? "primary" : "warning";
    return cls;
  }

  getValue() {
    return this.props.counter.value === 0 ? "Zero" : this.props.counter.value;
  }
}

export default Counter;
