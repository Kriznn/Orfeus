import "./signUp.css";
import Form from "./Form";

import React, { Component } from "react";
import { Link } from "react-router-dom";
export default class SignUp extends Component {
  render() {
    return (
      <form className="topForm">
        <h3>Sign Up</h3>
        <div className="wholeForm">
          <Form />
        </div>
        <p className="tail">
          Already Registered?
          <Link to="/Login">
            <button type="login">Login</button>
          </Link>
        </p>
      </form>
    );
  }
}
