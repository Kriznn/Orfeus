import "./account.css";

import { Component } from "react";
import { Link } from "react-router-dom";

export default class accountProfile extends Component {
  render() {
    return (
      <body>
        <div className="account-page">
          <h1 class="accountProfile">Profile</h1>
          <div>Welcome to your user profile!.</div>
          <br></br>
          <text>
            Generate new music with machine learning.
            <ul>
              <li>Create an account</li>
              <li>Upload your own music</li>
              <li>Pick new genres to influence your music</li>
              <li>Download and save music files</li>
            </ul>
          </text>
          <Link to="./login">
            <button type="home-login-btn">Login</button>
          </Link>
          <Link to="./signUp">Create an Account</Link>
        </div>
      </body>
    );
  }
}
