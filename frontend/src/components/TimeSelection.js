import React from 'react';

const TimeSelection = ({
  searchRange,
  searchDate,
  searchTime,
  setSearchDate,
  setSearchTime,
  handleChange
}) => {
  return (
    <fieldset>
      <legend>Please select range or a day and set the date and time</legend>
      <div className="input-label">
        <input
          type="radio"
          id="dateonly"
          name="dayorrange"
          value="dateonly"
          checked={searchRange === 'dateonly'}
          onChange={handleChange}
        />
        <label htmlFor="dateonly">This date only</label>
      </div>
      <div className="input-label">
        <input
          type="radio"
          id="range"
          name="dayorrange"
          value="range"
          checked={searchRange === 'range'}
          onChange={handleChange}
        />
        <label htmlFor="range">Until the date (including date)</label>
      </div>
      <div className="input-no-label">
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
      </div>
    </fieldset>
  );
};

export default TimeSelection;