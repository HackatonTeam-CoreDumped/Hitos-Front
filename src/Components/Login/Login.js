import React, { Component } from "react";
import { Button, FormGroup, FormControl, ControlLabel } from "react-bootstrap";
import { Link } from "react-router-dom";
import axios from "axios";

import "./Login.css";

import NewAlert from "../../Components/NewAlert";

import Paths from "../../Dictionaries/Paths";
import Names from "../../Dictionaries/TitlesAndNames";

import Storage from "../../Middlewares/storeData";

export default class Login extends Component {
  constructor(props) {
    super(props);

    this.state = {
      userName: "",
      password: "",
      isOpen: false,
      alertMessage: "Error"
    };
  }

  toggleAlert = () => {
    this.setState({
      isOpen: true
    });
  };

  handleChange = event => {
    this.setState({
      [event.target.id]: event.target.value
    });
  };

  validateForm() {
    return this.state.userName.length > 0 && this.state.password.length > 0;
  }

  handleSubmit = async event => {
    event.preventDefault();

    const user = {
      userName: this.state.userName,
      password: this.state.password
    };

    await axios
      .post(Paths.Api.Login, {
        userName: user.userName,
        password: user.password
      })
      .then(res => {
        Storage.setData(Names.storageKeys.isAdminOrMentor, res.data.role)
        Storage.setData(Names.storageKeys.Token, res.data.token);
        Storage.setData(Names.storageKeys.User, user.userName);
        Storage.setData(Names.storageKeys.MyId, res.data.id);
        Storage.setData(Names.storageKeys.Status, "log");
        console.log(res);
        console.log(res.status);
        console.log(Storage.getData(Names.storageKeys.User));
        console.log(Storage.getData(Names.storageKeys.isAdminOrMentor));
        if (res.status === 200) window.location.href = Paths.Links.Profile;
        else this.toggleAlert();
      })
      .catch(error => {
        console.log(error.response);
        this.setState({
          alertMessage: error.response.data.message
        });
        this.toggleAlert();
      });
  };
  
  /*componentDidMount(){
    const token=Storage.getData(Names.storageKeys.Token);
    axios.defaults.headers.common = {'authorization': "bearer " + token}

    axios.get('http://localhost:3000/api/private')
    .then(res => {
      console.log(res);
    })  
    .catch(error => {
        console.log(error);
        //this.toggleModal();
      });
  }*/

  render() {
    return (
      <div className="Login">
        <NewAlert isOpen={this.state.isOpen} text={this.state.alertMessage} />
        <h1>Login</h1>
        <form onSubmit={this.handleSubmit}>
          <FormGroup controlId="userName" bsSize="large">
            <ControlLabel>User Name</ControlLabel>
            <FormControl
              autoFocus
              type="text"
              value={this.state.userName}
              onChange={this.handleChange}
            />
          </FormGroup>
          <FormGroup controlId="password" bsSize="large">
            <ControlLabel>Password</ControlLabel>
            <FormControl
              value={this.state.password}
              onChange={this.handleChange}
              type="password"
            />
          </FormGroup>
          <Button
            block
            bsSize="large"
            disabled={!this.validateForm()}
            type="submit"
          >
            Login
          </Button>

          <p>
            Or <Link to={Paths.Links.SignUp}>Sign up</Link>
          </p>
        </form>
      </div>
    );
  }
}
