import React, { Component } from "react";

class List extends Component {
  // Initialize the state
  state = { list: [] };

  // Fetch the list on first mount
  componentDidMount() {
    this.getList();
  }

  // Retrieves the list of items from the Express app
  getList = () => {
    fetch("/api/getList")
      .then((res) => res.json())
      .then((list) => this.setState({ list }))
      .catch((error) => console.log("Express offline"));
  };

  render() {
    const { list } = this.state;
    const listView = list.length ? (
      <ul>
        {list.map((item) => (
          <li key={item}>{item}</li>
        ))}
      </ul>
    ) : (
      <h2>No list items</h2>
    );
    return (
      <div className="App">
        <h1>List of Items</h1>
        {/* Check to see if any items are found*/}
        {listView}
      </div>
    );
  }
}

export default List;
