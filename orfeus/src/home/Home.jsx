import React from "react";
import "./home.css";

import { Component } from "react";
import { Link } from "react-router-dom";

export default class Home extends Component {
  render() {
    return (
      <body>
        <div id="hamburger" class="sidebar">
          <a href="javascript:void(0)" class="closebtn" onclick="closeNav()">
            &times;
          </a>
          <a href="#">Home Page</a>
          <a href="./signUp">Account Creation</a>
          <a href="./login">Login</a>
          <h1 className="header1">ORFEUS</h1>
        </div>
        <div className="home-page-a">
          <div class="container">
            <h2 class="title">
              <span class="title-word title-word-1">Web </span>
              <span class="title-word title-word-2">based </span>
              <span class="title-word title-word-3">music </span>
              <span class="title-word title-word-4">generation</span>
            </h2>
          </div>
        </div>
        <br></br>
        <div className="home-page-2">
          <text>
            Generate new music with machine learning.
            <div class="step1">Create an Account</div>
            <div class="step2">Upload your own music</div>
            <div class="step3">Pick new genres to influence your music</div>
            <div class="step4">Download and save music files</div>
          </text>
          <Link to="./login">
            <button type="home-login-btn">Login</button>
          </Link>
          <Link to="./signUp">
            <button type="home-account-btn">Create an Account</button>
          </Link>
        </div>
      </body>
    );
  }
}
