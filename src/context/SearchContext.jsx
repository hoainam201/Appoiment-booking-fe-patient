import React, { createContext, useState, useContext } from 'react';

const SearchContext = createContext();

export const SearchProvider = ({ children }) => {
  const [searchQuery, setSearchQuery] = useState('');
  const [address, setAddress] = useState('');
  const [speciality, setSpeciality] = useState('');
  const [searchResults, setSearchResults] = useState([]);

  const updateSearchQuery = (query) => {
    setSearchQuery(query);
  };

  const updateSearchResults = (results) => {
    setSearchResults(results);
  };

  const updateAddress = (address) => {
    setAddress(address);
  };

  const updateSpeciality = (speciality) => {
    setSpeciality(speciality);
  };

  return (
    <SearchContext.Provider value={{ searchQuery, searchResults, address, speciality, updateSearchQuery, updateSearchResults , updateAddress, updateSpeciality }}>
      {children}
    </SearchContext.Provider>
  );
};

export const useSearch = () => useContext(SearchContext);
