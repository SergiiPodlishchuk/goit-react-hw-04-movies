import React, { Component } from "react";

export default class Searchbox extends Component {
  state = { value: "" };

  handleChange = ({ target }) => {
    this.setState({ value: target.value });
  };

  handleSubmit = (e) => {
    const { value } = this.state;
    e.preventDefault();
    this.props.onSubmit(value);
    this.setState({ value: "" });
  };

  render() {
    const { value } = this.state;
    return (
      <form onSubmit={this.handleSubmit}>
        <input
          type="text"
          value={value}
          onChange={this.handleChange}
          placeholder="Enter film name"
          autoFocus
        />
        <button type="submit">Search</button>
      </form>
    );
  }
}
