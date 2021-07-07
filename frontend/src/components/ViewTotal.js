import React, { useState } from 'react';
import dbService from '../services/dbService';

const ViewTotal = () => {
  const [searchRange, setSearchRange] = useState('dateonly');
  const [searchDate, setSearchDate] = useState('');
  const [searchTime, setSearchTime] = useState('');
  const [totals, setTotals] = useState({});

  const handleRadioChange = (e) => {
    setSearchRange(e.target.value);
  };

  const handleSearch = async (e) => {
    e.preventDefault();
    if (!searchDate || !searchTime) {
      return;
    }
    try {
      const res = await dbService.getByDate(searchRange, searchDate, searchTime);
      setTotals(res.data[0]);
    } catch (err) {
      console.error('Database request failed:', err);
    }
  };

  return (
    <div className="view-total">
      <form onSubmit={handleSearch}>
        <div>
          <input
            type="radio"
            id="dateonly"
            name="dayorrange"
            value="dateonly"
            checked={searchRange === 'dateonly'}
            onChange={handleRadioChange}
          />
          <label htmlFor="dayonly">This date only</label>
        </div>
        <div>
          <input
            type="radio"
            id="range"
            name="dayorrange"
            value="range"
            checked={searchRange === 'range'}
            onChange={handleRadioChange}
          />
          <label htmlFor="range">Until the date (including date)</label>
        </div>
        <div>
          <input
            type="date"
            id="total-date"
            name="total-date"
            onChange={(e) => setSearchDate(e.target.value)}
            value={searchDate}
          />
          <input
            type="time"
            id="total-time"
            name="total-time"
            onChange={(e) => setSearchTime(e.target.value)}
            value={searchTime}
          />
          <input type="submit" value="Search" />
        </div>
      </form>
      <div>
        <div>Orders total: {totals.count}</div>
        <div>Vaccines total: {totals.sum}</div>
      </div>
    </div>
  );
};

export default ViewTotal;