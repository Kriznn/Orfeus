import "./publicLibrary.css";
import React, { Component } from "react";
import { Link } from "react-router-dom";
import SearchBar from "./SearchBar";
import { BrowserRouter as Router } from "react-router-dom";


export default class PublicLibrary extends Component{
    
    render(){
        return (
            <form>
                <h2>Library</h2>
                <div>
                    <SearchBar/>
                </div>
                




            </form>
        )
    }
}