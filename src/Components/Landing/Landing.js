import React, { Component } from "react";
import HACK from "../../img/HACK.svg";
import "./Landing.css";

class Landing extends Component {
  render() {
    return (
      <div className="Landing">
        <img src={HACK} className="App-logo" alt="logo" />
      	<h3>Welcome to Milestone-mgt a web to manage the weekly milestones of Core Dumped's Hackathon Team</h3>
      </div>
    );
  }
}

export default Landing;
