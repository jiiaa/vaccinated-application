import React, { useState } from 'react';

import dbService from '../services/dbService';

import CategorySelection from './CategorySelection';
import TimeSelection from './TimeSelection';
import ResultList from './ResultList';

const FormView = () => {
  const [searchCat, setSearchCat] = useState('arrived');
  const [searchRange, setSearchRange] = useState('dateonly');
  const [searchDate, setSearchDate] = useState('');
  const [searchTime, setSearchTime] = useState('');
  const [queryRes, setQueryRes] = useState('');

  const handleSearch = async (e) => {
    setQueryRes('loading');
    e.preventDefault();
    try {
      const res = await dbService.getByDate(
        searchCat,
        searchRange,
        searchDate,
        searchTime
      );
      setQueryRes(res.data);
    } catch (err) {
      console.error('Database request failed:', err);
    }
  };

  return (
    <div className="view-total">
      <form onSubmit={handleSearch}>
        <CategorySelection
          searchCat={searchCat}
          setSearchCat={setSearchCat}
          setSearchRange={setSearchRange}
          setSearchTime={setSearchTime}
          setQueryRes={setQueryRes}
        />
        <TimeSelection
          searchRange={searchRange}
          searchDate={searchDate}
          searchTime={searchTime}
          searchCat={searchCat}
          setSearchDate={setSearchDate}
          setSearchTime={setSearchTime}
          setSearchRange={setSearchRange}
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