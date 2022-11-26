import { useState } from 'react';
import { BrowserRouter as Router } from 'react-router-dom';
import './publicLibrary.css';
import Search from './search';

const example = [
    { id: '1', name: 'username1' },
    { id: '2', name: 'audiofile name 394' },
    { id: '3', name: 'username28' },
    { id: '4', name: 'audio file' },
];

const filterExample = (example, query) => {
    if (!query) {
        return example;
    }

    return example.filter((post) => {
        const postName = post.name.toLowerCase();
        return postName.includes(query);
    });
};

const SearchBar = () => {
    const { search } = window.location;
    const query = new URLSearchParams(search).get('s');
    const [searchQuery, setSearchQuery] = useState(query || '');    
    const filteredExample = filterExample(example, searchQuery);

    return (
        <Router>
            <div className="App">
                <Search 
                    searchQuery={searchQuery}                
                    setSearchQuery={setSearchQuery}
                />
                <ul>
                    {filteredExample.map((example) => (                    
                        <li key={example.id}>{example.name}</li>
                    ))}
                </ul>
            </div>
        </Router>
    );
};

export default SearchBar;