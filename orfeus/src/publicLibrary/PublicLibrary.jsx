import { Link } from "react-router-dom";
import { useState } from 'react';
import { BrowserRouter as Router } from 'react-router-dom';
import './publicLibrary.css';
import Search from './search';

const examples = [
    { id: '1', name: 'username1' },
    { id: '2', name: 'audiofile name 394' },
    { id: '3', name: 'username28' },
    { id: '4', name: 'audio file' },
];

const filterExamples = (examples, query) => {
    if (!query) {
        return examples;
    }

    return examples.filter((example) => {
        const exampleName = example.name.toLowerCase();
        return exampleName.includes(query);
    });
};

const App = () => {
    const { search } = window.location;
    const query = new URLSearchParams(search).get('s');
    const [searchQuery, setSearchQuery] = useState(query || '');
    const filteredExamples = filterExamples(examples, searchQuery);
    return (
        //<Router>
            <div className='Library'>
                <h2>Public Library</h2>
                <Search 
                    searchQuery={searchQuery}                
                    setSearchQuery={setSearchQuery}
                />
                <ul>
                    {filteredExamples.map(example => (                    
                        <li key={example.key}>{example.name}</li>
                    ))}
                </ul>
            </div>
        //</Router>
    );
}

export default App;