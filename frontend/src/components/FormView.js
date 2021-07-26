import React, { useState } from 'react';

import dbService from '../services/dbService';

import CategorySelection from './CategorySelection';
import TimeSelection from './TimeSelection';
import ResultList from './ResultList';

const FormView = () => {
  const [searchCat, setSearchCat] = useState('orderstotal');
  const [searchRange, setSearchRange] = useState('dateonly');
  const [searchDate, setSearchDate] = useState('');
  const [searchTime, setSearchTime] = useState('');
  const [queryRes, setQueryRes] = useState([]);

  const handleCatChange = (e) => {
    setSearchCat(e.target.value);
  };

  const handleTimeChange = (e) => {
    setSearchRange(e.target.value);
  };

  const handleSearch = async (e) => {
    e.preventDefault();
    try {
      const res = await dbService.getByDate(
        searchCat,
        searchRange,
        searchDate,
        searchTime
      );
      setQueryRes(res.data[0]);
    } catch (err) {
      console.error('Database request failed:', err);
    }
  };

  return (
    <div className="view-total">
      <form onSubmit={handleSearch}>
        <CategorySelection
          searchCat={searchCat}
          handleChange={handleCatChange}
        />
        <TimeSelection
          searchRange={searchRange}
          searchDate={searchDate}
          searchTime={searchTime}
          setSearchDate={setSearchDate}
          setSearchTime={setSearchTime}
          handleChange={handleTimeChange}
        />
        <fieldset>
          <input type="submit" value="Search" />
        </fieldset>
      </form>
      <div>
        <ResultList category={searchCat} result={queryRes} />
      </div>
    </div>
  );
};

export default FormView;