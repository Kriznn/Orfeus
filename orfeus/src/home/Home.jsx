import React from 'react'
import './home.css'

import { Component } from 'react';
import {Link} from 'react-router-dom';

export default class Home extends Component {
    render() {
        return(
            <div className="home-page">
                <h1>Orfeus</h1>
                <div>Web based music generation.</div>
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
                <Link to="./login"><button type = "home-login-btn">Login</button></Link>
                <Link to="./signUp">Create an Account</Link>
            </div>
        )
    }
}