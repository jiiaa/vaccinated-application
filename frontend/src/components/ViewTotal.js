import React, { useState } from 'react';
import dbService from '../services/dbService';

const ViewTotal = () => {
  const [searchDate, setSearchDate] = useState('');
  const [searchTime, setSearchTime] = useState('');
  const [totals, setTotals] = useState({});

  const handleSearch = async (e) => {
    e.preventDefault();
    if (!searchDate || !searchTime) {
      return;
    }
    try {
      const res = await dbService.getByDate(searchDate, searchTime);
      setTotals(res.data[0]);
    } catch (err) {
      console.error('Database request failed:', err);
    }
  };

  return (
    <div className="view-total">
      <form onSubmit={handleSearch}>
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
      </form>
      <div>
        <div>Orders total: {totals.count}</div>
        <div>Vaccines total: {totals.sum}</div>
      </div>
    </div>
  );
};

export default ViewTotal;