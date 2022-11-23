import React from 'react';
import { Props } from "./navbar";

const Search =({ handleChange }: Props) => {
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