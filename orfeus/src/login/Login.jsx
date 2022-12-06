import "./login.css";
import React, { Component } from "react";
import { Link } from "react-router-dom";

export default class Login extends Component {
  render() {
    return (
      <form>
        <h3>Login</h3>
        <div className="mb-3">
          <label>Username</label>
          <input type="text" className="form-control" placeholder="Username" />
        </div>
        <div className="mb-3">
          <label>Password</label>
          <input
            type="password"
            className="form-control"
            placeholder="Enter password"
          />
        </div>
        <div className="d-grid">
          <button type="submit" className="btn btn-primary">
            Login
          </button>
        </div>
        <p>
          {" "}
          Need to Create an Account?
          <Link to="/signUp">
            <button>Create an Account</button>
          </Link>
        </p>
      </form>
    );
  }
}
