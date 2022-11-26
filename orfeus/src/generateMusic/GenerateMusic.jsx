import "./generateMusic.css";

import React, { Component} from "react";
import Select from 'react-select';
import Upload from "./upload";
import { Link } from "react-router-dom";
import 'bootstrap/dist/css/bootstrap.min.css';

const Genres = [
    {label: 'Country', value: '01'},
    {label: 'Jazz', value: '02'},
    {label: 'Classic', value: '03'},
    {label: 'Hip-Hop', value: '04'},
    {label: 'Blues', value: '05'}
]



export default class GenerateMusic extends Component{

    render(){
        return(
            <form>
                <h2 style={{color: 'white'}}>Music Generation</h2>
                <div className="wholeForm">
                    <div className="mb-3">
                        <label>Audio Sample (.wav)</label>
                        <Upload/>
                    </div>
                    <div className="mb-3">
                        <label>Output Audio Name</label>
                        <input
                        type="text"
                        
                        placeholder="filename"
                        />
                    </div>
                    <div className="col-md-6">
                        <label>Genre</label>
                        <Select options={Genres} 
                        />
                    </div>
                    <div className="mb-3">
                    <button type="submit">Upload</button>
                    </div>









                </div>





            </form>
        )
    }
}
