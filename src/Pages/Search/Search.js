import React, { Component } from "react";
import MilestoneList from "../../Components/MilestoneList";
import axios from "axios";
import Paths from "../../Paths/Paths";
import { Button, FormGroup, FormControl } from "react-bootstrap";
//import SearchBar from "../../Components/searchBar"

class Search extends Component {
  constructor(props) {
    super(props);
    this.state = {
      data: [],
      searchMe: ''
   };
  }

  handleChange = event => {
    this.setState({
      [event.target.id]: event.target.value
    });
  }

  handleSubmit = async event => {
    event.preventDefault();

    console.log(`${Paths.Api.getByWeek}/${this.state.searchMe}`)
    await axios.get(`${Paths.Api.getByWeek}/${this.state.searchMe}`).then(res => {
      console.log(res.data)
      if(res.data)
        this.setState({
          data: res.data
        });
    });
  }

  render() {
    return (
      <div className="Search">
        <form class="navbar-form" role="search" onSubmit={this.handleSubmit}>
          <FormGroup controlId="searchMe" bsSize="large">
            <FormControl
              value={this.state.searchMe}
              placeholder="search"
              onChange={this.handleChange}
              type="text"
            />
            <Button
            block
            bsSize="large"
            type="submit"
          >
            Login
          </Button>
          </FormGroup>
          
        </form>
        <div>
          <MilestoneList data={this.state.data} />
        </div>
      </div>
    );
  }
}

export default Search;