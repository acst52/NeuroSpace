import React, { useState } from 'react';
function SearchForm() {
    const [searchInput, setSearchInput] = useState('');

  
    const handleSearchChange= (e) => {
      setSearchInput(e.target.value);
    };
  
    const handleSubmit = (e) => {
      e.preventDefault();
      // Perform login logic with email and password
      console.log('Search submitted');
      console.log('Search Term:', searchInput);
    };
  
    return (
      <div>
      <h1 className='title'>SEARCH</h1>
      <form className="searchForm" onSubmit={handleSubmit}>
          
        <div>
          <input
            type="textArea"
            className="entryField"
            value={searchInput}
            onChange={handleSearchChange}
            required
          />
        </div>
        
        <button type="submit">Search</button>
        
      </form>
      </div>
    );
  }

export default SearchForm;
