import React, { useState } from 'react';

const Search =() => {
  const [query, setQuery] = useState("")
  const handleChange = (e: React.ChangeEvent<HTMLInputElement>): void => {
    setQuery(e.target.value)
    console.log(query);
  }

  return (
    <>
      <div className="input-group w-50">
        <input 
          type="text" 
          className="form-control bg-dark text-white" 
          placeholder="Search Movies or TV Shows"
          onChange={handleChange}
        />
      </div>
    </>
  )
}

export default Search