import React, { Component } from 'react';

class EventAddForm extends Component {
  constructor() {
    super();
    this.state = {
      title: '',
      description: '',
      date: '',
      time: '',
    }
    this.handleInputChange = this.handleInputChange.bind(this);
  }

  handleInputChange(e) {
    const name = e.target.name;
    const value = e.target.value;
    this.setState({
      [name]: value,
    });
  }

  render() {
    return (
      <div className="add">
        <form onSubmit={(e) => this.props.handleMovieSubmit(e, this.state.title, this.state.description, this.state.date, this.state.time)}>
          <label> Title
            <input type="text" name="title" placeholder="Title" value={this.state.title} onChange={this.handleInputChange} />
          </label>
          <label> Description
            <input type="text" name="description" placeholder="Description" value={this.state.description} onChange={this.handleInputChange} />
          </label>
          <label> Date
            <input type="date" name="date" placeholder="Date" value={this.state.date} onChange={this.handleInputChange} />
          </label>
          <label> Time
            <input type="time" name="time" placeholder="Time" value={this.state.time} onChange={this.handleInputChange} />
          </label>
          <input type="submit" value="Add Event" />
        </form>
      </div>
    )
  }
}

export default EventAddForm;