import React, { useState } from 'react';
import dbService from '../services/dbService';

const ViewTotal = () => {
  const [searchCat, setSearchCat] = useState('orderstotal');
  const [searchRange, setSearchRange] = useState('dateonly');
  const [searchDate, setSearchDate] = useState('');
  const [searchTime, setSearchTime] = useState('');
  const [totals, setTotals] = useState({});

  const handleCatChange = (e) => {
    setSearchCat(e.target.value);
  };

  const handleTimeChange = (e) => {
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
            id="orderstotal"
            name="category"
            value="orderstotal"
            checked={searchCat === 'orderstotal'}
            onChange={handleCatChange}
          />
          <label htmlFor="orderstotal">Orders/vaccines arrived</label>
          <input
            type="radio"
            id="vaccinated"
            name="category"
            value="vaccinated"
            checked={searchCat === 'vaccinated'}
            onChange={handleCatChange}
          />
          <label htmlFor="vaccinated">Vaccinations given</label>
          <input
            type="radio"
            id="perproducer"
            name="category"
            value="perproducer"
            checked={searchCat === 'perproducer'}
            onChange={handleCatChange}
          />
          <label htmlFor="perproducer">Orders/vaccines per producer</label>
          <input
            type="radio"
            id="expired"
            name="category"
            value="expired"
            checked={searchCat === 'expired'}
            onChange={handleCatChange}
          />
          <label htmlFor="category">Bottles expired</label>
          <input
            type="radio"
            id="wasted"
            name="category"
            value="wasted"
            checked={searchCat === 'wasted'}
            onChange={handleCatChange}
          />
          <label htmlFor="wasted">Wasted vaccines</label>
          <input
            type="radio"
            id="lefttouse"
            name="category"
            value="lefttouse"
            checked={searchCat === 'lefttouse'}
            onChange={handleCatChange}
          />
          <label htmlFor="lefttouse">Vaccines left</label>
          <input
            type="radio"
            id="toexpire"
            name="category"
            value="toexpire"
            checked={searchCat === 'toexpire'}
            onChange={handleCatChange}
          />
          <label htmlFor="toexpire">To expire in 10 days</label>
        </div>

        <div>
          <input
            type="radio"
            id="dateonly"
            name="dayorrange"
            value="dateonly"
            checked={searchRange === 'dateonly'}
            onChange={handleTimeChange}
          />
          <label htmlFor="dateonly">This date only</label>
        </div>
        <div>
          <input
            type="radio"
            id="range"
            name="dayorrange"
            value="range"
            checked={searchRange === 'range'}
            onChange={handleTimeChange}
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